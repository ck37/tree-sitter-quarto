# pandoc-links Specification

## Purpose
Implements Pandoc's reference-style link syntax to complement standard Markdown inline links. Supports link reference definitions, explicit references (`[text][ref]`), collapsed references (`[text][]`), and shortcut references (`[text]`). This enables maintainable documentation with centralized URL management and improved readability.
## Requirements
### Requirement: Link Reference Definitions
The parser SHALL recognize link reference definitions in block context.

#### Scenario: Basic reference definition
- **WHEN** parsing `[1]: https://example.com`
- **THEN** produce link_reference_definition node
- **AND** extract label `1`
- **AND** extract destination URL

#### Scenario: Named reference definition
- **WHEN** parsing `[ref-name]: https://example.com "Title"`
- **THEN** produce link_reference_definition node
- **AND** extract label `ref-name`
- **AND** extract destination URL
- **AND** extract optional title

#### Scenario: Reference definition placement
- **WHEN** reference definitions appear anywhere in document
- **THEN** they are recognized as block-level constructs
- **AND** do not interfere with paragraph parsing

### Requirement: Inline Links
The parser SHALL recognize inline links with immediate URL.

#### Scenario: Basic inline link
- **WHEN** parsing `[link text](https://example.com)`
- **THEN** produce link node
- **AND** extract text content
- **AND** extract destination URL

#### Scenario: Inline link with formatted text
- **WHEN** parsing `[**bold** text](url)`
- **THEN** produce link node with nested formatting
- **AND** maintain proper AST structure

### Requirement: Explicit Reference Links
The parser SHALL recognize reference-style links with explicit labels.

#### Scenario: Numeric reference
- **WHEN** parsing `[text][1]` with matching `[1]: URL` definition
- **THEN** produce link node
- **AND** extract text content
- **AND** extract reference label `1`
- **AND** no ERROR nodes generated

#### Scenario: Named reference
- **WHEN** parsing `[link text][ref-name]` with matching definition
- **THEN** produce link node
- **AND** extract text content
- **AND** extract reference label `ref-name`
- **AND** no ERROR nodes generated

#### Scenario: Case-insensitive matching
- **WHEN** parsing `[Text][REF]` with `[ref]: URL` definition
- **THEN** reference label is extracted as-is
- **AND** actual matching is delegated to language server
- **AND** parser accepts any label format

### Requirement: Collapsed Reference Links
The parser SHALL recognize collapsed reference links where label matches text.

#### Scenario: Collapsed reference syntax
- **WHEN** parsing `[Example][]` with `[Example]: URL` definition
- **THEN** produce link node
- **AND** extract text content `Example`
- **AND** indicate collapsed reference (empty brackets)
- **AND** no ERROR nodes generated

#### Scenario: Collapsed reference with formatting
- **WHEN** parsing `[**formatted**][]` with definition
- **THEN** produce link node with nested formatting
- **AND** maintain proper AST structure
- **AND** no ERROR nodes generated

### Requirement: Shortcut Reference Links
The parser SHALL recognize shortcut reference links with single brackets.

#### Scenario: Shortcut reference syntax
- **WHEN** parsing `[Example]` with `[Example]: URL` definition
- **THEN** produce link node
- **AND** extract text content `Example`
- **AND** indicate shortcut reference (no second brackets)
- **AND** no ERROR nodes generated

#### Scenario: Disambiguation from other syntax
- **WHEN** parsing text with various bracket constructs
- **THEN** distinguish `[text]` (shortcut link) from `[^1]` (footnote ref)
- **AND** distinguish from `[text]{attrs}` (attributed span)
- **AND** use precedence rules to resolve ambiguity

### Requirement: Multiple References
The parser SHALL handle multiple reference links in same document.

#### Scenario: Multiple references in paragraph
- **WHEN** parsing paragraph with multiple reference links
- **THEN** each reference link is parsed separately
- **AND** all reference labels are extracted
- **AND** no interference between adjacent links

#### Scenario: Mix of link styles
- **WHEN** document contains inline links and reference links
- **THEN** all link types parse correctly
- **AND** no conflicts between different link syntaxes

### Requirement: Reference Link AST Structure
The parser SHALL produce consistent AST structure for all link types.

#### Scenario: Link node fields
- **WHEN** parsing any link type
- **THEN** link node contains `text` field
- **AND** contains either `destination` or `reference` field
- **AND** text field can contain nested inline elements

#### Scenario: Reference label extraction
- **WHEN** parsing reference-style link
- **THEN** reference label is aliased as `$.reference_label`
- **AND** label preserves original text including case
- **AND** label excludes brackets

