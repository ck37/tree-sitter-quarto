/**
 * External Scanner for tree-sitter-quarto BLOCK grammar
 *
 * Handles context-sensitive block-level tokens only:
 * 1. pipe_table_start - Validate pipe table syntax
 * 2. _chunk_option_marker - Detect #| at start of executable cells
 * 3. _cell_boundary - Track executable cell context
 * 4. _chunk_option_continuation - Detect multi-line chunk option continuations
 * 5. _fenced_div_open/_fenced_div_close - Track fenced div nesting
 * 6. _code_block_start/_code_block_line/_code_block_end - Scanner-controlled fence detection
 */

#include <tree_sitter/parser.h>
#include <wctype.h>
#include <stdbool.h>
#include <string.h>

#define MAX_CODE_BLOCK_LINES 1000

enum TokenType {
  PIPE_TABLE_START,
  CHUNK_OPTION_MARKER,
  CELL_BOUNDARY,
  CHUNK_OPTION_CONTINUATION,
  FENCED_DIV_OPEN,
  FENCED_DIV_CLOSE,
  CODE_BLOCK_START,
  CODE_BLOCK_LINE,
  CODE_BLOCK_END,
};

typedef struct {
  bool in_executable_cell;
  bool at_cell_start;
  uint32_t fence_length;
  uint8_t fenced_div_depth;
  bool in_code_block;
  uint16_t code_block_fence_length;
  uint16_t code_block_line_count;
} Scanner;

void *tree_sitter_quarto_block_external_scanner_create() {
  Scanner *scanner = (Scanner *)calloc(1, sizeof(Scanner));
  scanner->in_executable_cell = false;
  scanner->at_cell_start = false;
  scanner->fence_length = 0;
  scanner->fenced_div_depth = 0;
  scanner->in_code_block = false;
  scanner->code_block_fence_length = 0;
  scanner->code_block_line_count = 0;
  return scanner;
}

void tree_sitter_quarto_block_external_scanner_destroy(void *payload) {
  Scanner *scanner = (Scanner *)payload;
  free(scanner);
}

unsigned tree_sitter_quarto_block_external_scanner_serialize(void *payload, char *buffer) {
  Scanner *scanner = (Scanner *)payload;
  buffer[0] = scanner->in_executable_cell ? 1 : 0;
  buffer[1] = scanner->at_cell_start ? 1 : 0;
  buffer[2] = (char)(scanner->fence_length & 0xFF);
  buffer[3] = (char)((scanner->fence_length >> 8) & 0xFF);
  buffer[4] = scanner->fenced_div_depth;
  buffer[5] = scanner->in_code_block ? 1 : 0;
  buffer[6] = (char)(scanner->code_block_fence_length & 0xFF);
  buffer[7] = (char)((scanner->code_block_fence_length >> 8) & 0xFF);
  buffer[8] = (char)(scanner->code_block_line_count & 0xFF);
  buffer[9] = (char)((scanner->code_block_line_count >> 8) & 0xFF);
  return 10;
}

void tree_sitter_quarto_block_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
  Scanner *scanner = (Scanner *)payload;
  if (length >= 10) {
    scanner->in_executable_cell = buffer[0] != 0;
    scanner->at_cell_start = buffer[1] != 0;
    scanner->fence_length = ((uint32_t)buffer[2] & 0xFF) | (((uint32_t)buffer[3] & 0xFF) << 8);
    scanner->fenced_div_depth = buffer[4];
    scanner->in_code_block = buffer[5] != 0;
    scanner->code_block_fence_length = ((uint16_t)buffer[6] & 0xFF) | (((uint16_t)buffer[7] & 0xFF) << 8);
    scanner->code_block_line_count = ((uint16_t)buffer[8] & 0xFF) | (((uint16_t)buffer[9] & 0xFF) << 8);
  } else {
    scanner->in_executable_cell = false;
    scanner->at_cell_start = false;
    scanner->fence_length = 0;
    scanner->fenced_div_depth = 0;
    scanner->in_code_block = false;
    scanner->code_block_fence_length = 0;
    scanner->code_block_line_count = 0;
  }
}

// Helper: Skip whitespace
static void skip_whitespace(TSLexer *lexer) {
  while (lexer->lookahead == ' ' || lexer->lookahead == '\t') {
    lexer->advance(lexer, true);
  }
}

// Scan pipe table start
static bool scan_pipe_table_start(TSLexer *lexer) {
  if (lexer->get_column(lexer) != 0) return false;
  if (lexer->lookahead != '|') return false;

  lexer->mark_end(lexer);
  return true;
}

// Scan chunk option marker (#|)
static bool scan_chunk_option_marker(Scanner *scanner, TSLexer *lexer) {
  if (!scanner->at_cell_start && !scanner->in_executable_cell) return false;
  if (lexer->get_column(lexer) != 0) return false;
  if (lexer->lookahead != '#') return false;

  lexer->advance(lexer, false);
  if (lexer->lookahead != '|') return false;

  lexer->advance(lexer, false);
  lexer->mark_end(lexer);

  if (scanner->at_cell_start) {
    scanner->at_cell_start = false;
    scanner->in_executable_cell = true;
  }

  return true;
}

// Scan chunk option continuation
static bool scan_chunk_option_continuation(TSLexer *lexer) {
  if (lexer->get_column(lexer) != 0) return false;
  if (lexer->lookahead != '#') return false;

  lexer->advance(lexer, false);
  if (lexer->lookahead != '|') return false;

  lexer->advance(lexer, false);
  lexer->mark_end(lexer);
  return true;
}

