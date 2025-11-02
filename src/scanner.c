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
 * 7. _inline_math_open/_inline_math_close - Context-aware inline math delimiters ($)
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
  INLINE_MATH_OPEN,
  INLINE_MATH_CLOSE,
  EMPHASIS_OPEN_STAR,
  EMPHASIS_CLOSE_STAR,
  EMPHASIS_OPEN_UNDERSCORE,
  EMPHASIS_CLOSE_UNDERSCORE,
  LAST_TOKEN_WHITESPACE,
  LAST_TOKEN_PUNCTUATION,
  FENCED_DIV_OPEN,
  FENCED_DIV_CLOSE,
};

// Scanner state
typedef struct {
  bool in_executable_cell;      // Track if we're inside an executable cell
  bool at_cell_start;           // Track if we're at the start of cell content
  uint32_t fence_length;        // Track the opening fence length
  uint8_t inside_subscript;     // Track if we're inside subscript (0=false, 1=true)
  uint8_t inside_superscript;   // Track if we're inside superscript (0=false, 1=true)
  uint8_t inside_inline_math;   // Track if we're inside inline math (0=false, 1=true)
  // Emphasis/strikethrough state (from tree-sitter-markdown)
  uint8_t state;                // Parser state flags for emphasis delimiters
  uint8_t num_emphasis_delimiters_left; // Number of characters remaining in current delimiter run
  // Fenced div state
  uint8_t fenced_div_depth;     // Track nesting depth of fenced divs (0 = not in any div)
} Scanner;

// Initialize scanner
void *tree_sitter_quarto_external_scanner_create() {
  Scanner *scanner = (Scanner *)calloc(1, sizeof(Scanner));
  scanner->in_executable_cell = false;
  scanner->at_cell_start = false;
  scanner->fence_length = 0;
  scanner->inside_subscript = 0;
  scanner->inside_superscript = 0;
  scanner->inside_inline_math = 0;
  scanner->state = 0;
  scanner->num_emphasis_delimiters_left = 0;
  scanner->fenced_div_depth = 0;
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
  // Defensive validation: ensure counts fit in uint8_t range
  if (scanner->inside_subscript > 255) scanner->inside_subscript = 255;
  if (scanner->inside_superscript > 255) scanner->inside_superscript = 255;
  if (scanner->inside_inline_math > 255) scanner->inside_inline_math = 255;
  if (scanner->num_emphasis_delimiters_left > 255) scanner->num_emphasis_delimiters_left = 255;

  buffer[0] = scanner->in_executable_cell ? 1 : 0;
  buffer[1] = scanner->at_cell_start ? 1 : 0;
  buffer[2] = (char)(scanner->fence_length & 0xFF);
  buffer[3] = (char)((scanner->fence_length >> 8) & 0xFF);
  buffer[4] = scanner->inside_subscript;
  buffer[5] = scanner->inside_superscript;
  buffer[6] = scanner->inside_inline_math;
  buffer[7] = scanner->state;
  buffer[8] = scanner->num_emphasis_delimiters_left;
  buffer[9] = scanner->fenced_div_depth;
  return 10;
}

