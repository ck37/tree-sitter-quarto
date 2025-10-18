# Design: Block Element Attributes

## Context

Pandoc Markdown allows attributes on many block elements using `{attributes}` syntax. The parser currently supports this for:
- ✅ Executable code cells: `` ```{python #fig-plot .class} ``
- ✅ Fenced divs: `::: {.callout-note}`
- ✅ Inline spans: `[text]{.class}`

But NOT for:
- ❌ Headings: `# Title {#intro}`
- ❌ Fenced code blocks: `` ```python {.numberLines} ``

This causes 67% of validation failures on real-world Quarto documents.

## Goals

1. Parse heading attributes without breaking existing headings
2. Parse code block attributes without breaking info strings
3. Reuse existing `attribute_list` grammar (already handles `#id`, `.class`, `key="value"`)
4. Maintain backward compatibility with attribute-free syntax

## Non-Goals

- Semantic validation of attribute names/values (language server responsibility)
- Support for setext heading attributes in this change (ATX headings only initially)
- Changing existing attribute_list grammar (just reuse it)

## Decisions

### Decision 1: ATX Heading Attribute Placement

**Chosen:** Attributes appear at end of heading line before newline
```markdown
## Heading Text {#id .class key="value"}
```

**Alternatives Considered:**
- After newline on next line - Not standard Pandoc syntax
- Before heading text - Conflicts with existing ATX syntax

**Rationale:** Matches Pandoc Markdown specification and real-world usage in quarto-web.

### Decision 2: Code Block Attribute Placement

**Chosen:** Attributes appear after info string on same line
```markdown
```python {.numberLines filename="test.py"}
code
```
```

**Alternatives Considered:**
- Before info string - Would break existing `` ```python `` parsing
- On separate line - Not Pandoc standard

**Rationale:**
- Pandoc places attributes after info string
- quarto-web uses `` ```{.lang key=value} `` pattern extensively
- Some docs use `` ```language {attributes} `` pattern

### Decision 3: Syntax Variations to Support

**Chosen:** Support both common patterns:
1. `` ```{.language attributes} `` - Class-based language specification
2. `` ```language {attributes} `` - Info string + attributes
3. `` ```{=format} `` - Raw block format (special case)

**Rationale:** Real-world quarto-web corpus uses all three patterns.

### Decision 4: Grammar Implementation Approach

**Chosen:** Make attributes optional with `optional(...)` wrapper

```javascript
atx_heading: $ => seq(
  field('marker', ...),
  optional(field('content', $.inline)),
  optional(seq(
    /[ \t]*/,
    '{',
    /[ \t]*/,
    field('attributes', $.attribute_list),
    /[ \t]*/,
    '}'
  )),
  /\r?\n/
),
```

**Rationale:**
- Ensures backward compatibility
- Mimics existing `fenced_div` pattern (proven to work)
- Allows headings without attributes to parse unchanged

### Decision 5: Info String vs Attributes

**Current `info_string` rule:**
```javascript
info_string: $ => /[^\r\n{]+/,
```

**Problem:** Stops at `{`, which is correct for `` ```python {attrs} ``

**Decision:** Keep info_string as-is, add optional attributes after it.

```javascript
fenced_code_block: $ => prec(-1, seq(
  field('open', ...),
  optional(field('info', $.info_string)),
  optional(seq(
    /[ \t]*/,
    '{',
    /[ \t]*/,
    field('attributes', $.attribute_list),
    /[ \t]*/,
    '}'
  )),
  /\r?\n/,
  ...
)),
```

**Rationale:** Natural split - info_string handles language, attributes handle metadata.

## Risks / Trade-offs

### Risk 1: Conflict with inline code/braces in headings

**Scenario:** `## Use {python} for scripting`

**Mitigation:**
- `attribute_list` requires valid syntax (`#id`, `.class`, or `key=value`)
- Plain `{python}` won't match `attribute_list` pattern
- Falls back to treating `{python}` as text

### Risk 2: Breaking existing heading parsing

**Mitigation:**
- Attributes are `optional(...)` - headings without attributes unchanged
- Comprehensive test suite will catch regressions
- CI must pass before merge

### Risk 3: Performance impact

**Mitigation:**
- Optional attributes add minimal backtracking
- Precedence levels prevent ambiguity
- Real-world validation will measure impact

## Migration Plan

### Phase 1: ATX Headings Only
1. Implement ATX heading attributes
2. Validate with heading-focused tests
3. Check quarto-web heading syntax coverage

### Phase 2: Fenced Code Blocks
1. Implement code block attributes
2. Validate with code-block-focused tests
3. Run full corpus validation

### Phase 3: Optional Enhancements
- Setext heading attributes (if needed based on validation)
- Additional attribute syntax variants (if found in corpus)

**Rollback:** Revert grammar.js changes and regenerate parser.

## Open Questions

1. **Should setext headings support attributes?**
   - Decision: Defer until we see real-world usage requiring it
   - ATX headings are more common in Quarto docs

2. **How to handle malformed attributes?**
   - Decision: Parser accepts any content in `{}`, language server validates
   - Reduces grammar complexity, matches Pandoc behavior

3. **Should raw blocks `{=format}` be a separate node type?**
   - Decision: Initially treat as code_block with special attribute
   - Can refine in v0.3.0 if semantic distinction needed

## Success Criteria

- ✅ 159/159 existing tests still pass
- ✅ New attribute tests pass (10+ scenarios)
- ✅ Validation success rate: 5% → 60%+ on quarto-web
- ✅ No performance regression (benchmark within 10%)
- ✅ CI green on all platforms
