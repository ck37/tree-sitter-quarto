# Enhanced Divs Specification

**Capability:** Semantic parsing of Quarto-specific fenced div types (callouts, tabsets, conditional content) and generic fenced divs with custom classes

**Status:** Implemented (Unified Architecture)

**Created:** 2025-10-14
**Implemented:** 2025-10-17 (enhanced divs), 2025-11-02 (unified with generic divs)

## Purpose

Semantic parsing of ALL fenced div types including both Quarto-specific enhanced divs (callouts, tabsets, conditional content) and generic divs with custom classes. Quarto extends Pandoc's fenced div syntax (`::: {.class}`) with semantic meaning for specific class names.

**Architecture (2025-11-02):** Unified external scanner approach using `FENCED_DIV_OPEN` and `FENCED_DIV_CLOSE` tokens. All divs (enhanced and generic) parse through a single `fenced_div` rule with depth tracking for proper nesting support. This replaces the original specialized rules (callout_block, tabset_block, conditional_block) with a more flexible unified structure inspired by quarto-dev/quarto-markdown.

## Requirements

### Requirement: Callout Type Recognition

The parser SHALL recognize the five standard Quarto callout types and create semantic nodes that distinguish them from generic divs.

**Callout types:**
- `callout-note` - Informational callouts (default blue styling)
- `callout-warning` - Warning messages (default yellow/orange styling)
- `callout-important` - Important notices (default red styling)
- `callout-tip` - Helpful tips (default green styling)
- `callout-caution` - Cautionary messages (default orange styling)

#### Scenario: Note callout without title

```markdown
::: {.callout-note}
Note that there are five types of callouts.
:::
```

- **WHEN** a fenced div has class `.callout-note`
- **THEN** create a `(callout_block type: "note")` node
- **AND** parse content as normal markdown blocks

#### Scenario: Warning callout with title

```markdown
::: {.callout-warning}
## Warning Title
This is a warning message.
:::
```

- **WHEN** a fenced div has class `.callout-warning` and contains a heading
- **THEN** create `(callout_block type: "warning")` node
- **AND** first heading becomes `title:` field
- **AND** remaining content becomes `content:` field

#### Scenario: Important callout with custom title attribute

```markdown
::: {.callout-important title="Critical Issue"}
This requires immediate attention.
:::
```

- **WHEN** a callout has `title="..."` attribute
- **THEN** extract title from attribute as `title:` field
- **AND** parse all content as `content:` (no heading extraction)

### Requirement: Callout Appearance Attributes

The parser SHALL recognize and extract callout appearance attributes as structured data.

#### Scenario: Collapsible callout

```markdown
::: {.callout-tip collapse="true"}
## Expandable Tip
This tip is collapsed by default.
:::
```

- **WHEN** callout has `collapse="true"` or `collapse="false"` attribute
- **THEN** extract as `collapse:` field with boolean value
- **AND** parse title and content normally

#### Scenario: Callout with custom appearance

```markdown
::: {.callout-note appearance="simple"}
Simplified note styling.
:::
```

- **WHEN** callout has `appearance="..."` attribute
- **THEN** extract as `appearance:` field
- **AND** recognize values: "default", "simple", "minimal"

### Requirement: Callout with Icon Control

The parser SHALL recognize icon display attributes for callouts.

#### Scenario: Callout without icon

```markdown
::: {.callout-caution icon="false"}
Caution message without icon.
:::
```

- **WHEN** callout has `icon="false"` attribute
- **THEN** extract as `icon:` field with boolean value

## Tabsets

### Requirement: Panel Tabset Recognition

The parser SHALL recognize `.panel-tabset` divs and create semantic tabset nodes.

#### Scenario: Basic tabset

```markdown
::: {.panel-tabset}
## Python
Python code here

## R
R code here
:::
```

- **WHEN** a fenced div has class `.panel-tabset`
- **THEN** create `(tabset_block)` node
- **AND** each level-2 heading creates a `(tab)` node
- **AND** heading content becomes tab `title:`
- **AND** content between headings becomes tab `content:`

#### Scenario: Tabset with group attribute

```markdown
::: {.panel-tabset group="language"}
## Python
Python example

## R
R example
:::
```

- **WHEN** tabset has `group="..."` attribute
- **THEN** extract as `group:` field on tabset_block
- **AND** parse tabs normally

