/**
 * External Scanner for tree-sitter-quarto
 *
 * Handles context-sensitive tokens that cannot be parsed by LR(1):
 * 1. pipe_table_start - Validate pipe table syntax
 * 2. _chunk_option_marker - Detect #| at start of executable cells
 * 3. _cell_boundary - Track executable cell context
 * 4. _chunk_option_continuation - Detect multi-line chunk option continuations
 * 5. _subscript_open/_subscript_close - Context-aware subscript delimiters (~)
 * 6. _superscript_open/_superscript_close - Context-aware superscript delimiters (^)
 *
 * Spec: openspec/specs/grammar-foundation/spec.md
 *       openspec/specs/chunk-options/spec.md
 *       openspec/specs/pandoc-inline-formatting/spec.md
 */

#include <tree_sitter/parser.h>
#include <wctype.h>
#include <stdbool.h>
#include <string.h>

enum TokenType {
  PIPE_TABLE_START,
  CHUNK_OPTION_MARKER,
  CELL_BOUNDARY,
  CHUNK_OPTION_CONTINUATION,
  SUBSCRIPT_OPEN,
  SUBSCRIPT_CLOSE,
  SUPERSCRIPT_OPEN,
  SUPERSCRIPT_CLOSE,
};

// Scanner state
typedef struct {
  bool in_executable_cell;      // Track if we're inside an executable cell
  bool at_cell_start;           // Track if we're at the start of cell content
  uint32_t fence_length;        // Track the opening fence length
  uint8_t inside_subscript;     // Track if we're inside subscript (0=false, 1=true)
  uint8_t inside_superscript;   // Track if we're inside superscript (0=false, 1=true)
} Scanner;

// Initialize scanner
void *tree_sitter_quarto_external_scanner_create() {
  Scanner *scanner = (Scanner *)calloc(1, sizeof(Scanner));
  scanner->in_executable_cell = false;
  scanner->at_cell_start = false;
  scanner->fence_length = 0;
  scanner->inside_subscript = 0;
  scanner->inside_superscript = 0;
  return scanner;
}

// Destroy scanner
void tree_sitter_quarto_external_scanner_destroy(void *payload) {
  Scanner *scanner = (Scanner *)payload;
  free(scanner);
}

// Serialize scanner state
unsigned tree_sitter_quarto_external_scanner_serialize(void *payload, char *buffer) {
  Scanner *scanner = (Scanner *)payload;
  buffer[0] = scanner->in_executable_cell ? 1 : 0;
  buffer[1] = scanner->at_cell_start ? 1 : 0;
  buffer[2] = (char)(scanner->fence_length & 0xFF);
  buffer[3] = (char)((scanner->fence_length >> 8) & 0xFF);
  buffer[4] = scanner->inside_subscript;
  buffer[5] = scanner->inside_superscript;
  return 6;
}

// Deserialize scanner state
void tree_sitter_quarto_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
  Scanner *scanner = (Scanner *)payload;
  if (length >= 6) {
    scanner->in_executable_cell = buffer[0] != 0;
    scanner->at_cell_start = buffer[1] != 0;
    scanner->fence_length = ((uint32_t)buffer[2] & 0xFF) | (((uint32_t)buffer[3] & 0xFF) << 8);
    scanner->inside_subscript = buffer[4];
    scanner->inside_superscript = buffer[5];
  } else if (length >= 4) {
    scanner->in_executable_cell = buffer[0] != 0;
    scanner->at_cell_start = buffer[1] != 0;
    scanner->fence_length = ((uint32_t)buffer[2] & 0xFF) | (((uint32_t)buffer[3] & 0xFF) << 8);
    scanner->inside_subscript = 0;
    scanner->inside_superscript = 0;
  } else {
    scanner->in_executable_cell = false;
    scanner->at_cell_start = false;
    scanner->fence_length = 0;
    scanner->inside_subscript = 0;
    scanner->inside_superscript = 0;
  }
}

// Skip whitespace
static void skip_whitespace(TSLexer *lexer) {
  while (lexer->lookahead == ' ' || lexer->lookahead == '\t') {
    lexer->advance(lexer, true);
  }
}

