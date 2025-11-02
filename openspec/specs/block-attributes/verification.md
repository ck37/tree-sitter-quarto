# block-attributes Verification

**Status:** ✅ IMPLEMENTED
**Date:** 2025-10-21 (headings), 2025-11-02 (fenced code blocks)
**Implementation:** Pure grammar solution (no external scanner needed)

---

## Implementation Status

**IMPLEMENTED** - v0.1.0

## Implementation Approach

Block attributes implemented using pure grammar rules, inspired by quarto-dev/quarto-markdown (MIT License).

### Heading Attributes (2025-10-21)

1. **Text pattern modification** - Exclude `{` and `}` from text regex to create word boundaries
2. **Attribute pattern in headings** - Add `optional(seq("{", $.attribute_list, "}"))` with high precedence
3. **Fallback for inline braces** - Add `brace_text` pattern for non-attribute brace usage (e.g., `{python}`)
4. **Exclusions** - `brace_text` excludes `{.`, `{#`, and `{{` patterns to avoid conflicts

### Fenced Code Block Attributes (2025-11-02)

1. **Three-pattern choice** - Extended `fenced_code_block` rule with `choice()` for three patterns:
   - Pattern 1: `info_string` + optional attributes (`` ```python {.numberLines} ``)
   - Pattern 2: Attributes only (`` ```{.python} ``)
   - Pattern 3: Empty (backward compatibility for `` ```python ``)
2. **Attribute list reuse** - Uses existing `attribute_list` rule for consistency
3. **Language injection** - Added injection queries for 11 languages with attribute-based syntax
4. **Precedence handling** - Uses `prec(-1)` to ensure executable cells (`prec(1)`) are tried first

### Key Files Modified

- `grammar.js` - Added attribute support to `atx_heading`, `setext_heading`, and `fenced_code_block`
- `grammar.js` - Modified `text` rule to exclude `{}`
- `grammar.js` - Added `brace_text` fallback pattern
- `queries/injections.scm` - Added attribute-based language injection (lines 272-407)
- `test/corpus/heading-attributes.txt` - Heading attribute tests
- `test/corpus/basic-markdown.txt` - Fenced code block attribute tests (8 cases)

### Attribution

Approach inspired by quarto-dev/quarto-markdown (MIT License)
https://github.com/quarto-dev/quarto-markdown

Their implementation showed that excluding `{` from word patterns allows the grammar to naturally parse attributes without requiring an external scanner.

## Verification Results

All test scenarios pass:

### Heading Attributes
- [x] ATX heading with class: `## Title {.class}`
- [x] ATX heading with ID: `## Title {#id}`
- [x] ATX heading with multiple attributes: `## Title {#id .class key=value}`
- [x] Setext heading with class: `Title {.class}\n===`
- [x] Setext heading with ID and class
- [x] Plain heading without attributes (backward compatible)
- [x] Heading with inline formatting and attributes
- [x] Paragraph with braces not treated as attributes: `{python}`
- [x] No ERROR nodes for valid syntax
- [x] Attributes correctly parsed as structured `attribute_list`
- [x] Compatible with existing heading parsing
- [x] No conflicts with shortcodes `{{< >}}`

### Fenced Code Block Attributes
- [x] Code block with single class: `` ```{.bash} ``
- [x] Code block with multiple attributes: `` ```{.python .numberLines startFrom="10"} ``
- [x] Code block with info + attributes: `` ```python {.numberLines} ``
- [x] Code block with complex attributes: `` ```{.bash filename="Terminal"} ``
- [x] Code block with multiple classes: `` ```{.numberLines .python} ``
- [x] Code block with escaped quotes: `` ```{.bash filename="test\"file.sh"} ``
- [x] Code block with Unicode in values: `` ```{.python name="测试"} ``
- [x] Language injection works with attribute-based syntax
- [x] No ERROR nodes for valid attribute syntax
- [x] Backward compatible with non-attribute code blocks
- [x] Distinct from executable code cells (`` ```{python} ``)

## Test Results

```
heading-attributes:
  ✓ ATX heading with class attribute
  ✓ ATX heading with ID attribute
  ✓ ATX heading with multiple attributes
  ✓ Setext heading with class attribute
  ✓ Setext heading with ID and class
  ✓ Plain heading without attributes
  ✓ Heading with inline formatting and attributes
  ✓ Paragraph with braces (not attributes)

basic-markdown (fenced code block attributes):
  ✓ Fenced code block with single attribute class
  ✓ Fenced code block with multiple attributes
  ✓ Fenced code block with info and attributes
  ✓ Fenced code block with complex attributes
  ✓ Fenced code block with multiple classes (language second)
  ✓ Fenced code block with escaped quotes in value
  ✓ Fenced code block with Unicode in value
  ✓ Regular code block with language (backward compatibility)
```

All 16 tests passing (8 heading + 8 fenced code block). No regressions in existing test suite (213 total tests passing).

## Performance Impact

Minimal - pure grammar solution with no external scanner overhead.

## Related Specs

- **pandoc-links** - Reuses existing `attribute_list` grammar
- **enhanced-divs** - Same attribute syntax already working for divs
- **inline-attributes** - Consistent attribute handling across all elements
- **language-injection** - Attribute-based language specification for code blocks

---

**Implementation Dates:**
- Heading attributes: 2025-10-21 (Issue #10)
- Fenced code block attributes: 2025-11-02 (Issue #12)

**Resolved Issues:**
- #10: Heading attributes (https://github.com/ck37/tree-sitter-quarto/issues/10)
- #12: Fenced code block attributes (https://github.com/ck37/tree-sitter-quarto/issues/12)
