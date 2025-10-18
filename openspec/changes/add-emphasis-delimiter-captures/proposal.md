# Proposal: Add Emphasis Delimiter Captures

## Summary

Add `emphasis_delimiter` and `strong_emphasis_delimiter` captures to syntax highlighting query files, enabling themes to style markdown emphasis markers (`*`, `**`, `_`, `__`) separately from their content.

## Problem

Currently, `queries/highlights.scm` captures emphasis and strong_emphasis parent nodes, which applies a single scope to the entire construct including delimiters and content:

```scm
(emphasis) @text.emphasis
(strong_emphasis) @emphasis.strong
```

This means `*italic*` is styled as a single unit - the asterisks inherit the same italic/blue styling as the content. Many modern markdown editors dim or de-emphasize the syntax markers to make the content stand out more, but our current approach doesn't enable this.

The grammar already exposes `emphasis_delimiter` and `strong_emphasis_delimiter` nodes in the parse tree, but we're not capturing them in our query files.

## Rationale

### Consistency with Existing Pattern

The codebase already captures delimiters for 8+ other constructs:
- `code_span_delimiter` → `@punctuation.delimiter`
- `code_fence_delimiter` → `@punctuation.delimiter`
- `math_delimiter` → `@punctuation.delimiter`
- `fenced_div_delimiter` → `@punctuation.delimiter`
- `inline_cell_delimiter` → `@punctuation.bracket`
- `yaml_front_matter_delimiter` → `@punctuation.delimiter`
- `raw_block_delimiter` → `@punctuation.delimiter`
- Pipe table `"|"` → `@punctuation.delimiter`

Not capturing emphasis delimiters is an inconsistency.

### Editor Support Verified

Zed's One Dark theme (primary target editor) supports the `@punctuation.delimiter` scope:
- **Delimiter color**: `#b2b9c6ff` (light gray)
- **Emphasis content**: `#74ade8ff` (blue)
- **Strong content**: `#bf956aff` (orange/gold)

This creates a visual separation where:
- `*italic*` → `*` is light gray, `italic` is blue
- `**bold**` → `**` is light gray, `bold` is orange

This is a common UX pattern in modern markdown editors (VSCode, Typora, Obsidian, etc.) that dims markers to emphasize content.

### Purely Additive Change

This change:
- ✅ Adds new captures without removing existing parent captures
- ✅ Doesn't break existing functionality
- ✅ Gives theme authors the *option* to style delimiters differently
- ✅ Themes can ignore delimiter scopes if they want uniform styling
- ✅ No grammar changes, no AST changes, no breaking changes

### Low Risk, Immediate Value

- **Risk**: Minimal - purely additive query changes
- **Value**: Enables better visual hierarchy in markdown rendering
- **Effort**: ~10 lines of code across 2 query files
- **Testing**: Existing tests continue to pass (AST unchanged)

## Scope

### In Scope

1. Add `emphasis_delimiter` and `strong_emphasis_delimiter` captures to `queries/highlights.scm`
2. Add same captures to `queries/nvim/highlights.scm` for consistency
3. Update `syntax-highlighting` spec with new requirement
4. Verify Zed editor properly renders delimiter styling

### Out of Scope

- Other delimiter types (already implemented)
- Theme customization (theme authors' responsibility)
- Grammar changes (delimiters already exist in AST)
- Support for other inline formatting delimiters (strikethrough, highlight, etc.) - can be added in future if needed

## Alternative Considered

**Alternative**: Don't add delimiter captures, keep current parent-only approach

**Rejected because**:
- Inconsistent with existing delimiter capture pattern
- Limits theme flexibility
- Common UX pattern in markdown editors
- No benefit to NOT adding them (purely additive)

## Success Criteria

1. ✅ `emphasis_delimiter` and `strong_emphasis_delimiter` captured in both query files
2. ✅ All existing tests pass (no regressions)
3. ✅ Manually verified in Zed: markers render in light gray, content in blue/orange
4. ✅ OpenSpec validation passes
5. ✅ `syntax-highlighting` spec updated with new requirement

## Implementation Plan

See `tasks.md` for detailed implementation checklist.

## Related Work

- Issue #6: "Improvements for Zed editor highlighting" - proposed similar changes but also included questionable modifications (removing catch-all text, changing scope names). This proposal takes only the valuable delimiter capture portion.
- Related specs: `syntax-highlighting`