// Deserialize scanner state
void tree_sitter_quarto_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
  Scanner *scanner = (Scanner *)payload;
  if (length >= 10) {
    scanner->in_executable_cell = buffer[0] != 0;
    scanner->at_cell_start = buffer[1] != 0;
    scanner->fence_length = ((uint32_t)buffer[2] & 0xFF) | (((uint32_t)buffer[3] & 0xFF) << 8);
    scanner->inside_subscript = buffer[4];
    scanner->inside_superscript = buffer[5];
    scanner->inside_inline_math = buffer[6];
    scanner->state = buffer[7];
    scanner->num_emphasis_delimiters_left = buffer[8];
    scanner->fenced_div_depth = buffer[9];
  } else if (length >= 9) {
    scanner->in_executable_cell = buffer[0] != 0;
    scanner->at_cell_start = buffer[1] != 0;
    scanner->fence_length = ((uint32_t)buffer[2] & 0xFF) | (((uint32_t)buffer[3] & 0xFF) << 8);
    scanner->inside_subscript = buffer[4];
    scanner->inside_superscript = buffer[5];
    scanner->inside_inline_math = buffer[6];
    scanner->state = buffer[7];
    scanner->num_emphasis_delimiters_left = buffer[8];
    scanner->fenced_div_depth = 0;
  } else if (length >= 7) {
    scanner->in_executable_cell = buffer[0] != 0;
    scanner->at_cell_start = buffer[1] != 0;
    scanner->fence_length = ((uint32_t)buffer[2] & 0xFF) | (((uint32_t)buffer[3] & 0xFF) << 8);
    scanner->inside_subscript = buffer[4];
    scanner->inside_superscript = buffer[5];
    scanner->inside_inline_math = buffer[6];
    scanner->state = 0;
    scanner->num_emphasis_delimiters_left = 0;
    scanner->fenced_div_depth = 0;
  } else if (length >= 6) {
    scanner->in_executable_cell = buffer[0] != 0;
    scanner->at_cell_start = buffer[1] != 0;
    scanner->fence_length = ((uint32_t)buffer[2] & 0xFF) | (((uint32_t)buffer[3] & 0xFF) << 8);
    scanner->inside_subscript = buffer[4];
    scanner->inside_superscript = buffer[5];
    scanner->inside_inline_math = 0;
    scanner->state = 0;
    scanner->num_emphasis_delimiters_left = 0;
    scanner->fenced_div_depth = 0;
  } else if (length >= 4) {
    scanner->in_executable_cell = buffer[0] != 0;
    scanner->at_cell_start = buffer[1] != 0;
    scanner->fence_length = ((uint32_t)buffer[2] & 0xFF) | (((uint32_t)buffer[3] & 0xFF) << 8);
    scanner->inside_subscript = 0;
    scanner->inside_superscript = 0;
    scanner->inside_inline_math = 0;
    scanner->state = 0;
    scanner->num_emphasis_delimiters_left = 0;
    scanner->fenced_div_depth = 0;
  } else {
    scanner->in_executable_cell = false;
    scanner->at_cell_start = false;
    scanner->fence_length = 0;
    scanner->inside_subscript = 0;
    scanner->inside_superscript = 0;
    scanner->inside_inline_math = 0;
    scanner->state = 0;
    scanner->num_emphasis_delimiters_left = 0;
    scanner->fenced_div_depth = 0;
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

/**
 * Scan dollar sign ($) for inline math formatting
 *
 * Pandoc inline math syntax: $x^2 + y^2 = z^2$
 * - Single $ delimiters ($$  is display math)
 * - Opening $ must have non-space character immediately to its right
 * - Closing $ must have non-space character immediately to its left
 * - Closing $ must NOT be followed immediately by a digit (protects currency: $20,000)
 * - Context-aware via valid_symbols to prevent false positives
 *
 * Currency protection examples that should NOT parse as math:
 * - $50 ($ followed by digit)
 * - $160 ($ followed by digits)
 * - $25-30 ($ followed by digit)
 *
 * Returns true if inline math delimiter matched, false otherwise
 */
static bool scan_dollar_sign(Scanner *scanner, TSLexer *lexer, const bool *valid_symbols) {
  // Early exit if dollar sign tokens not valid in current context
  if (!valid_symbols[INLINE_MATH_OPEN] && !valid_symbols[INLINE_MATH_CLOSE]) {
    return false;
  }

  // Must be on a dollar sign
  if (lexer->lookahead != '$') {
    return false;
  }

  // Advance to peek at next character
  lexer->advance(lexer, false);

  // Check for $$ (display math, not inline)
  if (lexer->lookahead == '$') {
    // This is $$, let display_math rule handle it
    return false;
  }

  // Check if we're closing an inline math expression
  if (scanner->inside_inline_math > 0 && valid_symbols[INLINE_MATH_CLOSE]) {
    // Pandoc rule: closing $ must NOT be followed immediately by a digit
    // This protects currency amounts like "$20,000 and $30,000"
    if (lexer->lookahead >= '0' && lexer->lookahead <= '9') {
      // This looks like it might be currency, reject as math closing
      return false;
    }

    // Closing delimiter found - mark end at current position (after the $)
    lexer->mark_end(lexer);
    scanner->inside_inline_math = 0;
    lexer->result_symbol = INLINE_MATH_CLOSE;
    return true;
  }

  // Check if we can open an inline math expression
  if (valid_symbols[INLINE_MATH_OPEN]) {
    // Pandoc rule: opening $ must have non-space character immediately to its right
    // AND must NOT be followed by a digit (protects currency: $50, $160)
    if (lexer->lookahead == ' ' || lexer->lookahead == '\t' ||
        lexer->lookahead == '\n' || lexer->lookahead == '\r' ||
        (lexer->lookahead >= '0' && lexer->lookahead <= '9')) {
      // Either whitespace or digit after $, reject as math opening
      return false;
    }

    // Mark end here (after the opening $, before lookahead)
    lexer->mark_end(lexer);

    // Lookahead to verify there's a closing $ somewhere ahead
    // This prevents false positives on isolated dollar signs
    bool has_closing = false;
    int lookahead_count = 0;
    const int MAX_LOOKAHEAD = 200; // Reasonable limit for inline math length

    while (lookahead_count < MAX_LOOKAHEAD && lexer->lookahead != 0 &&
           lexer->lookahead != '\n' && lexer->lookahead != '\r') {
      if (lexer->lookahead == '$') {
        // Check if next character after this potential closing $ is a digit
        lexer->advance(lexer, false);
        if (lexer->lookahead >= '0' && lexer->lookahead <= '9') {
          // Not a valid closing delimiter ($ followed by digit), keep looking
          lexer->advance(lexer, false);
          lookahead_count += 2;
          continue;
        }
        // Found valid closing delimiter
        has_closing = true;
        break;
      }
      lexer->advance(lexer, false);
      lookahead_count++;
    }

    if (!has_closing) {
      // No closing delimiter found, reject this as inline math opening
      return false;
    }

    // Opening delimiter valid
    scanner->inside_inline_math = 1;
    lexer->result_symbol = INLINE_MATH_OPEN;
    return true;
  }

  return false;
}

/**
 * ============================================================================
 * EMPHASIS/STRONG EMPHASIS HANDLING
 * Copied from tree-sitter-markdown (tree-sitter-markdown-inline/src/scanner.c)
 * Repository: https://github.com/tree-sitter-grammars/tree-sitter-markdown
 * Commit: 2dfd57f547f06ca5631a80f601e129d73fc8e9f0
 * Date: 2025-09-16
 * License: MIT (Copyright 2021 Matthias Deiml)
 * ============================================================================
 */

// State bitflags used with `Scanner.state`
static const uint8_t STATE_EMPHASIS_DELIMITER_IS_OPEN = 0x1 << 2;

// Determines if a character is punctuation as defined by the markdown spec.
static bool is_punctuation(int32_t chr) {
    return (chr >= '!' && chr <= '/') || (chr >= ':' && chr <= '@') ||
           (chr >= '[' && chr <= '`') || (chr >= '{' && chr <= '~');
}

static bool parse_star(Scanner *scanner, TSLexer *lexer, const bool *valid_symbols) {
    lexer->advance(lexer, false);
    // If `num_emphasis_delimiters_left` is not zero then we already decided
    // that this should be part of an emphasis delimiter run, so interpret it as
    // such.
    if (scanner->num_emphasis_delimiters_left > 0) {
        // The `STATE_EMPHASIS_DELIMITER_IS_OPEN` state flag tells us whether it
        // should be open or close.
        if ((scanner->state & STATE_EMPHASIS_DELIMITER_IS_OPEN) &&
            valid_symbols[EMPHASIS_OPEN_STAR]) {
            scanner->state &= (~STATE_EMPHASIS_DELIMITER_IS_OPEN);
            lexer->result_symbol = EMPHASIS_OPEN_STAR;
            scanner->num_emphasis_delimiters_left--;
            return true;
        }
        if (valid_symbols[EMPHASIS_CLOSE_STAR]) {
            lexer->result_symbol = EMPHASIS_CLOSE_STAR;
            scanner->num_emphasis_delimiters_left--;
            return true;
        }
    }
    lexer->mark_end(lexer);
    // Otherwise count the number of stars
    uint8_t star_count = 1;
    while (lexer->lookahead == '*' && star_count < 255) {
        star_count++;
        lexer->advance(lexer, false);
    }
    bool line_end = lexer->lookahead == '\n' || lexer->lookahead == '\r' ||
                    lexer->eof(lexer);
    if (valid_symbols[EMPHASIS_OPEN_STAR] ||
        valid_symbols[EMPHASIS_CLOSE_STAR]) {
        // The decision made for the first star also counts for all the
        // following stars in the delimiter run. Remember how many there are.
        scanner->num_emphasis_delimiters_left = star_count - 1;
        // Look ahead to the next symbol (after the last star) to find out if it
        // is whitespace punctuation or other.
        bool next_symbol_whitespace =
            line_end || lexer->lookahead == ' ' || lexer->lookahead == '\t';
        bool next_symbol_punctuation = is_punctuation(lexer->lookahead);
        // Information about the last token is in valid_symbols. See grammar.js
        // for these tokens for how this is done.
        if (valid_symbols[EMPHASIS_CLOSE_STAR] &&
            !valid_symbols[LAST_TOKEN_WHITESPACE] &&
            (!valid_symbols[LAST_TOKEN_PUNCTUATION] ||
             next_symbol_punctuation || next_symbol_whitespace)) {
            // Closing delimiters take precedence
            scanner->state &= ~STATE_EMPHASIS_DELIMITER_IS_OPEN;
            lexer->result_symbol = EMPHASIS_CLOSE_STAR;
            return true;
        }
        if (!next_symbol_whitespace && (!next_symbol_punctuation ||
                                        valid_symbols[LAST_TOKEN_PUNCTUATION] ||
                                        valid_symbols[LAST_TOKEN_WHITESPACE])) {
            scanner->state |= STATE_EMPHASIS_DELIMITER_IS_OPEN;
            lexer->result_symbol = EMPHASIS_OPEN_STAR;
            return true;
        }
    }
    return false;
}

static bool parse_underscore(Scanner *scanner, TSLexer *lexer,
                             const bool *valid_symbols) {
    lexer->advance(lexer, false);
    // If `num_emphasis_delimiters_left` is not zero then we already decided
    // that this should be part of an emphasis delimiter run, so interpret it as
    // such.
    if (scanner->num_emphasis_delimiters_left > 0) {
        // The `STATE_EMPHASIS_DELIMITER_IS_OPEN` state flag tells us whether it
        // should be open or close.
        if ((scanner->state & STATE_EMPHASIS_DELIMITER_IS_OPEN) &&
            valid_symbols[EMPHASIS_OPEN_UNDERSCORE]) {
            scanner->state &= (~STATE_EMPHASIS_DELIMITER_IS_OPEN);
            lexer->result_symbol = EMPHASIS_OPEN_UNDERSCORE;
            scanner->num_emphasis_delimiters_left--;
            return true;
        }
        if (valid_symbols[EMPHASIS_CLOSE_UNDERSCORE]) {
            lexer->result_symbol = EMPHASIS_CLOSE_UNDERSCORE;
            scanner->num_emphasis_delimiters_left--;
            return true;
        }
    }
    lexer->mark_end(lexer);
    // Otherwise count the number of underscores
    uint8_t underscore_count = 1;
    while (lexer->lookahead == '_' && underscore_count < 255) {
        underscore_count++;
        lexer->advance(lexer, false);
    }
    bool line_end = lexer->lookahead == '\n' || lexer->lookahead == '\r' ||
                    lexer->eof(lexer);
    if (valid_symbols[EMPHASIS_OPEN_UNDERSCORE] ||
        valid_symbols[EMPHASIS_CLOSE_UNDERSCORE]) {
        // The decision made for the first underscore also counts for all the
        // following underscores in the delimiter run. Remember how many there are.
        scanner->num_emphasis_delimiters_left = underscore_count - 1;
        // Look ahead to the next symbol (after the last underscore) to find out if it
        // is whitespace punctuation or other.
        bool next_symbol_whitespace =
            line_end || lexer->lookahead == ' ' || lexer->lookahead == '\t';
        bool next_symbol_punctuation = is_punctuation(lexer->lookahead);
        // Information about the last token is in valid_symbols. See grammar.js
        // for these tokens for how this is done.
        if (valid_symbols[EMPHASIS_CLOSE_UNDERSCORE] &&
            !valid_symbols[LAST_TOKEN_WHITESPACE] &&
            (!valid_symbols[LAST_TOKEN_PUNCTUATION] ||
             next_symbol_punctuation || next_symbol_whitespace)) {
            // Closing delimiters take precedence
            scanner->state &= ~STATE_EMPHASIS_DELIMITER_IS_OPEN;
            lexer->result_symbol = EMPHASIS_CLOSE_UNDERSCORE;
            return true;
        }
        if (!next_symbol_whitespace && (!next_symbol_punctuation ||
                                        valid_symbols[LAST_TOKEN_PUNCTUATION] ||
                                        valid_symbols[LAST_TOKEN_WHITESPACE])) {
            scanner->state |= STATE_EMPHASIS_DELIMITER_IS_OPEN;
            lexer->result_symbol = EMPHASIS_OPEN_UNDERSCORE;
            return true;
        }
    }
    return false;
}

/**
 * ============================================================================
 * END OF TREE-SITTER-MARKDOWN CODE
 * ============================================================================
 */

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

/**
 * Scan for fenced div delimiters (opening or closing)
 *
 * This function is adapted from quarto-dev/quarto-markdown's tree-sitter-qmd parser:
 * https://github.com/quarto-dev/quarto-markdown/blob/main/crates/tree-sitter-qmd/tree-sitter-markdown/src/scanner.c
 *
 * The key insight from their implementation is to use a unified function that:
 * 1. Counts the colon delimiter (:::+)
 * 2. Checks what follows to determine if it's an opening or closing delimiter
 * 3. Respects valid_symbols to let the grammar control when tokens are emitted
 *
 * This approach avoids the scanner/grammar priority conflicts that occur when using
 * separate functions for opening and closing delimiters.
 */
static bool scan_fenced_div_marker(Scanner *scanner, TSLexer *lexer, const bool *valid_symbols) {
  // Count colons
  uint32_t colon_count = 0;
  while (lexer->lookahead == ':') {
    colon_count++;
    lexer->advance(lexer, false);
  }

  // Must have at least 3 colons
  if (colon_count < 3) {
    return false;
  }

  // Mark the end of the token (just the colons)
  lexer->mark_end(lexer);

  // Skip whitespace after the colons
  while (lexer->lookahead == ' ' || lexer->lookahead == '\t') {
    lexer->advance(lexer, false);
  }

  // Determine if this is an opening or closing delimiter based on what follows
  if (lexer->lookahead == '\n' || lexer->lookahead == '\r' || lexer->lookahead == 0) {
    // Followed by newline/EOF -> closing delimiter
    if (valid_symbols[FENCED_DIV_CLOSE] && scanner->fenced_div_depth > 0) {
      lexer->result_symbol = FENCED_DIV_CLOSE;
      scanner->fenced_div_depth--;
      return true;
    }
  } else {
    // Followed by content (attributes/info string) -> opening delimiter
    if (valid_symbols[FENCED_DIV_OPEN]) {
      lexer->result_symbol = FENCED_DIV_OPEN;
      scanner->fenced_div_depth++;
      return true;
    }
  }

  // If neither token is valid in this context, return false
  // This lets the grammar try other rules
  return false;
}

// Main scan function
bool tree_sitter_quarto_external_scanner_scan(
  void *payload,
  TSLexer *lexer,
  const bool *valid_symbols
) {
  Scanner *scanner = (Scanner *)payload;

  // Try subscript/superscript/inline_math first (before whitespace skipping)
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

  if (lexer->lookahead == '$') {
    if (scan_dollar_sign(scanner, lexer, valid_symbols)) {
      return true;
    }
  }

  // Try emphasis/strong emphasis (before whitespace skipping)
  // These need to check character position and context precisely
  if (lexer->lookahead == '*') {
    if (parse_star(scanner, lexer, valid_symbols)) {
      return true;
    }
  }

  if (lexer->lookahead == '_') {
    if (parse_underscore(scanner, lexer, valid_symbols)) {
      return true;
    }
  }

  // Try fenced divs (before whitespace skipping)
  // Fenced divs must start at the beginning of a line
  if (lexer->lookahead == ':') {
    if (valid_symbols[FENCED_DIV_CLOSE] || valid_symbols[FENCED_DIV_OPEN]) {
      if (scan_fenced_div_marker(scanner, lexer, valid_symbols)) {
        return true;
      }
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
