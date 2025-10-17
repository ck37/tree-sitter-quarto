# syntax-highlighting Specification

## Purpose
TBD - created by archiving change use-zed-compatible-scopes. Update Purpose after archive.
## Requirements
### Requirement: Query File Structure
The parser SHALL provide syntax highlighting query files organized by editor compatibility.

#### Scenario: Default highlights use Zed-compatible scopes
- **WHEN** accessing `queries/highlights.scm`
- **THEN** file uses legacy scope names (@text.*, @emphasis.strong)
- **AND** scopes are compatible with Zed editor themes
- **AND** header documentation explains scope naming choice

#### Scenario: Neovim-specific highlights available
- **WHEN** accessing `queries/nvim/highlights.scm`
- **THEN** file uses modern nvim-treesitter scopes (@markup.*)
- **AND** scopes follow tree-sitter community conventions
- **AND** nvim-treesitter users can reference this file

#### Scenario: Query files cover all grammar nodes
- **WHEN** evaluating any query file
- **THEN** includes patterns for all Quarto-specific nodes
- **AND** includes patterns for Pandoc Markdown nodes
- **AND** provides consistent highlighting across editors

### Requirement: Zed Editor Compatibility
The parser SHALL support Zed editor syntax highlighting without extension overrides.

#### Scenario: Zed loads default highlights
- **WHEN** Zed editor loads grammar via repository reference
- **THEN** uses `queries/highlights.scm` automatically
- **AND** recognizes all legacy scope names
- **AND** displays proper syntax highlighting

#### Scenario: Zed highlights Quarto-specific features
- **WHEN** Zed highlights Quarto document
- **THEN** executable code cells are highlighted distinctly
- **AND** chunk options use property scope
- **AND** cross-references use appropriate scopes
- **AND** inline code cells are highlighted

#### Scenario: Zed highlights Pandoc features
- **WHEN** Zed highlights Pandoc Markdown features
- **THEN** headings use @text.title scope
- **AND** emphasis uses @text.emphasis scope
- **AND** strong emphasis uses @emphasis.strong scope
- **AND** code spans use @text.literal scope

### Requirement: Scope Name Documentation
The parser SHALL document scope naming decisions and mappings.

#### Scenario: Header comments explain scope choice
- **WHEN** reading `queries/highlights.scm` header
- **THEN** explains use of Zed-compatible legacy scopes
- **AND** documents reason for choice (Zed architectural limitation)
- **AND** references alternative file for nvim users

#### Scenario: Scope mapping documented
- **WHEN** reading query file documentation
- **THEN** provides legacy → modern scope mapping
- **AND** explains semantic meaning of each scope
- **AND** links to editor compatibility resources

### Requirement: Backward Compatibility
The parser SHALL preserve modern scopes for editors that support them.

#### Scenario: Modern scopes preserved for Neovim
- **WHEN** nvim-treesitter users configure custom query path
- **THEN** can use `queries/nvim/highlights.scm`
- **AND** receive modern @markup.* scopes
- **AND** maintain compatibility with nvim-treesitter conventions

#### Scenario: Legacy scopes widely supported
- **WHEN** any editor loads `queries/highlights.scm`
- **THEN** legacy scopes are recognized by Zed
- **AND** legacy scopes work in Helix
- **AND** legacy scopes work in older editors
- **AND** provide reasonable fallback for all editors

### Requirement: Semantic Consistency
The parser SHALL maintain semantic consistency across all query files.

#### Scenario: Same nodes highlighted consistently
- **WHEN** comparing `queries/highlights.scm` and `queries/nvim/highlights.scm`
- **THEN** same grammar nodes are targeted
- **AND** only scope names differ (legacy vs modern)
- **AND** semantic meaning is preserved

#### Scenario: All Quarto features covered
- **WHEN** evaluating query completeness
- **THEN** executable cells have highlighting rules
- **AND** chunk options have highlighting rules
- **AND** cross-references have highlighting rules
- **AND** inline code cells have highlighting rules
- **AND** all Pandoc features have highlighting rules

### Requirement: Editor-Agnostic Grammar
The parser SHALL maintain editor-agnostic grammar implementation.

#### Scenario: Grammar unchanged by scope choice
- **WHEN** changing query file scopes
- **THEN** grammar.js remains unchanged
- **AND** AST structure remains unchanged
- **AND** node types remain unchanged
- **AND** only query files affected

#### Scenario: Tests unaffected by scopes
- **WHEN** running grammar test suite
- **THEN** all tests pass regardless of scope names
- **AND** AST expectations unchanged
- **AND** node structure validated correctly