### Requirement: Tabset Styling Options

The parser SHALL recognize tabset styling class modifiers.

#### Scenario: Pills-style tabset

```markdown
::: {.panel-tabset .nav-pills}
## Tab 1
Content 1

## Tab 2
Content 2
:::
```

- **WHEN** tabset has additional class `.nav-pills` or `.nav-tabs`
- **THEN** extract as `style:` field
- **AND** recognize values: "pills", "tabs"

### Requirement: Nested Content in Tabs

The parser SHALL correctly parse markdown content within each tab, including code cells and other blocks.

#### Scenario: Tab with executable code cell

```markdown
::: {.panel-tabset}
## Python
```{python}
print("Hello")
```

## R
```{r}
print("Hello")
```
:::
```

- **WHEN** tab content includes executable code cells
- **THEN** parse cells as normal `(executable_code_cell)` nodes within tab content
- **AND** maintain language injection for code cells

## Conditional Content

### Requirement: Content Visibility Recognition

The parser SHALL recognize `.content-visible` and `.content-hidden` classes and extract format conditions.

#### Scenario: Content visible only for HTML

```markdown
::: {.content-visible when-format="html"}
This content only appears in HTML output.
:::
```

- **WHEN** a fenced div has class `.content-visible`
- **THEN** create `(conditional_block visibility: "visible")` node
- **AND** extract `when-format` attribute as `format:` field

#### Scenario: Content hidden for PDF

```markdown
::: {.content-hidden when-format="pdf"}
This content is hidden in PDF output.
:::
```

- **WHEN** a fenced div has class `.content-hidden`
- **THEN** create `(conditional_block visibility: "hidden")` node
- **AND** extract `when-format` attribute as `format:` field

### Requirement: Unless-Format Condition

The parser SHALL recognize and extract `unless-format` conditions.

#### Scenario: Content visible except for specific format

```markdown
::: {.content-visible unless-format="pdf"}
Visible everywhere except PDF.
:::
```

- **WHEN** conditional block has `unless-format` attribute
- **THEN** extract as `unless_format:` field
- **AND** parse content normally

### Requirement: Metadata-Based Conditions

The parser SHALL recognize `when-meta` and `unless-meta` conditional attributes.

#### Scenario: Content visible based on metadata

```markdown
::: {.content-visible when-meta="is_france"}
Content specific to French version.
:::
```

- **WHEN** conditional block has `when-meta="..."` attribute
- **THEN** extract as `when_meta:` field
- **AND** parse content normally

#### Scenario: Content hidden based on metadata

```markdown
::: {.content-hidden unless-meta="production"}
Development-only content.
:::
```

- **WHEN** conditional block has `unless-meta="..."` attribute
- **THEN** extract as `unless_meta:` field

### Requirement: Inline Conditional Spans

The parser SHALL recognize conditional inline spans using bracket syntax.

#### Scenario: Inline content visible for format

```markdown
This is [HTML-only content]{.content-visible when-format="html"}.
```

- **WHEN** a span has class `.content-visible` or `.content-hidden`
- **THEN** create `(conditional_span)` node with visibility and format fields
- **AND** parse span content as inline elements

## Generic Div Support

### Requirement: Generic Fenced Divs (✅ IMPLEMENTED 2025-11-02)

The parser SHALL parse ALL fenced divs including those with custom/arbitrary class names using unified external scanner architecture.

#### Scenario: Custom div class

```markdown
::: {.my-custom-class}
Custom content
:::
```

- **WHEN** a fenced div has any class attribute (specific or custom)
- **THEN** parse as `(fenced_div)` with opening delimiter, attributes, content, and closing delimiter
- **AND** support arbitrary nesting depth via scanner state tracking

#### Scenario: Multiple classes and attributes

```markdown
::: {#myid .class1 .class2 key="value"}
Content with multiple attributes
:::
```

- **WHEN** a fenced div has multiple classes, IDs, or attributes
- **THEN** parse complete attribute list in unified structure
- **AND** maintain all attribute information

## AST Structure

**Unified fenced div structure (2025-11-02):**
```
(fenced_div
  open: (fenced_div_delimiter)    # Opening ::: (captured by external scanner)
  attributes: (attribute_list)?   # Optional {.class #id key="value"}
  content: (_block)*              # Block-level content
  close: (fenced_div_delimiter))  # Closing ::: (captured by external scanner)
```

