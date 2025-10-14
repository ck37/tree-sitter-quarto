# tree-sitter-quarto

[![CI](https://github.com/ck37/tree-sitter-quarto/workflows/CI/badge.svg)](https://github.com/ck37/tree-sitter-quarto/actions)

Tree-sitter parser for Quarto Markdown (`.qmd` files), optimized for editor integration.

> **Status:** 🚀 Alpha - Parser functional, editor integration ready for testing

## What is this?

A [tree-sitter](https://tree-sitter.github.io/) parser that provides rich syntax trees for [Quarto Markdown](https://quarto.org/) documents, enabling advanced editor features like:

- 🎨 **Semantic syntax highlighting** - Distinct colors for chunk options, cross-references, executable cells
- 📍 **Jump-to-definition** - Navigate from `@fig-plot` to figure definition
- ✅ **Validation** - Catch typos in chunk options, undefined cross-references
- 💡 **Autocomplete** - Suggest valid chunk option names and values
- 📦 **Code folding** - Collapse executable cells and divs
- 🔍 **Outline view** - Navigate document structure including cells

## Why does this exist?

There are currently parsers for Pandoc Markdown and Quarto with different goals:

1. **[tree-sitter-pandoc-markdown](https://github.com/ck37/tree-sitter-pandoc-markdown)** - Editor-focused parser for Pandoc Markdown, but not Quarto-aware
2. **[Quarto Markdown Parser](https://github.com/quarto-dev/quarto-markdown)** - Rendering-focused Rust parser that produces Pandoc AST for document compilation (not production-ready)

**tree-sitter-quarto fills a specific gap:** providing a tree-sitter grammar optimized for **editor integration** (syntax highlighting, navigation, autocomplete) as documents are authored, complementing the rendering-focused quarto-markdown project.

### Key Differences

| Feature | tree-sitter-quarto | Quarto Parser | tree-sitter-pandoc-markdown |
|---------|----------------|---------------|----------------------------|
| Parses chunk options | ✅ | ❌ (handled by knitr) | ❌ |
| Distinguishes xrefs from citations | ✅ | ❌ (both as citations) | ✅ |
| Recognizes executable cells | ✅ | ⚠️ (as code blocks) | ❌ |
| Callout semantic parsing | ✅ | ⚠️ (generic divs) | ⚠️ |
| Primary use case | Editor features | Document rendering | Pandoc editing |

See [docs/plan.md](./docs/plan.md) for detailed comparison and architecture.

## Project Status

**Current Phase:** Alpha Implementation - Parser Functional

- [x] Architecture designed
- [x] Implementation plan created
- [x] OpenSpec baseline specifications created (6 specs, 48 requirements)
- [x] Project conventions documented
- [x] Repository initialized (grammar.js, package.json, bindings)
- [x] Base grammar ported from tree-sitter-pandoc-markdown
- [x] Executable cells implemented with `{language}` syntax
- [x] Chunk options implemented with `#| key: value` parsing
- [x] Cross-references distinguished from citations (`@fig-` vs `@author`)
- [x] Inline code cells with language injection
- [x] Query files created (highlights, injections, folds, indents, locals)
- [x] GitHub CI setup (tests on Ubuntu/macOS, multiple Node versions)
- [ ] Test suite comprehensive and passing
- [ ] Editor integration tested (Neovim, Zed, Helix)
- [ ] Performance validated on large documents

**Latest:** Parser successfully generates and parses Quarto documents. All core features implemented. Query files enable syntax highlighting and language injection for 15+ languages.

**Next Steps:** Comprehensive testing, editor plugin integration, performance optimization

## Features

### ✅ Implemented (Phase 1)
- ✅ **Executable code cells** - Parse `{python}`, `{r}`, `{julia}` with language specifiers
- ✅ **Chunk options** - Parse `#| key: value` syntax as structured data
- ✅ **Cross-references** - Distinguish `@fig-plot` from `@smith2020` citations
- ✅ **Inline code cells** - Parse `` `{python} expr` `` with language support
- ✅ **Language injection** - 15+ languages supported (Python, R, Julia, SQL, Bash, JS, TS, Mermaid, etc.)
- ✅ **Syntax highlighting** - Comprehensive queries for all constructs
- ✅ **Code folding** - Cells, divs, lists, blocks
- ✅ **Full Pandoc Markdown** - Headings, emphasis, links, images, tables, etc.

### 🚧 In Progress (Phase 2)
- ⬜ Shortcodes (`{{< video url >}}`) - Grammar implemented, needs testing
- ⬜ Callout blocks (`::: {.callout-note}`) - Generic divs work, semantic parsing planned
- ⬜ Tabsets (`::: {.panel-tabset}`) - Generic divs work, semantic parsing planned
- ⬜ Conditional content - Generic divs work, attribute parsing planned
- ⬜ Figure/table cross-reference metadata - Needs linking implementation

### 📋 Planned (Phase 3)
- ⬜ Cross-reference validation - Requires language server
- ⬜ Chunk option validation - Requires language server
- ⬜ Editor plugins - Neovim, Zed, Helix integration
- ⬜ Performance optimization - Large document handling

## Example

**Input (`.qmd` file):**

```qmd
---
title: "My Analysis"
format: html
---

## Introduction

See @fig-plot for the results.

```{python}
#| label: fig-plot
#| echo: false
#| fig-cap: "Sample plot"
import matplotlib.pyplot as plt
plt.plot([1, 2, 3])
```

The mean is `{python} mean([1, 2, 3])`.
```

**Output (AST with semantic nodes):**

```
(document
  (yaml_front_matter ...)
  (section
    (heading ...)
    (paragraph
      (cross_reference type: "fig" id: "plot"))
    (executable_code_cell
      (language_name "python")
      (chunk_options
        (chunk_option key: "label" value: "fig-plot")
        (chunk_option key: "echo" value: "false")
        (chunk_option key: "fig-cap" value: "Sample plot"))
      (cell_content (python_code)))
    (paragraph
      (inline_code_cell
        (language_name "python")
        (cell_content (python_code))))))
```

## Installation (When Ready)

### For Neovim (nvim-treesitter)

```lua
-- Not yet available
```

### For Zed Editor

```json
// Not yet available
```

### For Helix

```toml
# Not yet available
```

## Relationship to Other Projects

```
tree-sitter-quarto
    ↓ extends
tree-sitter-pandoc-markdown
    ↓ fork of
tree-sitter-markdown
```

**tree-sitter-quarto** extends [tree-sitter-pandoc-markdown](https://github.com/ck37/tree-sitter-pandoc-markdown) with Quarto-specific features:
- Executable code cells with chunk options
- Cross-reference semantic distinction
- Quarto div types (callouts, tabsets)

**Not a replacement for:**
- **Quarto Markdown Parser** - Use that for document rendering/compilation
- **tree-sitter-pandoc-markdown** - Use that for non-Quarto Pandoc Markdown

## Documentation

- **[docs/plan.md](./docs/plan.md)** - Comprehensive implementation plan
- **[docs/relationship-to-quarto-markdown.md](./docs/relationship-to-quarto-markdown.md)** - Relationship to official Quarto parser project
- **[Architecture Comparison](../tree-sitter-pandoc-markdown/docs/quarto-parser-comparison.md)** - Detailed comparison with Quarto Parser

## Contributing

This project is in early planning stages. Contributions are welcome once the foundation is implemented.

See [docs/plan.md](./docs/plan.md) for:
- Implementation strategy
- Testing approach
- Success criteria
- Open questions

## License

MIT License - see [LICENSE](./LICENSE) file for details

## Related Projects

- **[tree-sitter-pandoc-markdown](https://github.com/ck37/tree-sitter-pandoc-markdown)** - Base grammar we extend
- **[Quarto Markdown Parser](https://github.com/quarto-dev/quarto-markdown)** - Official Quarto rendering-focused parser (experimental)
- **[tree-sitter-markdown](https://github.com/tree-sitter-grammars/tree-sitter-markdown)** - Original upstream grammar
- **[Quarto](https://quarto.org/)** - Scientific publishing system this parser supports

> **Note:** tree-sitter-quarto focuses on editor integration, complementing (not competing with) the official quarto-markdown project which targets the rendering pipeline.

## Acknowledgments

This project builds on insights from:
- tree-sitter-pandoc-markdown implementation experience
- Analysis of Quarto Markdown Parser architecture
- Understanding of tree-sitter LR(1) limitations

See [quarto-parser-comparison.md](../tree-sitter-pandoc-markdown/docs/quarto-parser-comparison.md) for detailed architectural analysis.

---

**Status:** Planning Phase
**Version:** 0.0.0 (not yet functional)
**Created:** 2025-10-13
