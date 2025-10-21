# block-attributes Specification (Modified)

## ADDED Requirements

### Requirement: Display Math Block Attributes

The parser SHALL parse Pandoc attribute syntax on display math blocks for equation labeling and cross-referencing.

#### Scenario: Display math with ID attribute

- **GIVEN** document with:
  ```markdown
  $$
  y = \beta_0 + \beta_1 x + \epsilon
  $$ {#eq-linear}
  ```
- **WHEN** the parser processes the math block
- **THEN** a `display_math` node MUST be created
- **AND** the attributes field MUST contain `attribute_list` node
- **AND** the attribute_list MUST contain `attribute_id` with value `eq-linear`
- **AND** no ERROR nodes MUST be present

#### Scenario: Display math with multiple attributes

- **GIVEN** document with:
  ```markdown
  $$
  E = mc^2
  $$ {#eq-einstein .important}
  ```
- **WHEN** the parser processes the math block
- **THEN** attributes MUST contain `attribute_id` with value `eq-einstein`
- **AND** attributes MUST contain `attribute_class` with value `important`
- **AND** no ERROR nodes MUST be present

#### Scenario: Display math with key-value attributes

- **GIVEN** document with:
  ```markdown
  $$
  \sum_{i=1}^{n} x_i
  $$ {#eq-sum tag="1.2"}
  ```
- **WHEN** the parser processes the math block
- **THEN** attributes MUST contain `attribute_id`
- **AND** attributes MUST contain `key_value_attribute` with key `tag` and value `1.2`
- **AND** quoted values MUST be preserved

#### Scenario: Display math without attributes

- **GIVEN** document with:
  ```markdown
  $$
  x^2 + y^2 = z^2
  $$
  ```
- **WHEN** the parser processes the math block
- **THEN** display_math node MUST be created
- **AND** attributes field MUST be absent/empty
- **AND** no ERROR nodes MUST be present
- **AND** backward compatibility is maintained

#### Scenario: Inline display math with attributes

- **GIVEN** single-line display math: `$$ E = mc^2 $$ {#eq-energy}`
- **WHEN** the parser processes the block
- **THEN** both single-line and multi-line forms MUST support attributes
- **AND** attributes MUST be recognized after closing `$$`

#### Scenario: Cross-reference to equation

- **GIVEN** display math with `{#eq-example}` and paragraph with `See @eq-example`
- **WHEN** the parser processes the document
- **THEN** math block MUST have ID attribute `eq-example`
- **AND** cross-reference MUST link to `@eq-example`
- **AND** reference type MUST be `eq` (equation)

## Implementation Notes

### Grammar Pattern

The `display_math` rule must support optional trailing attributes:

```javascript
display_math: $ => seq(
  field("open", alias(token("$$"), $.math_delimiter)),
  optional(field("content", alias(/[^$]+/, $.math_content))),
  field("close", alias(token("$$"), $.math_delimiter)),
  optional(seq(/[ \t]+/, field("attributes", $.attribute_list))),
  /\r?\n/,
)
```

### Attribute Reuse

Display math attributes use the same `attribute_list` rule as:
- ATX headings: `## Title {#id}`
- Setext headings: (attributes on following line)
- Fenced code blocks: ` ```python {.class} `

This ensures consistency across Pandoc attribute syntax.

### Parse Tree Structure

Expected parse tree for display math with attributes:

```
(display_math
  open: (math_delimiter)
  content: (math_content)
  close: (math_delimiter)
  attributes: (attribute_list
    (attribute_id)))
```

### Cross-Reference Integration

Equations with ID attributes enable cross-references:
- Math block: `$$ ... $$ {#eq-linear}`
- Reference: `As shown in @eq-linear`
- Reference type is parsed as `eq` (equation)

### Validation

The fix is validated when:
1. All existing math tests pass
2. Benchmark documents parse display math without ERROR nodes
3. Cross-references to equations work correctly
4. Performance remains stable
