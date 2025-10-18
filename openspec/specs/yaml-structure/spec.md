# yaml-structure Specification

## Purpose
TBD - created by archiving change add-structured-yaml-support. Update Purpose after archive.
## Requirements
### Requirement: Parse simple scalar key-value pairs

The parser SHALL correctly parse simple YAML key-value pairs where the value is a scalar (string, number, boolean, or null).

#### Scenario: String value unquoted

- **GIVEN** YAML front matter with `title: My Document`
- **WHEN** the parser processes the front matter
- **THEN** a `yaml_pair` node MUST be created
- **AND** the key MUST be parsed as `yaml_key`
- **AND** the value MUST be parsed as `yaml_scalar`
- **AND** no ERROR nodes MUST be present

#### Scenario: String value quoted

- **GIVEN** YAML with `title: "Document with: special chars"`
- **WHEN** the parser processes the front matter
- **THEN** special characters inside quotes MUST NOT be treated as YAML syntax
- **AND** the entire quoted string MUST be one `yaml_scalar`

#### Scenario: Numeric values

- **GIVEN** YAML with `version: 1.2` and `count: 42`
- **WHEN** the parser processes the front matter
- **THEN** numbers MUST be parsed as `yaml_scalar`
- **AND** floating point numbers MUST be handled correctly

#### Scenario: Boolean and null values

- **GIVEN** YAML with `enabled: true`, `disabled: false`, `empty: null`
- **WHEN** the parser processes the front matter
- **THEN** boolean literals MUST be recognized as `yaml_scalar`
- **AND** null values MUST be parsed as `yaml_scalar`

### Requirement: Parse nested mappings

The parser SHALL correctly parse nested YAML mappings using indentation to indicate structure.

#### Scenario: One level of nesting

- **GIVEN** YAML with nested mapping:
  ```yaml
  format:
    html:
      toc: true
  ```
- **WHEN** the parser processes the front matter
- **THEN** three levels of nesting MUST be created
- **AND** indentation MUST correctly determine structure
- **AND** no ERROR nodes MUST be present

#### Scenario: Multiple nested objects

- **GIVEN** YAML with multiple siblings at same indent level
- **WHEN** the parser processes the front matter
- **THEN** each nested mapping MUST be distinct
- **AND** siblings MUST be at same structural level

#### Scenario: Deep nesting (4 levels)

- **GIVEN** YAML with 4 levels of nesting
- **WHEN** the parser processes the front matter
- **THEN** all four levels MUST be correctly parsed
- **AND** no confusion about indent levels MUST occur

### Requirement: Parse lists (sequences)

The parser SHALL correctly parse YAML lists (sequences) using `-` markers.

#### Scenario: Simple list of scalars

- **GIVEN** YAML with:
  ```yaml
  contents:
    - file1.yml
    - file2.yml
  ```
- **WHEN** the parser processes the front matter
- **THEN** a `yaml_list` node MUST be created
- **AND** list items MUST NOT be parsed as Markdown list or table cells
- **AND** no ERROR nodes MUST be present

#### Scenario: List at top level

- **GIVEN** YAML with list as direct value of top-level key
- **WHEN** the parser processes the front matter
- **THEN** list MUST be parsed as `yaml_list`
- **AND** each item MUST be `yaml_list_item`

#### Scenario: List of mappings

- **GIVEN** YAML with:
  ```yaml
  authors:
    - name: Alice
      role: author
    - name: Bob
      role: reviewer
  ```
- **WHEN** the parser processes the front matter
- **THEN** list items MUST contain nested mappings
- **AND** indentation MUST correctly distinguish structure

### Requirement: Parse multi-line string values

The parser SHALL correctly parse multi-line string values using `|` (literal) and `>` (folded) indicators.

#### Scenario: Literal block scalar

- **GIVEN** YAML with:
  ```yaml
  description: |
    Line 1
    Line 2
  ```
- **WHEN** the parser processes the front matter
- **THEN** multi-line value MUST be recognized
- **AND** each line MUST be captured
- **AND** indentation MUST be preserved

#### Scenario: Folded block scalar

- **GIVEN** YAML with folded scalar using `>`
- **WHEN** the parser processes the front matter
- **THEN** folded scalar MUST be recognized
- **AND** lines MUST be captured

