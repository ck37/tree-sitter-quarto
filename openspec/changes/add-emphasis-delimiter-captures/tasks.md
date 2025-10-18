# Implementation Tasks

## Preparation
- [x] Review proposal.md and spec delta
- [x] Verify grammar already exposes delimiter nodes (check parse tree)
- [x] Check Zed One Dark theme support for @punctuation.delimiter

## Implementation

### Update Default Highlights File
- [x] Edit `queries/highlights.scm`
- [x] Add `(emphasis_delimiter) @punctuation.delimiter` before existing emphasis capture
- [x] Add `(strong_emphasis_delimiter) @punctuation.delimiter` before existing strong_emphasis capture
- [x] Ensure parent captures remain (additive only)
- [x] Add comment explaining delimiter captures if needed

### Update Neovim Highlights File
- [x] Edit `queries/nvim/highlights.scm`
- [x] Add same `(emphasis_delimiter) @punctuation.delimiter` capture
- [x] Add same `(strong_emphasis_delimiter) @punctuation.delimiter` capture
- [x] Maintain structural parity with default highlights file

## Validation

### Automated Testing
- [x] Run `npx tree-sitter test` to verify all tests pass
- [x] Confirm no test failures or regressions
- [x] Verify query files are syntactically valid

### Manual Testing
- [x] Create test `.qmd` file with emphasis/strong samples
- [x] Parse with `npx tree-sitter parse test.qmd`
- [x] Verify delimiter nodes appear in AST
- [ ] Test in Zed editor (if available)
- [ ] Confirm delimiters render in light gray
- [ ] Confirm content renders in blue/orange

### OpenSpec Validation
- [x] Run `openspec validate add-emphasis-delimiter-captures --strict`
- [x] Resolve any validation errors
- [x] Ensure spec delta is properly formatted

## Documentation
- [x] No doc updates needed (query files are self-documenting)
- [x] Proposal already includes rationale and examples

## Completion Checklist
- [x] All query files updated consistently
- [x] All tests passing
- [ ] Manual verification in Zed successful
- [x] OpenSpec validation passing
- [x] Ready for review
