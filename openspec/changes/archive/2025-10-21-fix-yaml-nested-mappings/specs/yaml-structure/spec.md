# yaml-structure Specification (Modified)

## MODIFIED Requirements

### Requirement: Parse nested mappings

The parser SHALL correctly parse nested YAML mappings using indentation to indicate structure, allowing mapping values to themselves be mappings.

#### Scenario: One level of nesting

- **GIVEN** YAML with nested mapping:
  ```yaml
  format:
    html:
      toc: true
  ```
- **WHEN** the parser processes the front matter
- **THEN** `format` key MUST have a `yaml_mapping` as its value
- **AND** that mapping MUST contain `html` key
- **AND** `html` key MUST have a `yaml_mapping` as its value
- **AND** `toc` MUST be parsed as scalar value `true`
- **AND** no ERROR nodes MUST be present

#### MODIFIED Scenario: Multiple nested objects

- **GIVEN** YAML with multiple siblings at same indent level:
  ```yaml
  format:
    html:
      toc: true
    pdf:
      documentclass: article
  ```
- **WHEN** the parser processes the front matter
- **THEN** `format` value MUST be a `yaml_mapping`
- **AND** that mapping MUST contain both `html` and `pdf` keys as siblings
- **AND** each nested mapping MUST be distinct
- **AND** siblings MUST be at same structural level
- **AND** no ERROR nodes MUST be present

#### MODIFIED Scenario: Deep nesting (4 levels)

- **GIVEN** YAML with 4 levels of nesting:
  ```yaml
  format:
    html:
      theme:
        light: flatly
  ```
- **WHEN** the parser processes the front matter
- **THEN** all four levels MUST be correctly parsed as nested `yaml_mapping` nodes
- **AND** each level MUST have proper parent-child relationship
- **AND** no confusion about indent levels MUST occur
- **AND** no ERROR nodes MUST be present

#### ADDED Scenario: Mixed scalar and nested values

- **GIVEN** YAML with both scalar and nested mapping values:
  ```yaml
  title: "My Document"
  format:
    html:
      toc: true
  author: "Jane Doe"
  ```
- **WHEN** the parser processes the front matter
- **THEN** `title` and `author` MUST have scalar values
- **AND** `format` MUST have nested mapping value
- **AND** all three top-level keys MUST be parsed correctly
- **AND** no ERROR nodes MUST be present

#### ADDED Scenario: Empty nested mapping

- **GIVEN** YAML with empty nested mapping:
  ```yaml
  format:
    html:
  ```
- **WHEN** the parser processes the front matter
- **THEN** `html` key MUST be recognized
- **AND** empty value MUST be accepted
- **AND** no ERROR nodes MUST be present

## Implementation Notes

### Grammar Pattern

The `yaml_pair` rule must support three value types:

```javascript
yaml_pair: $ => seq(
  field("key", $.yaml_key),
  ":",
  choice(
    // Inline scalar value: key: value
    seq(/[ \t]+/, field("value", $.yaml_scalar), /\r?\n/),
    // Nested mapping: key:\n  nested_key: value
    seq(/\r?\n/, field("value", $.yaml_mapping)),
    // Empty value: key:\n
    /\r?\n/,
  ),
)
```

### Indentation Handling

Tree-sitter automatically handles indentation-based nesting:
- When a key is followed by `:\n`, the parser looks for indented content
- `yaml_mapping` captures all indented `yaml_pair` nodes at the same level
- Reduced indentation signals return to parent level

### Parse Tree Structure

Expected parse tree for nested YAML:

```
(yaml_front_matter
  (yaml_mapping
    (yaml_pair
      key: (yaml_key)
      value: (yaml_mapping
        (yaml_pair
          key: (yaml_key)
          value: (yaml_scalar))))))
```

### Validation

The fix is validated when:
1. All existing YAML tests pass (202/202)
2. Benchmark documents parse without YAML ERROR nodes
3. Real-world quarto-web corpus examples parse correctly
4. Performance remains stable (<10% regression)
