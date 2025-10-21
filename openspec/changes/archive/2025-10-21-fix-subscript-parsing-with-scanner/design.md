# Scanner Architecture for Subscript/Superscript

## Overview

This document describes the external scanner implementation for context-aware subscript (`~`) and superscript (`^`) delimiter parsing.

## Design Principles

1. **Context-Awareness**: Only match delimiters when grammar context allows (via `valid_symbols`)
2. **State Tracking**: Maintain parser state to correctly pair opening/closing delimiters
3. **False Positive Prevention**: Reject isolated tildes/carets in normal prose
4. **Performance**: Early exit when tokens not valid; minimal overhead
5. **Compatibility**: Follow quarto-markdown's proven patterns

## Token Types

### New External Tokens

```c
enum TokenType {
  // Existing tokens
  PIPE_TABLE_START,
  CHUNK_OPTION_MARKER,
  CELL_BOUNDARY,
  CHUNK_OPTION_CONTINUATION,

  // New tokens for this change
  SUBSCRIPT_OPEN,      // Opening ~ delimiter for subscript
  SUBSCRIPT_CLOSE,     // Closing ~ delimiter for subscript
  SUPERSCRIPT_OPEN,    // Opening ^ delimiter for superscript
  SUPERSCRIPT_CLOSE,   // Closing ^ delimiter for superscript
};
```

### Grammar Declaration

```javascript
// grammar.js
externals: $ => [
  // ... existing externals
  $._subscript_open,
  $._subscript_close,
  $._superscript_open,
  $._superscript_close,
]
```

## Scanner State

### Extended State Structure

```c
typedef struct {
  // Existing state
  bool in_executable_cell;
  bool at_cell_start;
  uint32_t fence_length;

  // New state for subscript/superscript tracking
  uint8_t inside_subscript;     // 0=false, 1=true (track nesting level)
  uint8_t inside_superscript;   // 0=false, 1=true (track nesting level)
} Scanner;
```

### State Serialization

Must extend serialization to include new state fields:

```c
unsigned tree_sitter_quarto_external_scanner_serialize(void *payload, char *buffer) {
  Scanner *scanner = (Scanner *)payload;
  buffer[0] = scanner->in_executable_cell ? 1 : 0;
  buffer[1] = scanner->at_cell_start ? 1 : 0;
  buffer[2] = (char)(scanner->fence_length & 0xFF);
  buffer[3] = (char)((scanner->fence_length >> 8) & 0xFF);
  buffer[4] = scanner->inside_subscript;      // NEW
  buffer[5] = scanner->inside_superscript;    // NEW
  return 6;  // Increased from 4
}
```

## Parsing Logic

### Tilde (`~`) Parsing

**Function**: `scan_tilde(Scanner *s, TSLexer *lexer, const bool *valid_symbols)`

**Algorithm**:
1. Check if lexer->lookahead == '~'
2. Peek ahead one character
3. If next char is also '~', reject (let strikethrough rule handle it)
4. If inside_subscript > 0 and valid_symbols[SUBSCRIPT_CLOSE]:
   - Advance lexer
   - Decrement inside_subscript
   - Return SUBSCRIPT_CLOSE
5. If valid_symbols[SUBSCRIPT_OPEN]:
   - Check next character is not whitespace (Pandoc rule)
   - If valid:
     - Advance lexer
     - Increment inside_subscript
     - Return SUBSCRIPT_OPEN
6. Return false (treat as regular text)

**Key validation**:
- `valid_symbols` check ensures grammar context allows subscript
- Whitespace check prevents `~ not subscript~` false positives
- Strikethrough disambiguation happens first

### Caret (`^`) Parsing

**Function**: `scan_caret(Scanner *s, TSLexer *lexer, const bool *valid_symbols)`

**Algorithm**:
1. Check if lexer->lookahead == '^'
2. Peek ahead one character
3. If next char is '[', reject (let footnote reference handle it)
4. If inside_superscript > 0 and valid_symbols[SUPERSCRIPT_CLOSE]:
   - Advance lexer
   - Decrement inside_superscript
   - Return SUPERSCRIPT_CLOSE
5. If valid_symbols[SUPERSCRIPT_OPEN]:
   - Check next character is not whitespace (Pandoc rule)
   - If valid:
     - Advance lexer
     - Increment inside_superscript
     - Return SUPERSCRIPT_OPEN
