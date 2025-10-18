## ADDED Requirements

### Requirement: ATX Heading Attributes
The parser SHALL parse Pandoc attribute syntax on ATX headings.

#### Scenario: Heading with single ID attribute
- **GIVEN** document with `## Introduction {#intro}`
- **WHEN** the parser processes the heading
- **THEN** an `atx_heading` node MUST be created
- **AND** the attributes field MUST contain `attribute_list` node
- **AND** the attribute_list MUST contain `attribute_id` with value `intro`
- **AND** no ERROR nodes MUST be present

#### Scenario: Heading with class attribute
- **GIVEN** document with `# Title {.unnumbered}`
- **WHEN** the parser processes the heading
- **THEN** attributes field MUST contain `attribute_class` with value `unnumbered`
- **AND** no ERROR nodes MUST be present

#### Scenario: Heading with multiple attributes
- **GIVEN** document with `## Slide {#main auto-animate=true}`
- **WHEN** the parser processes the heading
- **THEN** attributes MUST contain `attribute_id`
- **AND** attributes MUST contain `key_value_attribute` for `auto-animate=true`
- **AND** no ERROR nodes MUST be present

#### Scenario: Heading with complex key-value attributes
- **GIVEN** document with `## Title {auto-animate-easing="ease-in-out"}`
- **WHEN** the parser processes the heading
- **THEN** key_value_attribute MUST capture key `auto-animate-easing`
- **AND** key_value_attribute MUST capture value `ease-in-out`
- **AND** quoted values MUST preserve content

#### Scenario: Heading without attributes
- **GIVEN** document with `## Plain Heading`
- **WHEN** the parser processes the heading
- **THEN** atx_heading node MUST be created
- **AND** attributes field MUST be absent/empty
- **AND** no ERROR nodes MUST be present
- **AND** backward compatibility is maintained

#### Scenario: Heading with inline formatting and attributes
- **GIVEN** document with `## **Bold** Title {#custom}`
- **WHEN** the parser processes the heading
- **THEN** content field MUST contain formatted inline nodes
- **AND** attributes field MUST be separate from content
- **AND** no ERROR nodes MUST be present

### Requirement: Fenced Code Block Attributes
The parser SHALL parse Pandoc attribute syntax on fenced code blocks.

#### Scenario: Code block with class attribute
- **GIVEN** code block `` ```{.python} ``
- **WHEN** the parser processes the block
- **THEN** fenced_code_block node MUST be created
- **AND** attributes field MUST contain `attribute_class` with value `python`
- **AND** no ERROR nodes MUST be present

#### Scenario: Code block with info string and attributes
- **GIVEN** code block `` ```python {.numberLines} ``
- **WHEN** the parser processes the block
- **THEN** info field MUST contain `python`
- **AND** attributes field MUST contain `attribute_class` with value `numberLines`
- **AND** both info and attributes MUST coexist

#### Scenario: Code block with filename attribute
- **GIVEN** code block `` ```{.bash filename="Terminal"} ``
- **WHEN** the parser processes the block
- **THEN** attributes MUST contain `attribute_class` for `bash`
- **AND** attributes MUST contain `key_value_attribute` with key `filename` and value `Terminal`
- **AND** no ERROR nodes MUST be present

#### Scenario: Raw block format syntax
- **GIVEN** code block `` ```{=html} ``
- **WHEN** the parser processes the block
- **THEN** fenced_code_block node MUST be created
- **AND** attributes MUST capture the format specifier
- **AND** no ERROR nodes MUST be present

#### Scenario: Code block without attributes
- **GIVEN** code block `` ```python ``
- **WHEN** the parser processes the block
- **THEN** fenced_code_block node MUST be created
- **AND** info field MUST contain `python`
- **AND** attributes field MUST be absent/empty
- **AND** backward compatibility is maintained

#### Scenario: Code block with multiple key-value attributes
- **GIVEN** code block `` ```python {.numberLines filename="test.py" eval=false} ``
- **WHEN** the parser processes the block
- **THEN** all three attributes MUST be captured correctly
- **AND** class, filename, and eval MUST be distinct attribute nodes

### Requirement: Attribute List Reuse
The parser SHALL reuse the existing `attribute_list` grammar for block element attributes.

#### Scenario: Consistent attribute syntax across elements
- **WHEN** parsing attributes on headings, code blocks, divs, and cells
- **THEN** all use the same `attribute_list` node type
- **AND** all support `#id`, `.class`, and `key="value"` syntax
- **AND** attribute parsing is consistent across all block elements

#### Scenario: Attribute order flexibility
- **GIVEN** attributes in various orders (ID first, class first, key-value first)
- **WHEN** parser processes any valid combination
- **THEN** all attributes are captured correctly
- **AND** order does not affect parsing success

### Requirement: Error Handling for Malformed Attributes
The parser SHALL handle malformed attribute syntax gracefully.

#### Scenario: Incomplete attribute braces
- **GIVEN** heading with `## Title {#id`
- **WHEN** the parser encounters unclosed brace
- **THEN** parser MUST insert ERROR node
- **AND** continue parsing rest of document

#### Scenario: Invalid attribute syntax
- **GIVEN** attributes with `{invalid syntax here}`
- **WHEN** parser cannot match attribute_list pattern
- **THEN** content MAY fall back to plain text
- **AND** document continues to parse

#### Scenario: Ambiguous brace usage in text
- **GIVEN** heading `## Use {python} for scripting` without valid attribute syntax
- **WHEN** parser attempts attribute matching
- **THEN** braces MUST be treated as literal text
- **AND** no ERROR nodes for non-attribute braces
