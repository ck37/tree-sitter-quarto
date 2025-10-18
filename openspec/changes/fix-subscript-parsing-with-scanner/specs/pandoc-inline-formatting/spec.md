# pandoc-inline-formatting Specification (Modified)

## MODIFIED Requirements

### Requirement: Subscript Formatting
The parser SHALL recognize subscript text delimited by single tildes (`~`), following Pandoc's subscript rules, using context-aware external scanner tokens.

#### Scenario: Chemical formula subscript
- **WHEN** parsing `H~2~O`
- **THEN** produce subscript node for `2`
- **AND** preserve surrounding text `H` and `O`

#### Scenario: Multi-character subscript
- **WHEN** parsing `C~6~H~12~O~6~`
- **THEN** produce three separate subscript nodes
- **AND** preserve text between subscripts

#### Scenario: Subscript with whitespace after opening tilde
- **WHEN** parsing `~ not subscript~`
- **THEN** treat tildes as plain text
- **AND** do not create subscript node

#### Scenario: Disambiguation from strikethrough
- **WHEN** parsing `~~strikethrough~~` vs `~subscript~`
- **THEN** double tildes create strikethrough
- **AND** single tildes create subscript
- **AND** no ambiguity in parsing

#### ADDED Scenario: False positive prevention in prose
- **WHEN** parsing `(~100 lines)` or `~5 minutes`
- **THEN** treat isolated tildes as plain text
- **AND** do NOT create subscript nodes
- **AND** do NOT create ERROR nodes
- **AND** parse subsequent text normally

#### ADDED Scenario: Context-aware delimiter matching
- **WHEN** encountering `~` character
- **THEN** scanner checks if subscript is valid in current grammar context
- **AND** only matches as SUBSCRIPT_OPEN when valid_symbols allows it
- **AND** tracks opening delimiter with scanner state
- **AND** only matches closing `~` as SUBSCRIPT_CLOSE when inside subscript

### Requirement: Superscript Formatting
The parser SHALL recognize superscript text delimited by carets (`^`), following Pandoc's superscript rules, using context-aware external scanner tokens.

#### Scenario: Mathematical superscript
- **WHEN** parsing `x^2^`
- **THEN** produce superscript node for `2`
- **AND** preserve surrounding text

#### Scenario: Multi-character superscript
- **WHEN** parsing `E=mc^2^`
- **THEN** produce superscript node for `2`
- **AND** preserve equation text

#### Scenario: Superscript with whitespace after opening caret
- **WHEN** parsing `^ not superscript^`
- **THEN** treat carets as plain text
- **AND** do not create superscript node

#### Scenario: Disambiguation from footnote reference
- **WHEN** parsing `[^1]` vs `x^2^`
- **THEN** brackets with caret create footnote reference
- **AND** standalone carets create superscript
- **AND** no ambiguity in parsing

#### ADDED Scenario: False positive prevention with punctuation
- **WHEN** parsing `^` in normal text or with punctuation
- **THEN** treat isolated carets as plain text
- **AND** do NOT create superscript nodes
- **AND** do NOT create ERROR nodes

#### ADDED Scenario: Context-aware caret matching
- **WHEN** encountering `^` character
- **THEN** scanner checks if superscript is valid in current grammar context
- **AND** only matches as SUPERSCRIPT_OPEN when valid_symbols allows it
- **AND** tracks opening delimiter with scanner state
- **AND** only matches closing `^` as SUPERSCRIPT_CLOSE when inside superscript

## ADDED Requirements

### Requirement: External Scanner Implementation
The parser SHALL use external scanner tokens for subscript and superscript delimiters to enable context-aware parsing.

#### Scenario: External token declarations
- **WHEN** defining subscript/superscript grammar rules
- **THEN** use external tokens `_subscript_open`, `_subscript_close`
- **AND** use external tokens `_superscript_open`, `_superscript_close`
- **AND** do NOT use pure grammar `token()` for delimiters

#### Scenario: Scanner state tracking
- **WHEN** parsing subscript/superscript
- **THEN** scanner maintains `inside_subscript` state flag
- **AND** scanner maintains `inside_superscript` state flag
- **AND** state persists across incremental parses
- **AND** state serialization includes subscript/superscript flags

#### Scenario: Valid symbols checking
- **WHEN** scanner encounters `~` or `^` character
- **THEN** check `valid_symbols[SUBSCRIPT_OPEN]` before matching
- **AND** check `valid_symbols[SUBSCRIPT_CLOSE]` before closing
- **AND** check `valid_symbols[SUPERSCRIPT_OPEN]` before matching
- **AND** check `valid_symbols[SUPERSCRIPT_CLOSE]` before closing
- **AND** return false if token not valid in current context

