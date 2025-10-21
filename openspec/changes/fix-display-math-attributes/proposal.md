# fix-display-math-attributes

## Why

Display math blocks (`$$...$$`) with Pandoc attributes cause ERROR nodes because the parser doesn't recognize the trailing `{#id}` syntax after the closing delimiter.

**Example that fails:**
```markdown
$$
y = \beta_0 + \beta_1 x + \epsilon
$$ {#eq-linear}
```

**Current parse result:** ERROR node wrapping the entire math block

**Impact:**
- 2 of 4 benchmark documents have display math attribute errors
- Common Quarto pattern for equation cross-references fails
- ERROR nodes break syntax highlighting for math blocks
- Affects quarto-web corpus documents that use equation labeling

**Root cause:** The `display_math` rule in `grammar.js:419-425` only expects a newline after closing `$$`:

```javascript
display_math: $ => seq(
  field("open", alias(token("$$"), $.math_delimiter)),
  optional(field("content", alias(/[^$]+/, $.math_content))),
  field("close", alias(token("$$"), $.math_delimiter)),
  /\r?\n/,  // ← Only expects newline, not attributes!
)
```

When `{#eq-linear}` appears after `$$`, the parser:
1. Fails to match the newline-only pattern
2. Creates ERROR node
3. Misparses `{#eq-linear}` as ATX heading (because it starts with `#`)

## What Changes

Add optional attribute support to `display_math` rule:

```javascript
display_math: $ => seq(
  field("open", alias(token("$$"), $.math_delimiter)),
  optional(field("content", alias(/[^$]+/, $.math_content))),
  field("close", alias(token("$$"), $.math_delimiter)),
  optional(seq(/[ \t]+/, field("attributes", $.attribute_list))),
  /\r?\n/,
)
```

**Affected specs:**
- `block-attributes` (MODIFIED) - Add display math attributes requirement

**Success criteria:**
- Display math with attributes parses without ERROR nodes
- Display math without attributes continues to work
- Equation cross-references (@eq-id) work correctly
- All existing tests pass

## Scope

**In scope:**
- Support `{#id}` attributes on display math blocks
- Support `{.class}` and `{key=value}` attributes on display math
- Reuse existing `attribute_list` rule from block-attributes
- Add tests for display math attributes

**Out of scope:**
- Inline math attributes (uses different syntax)
- Display math inside other blocks (lists, blockquotes)
- Multi-line display math content parsing (already works)
- Math content validation (LaTeX parsing is out of scope)

## Dependencies

**Depends on:** Existing `attribute_list` rule (already implemented in grammar for headings and code blocks)

**No blockers** - `attribute_list` is already defined and tested

## Risks

**Risk:** Attribute parsing could conflict with math content containing `}`  
**Mitigation:** Attributes come after closing `$$`, outside math content; no ambiguity

**Risk:** Breaking existing display math tests  
**Mitigation:** `optional()` wrapper ensures backward compatibility; existing tests without attributes continue to work

**Risk:** Performance regression on math-heavy documents  
**Mitigation:** Attribute parsing is optional and only triggers when `{` follows `$$`; minimal overhead

## Related Work

- Block attributes already implemented for headings (spec lines 9-61)
- Block attributes already implemented for code blocks (spec lines 63-95)  
- Just need to extend pattern to display math blocks
- Consistent with Pandoc's attribute syntax across block types