// Check if current position starts a pipe table
static bool scan_pipe_table_start(TSLexer *lexer) {
  // This is a zero-width lookahead token - it validates but doesn't consume
  // Mark the end at the start to make this a zero-width token
  lexer->mark_end(lexer);

  // Skip to end of current line
  while (lexer->lookahead != '\n' && lexer->lookahead != '\r' && lexer->lookahead != 0) {
    lexer->advance(lexer, false);
  }

  // Check if next line starts with | and has alignment markers
  if (lexer->lookahead == '\r') {
    lexer->advance(lexer, false);
  }
  if (lexer->lookahead == '\n') {
    lexer->advance(lexer, false);
  }

  skip_whitespace(lexer);

  if (lexer->lookahead != '|') {
    return false;
  }

  lexer->advance(lexer, false);
  skip_whitespace(lexer);

  // Check for alignment marker (:-*- or -:)
  bool has_dash = false;

  if (lexer->lookahead == ':') {
    lexer->advance(lexer, false);
  }

  while (lexer->lookahead == '-') {
    has_dash = true;
    lexer->advance(lexer, false);
  }

  if (lexer->lookahead == ':') {
    lexer->advance(lexer, false);
  }

  return has_dash;  // Must have at least dashes for alignment
}

// Check if current position is a chunk option marker
static bool scan_chunk_option_marker(Scanner *scanner, TSLexer *lexer) {
  // Only valid if we're in an executable cell and at start of content
  if (!scanner->in_executable_cell || !scanner->at_cell_start) {
    return false;
  }

  // Check for #| pattern
  if (lexer->lookahead == '#') {
    lexer->advance(lexer, false);
    if (lexer->lookahead == '|') {
      lexer->advance(lexer, false);
      skip_whitespace(lexer);
      lexer->mark_end(lexer);
      return true;
    }
  }

  return false;
}

// Check if current position is a chunk option continuation
static bool scan_chunk_option_continuation(Scanner *scanner, TSLexer *lexer) {
  // Check for #| pattern with required whitespace
  // The grammar context (inside repeat1 after multi-line chunk option) ensures this is only
  // called when appropriate, so we don't need to check in_executable_cell state
  if (lexer->lookahead == '#') {
    lexer->advance(lexer, false);
    if (lexer->lookahead == '|') {
      lexer->advance(lexer, false);
      // Continuation lines must have whitespace after #|
      if (lexer->lookahead == ' ' || lexer->lookahead == '\t') {
        skip_whitespace(lexer);
        // Mark end after consuming #| and whitespace
        lexer->mark_end(lexer);

        // Now lookahead to check if this line contains a key: pattern (new chunk option)
        // Check if line starts with a key (letter followed by colon later)
        if ((lexer->lookahead >= 'a' && lexer->lookahead <= 'z') ||
            (lexer->lookahead >= 'A' && lexer->lookahead <= 'Z')) {
          // Look for colon to detect new chunk option
          while ((lexer->lookahead >= 'a' && lexer->lookahead <= 'z') ||
                 (lexer->lookahead >= 'A' && lexer->lookahead <= 'Z') ||
                 (lexer->lookahead >= '0' && lexer->lookahead <= '9') ||
                 lexer->lookahead == '-') {
            lexer->advance(lexer, false);
          }
          // If we find a colon, this is a new chunk option, not a continuation
          if (lexer->lookahead == ':') {
            return false;
          }
        }

        // Not a new chunk option, so it's a continuation
        return true;
      }
    }
  }

  return false;
}

/**
 * Scan tilde (~) for subscript formatting
 *
 * Pandoc subscript syntax: H~2~O
 * - Single ~ delimiters (not ~~)
 * - No whitespace after opening ~
 * - Context-aware via valid_symbols to prevent false positives
 *
 * Returns true if subscript delimiter matched, false otherwise
 */