#### Scenario: Multi-line with chomping indicator

- **GIVEN** YAML with `content: |-`
- **WHEN** the parser processes the front matter
- **THEN** chomping indicator MUST be recognized
- **AND** it MUST NOT affect parsing structure

### Requirement: Handle mixed structures

The parser SHALL correctly parse documents with combinations of scalars, mappings, lists, and multi-line values.

#### Scenario: Real-world Quarto front matter

- **GIVEN** YAML with mixed scalars, nested mappings, and lists
- **WHEN** the parser processes the front matter
- **THEN** all structures MUST parse correctly in combination
- **AND** no ERROR nodes MUST be present
- **AND** structure MUST match quarto-web validation cases

#### Scenario: List containing nested mappings with lists

- **GIVEN** YAML with list-in-mapping-in-list structure
- **WHEN** the parser processes the front matter
- **THEN** deep nesting MUST be handled correctly
- **AND** all structural levels MUST be preserved

### Requirement: Handle comments

The parser SHALL support inline and block comments in YAML front matter.

#### Scenario: Inline comments

- **GIVEN** YAML with `title: "Document"  # The document title`
- **WHEN** the parser processes the front matter
- **THEN** comments MUST be recognized
- **AND** comments MUST NOT interfere with value parsing

#### Scenario: Block comments

- **GIVEN** YAML with comment lines starting with `#`
- **WHEN** the parser processes the front matter
- **THEN** block comments MUST be recognized at any indent level
- **AND** comments MUST be interspersed with content

### Requirement: Graceful error recovery

The parser MUST fall back to unparsed content when YAML structure is invalid or unrecognized.

#### Scenario: Invalid indentation

- **GIVEN** YAML with incorrect indentation
- **WHEN** the parser encounters invalid structure
- **THEN** valid portion MUST be parsed
- **AND** invalid portion MUST fall back to unparsed content
- **AND** no parse failure MUST occur (document still loads)

#### Scenario: Unsupported YAML feature

- **GIVEN** YAML with anchors, aliases, or other unsupported features
- **WHEN** the parser encounters unsupported syntax
- **THEN** unsupported features MUST trigger fallback to unparsed content
- **AND** no ERROR nodes MUST be generated (graceful degradation)

### Requirement: Preserve front matter boundaries

The parser MUST correctly detect YAML front matter start and end delimiters.

#### Scenario: Standard delimiters

- **GIVEN** YAML between `---` delimiters
- **WHEN** the parser processes the document
- **THEN** both delimiters MUST be recognized
- **AND** content MUST only be parsed between delimiters

#### Scenario: YAML document end delimiter

- **GIVEN** YAML with `...` as closing delimiter
- **WHEN** the parser processes the document
- **THEN** `...` MUST be accepted as closing delimiter
- **AND** it MUST be equivalent to `---`

#### Scenario: No content between delimiters

- **GIVEN** empty YAML front matter (just `---` and `---`)
- **WHEN** the parser processes the document
- **THEN** empty front matter MUST be accepted
- **AND** no ERROR nodes MUST be present

### Requirement: Handle empty values

The parser MUST correctly handle empty or null values in YAML.

#### Scenario: Empty value

- **GIVEN** YAML with `key1: null`, `key2: ~`, `key3:`
- **WHEN** the parser processes the front matter
- **THEN** `null` and `~` MUST be recognized as null values
- **AND** key with no value MUST be parsed (empty value)

### Requirement: Performance requirements

The parser MUST maintain reasonable performance when parsing YAML front matter.

#### Scenario: Large YAML front matter

- **GIVEN** 200-line YAML document with deep nesting
- **WHEN** the parser processes the front matter
- **THEN** parse time MUST be <50ms (including file I/O)
- **AND** memory usage MUST be <5MB additional
- **AND** no quadratic performance degradation MUST occur

#### Scenario: Incremental re-parse after YAML edit

- **GIVEN** edit of single key-value pair in 100-line YAML
- **WHEN** incremental re-parse is triggered
- **THEN** re-parse time MUST be <5ms
- **AND** only affected portion MUST be re-parsed

