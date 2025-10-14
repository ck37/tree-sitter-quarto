# tree-sitter-quarto

[![CI](https://github.com/ck37/tree-sitter-quarto/workflows/CI/badge.svg)](https://github.com/ck37/tree-sitter-quarto/actions)

Tree-sitter parser for [Quarto Markdown](https://quarto.org/) (`.qmd` files), optimized for editor integration.

> **Status:** 🚀 Alpha Complete - All core features implemented, ready for editor integration

## What is this?

A [tree-sitter](https://tree-sitter.github.io/) parser that understands Quarto's extended Markdown syntax, enabling rich editor features:

- 🎨 **Semantic syntax highlighting** - Distinct colors for chunk options, cross-references, executable cells
- 📍 **Jump-to-definition** - Navigate from `@fig-plot` to figure definition
- 💡 **Autocomplete** - Suggest valid chunk option names and values
- 📦 **Code folding** - Collapse executable cells and divs
- 🔍 **Document outline** - Navigate structure including cells and callouts

## Why?

Existing parsers serve different purposes:
- **[tree-sitter-pandoc-markdown](https://github.com/ck37/tree-sitter-pandoc-markdown)** - Great for Pandoc, but not Quarto-aware
- **[Quarto Markdown Parser](https://github.com/quarto-dev/quarto-markdown)** - Designed for rendering, not editor integration

**tree-sitter-quarto** fills the gap by providing semantic parsing optimized for **editor tooling** as you author Quarto documents.

See [detailed comparison](./docs/comparison.md) for more information.

## Features

### ✅ Fully Implemented

- ✅ **Executable code cells** - Parse `{python}`, `{r}`, `{julia}` with semantic nodes
- ✅ **Chunk options** - Parse `#| key: value` as structured data
- ✅ **Cross-references** - Distinguish `@fig-plot` from `@smith2020` citations
- ✅ **Inline code cells** - `` `{python} expr` `` with language injection
- ✅ **Shortcodes** - `{{< video url >}}` in block and inline contexts
- ✅ **Enhanced divs** - Callouts, tabsets, conditional content
  - `::: {.callout-note}` - 5 types: note, warning, important, tip, caution
  - `::: {.panel-tabset}` - Tab structure with groups
  - `::: {.content-visible when-format="html"}` - Conditional content
- ✅ **Language injection** - 15+ languages (Python, R, Julia, SQL, Bash, JS, Mermaid, etc.)
- ✅ **Full Pandoc Markdown** - Headings, emphasis, links, images, tables, etc.

**Coverage:** 58/58 tests passing (100%) | 62/63 requirements (98%) across 8 specifications

### 📋 Known Limitations

- Generic fenced divs (`::: {.custom-class}`) don't parse - [technical details](./docs/generic-fenced-div-limitation.md)
- Multi-line chunk option values not supported
- See [plan.md](./docs/plan.md) for complete list

## Quick Example

**Input `.qmd` file:**

```qmd
---
title: "My Analysis"
format: html
---

## Results

See @fig-plot for details.

```{python}
#| label: fig-plot
#| echo: false
import matplotlib.pyplot as plt
plt.plot([1, 2, 3])
```

::: {.callout-note}
The mean is `{python} mean([1, 2, 3])`.
:::

{{< video https://example.com/demo.mp4 >}}
```

**Output AST** (simplified):

```
(document
  (yaml_front_matter ...)
  (atx_heading ...)
  (paragraph
    (cross_reference type:"fig" id:"plot"))
  (executable_code_cell
    language: "python"
    (chunk_options
      (chunk_option key:"label" value:"fig-plot")
      (chunk_option key:"echo" value:"false"))
    content: ...)
  (callout_block
    (callout_open)
    (inline_code_cell language:"python" ...))
  (shortcode_block name:"video" ...))
```

## Installation

### For Editor Extension Developers

**Add to your extension:**

```toml
# Cargo.toml
[dependencies]
tree-sitter-quarto = { git = "https://github.com/ck37/tree-sitter-quarto" }
```

See [editor integration guide](./docs/editor-integration.md) for detailed instructions including scope naming conventions and query file usage.

### For End Users

Editor plugins coming soon:
- **Zed** - [zed-quarto-extension](https://github.com/ck37/zed-quarto-extension) (in development)
- **Neovim** - Integration via nvim-treesitter (planned)
- **Helix** - Community integration (planned)

## Documentation

- **[docs/plan.md](./docs/plan.md)** - Implementation plan and status
- **[docs/comparison.md](./docs/comparison.md)** - Comparison with other parsers
- **[docs/editor-integration.md](./docs/editor-integration.md)** - Guide for editor extension developers
- **[docs/generic-fenced-div-limitation.md](./docs/generic-fenced-div-limitation.md)** - Technical analysis of limitation
- **[docs/relationship-to-quarto-markdown.md](./docs/relationship-to-quarto-markdown.md)** - Relationship to official parser
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute

## Contributing

Contributions welcome! The parser is functional with all core features implemented.

**Priority areas:**
- Editor plugin development
- Performance optimization
- Additional test cases
- Documentation improvements

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow.

## Status

**Current Phase:** Alpha Complete

- ✅ All 8 OpenSpec specifications implemented
- ✅ 58/58 tests passing (100%)
- ✅ CI/CD pipeline green (Ubuntu + macOS)
- ⏳ Editor integration in progress (Zed)
- ⏳ Performance benchmarking pending

**Next Steps:** Editor plugin releases, real-world testing, performance optimization

## License

MIT License - see [LICENSE](./LICENSE) file for details

## Related Projects

- **[tree-sitter-pandoc-markdown](https://github.com/ck37/tree-sitter-pandoc-markdown)** - Base grammar we extend
- **[Quarto](https://quarto.org/)** - Scientific publishing system
- **[Quarto Markdown Parser](https://github.com/quarto-dev/quarto-markdown)** - Official rendering-focused parser (complementary)
- **[tree-sitter-markdown](https://github.com/tree-sitter-grammars/tree-sitter-markdown)** - Original upstream grammar

---

**Created:** 2025-10-13 | **Updated:** 2025-10-14 | **Version:** 0.1.0
