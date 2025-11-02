# tree-sitter-quarto

[![CI](https://github.com/ck37/tree-sitter-quarto/workflows/CI/badge.svg)](https://github.com/ck37/tree-sitter-quarto/actions)
[![Tests](https://img.shields.io/badge/tests-203%2F203%20passing-brightgreen)](https://github.com/ck37/tree-sitter-quarto/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![tree-sitter](https://img.shields.io/badge/tree--sitter-0.25.10-orange)](https://tree-sitter.github.io/)
[![Node Version](https://img.shields.io/badge/node-%3E%3D16-brightgreen)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/status-alpha-yellow)](./docs/plan.md)
[![Spec Coverage](https://img.shields.io/badge/spec%20coverage-100%25-brightgreen)](./openspec)

Tree-sitter parser for [Quarto Markdown](https://quarto.org/) (`.qmd` files), optimized for editor integration.

A production-ready [tree-sitter](https://tree-sitter.github.io/) parser that understands Quarto's extended Markdown syntax, enabling semantic highlighting, jump-to-definition, autocomplete, and code folding for executable cells, chunk options, and cross-references. While [official Quarto grammars](https://github.com/quarto-dev/quarto-markdown) exist, they won't be production-ready until early 2026, so tree-sitter-quarto fills the gap for first-class Quarto support in editors like [Zed](https://github.com/ck37/zed-quarto-extension), Neovim, Helix, and VSCode today.

## Features

Fully implemented:

- Executable code cells - Parse `{python}`, `{r}`, `{julia}` with semantic nodes
- Chunk options - Parse `#| key: value` as structured data
- Cross-references - Distinguish `@fig-plot` from `@smith2020` citations
- Inline code cells - `` `{python} expr` `` with language injection
- Heading attributes - Pandoc heading syntax `## Title {.class}`, `## Title {#id}`, `## Title {.class #id}`
- Inline attributes - Pandoc span syntax `[text]{.class}`, `[text]{#id .class key="value"}`
- Inline formatting - Pandoc extensions for scientific/academic writing
  - Strikethrough: `~~deleted text~~`
  - Highlight: `==important text==`
  - Subscript: `H~2~O`, `C~6~H~12~O~6~`
  - Superscript: `x^2^`, `E=mc^2^`
  - Inline math: `$x^2 + y^2 = z^2$` - Context-aware parsing that correctly distinguishes LaTeX math from currency amounts (`$50`, `$160`)
- Shortcodes - `{{< video url >}}` in block and inline contexts
- Enhanced divs - Callouts, tabsets, conditional content
  - `::: {.callout-note}` - 5 types: note, warning, important, tip, caution
  - `::: {.panel-tabset}` - Tab structure with groups
  - `::: {.content-visible when-format="html"}` - Conditional content
- Footnotes - Full Pandoc footnote support with structured parsing
  - Inline footnotes: `^[note text]`
  - Footnote references: `[^1]`
  - Footnote definitions: `[^1]: definition`
  - Nested footnotes and formatting support
- Language injection - Python, R, Julia, SQL, Bash, JavaScript/TypeScript, OJS
- Full Pandoc Markdown - Headings, emphasis, links, images, tables, etc.

Known limitations:

- Generic fenced divs (`::: {.custom-class}`) don't parse - [technical details](./docs/generic-fenced-div-limitation.md)
- Inline attributes: `[text]{.class}` at paragraph start creates cosmetic ERROR nodes - [technical details](./docs/inline-attributes-known-issues.md)
- Real-world corpus validation: 20% success rate (improving toward 90% target)
- See [plan.md](./docs/plan.md) for complete list

## Relationship to Official Quarto Grammars

The [quarto-markdown repository](https://github.com/quarto-dev/quarto-markdown) contains official tree-sitter grammars intended for editor integration (RStudio, Positron, etc.), but these aren't production-ready until early 2026. tree-sitter-quarto serves as a bridge solution that's production-ready now with all features implemented, comprehensive query files for syntax highlighting, and proven real-world editor integration, providing a clear migration path when the official grammars reach production status.

While tree-sitter-quarto meets current needs, the official grammars will be better long-term as they'll be battle-tested in Posit's production editors, backed by official support and maintenance, and serve as the blessed standard across the Quarto/Posit ecosystem. Current recommendation: use tree-sitter-quarto for editor integration today, plan migration to official grammars in 2026+ when production-ready. See [detailed comparison](./docs/comparison.md) for architecture differences and migration considerations.

## Quick Example

Input `.qmd` file:

````markdown
---
title: "My Analysis"
format: html
---

## Results {#sec-results}

See @fig-plot for details. The chemical formula is H~2~O and the equation $E=mc^2$ shows energy.

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
````

Output AST (simplified):

```
(document
  (yaml_front_matter ...)
  (atx_heading
    content: "Results"
    attributes: (attribute_list id:"sec-results"))
  (paragraph
    (cross_reference type:"fig" id:"plot")
    (subscript "2")
    (inline_math ...))
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

## Editor Support

**Zed:** Install the [zed-quarto-extension](https://github.com/ck37/zed-quarto-extension) via the Zed extensions panel or `extensions.toml`.

**Other editors:** Compatible with Neovim (nvim-treesitter), Helix, and VSCode. For editor extension developers, add `tree-sitter-quarto = { git = "https://github.com/ck37/tree-sitter-quarto" }` to your dependencies. See [editor integration guide](./docs/editor-integration.md) for detailed instructions.

**YAML Front Matter:** YAML content is parsed via language injection to tree-sitter-yaml. For full YAML syntax highlighting (including nested mappings), your editor needs tree-sitter-yaml installed. Most editors (Neovim, Zed, Helix) include it by default.

## Documentation

See the [docs/](./docs/) directory for detailed documentation.

## Contributing

Contributions welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow.

## Acknowledgments

This parser incorporates emphasis and strong emphasis handling from [tree-sitter-markdown](https://github.com/tree-sitter-grammars/tree-sitter-markdown) (MIT License, Copyright 2021 Matthias Deiml). The delimiter run logic and flanking rules from tree-sitter-markdown's scanner enable proper CommonMark-compliant parsing of emphasis patterns like `*italic***bold***italic*`.

## License

MIT License - see [LICENSE](./LICENSE) file for details