**Notes:**
- All div types (callouts, tabsets, conditional, generic) use the same unified `fenced_div` structure
- Scanner tracks nesting depth to properly match opening/closing delimiters
- Semantic distinction between div types happens at query/language-server level based on attribute classes
- Enhanced divs (callouts, tabsets, conditional) can be identified by class patterns: `.callout-*`, `.panel-tabset`, `.content-visible`, `.content-hidden`

**Legacy AST nodes (pre-2025-11-02, no longer generated):**
```
(callout_block ...)      # Replaced by fenced_div
(tabset_block ...)       # Replaced by fenced_div
(conditional_block ...)  # Replaced by fenced_div
```

## Implementation Notes

### Grammar Strategy (IMPLEMENTED 2025-11-02)

**Unified External Scanner Approach:**
- Single `fenced_div` rule handles ALL div types (enhanced + generic)
- External scanner provides `FENCED_DIV_OPEN` and `FENCED_DIV_CLOSE` tokens
- Scanner maintains `fenced_div_depth` state for proper nesting support
- Early colon check optimization for performance (`peek() == ':'`)
- Inspired by quarto-dev/quarto-markdown implementation

**Scanner Implementation:**
```c
// src/scanner.c
typedef struct {
  // ... other state fields
  uint8_t fenced_div_depth;  // Track nesting depth
} Scanner;

bool scan_fenced_div_marker(TSLexer *lexer, bool is_close) {
  // Unified logic for both opening and closing delimiters
  // Handles arbitrary fence lengths (:::, ::::, etc.)
  // Skips whitespace and attribute blocks for opening
}
```

**Grammar Rule:**
```javascript
// grammar.js
fenced_div: $ => prec(2, seq(
  alias($._fenced_div_open, $.fenced_div_delimiter),
  optional($.attribute_list),
  optional(/\r?\n/),
  field('content', repeat($._block)),
  alias($._fenced_div_close, $.fenced_div_delimiter),
  optional(/\r?\n/)
))
```

### Attribute Parsing

Attributes parsed via existing `attribute_list` rule. Semantic distinction happens downstream:
1. Parser creates uniform `fenced_div` nodes with `attribute_list`
2. Syntax highlighting queries match class patterns (`.callout-*`, `.panel-tabset`, etc.)
3. Language servers can provide enhanced semantics based on class names
4. Editor extensions apply appropriate styling and behavior

### Backward Compatibility

✅ **Fully backward compatible:**
- Enhanced divs continue to parse (now as `fenced_div` with semantic classes)
- Generic divs now work (previously broken, now fixed)
- All existing tests continue to pass with updated node expectations
- Query files updated to match new unified structure

## References

- **Quarto Callouts Documentation:** https://quarto.org/docs/authoring/callouts.html
- **Quarto Tabsets Documentation:** https://quarto.org/docs/interactive/layout.html
- **Quarto Conditional Content:** https://quarto.org/docs/authoring/conditional.html
- **Quarto Custom AST Nodes:** https://quarto.org/docs/prerelease/1.3/custom-ast-nodes/

## Open Questions

1. **Callout Icon Defaults:** Should the parser track default icon states per callout type, or leave that to renderer?
2. **Tab Level:** Should tabs only be level-2 headings, or allow configuration?
3. **Format Aliases:** Should parser expand format aliases (e.g., "html" includes "html4", "html5"), or leave to renderer?
4. **Nested Callouts:** How should nested callouts be represented in AST?
5. **Performance:** What's the performance impact of checking every div for semantic class names?

## Success Criteria

- ✅ All 5 callout types recognized with semantic nodes
- ✅ Callout titles extracted from headings or attributes
- ✅ Callout appearance attributes parsed (collapse, appearance, icon)
- ✅ Tabsets recognized with tab structure
- ✅ Tab groups and styles extracted
- ✅ Conditional blocks parsed with visibility and format conditions
- ✅ Conditional spans (inline) supported
- ✅ Generic divs still work for unrecognized classes
- ✅ Backward compatible with existing documents
- ✅ Test coverage for all callout types, tabset patterns, and conditional variations
