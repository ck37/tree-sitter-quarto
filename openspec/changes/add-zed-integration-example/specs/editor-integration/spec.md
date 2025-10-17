# Editor Integration Specification

## ADDED Requirements

### Requirement: Zed Editor Integration Example
The project SHALL provide a working example of integrating tree-sitter-quarto into the Zed editor.

#### Scenario: Zed extension structure exists
- **WHEN** checking for editor examples
- **THEN** SHALL find examples/zed-extension/ directory
- **AND** directory SHALL contain valid Zed extension structure
- **AND** SHALL include extension.toml configuration
- **AND** SHALL reference tree-sitter-quarto grammar

#### Scenario: Extension uses correct queries
- **GIVEN** Zed extension example
- **WHEN** reviewing query files
- **THEN** SHALL use queries/zed/highlights.scm for highlighting
- **AND** SHALL use queries/injections.scm for language injection
- **AND** queries SHALL be properly linked or copied to extension

### Requirement: Syntax Highlighting Functionality
The Zed extension SHALL correctly highlight all Quarto markdown features.

#### Scenario: Basic Markdown highlighting
- **WHEN** opening .qmd file in Zed with extension
- **THEN** SHALL highlight headings with distinct color
- **AND** SHALL highlight bold/italic text
- **AND** SHALL highlight code spans
- **AND** SHALL highlight links and images
- **AND** SHALL highlight YAML front matter

#### Scenario: Quarto-specific highlighting
- **WHEN** viewing Quarto features in Zed
- **THEN** SHALL highlight executable code cells distinctly
- **AND** SHALL highlight chunk options (#| lines) with special color
- **AND** SHALL highlight cross-references (@fig-, @tbl-) distinctly
- **AND** SHALL highlight inline code cells
- **AND** SHALL highlight shortcodes
- **AND** SHALL highlight callouts, tabsets, conditional divs

#### Scenario: Inline formatting highlighting
- **WHEN** viewing Pandoc inline formatting in Zed
- **THEN** SHALL highlight strikethrough (~~text~~)
- **AND** SHALL highlight highlight marks (==text==)
- **AND** SHALL highlight subscript (H~2~O)
- **AND** SHALL highlight superscript (x^2^)

### Requirement: Language Injection
The Zed extension SHALL enable syntax highlighting for code within executable cells.

#### Scenario: Python code injection
- **GIVEN** executable cell with Python code
- **WHEN** viewing in Zed
- **THEN** Python code SHALL have Python syntax highlighting
- **AND** Python keywords SHALL be highlighted
- **AND** strings, numbers SHALL have appropriate colors

#### Scenario: Multi-language injection
- **GIVEN** document with Python, R, and Julia cells
- **WHEN** viewing in Zed
- **THEN** each cell SHALL have correct language highlighting
- **AND** languages SHALL not interfere with each other
- **AND** Markdown outside cells SHALL remain Quarto-highlighted

### Requirement: Performance
The Zed extension SHALL perform acceptably for typical Quarto documents.

#### Scenario: Large document performance
- **GIVEN** 1000-line .qmd file
- **WHEN** opening in Zed
- **THEN** syntax highlighting SHALL complete within 1 second
- **AND** SHALL not cause UI lag
- **AND** typing SHALL remain responsive

#### Scenario: Incremental highlighting
- **WHEN** editing Quarto document in Zed
- **THEN** highlighting SHALL update incrementally
- **AND** SHALL not re-highlight entire document on each keystroke
- **AND** editing SHALL feel smooth (no perceived lag)

### Requirement: Installation Documentation
The Zed integration SHALL be documented for users and developers.

#### Scenario: Installation guide exists
- **GIVEN** docs/zed-integration.md
- **WHEN** user wants to install Zed extension
- **THEN** SHALL find step-by-step installation instructions
- **AND** instructions SHALL be clear and complete
- **AND** SHALL include troubleshooting section

#### Scenario: Documentation includes examples
- **GIVEN** Zed integration documentation
- **WHEN** reviewing documentation
- **THEN** SHALL include screenshots of highlighted code
- **AND** SHALL show examples of all major features
- **AND** SHALL demonstrate language injection working

### Requirement: Integration as Template
The Zed example SHALL serve as a template for other editor integrations.

#### Scenario: Generalizable pattern
- **WHEN** developer wants to integrate with another editor
- **THEN** Zed example SHALL demonstrate key concepts:
  - Grammar loading
  - Query file usage
  - Language injection setup
  - Configuration options
- **AND** SHALL be documented in way that transfers to other editors

#### Scenario: README documents editor support
- **GIVEN** project README
- **WHEN** looking for editor support information
- **THEN** SHALL find "Editor Support" section
- **AND** SHALL list Zed as working example
- **AND** SHALL link to integration documentation
- **AND** SHALL note other editors can follow similar pattern