static bool scan_tilde(Scanner *scanner, TSLexer *lexer, const bool *valid_symbols) {
  // Early exit if tilde tokens not valid in current context
  if (!valid_symbols[SUBSCRIPT_OPEN] && !valid_symbols[SUBSCRIPT_CLOSE]) {
    return false;
  }

  // Must be on a tilde
  if (lexer->lookahead != '~') {
    return false;
  }

  // Save position before advancing
  // Advance to peek at next character
  lexer->advance(lexer, false);

  // Check for ~~ (strikethrough)
  if (lexer->lookahead == '~') {
    // This is ~~, let strikethrough rule handle it
    return false;
  }

  // Check if we're closing a subscript
  if (scanner->inside_subscript > 0 && valid_symbols[SUBSCRIPT_CLOSE]) {
    // Closing delimiter found - mark end at current position (after the ~)
    lexer->mark_end(lexer);
    scanner->inside_subscript = 0;
    lexer->result_symbol = SUBSCRIPT_CLOSE;
    return true;
  }

  // Check if we can open a subscript
  if (valid_symbols[SUBSCRIPT_OPEN]) {
    // Pandoc rule: no whitespace after opening ~
    if (lexer->lookahead == ' ' || lexer->lookahead == '\t' ||
        lexer->lookahead == '\n' || lexer->lookahead == '\r') {
      return false;
    }

    // Mark end here (after the opening ~, before lookahead)
    lexer->mark_end(lexer);

    // Lookahead to verify there's a closing ~ somewhere ahead
    // This prevents false positives on isolated tildes
    bool has_closing = false;
    int lookahead_count = 0;
    const int MAX_LOOKAHEAD = 100; // Reasonable limit for subscript length

    while (lookahead_count < MAX_LOOKAHEAD && lexer->lookahead != 0 &&
           lexer->lookahead != '\n' && lexer->lookahead != '\r') {
      if (lexer->lookahead == '~') {
        // Found potential closing delimiter
        has_closing = true;
        break;
      }
      lexer->advance(lexer, false);
      lookahead_count++;
    }

    if (!has_closing) {
      // No closing delimiter found, reject this as subscript opening
      return false;
    }

    // Opening delimiter valid
    scanner->inside_subscript = 1;
    lexer->result_symbol = SUBSCRIPT_OPEN;
    return true;
  }

  return false;
}

/**
 * Scan caret (^) for superscript formatting
 *
 * Pandoc superscript syntax: x^2^
 * - Single ^ delimiters
 * - No whitespace after opening ^
 * - Must not be ^[ (footnote reference)
 * - Context-aware via valid_symbols to prevent false positives
 *
 * Returns true if superscript delimiter matched, false otherwise
 */
static bool scan_caret(Scanner *scanner, TSLexer *lexer, const bool *valid_symbols) {
  // Early exit if caret tokens not valid in current context
  if (!valid_symbols[SUPERSCRIPT_OPEN] && !valid_symbols[SUPERSCRIPT_CLOSE]) {
    return false;
  }

  // Must be on a caret
  if (lexer->lookahead != '^') {
    return false;
  }

  // Advance to peek at next character
  lexer->advance(lexer, false);

  // Check for ^[ (footnote reference)
  if (lexer->lookahead == '[') {
    // This is ^[, let footnote reference handle it
    return false;
  }

  // Check if we're closing a superscript
  if (scanner->inside_superscript > 0 && valid_symbols[SUPERSCRIPT_CLOSE]) {
    // Closing delimiter found - mark end at current position (after the ^)
    lexer->mark_end(lexer);
    scanner->inside_superscript = 0;
    lexer->result_symbol = SUPERSCRIPT_CLOSE;
    return true;
  }

  // Check if we can open a superscript
  if (valid_symbols[SUPERSCRIPT_OPEN]) {
    // Pandoc rule: no whitespace after opening ^
    if (lexer->lookahead == ' ' || lexer->lookahead == '\t' ||
        lexer->lookahead == '\n' || lexer->lookahead == '\r') {
      return false;
    }

    // Mark end here (after the opening ^, before lookahead)
    lexer->mark_end(lexer);

    // Lookahead to verify there's a closing ^ somewhere ahead
    // This prevents false positives on isolated carets
    bool has_closing = false;
    int lookahead_count = 0;
    const int MAX_LOOKAHEAD = 100; // Reasonable limit for superscript length

    while (lookahead_count < MAX_LOOKAHEAD && lexer->lookahead != 0 &&
           lexer->lookahead != '\n' && lexer->lookahead != '\r') {
      if (lexer->lookahead == '^') {
        // Found potential closing delimiter
        has_closing = true;
        break;
      }
      lexer->advance(lexer, false);
      lookahead_count++;
    }

    if (!has_closing) {
      // No closing delimiter found, reject this as superscript opening
      return false;
    }

    // Opening delimiter valid
    scanner->inside_superscript = 1;
    lexer->result_symbol = SUPERSCRIPT_OPEN;
    return true;
  }

  return false;
}

