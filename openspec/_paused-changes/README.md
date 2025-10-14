# Paused OpenSpec Changes

This directory contains OpenSpec changes that have been paused due to technical challenges or blocking issues.

## implement-inline-attributes

**Status**: Research Complete, Implementation Paused
**Date Paused**: 2025-10-14
**Reason**: LR(1) parser ambiguity causes 23 test regressions
**Documentation**: `docs/inline-attributes-implementation-challenges.md`

### Summary

Attempted to implement Pandoc-style inline attributes (`[text]{#id .class}`) but encountered fundamental challenges with tree-sitter's LR(1) parser:

- **Research**: Completed investigation of official quarto-markdown grammar
- **Finding**: Official grammar treats spans as `inline_link` variants (semantically imperfect but working)
- **Attempts**: Tried external scanner lookahead and precedence-based approaches
- **Result**: Both caused 23 unrelated tests to fail due to parse state conflicts
- **Recommendation**: Either adopt official grammar's approach or implement heading attributes only

### Future Work

This spec can be resumed when:
1. Decision is made to adopt inline_link approach (proven to work)
2. Deep grammar redesign is undertaken (split block/inline grammars)
3. Tree-sitter improves lookahead capabilities (unlikely)

See the full spec in `implement-inline-attributes/` and detailed analysis in `docs/inline-attributes-implementation-challenges.md`.
