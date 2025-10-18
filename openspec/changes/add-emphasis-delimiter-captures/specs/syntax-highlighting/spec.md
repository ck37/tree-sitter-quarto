# syntax-highlighting Specification Delta

## ADDED Requirements

### Requirement: Emphasis Delimiter Highlighting
The parser SHALL provide separate highlighting captures for emphasis and strong emphasis delimiter markers.

#### Scenario: Emphasis delimiters captured separately
- **WHEN** highlighting emphasis text (e.g., `*italic*` or `_italic_`)
- **THEN** `emphasis_delimiter` nodes receive `@punctuation.delimiter` scope
- **AND** parent `emphasis` node still receives `@text.emphasis` scope
- **AND** themes can optionally style delimiters differently from content
- **AND** applies to both `queries/highlights.scm` and `queries/nvim/highlights.scm`

#### Scenario: Strong emphasis delimiters captured separately
- **WHEN** highlighting strong emphasis text (e.g., `**bold**` or `__bold__`)
- **THEN** `strong_emphasis_delimiter` nodes receive `@punctuation.delimiter` scope
- **AND** parent `strong_emphasis` node still receives `@emphasis.strong` scope
- **AND** themes can optionally style delimiters differently from content
- **AND** applies to both `queries/highlights.scm` and `queries/nvim/highlights.scm`

#### Scenario: Delimiter captures are additive
- **WHEN** adding delimiter captures to query files
- **THEN** existing parent node captures remain unchanged
- **AND** no existing scopes are removed
- **AND** themes ignoring delimiter scopes get same behavior as before
- **AND** backward compatibility is maintained

#### Scenario: Consistent with other delimiters
- **WHEN** comparing delimiter capture patterns
- **THEN** emphasis delimiters use same pattern as code_span_delimiter
- **AND** emphasis delimiters use same pattern as math_delimiter
- **AND** emphasis delimiters use same pattern as fenced_div_delimiter
- **AND** maintains consistency across query file

#### Scenario: Zed editor renders delimiter styling
- **WHEN** viewing emphasized text in Zed editor
- **THEN** delimiter markers (`*`, `**`, `_`, `__`) render in punctuation color
- **AND** content text renders in emphasis/strong color
- **AND** provides visual separation between markers and content
- **AND** improves markdown readability