// Scan fenced div marker (:::)
static bool scan_fenced_div_marker(Scanner *scanner, TSLexer *lexer, const bool *valid_symbols) {
  if (lexer->get_column(lexer) != 0) return false;
  if (lexer->lookahead != ':') return false;

  uint32_t count = 0;
  while (lexer->lookahead == ':') {
    lexer->advance(lexer, false);
    count++;
  }

  if (count < 3) return false;

  // Check if this is opening or closing
  bool is_opening = (lexer->lookahead != '\n' && lexer->lookahead != '\r' && lexer->lookahead != 0);

  if (is_opening && valid_symbols[FENCED_DIV_OPEN]) {
    scanner->fenced_div_depth++;
    lexer->result_symbol = FENCED_DIV_OPEN;
    lexer->mark_end(lexer);
    return true;
  }

  if (!is_opening && valid_symbols[FENCED_DIV_CLOSE] && scanner->fenced_div_depth > 0) {
    scanner->fenced_div_depth--;
    lexer->result_symbol = FENCED_DIV_CLOSE;
    lexer->mark_end(lexer);
    return true;
  }

  return false;
}

// Scan code block start (opening fence)
static bool scan_code_block_start(Scanner *scanner, TSLexer *lexer) {
  if (lexer->get_column(lexer) != 0) return false;
  if (lexer->lookahead != '`') return false;

  uint16_t count = 0;
  while (lexer->lookahead == '`') {
    lexer->advance(lexer, false);
    count++;
  }

  if (count < 3) return false;

  scanner->in_code_block = true;
  scanner->code_block_fence_length = count;
  scanner->code_block_line_count = 0;

  lexer->mark_end(lexer);
  return true;
}

// Scan code block line
static bool scan_code_block_line(TSLexer *lexer) {
  // Consume entire line including newline
  while (lexer->lookahead != '\n' && lexer->lookahead != '\r' && lexer->lookahead != 0) {
    lexer->advance(lexer, false);
  }

  // Consume the newline(s)
  if (lexer->lookahead == '\r') {
    lexer->advance(lexer, false);
  }
  if (lexer->lookahead == '\n') {
    lexer->advance(lexer, false);
  }

  lexer->mark_end(lexer);
  return true;
}

// Scan code block end (closing fence)
static bool scan_code_block_end(Scanner *scanner, TSLexer *lexer) {
  if (lexer->get_column(lexer) != 0) return false;
  if (lexer->lookahead != '`') return false;

  uint16_t count = 0;
  while (lexer->lookahead == '`') {
    lexer->advance(lexer, false);
    count++;
  }

  // Must match or exceed opening fence length
  if (count < scanner->code_block_fence_length) return false;

  // Must be followed by whitespace or newline
  if (lexer->lookahead != ' ' && lexer->lookahead != '\t' &&
      lexer->lookahead != '\n' && lexer->lookahead != '\r' && lexer->lookahead != 0) {
    return false;
  }

  scanner->in_code_block = false;
  scanner->code_block_fence_length = 0;
  scanner->code_block_line_count = 0;

  lexer->mark_end(lexer);
  return true;
}

bool tree_sitter_quarto_block_external_scanner_scan(
  void *payload,
  TSLexer *lexer,
  const bool *valid_symbols
) {
  Scanner *scanner = (Scanner *)payload;

  // Code block start (highest priority - must check before whitespace)
  if (valid_symbols[CODE_BLOCK_START] && scan_code_block_start(scanner, lexer)) {
    lexer->result_symbol = CODE_BLOCK_START;
    return true;
  }

  // Code block content and end
  if (valid_symbols[CODE_BLOCK_LINE] || valid_symbols[CODE_BLOCK_END]) {
    if (valid_symbols[CODE_BLOCK_END] && scan_code_block_end(scanner, lexer)) {
      lexer->result_symbol = CODE_BLOCK_END;
      return true;
    }

    if (valid_symbols[CODE_BLOCK_LINE] &&
        scanner->in_code_block &&
        scanner->code_block_line_count < MAX_CODE_BLOCK_LINES &&
        scan_code_block_line(lexer)) {
      scanner->code_block_line_count++;
      lexer->result_symbol = CODE_BLOCK_LINE;
      return true;
    }
  }

  // Fenced divs
  if (lexer->lookahead == ':') {
    if (valid_symbols[FENCED_DIV_CLOSE] || valid_symbols[FENCED_DIV_OPEN]) {
      if (scan_fenced_div_marker(scanner, lexer, valid_symbols)) {
        return true;
      }
    }
  }

  // Skip whitespace for remaining checks
  skip_whitespace(lexer);

  // Pipe table start
  if (valid_symbols[PIPE_TABLE_START] && scan_pipe_table_start(lexer)) {
    lexer->result_symbol = PIPE_TABLE_START;
    return true;
  }

  // Chunk option marker
  if (valid_symbols[CHUNK_OPTION_MARKER] && scan_chunk_option_marker(scanner, lexer)) {
    lexer->result_symbol = CHUNK_OPTION_MARKER;
    return true;
  }

  // Chunk option continuation
  if (valid_symbols[CHUNK_OPTION_CONTINUATION] && scan_chunk_option_continuation(lexer)) {
    lexer->result_symbol = CHUNK_OPTION_CONTINUATION;
    return true;
  }

  return false;
}