// Check if current position is a cell boundary (fence delimiter)
static bool scan_cell_boundary(Scanner *scanner, TSLexer *lexer) {
  // Count backticks
  uint32_t fence_len = 0;
  while (lexer->lookahead == '`') {
    fence_len++;
    lexer->advance(lexer, false);
  }

  // Must have at least 3 backticks
  if (fence_len < 3) {
    return false;
  }

  // Check if opening fence with {language}
  skip_whitespace(lexer);
  if (lexer->lookahead == '{') {
    // Opening fence for executable cell
    scanner->in_executable_cell = true;
    scanner->at_cell_start = true;
    scanner->fence_length = fence_len;
    lexer->mark_end(lexer);
    return true;
  }

  // Check if closing fence
  skip_whitespace(lexer);
  if (lexer->lookahead == '\n' || lexer->lookahead == '\r' || lexer->lookahead == 0) {
    if (scanner->in_executable_cell && fence_len >= scanner->fence_length) {
      // Closing fence
      scanner->in_executable_cell = false;
      scanner->at_cell_start = false;
      scanner->fence_length = 0;
      lexer->mark_end(lexer);
      return true;
    }
  }

  return false;
}

// Main scan function
bool tree_sitter_quarto_external_scanner_scan(
  void *payload,
  TSLexer *lexer,
  const bool *valid_symbols
) {
  Scanner *scanner = (Scanner *)payload;

  // Try subscript/superscript first (before whitespace skipping)
  // These need to check character position precisely
  if (lexer->lookahead == '~') {
    if (scan_tilde(scanner, lexer, valid_symbols)) {
      return true;
    }
  }

  if (lexer->lookahead == '^') {
    if (scan_caret(scanner, lexer, valid_symbols)) {
      return true;
    }
  }

  // Skip leading whitespace for most tokens
  if (valid_symbols[CHUNK_OPTION_MARKER] || valid_symbols[CHUNK_OPTION_CONTINUATION]) {
    // Don't skip whitespace for chunk options - position matters
  } else {
    skip_whitespace(lexer);
  }

  // Try to scan each token type

  if (valid_symbols[PIPE_TABLE_START]) {
    if (scan_pipe_table_start(lexer)) {
      lexer->result_symbol = PIPE_TABLE_START;
      return true;
    }
  }

  // Check for continuation first if expecting it
  if (valid_symbols[CHUNK_OPTION_CONTINUATION]) {
    if (scan_chunk_option_continuation(scanner, lexer)) {
      lexer->result_symbol = CHUNK_OPTION_CONTINUATION;
      // Still expecting more continuations potentially
      return true;
    }
  }

  if (valid_symbols[CHUNK_OPTION_MARKER]) {
    if (scan_chunk_option_marker(scanner, lexer)) {
      lexer->result_symbol = CHUNK_OPTION_MARKER;
      // After chunk option, still at cell start for next option
      return true;
    } else {
      // No chunk option found, no longer at cell start
      scanner->at_cell_start = false;
    }
  }

  if (valid_symbols[CELL_BOUNDARY]) {
    if (scan_cell_boundary(scanner, lexer)) {
      lexer->result_symbol = CELL_BOUNDARY;
      return true;
    }
  }

  return false;
}
