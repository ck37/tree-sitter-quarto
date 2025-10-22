# fix-table-cell-parsing

**Status:** PROPOSED
**Created:** 2025-10-22
**Issue:** https://github.com/ck37/tree-sitter-quarto/issues/11

## Summary

Expose individual table cells as AST nodes in `pipe_table_row` to enable cell-level syntax highlighting, inline formatting support, and consistent query capabilities across header and data rows.

## Motivation

### Current Problem

Table data rows (`pipe_table_row`) do not expose individual cells as AST nodes, while header rows (`pipe_table_header`) do. This creates several issues:

1. **No cell-level highlighting** - Syntax highlighters cannot style individual cells in data rows
2. **No inline formatting** - Bold, italic, code spans within cells cannot be parsed or highlighted
3. **Inconsistent structure** - Headers have accessible cells, data rows don't
4. **Query limitations** - Cannot write tree-sitter queries to analyze specific columns or cell content
5. **Editor rendering issues** - Zed extension shows cells appearing "cut off" due to missing AST nodes

### Evidence

**Current grammar.js:592-596** wraps the entire row in `token()`:
```javascript
pipe_table_row: ($) =>
  prec.dynamic(1, token(seq("|", repeat1(seq(/[^|\r\n]+/, "|")), /\r?\n/))),
```

This produces AST like:
```
(pipe_table_row)  # ❌ No cell children
```

**Contrast with pipe_table_header:574-581** which exposes cells:
```javascript
pipe_table_header: ($) =>
  seq(
    token("|"),
    repeat1(
      seq(field("content", alias(/[^|\r\n]+/, $.table_cell)), token("|")),
    ),
    /\r?\n/,
  ),
```

This produces AST like:
```
(pipe_table_header
  content: (table_cell)  # ✅ Individual cells exposed
  content: (table_cell))
```

### Research Findings

1. **Tree-sitter-pandoc-markdown** - Test corpus shows that the sibling project DOES expose individual cells in both header and data rows
2. **Tree-sitter-markdown (ikatyang)** - Uses structured cell parsing with inline node support: `_tbl_dat_cel: $ => repeat1($._inl_nod)`
3. **GitHub Issue #11** - Reported by user discovering this limitation while implementing Zed extension syntax highlighting

## Why Now

This issue blocks proper table support in editor integrations (particularly Zed) and creates an inconsistency in the grammar that will be harder to fix once more users depend on the current structure.

## Goals

1. Expose individual `table_cell` nodes in `pipe_table_row` AST
2. Match the structure of `pipe_table_header` for consistency
3. Enable cell-level tree-sitter queries
4. Support inline formatting within table cells
5. Maintain backward compatibility with existing table recognition

## Non-Goals

- Parsing inline markdown within cells (that can come later via language injection)
- Changing table delimiter or header row parsing
- Supporting complex table formats beyond pipe tables
- Optimizing table parsing performance

## What Changes

### Grammar Modification

**Change `pipe_table_row` rule** in grammar.js (line 592-596):

**Before:**
```javascript
pipe_table_row: ($) =>
  prec.dynamic(1, token(seq("|", repeat1(seq(/[^|\r\n]+/, "|")), /\r?\n/))),
```

**After:**
```javascript
pipe_table_row: ($) =>
  prec.dynamic(
    1,
    seq(
      token("|"),
      repeat1(
        seq(field("content", alias(/[^|\r\n]+/, $.table_cell)), token("|")),
      ),
      /\r?\n/,
    ),
  ),
```

### Key Technical Changes

1. **Remove outer `token()` wrapper** - Allows individual cells to be parsed as separate nodes
2. **Keep `token()` on delimiters** - Maintains table structure recognition (prevents paragraph ambiguity)
3. **Add `field("content", ...)` for cells** - Enables field-based queries
4. **Use `$.table_cell` alias** - Consistent with header row naming convention
5. **Maintain `prec.dynamic(1)`** - Preserves precedence for table vs paragraph disambiguation

### AST Impact

**Before:**
```
(pipe_table_row)  # Single token, no children
```

