---
name: h-refactor-import-tree-sitter-markdown
branch: feature/import-tree-sitter-markdown
status: pending
created: 2025-11-01
---

# Refactor to Import tree-sitter-markdown

## Problem/Goal
The current "Copy & Extend" strategy copied grammar rules from tree-sitter-pandoc-markdown but did not include the external scanner that makes emphasis/strong_emphasis parsing work. This causes parsing failures with triple asterisk patterns (`***`) and creates multi-line ERROR nodes that break syntax highlighting.

The proper solution is to switch from "Copy & Extend" to "Import & Extend" strategy, using `require('tree-sitter-markdown')` to get the full grammar including the external scanner. This aligns with how tree-sitter-pandoc-markdown itself works and was explicitly contemplated in the original design (docs/plan.md).

## Success Criteria
- [ ] tree-sitter-markdown added as npm dependency
- [ ] grammar.js refactored to use require() and extend pattern
- [ ] External tokens from tree-sitter-markdown properly exposed
- [ ] Triple asterisk pattern `*italic***bold***italic*` parses without ERROR nodes
- [ ] All existing 203 tests continue to pass
- [ ] test/test-issue-8.qmd parses cleanly
- [ ] Syntax highlighting works correctly in test document
- [ ] No performance regression (parse time within 5% of baseline)

## Context Manifest
<!-- Added by context-gathering agent -->

## User Notes
<!-- Any specific notes or requirements from the developer -->

## Work Log
<!-- Updated as work progresses -->
- [YYYY-MM-DD] Started task, initial research
