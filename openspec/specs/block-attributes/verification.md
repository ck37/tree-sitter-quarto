# block-attributes Verification

**Status:** ⏸️ DEFERRED TO v0.2.0
**Date:** 2025-10-18
**Decision:** Requires external C++ scanner implementation

---

## Implementation Status

**NOT IMPLEMENTED** - Deferred to v0.2.0

## Reason for Deferral

Pandoc heading attribute syntax (`## Title {.class}` or `## Heading {#id}`) requires an external C/C++ scanner to resolve ambiguity between heading content and trailing attributes.

### Technical Challenges

Pure grammar solutions cannot resolve the ambiguity where:
- The text rule consumes trailing whitespace
- Preventing clean separation of content from attributes
- Precedence and token boundaries don't help

### Research Conducted

Comprehensive analysis documented in:
- `docs/block-attributes-research-conclusion.md`
- `docs/block-attributes-findings-2025-10-18.md`

Reference implementation reviewed: tree-sitter-markdown uses external C++ scanner for similar patterns.

## Workaround (v1.0)

Use fenced divs for styling blocks:

```markdown
::: {.class}
## Heading
:::
```

This provides equivalent functionality while external scanner is being developed.

## v0.2.0 Implementation Plan

1. **External Scanner Development**
   - Study tree-sitter-markdown's scanner approach
   - Implement `_atx_end` external token for trailing attributes
   - Handle whitespace consumption edge cases

2. **Grammar Updates**
   - Add `optional($.attribute_list)` to heading rules
   - Use scanner to validate attribute positions

3. **Test Coverage**
   - Heading with ID: `## Title {#id}`
   - Heading with class: `## Title {.class}`
   - Heading with multiple attributes: `## Title {#id .class key=value}`
   - Edge cases: trailing whitespace, nested formatting

## Verification Criteria (for v0.2.0)

When implemented, this spec will be verified against:

- [ ] All test scenarios in spec.md pass
- [ ] No ERROR nodes for valid attribute syntax
- [ ] Attributes correctly parsed as structured data
- [ ] Compatible with existing heading parsing
- [ ] Performance remains within targets

## Related Specs

- **pandoc-links** - Already implements attribute parsing for inline elements
- **enhanced-divs** - Uses attribute syntax for fenced divs

The attribute_list grammar is already proven to work; block-attributes just needs the scanner support to use it on headings.

---

**Next Review:** When v0.2.0 development begins
**Priority:** Medium (workaround available, not blocking v1.0)
