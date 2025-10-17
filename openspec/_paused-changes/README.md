# Paused OpenSpec Changes

This directory contains OpenSpec changes that have been paused due to technical challenges or blocking issues, or completed externally.

**Currently:** 1 change (completed externally)

## Current

### add-zed-integration-example

**Status**: ✅ Completed Externally (2025-10-17)
**Location**: https://github.com/ck37/zed-quarto-extension
**Outcome**: Full Zed extension developed in separate repository

The Zed integration work was completed in a dedicated repository rather than as an example within tree-sitter-quarto. See `add-zed-integration-example/COMPLETED_EXTERNALLY.md` for details.

## Previously Paused (Now Completed)

### implement-inline-attributes

**Status**: ✅ Completed and Archived (2025-10-17)
**Location**: `openspec/changes/archive/implement-inline-attributes`
**Outcome**: Successfully implemented after initial pause

The inline attributes feature was successfully implemented despite initial LR(1) parser challenges. The implementation uses the link-based approach from the official quarto-markdown grammar and includes:
- 15 passing tests for inline attributes
- Support for `[text]{#id}`, `[text]{.class}`, and `[text]{key="value"}` syntax
- WASM parser verification confirming correct parsing

See archived spec for full implementation details.