6. Return false (treat as regular text)

**Key validation**:
- Footnote disambiguation (`^[` vs `^2^`)
- Whitespace check prevents `^ not superscript^` false positives

## Main Scanner Function

### Modified `tree_sitter_quarto_external_scanner_scan()`

```c
bool tree_sitter_quarto_external_scanner_scan(
  void *payload,
  TSLexer *lexer,
  const bool *valid_symbols
) {
  Scanner *scanner = (Scanner *)payload;

  // Try tilde (subscript/strikethrough)
  if (lexer->lookahead == '~') {
    if (scan_tilde(scanner, lexer, valid_symbols)) {
      return true;
    }
  }

  // Try caret (superscript/footnote)
  if (lexer->lookahead == '^') {
    if (scan_caret(scanner, lexer, valid_symbols)) {
      return true;
    }
  }

  // ... existing scanner logic for other tokens

  return false;
}
```

## Grammar Integration

### Updated Grammar Rules

**Before** (pure grammar):
```javascript
subscript: $ => seq(
  alias(token('~'), $.subscript_delimiter),
  alias(/[^\s~]+/, $.subscript_content),
  alias(token('~'), $.subscript_delimiter)
)
```

**After** (external scanner):
```javascript
subscript: $ => seq(
  alias($._subscript_open, $.subscript_delimiter),
  repeat($._inline_element),
  alias($._subscript_close, $.subscript_delimiter)
)
```

**Key changes**:
- Uses external tokens `$._subscript_open` / `$._subscript_close`
- Allows `repeat($._inline_element)` for more flexible content (following quarto-markdown)
- Scanner controls when delimiters match

### Inline Element Priority

No precedence changes needed; external scanner naturally prevents false matches through `valid_symbols` context.

## Error Handling

### Unclosed Delimiters

If opening delimiter matched but no closing delimiter found:
- Grammar naturally treats as ERROR node
- Scanner state resets on error recovery
- Subsequent text parsed normally

### Nested Conflicts

Scanner prevents problematic nesting:
- `inside_subscript` flag prevents nested subscripts
- Strikethrough (`~~`) takes precedence over subscript (`~`)
- Footnote references (`^[`) take precedence over superscript (`^`)

## Performance Considerations

### Optimization Strategies

1. **Early exit**: Check `valid_symbols` first; return false immediately if tokens not valid
2. **Minimal lookahead**: Only peek 1 character ahead for disambiguation
3. **Sparse invocation**: Scanner only called when encountering `~` or `^` (rare in most documents)
4. **State efficiency**: Use uint8_t for flags (1 byte each)

### Expected Performance

- Negligible overhead: Scanner adds <1% to parse time
- No complexity change: Still O(n) linear parsing
- Tested on benchmarks: Should restore throughput to >1000 bytes/ms

## Testing Strategy

### Unit Tests

Add to `test/corpus/inline-formatting.txt`:

```
==================
Subscript false positive prevention
==================

Text with tilde: (~100 lines) of content.

---

(document
  (paragraph
    (inline
      (text "Text with tilde: (~100 lines) of content."))))
```

### Integration Tests

- Parse all benchmark documents without ERROR nodes
- Validate quarto-web corpus achieves >90% success rate
- Verify edge cases (nested formatting, punctuation, etc.)

### Regression Tests

- Ensure all 167 existing tests still pass
- Verify H~2~O still produces subscript node
- Verify x^2^ still produces superscript node
- Verify ~~strikethrough~~ still works

## Migration Path

1. Extend scanner state and serialization
2. Add token type enum values
3. Implement scan_tilde() and scan_caret() functions
4. Update main scanner function to call new functions
5. Add external token declarations to grammar.js
6. Update subscript/superscript grammar rules
7. Run tests and fix any issues
8. Validate with CI benchmarks

## References

- **quarto-markdown scanner**: https://github.com/quarto-dev/quarto-markdown/blob/main/crates/tree-sitter-qmd/tree-sitter-markdown-inline/src/scanner.c
- **Tree-sitter external scanner docs**: https://tree-sitter.github.io/tree-sitter/creating-parsers#external-scanners
- **Pandoc subscript/superscript spec**: https://pandoc.org/MANUAL.html#superscripts-and-subscripts