**After:**
```
(pipe_table_row
  content: (table_cell)  # Individual cells accessible
  content: (table_cell)
  content: (table_cell))
```

## Impact

### Affected Specifications

**MODIFIED:**
- `grammar-foundation` - Update "Parse Tree Structure" requirement to ensure table cells are exposed
- Add new requirement for "Table Cell Accessibility"

### Affected Code

**Primary:**
- `grammar.js` - Modify `pipe_table_row` rule (line 592-596)

**Secondary (may need updates):**
- `queries/highlights.scm` - Potentially add cell-level highlighting captures
- `queries/tags.scm` - Potentially add cell-level navigation tags
- Generated parser files (auto-regenerated via `tree-sitter generate`)

### Affected Tests

**Existing tests** in `test/corpus/*.txt` should continue to pass (table structure unchanged, just more granular AST)

**New test cases needed:**
- Table cells with bold content: `| **bold** |`
- Table cells with code spans: `` | `code` | ``
- Table cells with multiple inline elements: `| **bold** and `code` |`
- Empty cells: `| |`
- Cells with escaped pipes: `| foo\|bar |`

## Risks

### Risk 1: Paragraph Ambiguity

**Description:** The original `token()` wrapper was added to prevent rows from being parsed as paragraphs.

**Likelihood:** Low

**Mitigation:**
- The `prec.dynamic(1)` precedence is maintained
- The `token("|")` delimiters still anchor table structure
- The external scanner's `pipe_table_start` validates table context before parsing rows
- Tree-sitter-pandoc-markdown successfully uses this pattern

**Fallback:** If issues arise, can add additional precedence or scanner-based validation

### Risk 2: Performance Impact

**Description:** More granular parsing could slow down table parsing.

**Likelihood:** Very Low

**Mitigation:**
- Pattern matches existing `pipe_table_header` implementation which has no known performance issues
- Table cells use simple regex patterns, not complex grammar rules
- Can measure with `npm run build:monitor` if concerned

**Fallback:** Optimize regex patterns or add caching if needed

### Risk 3: Breaking Changes for Downstream Users

**Description:** Current AST structure changes, potentially breaking existing queries.

**Likelihood:** Low (project is new, limited downstream usage)

**Mitigation:**
- Document change in CHANGELOG
- Version bump to indicate breaking change
- Provide migration guide for query updates

**Fallback:** None needed - this is a necessary fix

## Dependencies

None - this is a self-contained grammar change.

## Testing Strategy

1. **Run existing test suite** - `npx tree-sitter test` to ensure no regressions
2. **Parse issue #11 example** - Verify AST structure includes individual cells
3. **Test inline formatting** - Parse tables with bold, italic, code spans in cells
4. **Test edge cases** - Empty cells, escaped pipes, long content
5. **Visual verification** - Test in Zed extension to confirm highlighting works
6. **Performance check** - Ensure table parsing remains fast

## Success Criteria

1. ✅ `pipe_table_row` AST includes individual `table_cell` nodes
2. ✅ Cell structure matches `pipe_table_header` structure
3. ✅ All existing tests pass
4. ✅ Issue #11 example parses correctly with exposed cells
5. ✅ Zed extension can highlight individual cells
6. ✅ No performance regression in table parsing

## Timeline

**Estimated effort:** 2-4 hours

1. Update grammar.js (15 minutes)
2. Regenerate parser (5 minutes)
3. Run tests and fix issues (30-60 minutes)
4. Add new test cases (30 minutes)
5. Test in Zed extension (30 minutes)
6. Update queries if needed (30 minutes)
7. Documentation and cleanup (30 minutes)

## Related Work

- **Issue #11:** https://github.com/ck37/tree-sitter-quarto/issues/11
- **Zed Extension Analysis:** https://github.com/ck37/zed-quarto-extension/blob/main/docs/table-parsing-limitation.md
- **Tree-sitter-pandoc-markdown:** Sibling project that successfully exposes table cells
- **Tree-sitter-markdown (ikatyang):** Reference implementation with inline cell content

## Open Questions

None - solution is well-understood and validated by research.