#### Scenario: Delimiter pairing
- **WHEN** matching opening delimiter
- **THEN** set scanner state flag (inside_subscript or inside_superscript)
- **AND** only match closing delimiter when state flag is set
- **AND** clear state flag when closing delimiter matched
- **AND** prevent nested subscript/superscript

### Requirement: Scanner Performance
The parser SHALL maintain efficient scanning performance for subscript/superscript tokens.

#### Scenario: Early exit optimization
- **WHEN** scanner called but tokens not valid
- **THEN** check valid_symbols first
- **AND** return false immediately without advancing lexer
- **AND** add minimal overhead (<1% of total parse time)

#### Scenario: Minimal lookahead
- **WHEN** validating delimiter match
- **THEN** look ahead at most 1 character
- **AND** check for whitespace after opening delimiter
- **AND** check for strikethrough (`~~`) or footnote (`^[`) patterns
- **AND** do NOT scan entire content for closing delimiter

#### Scenario: Sparse invocation
- **WHEN** parsing documents
- **THEN** scanner only invoked when encountering `~` or `^`
- **AND** most text bypasses scanner entirely
- **AND** maintain overall O(n) linear parsing complexity

### Requirement: Error Recovery
The parser SHALL handle unclosed or malformed subscript/superscript gracefully.

#### Scenario: Unclosed delimiter
- **WHEN** parsing `H~2O` (missing closing tilde)
- **THEN** grammar creates ERROR node or treats as plain text
- **AND** scanner state resets on error recovery
- **AND** subsequent content parses normally

#### Scenario: State consistency
- **WHEN** error recovery occurs
- **THEN** reset inside_subscript and inside_superscript flags
- **AND** ensure scanner state matches parse tree state
- **AND** prevent orphaned state flags

## MODIFIED Requirements

### Requirement: Error Handling (Modified)
The parser SHALL handle malformed inline formatting gracefully WITHOUT creating ERROR nodes for isolated delimiters.

#### Scenario: Unmatched delimiters
- **WHEN** parsing text with unclosed formatting delimiters
- **THEN** parser continues parsing
- **AND** unclosed delimiters treated as plain text (via scanner rejection)
- **AND** subsequent content parsed normally

#### MODIFIED Scenario: Nested delimiter conflicts
- **WHEN** parsing `~~text~with~nested~tildes~~`
- **THEN** outermost `~~` delimiters define strikethrough span
- **AND** inner `~` checked by scanner for subscript validity
- **AND** scanner prevents subscript inside strikethrough
- **AND** no parse errors generated

## Implementation Notes

### Grammar Rule Pattern

```javascript
subscript: $ => seq(
  alias($._subscript_open, $.subscript_delimiter),
  repeat($._inline_element),
  alias($._subscript_close, $.subscript_delimiter)
)

superscript: $ => seq(
  alias($._superscript_open, $.superscript_delimiter),
  repeat($._inline_element),
  alias($._superscript_close, $.superscript_delimiter)
)
```

### Scanner Function Signature

```c
// In src/scanner.c
bool scan_tilde(Scanner *s, TSLexer *lexer, const bool *valid_symbols);
bool scan_caret(Scanner *s, TSLexer *lexer, const bool *valid_symbols);
```

### Token Type Enum

```c
enum TokenType {
  // ... existing tokens
  SUBSCRIPT_OPEN,
  SUBSCRIPT_CLOSE,
  SUPERSCRIPT_OPEN,
  SUPERSCRIPT_CLOSE,
};
```

### Scanner State Fields

```c
typedef struct {
  // ... existing fields
  uint8_t inside_subscript;     // 0 or 1
  uint8_t inside_superscript;   // 0 or 1
} Scanner;
```

## Testing Requirements

All existing test scenarios from the original spec remain valid. Additional tests required:

1. False positive prevention: `(~100 lines)` parses without errors
2. Context validation: Isolated `~` in various grammatical contexts
3. State tracking: Multiple subscripts in sequence
4. Performance: Large documents with many `~` and `^` characters
5. Integration: Subscript/superscript combined with other inline formatting

## References

- **quarto-markdown implementation**: https://github.com/quarto-dev/quarto-markdown/tree/main/crates/tree-sitter-qmd/tree-sitter-markdown-inline
- **Pandoc subscript/superscript docs**: https://pandoc.org/MANUAL.html#superscripts-and-subscripts
- **Original issue**: CI failures in runs 18616789213 (10% success rate on corpus)
