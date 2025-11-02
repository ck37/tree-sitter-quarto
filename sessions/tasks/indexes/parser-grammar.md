---
index: parser-grammar
name: Parser & Grammar
description: Tasks related to tree-sitter grammar rules, parser behavior, external scanner, error recovery, and parsing optimization
---

# Parser & Grammar

## Active Tasks

### High Priority
- `h-fix-ambiguous-triple-asterisks.md` - Fix ERROR node consuming subsequent content when parsing `*italic***bold***italic*`
- `h-fix-fenced-code-block-attributes.md` - Add support for Pandoc fenced code block attributes (e.g., `` ```{.bash} ``) to improve corpus validation from 25% to 40-50%+
- `h-fix-yaml-parsing-in-code-blocks.md` - Fix YAML/structured content being parsed as Markdown inside fenced code blocks, improving corpus validation from 30% to 35%+ (affects ~25% of failures)
- `h-implement-generic-fenced-divs/` - Add support for generic fenced divs (`::: {.custom-class}`) to improve corpus validation from 25% to 35%+ (affects ~40% of current failures)
- `h-refactor-import-tree-sitter-markdown.md` - Refactor from "Copy & Extend" to "Import & Extend" strategy to include tree-sitter-markdown external scanner

### Medium Priority
<!-- Medium priority parser/grammar tasks -->

### Low Priority
<!-- Low priority parser/grammar tasks -->

### Investigate
<!-- Parser/grammar investigations -->

## Completed Tasks
- `h-fix-test-suite-failures.md` - Fixed all 7 test failures (96.9% → 100%) by removing colon from text exclusion pattern
