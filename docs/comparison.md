# Comparison with Other Parsers

This document provides detailed comparisons between tree-sitter-quarto and related parsing projects.

## Parser Ecosystem

```
tree-sitter-quarto
    ↓ extends
tree-sitter-pandoc-markdown
    ↓ fork of
tree-sitter-markdown
```

## Quick Comparison Table

| Feature | tree-sitter-quarto | Quarto Parser | tree-sitter-pandoc-markdown |
|---------|-------------------|---------------|----------------------------|
| **Parses chunk options** | ✅ As structured data | ❌ Handled by knitr | ❌ Not Quarto-aware |
| **Distinguishes xrefs from citations** | ✅ Semantic nodes | ❌ Both as citations | ✅ Via Pandoc features |
| **Recognizes executable cells** | ✅ First-class nodes | ⚠️ As code blocks | ❌ Not supported |
| **Callout semantic parsing** | ✅ Specific node types | ⚠️ Generic divs | ⚠️ Generic divs |
| **Primary use case** | **Editor features** | **Document rendering** | **Pandoc editing** |
| **Target phase** | Pre-execution | Post-execution | N/A |
| **Output format** | tree-sitter AST | Pandoc AST | tree-sitter AST |
| **Language** | JavaScript + C | Rust | JavaScript + C |
| **Status** | Alpha (functional) | Experimental | Production |

## Detailed Comparison

### tree-sitter-quarto (This Project)

**Purpose:** Editor integration and tooling for Quarto Markdown authoring

**Strengths:**
- ✅ Parses `.qmd` files **before execution** (what you type in your editor)
- ✅ Rich semantic AST for editor features (syntax highlighting, navigation, autocomplete)
- ✅ First-class nodes for Quarto constructs (chunk options, executable cells, cross-references)
- ✅ Incremental parsing (fast updates as you type)
- ✅ Multi-language injection (Python, R, Julia syntax highlighting)
- ✅ Comprehensive query files for syntax highlighting and folding

**Limitations:**
- ⚠️ Not designed for rendering (use Quarto Parser for that)
- ⚠️ Generic fenced divs limitation (see [technical analysis](./generic-fenced-div-limitation.md))
- ⚠️ No validation (requires language server)

**Best for:**
- Editor plugins (Neovim, Zed, Helix, VSCode)
- Syntax highlighting during authoring
- Pre-execution tooling (linters, formatters)
- Jump-to-definition and navigation
- Autocomplete and code intelligence

### Quarto Markdown Parser (Official)

**Repository:** https://github.com/quarto-dev/quarto-markdown

**Purpose:** Document rendering and compilation to Pandoc AST

**Strengths:**
- ✅ Official parser from Quarto team
- ✅ Produces Pandoc AST for filter pipeline
- ✅ Integrated with Quarto rendering engine
- ✅ Rust implementation (fast, safe)
- ✅ Handles post-execution markdown (after knitr/jupyter runs)

**Limitations:**
- ⚠️ Experimental status (not production-ready)
- ⚠️ Parses **after** code execution (post-knitr output)
- ⚠️ Not optimized for editor integration
- ⚠️ Chunk options handled by knitr (not parsed as first-class constructs)
- ⚠️ No tree-sitter queries (not designed for syntax highlighting)

**Best for:**
- Document rendering pipeline
- Pandoc filter development
- Post-execution markdown processing
- Integration with Quarto CLI

**Not ideal for:**
- Editor integration (tree-sitter better suited)
- Pre-execution tooling
- Syntax highlighting as you type

### tree-sitter-pandoc-markdown (Base Grammar)

**Repository:** https://github.com/ck37/tree-sitter-pandoc-markdown

**Purpose:** Editor-focused parser for Pandoc Markdown

**Strengths:**
- ✅ Production-ready parser for Pandoc Markdown
- ✅ Rich semantic nodes (citations, divs, spans, attributes)
- ✅ Comprehensive query files
- ✅ Battle-tested in editors
- ✅ Handles complex Pandoc features (footnotes, definition lists, etc.)

**Limitations:**
- ⚠️ Not Quarto-aware (no chunk options, no executable cell semantics)
- ⚠️ Doesn't distinguish cross-references from citations
- ⚠️ No language injection for executable cells

**Best for:**
- Editing Pandoc Markdown (non-Quarto)
- Base grammar to extend for other formats
- Production use where Quarto features not needed

**Relationship to tree-sitter-quarto:**
- tree-sitter-quarto **extends** tree-sitter-pandoc-markdown
- Uses "Copy & Extend" strategy (not git submodules)
- Adds Quarto-specific features on top of Pandoc base

## Use Case Decision Matrix

### Choose tree-sitter-quarto when:

- ✅ Building editor plugins/extensions
- ✅ Need syntax highlighting for `.qmd` files
- ✅ Want to parse **before** code execution
- ✅ Need semantic understanding of Quarto constructs
- ✅ Building autocomplete/navigation features
- ✅ Creating linters or formatters

### Choose Quarto Parser when:

- ✅ Building rendering pipeline tools
- ✅ Processing **after** code execution
- ✅ Need Pandoc AST output
- ✅ Developing Quarto filters
- ✅ Integrating with Quarto CLI

### Choose tree-sitter-pandoc-markdown when:

- ✅ Working with Pandoc Markdown (non-Quarto)
- ✅ Need production-ready parser today
- ✅ Quarto-specific features not required
- ✅ Building general Pandoc tooling

## Architectural Differences

### Parsing Phases

#### tree-sitter-quarto (Pre-execution)

```
.qmd file
   ↓
[tree-sitter-quarto] ← Parses raw .qmd
   ↓
tree-sitter AST (semantic nodes for editor)
```

**Input example:**
````markdown
```{python}
#| label: fig-plot
import matplotlib.pyplot as plt
plt.plot([1, 2, 3])
```
````

**Output:** AST with `executable_code_cell`, `chunk_options` nodes

#### Quarto Parser (Post-execution)

```
.qmd file
   ↓
[knitr/jupyter] ← Executes code
   ↓
.md file (with outputs)
   ↓
[Quarto Parser] ← Parses rendered markdown
   ↓
Pandoc AST (for rendering)
```

**Input example:**
```markdown
![](figure.png)

<div class="output">
...
</div>
```

**Output:** Pandoc AST with images, divs, etc.

### Grammar Type

| Parser | Type | Language | ABI |
|--------|------|----------|-----|
| tree-sitter-quarto | LR(1) | JavaScript + C | tree-sitter |
| Quarto Parser | Pulldown-cmark | Rust | N/A |
| tree-sitter-pandoc-markdown | LR(1) | JavaScript + C | tree-sitter |

## Complementary, Not Competitive

**Important:** These parsers serve **different purposes** in the Quarto ecosystem:

```
┌─────────────────────────────────────────────────────┐
│ Authoring Phase (in editor)                        │
│                                                     │
│  .qmd file → [tree-sitter-quarto] → Editor features│
│                                                     │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ Execution Phase (Quarto CLI)                       │
│                                                     │
│  .qmd → [knitr/jupyter] → .md                      │
│                                                     │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ Rendering Phase (Quarto CLI)                       │
│                                                     │
│  .md → [Quarto Parser] → Pandoc AST → HTML/PDF    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**You can use both:**
- **tree-sitter-quarto** in your editor for authoring
- **Quarto Parser** in Quarto CLI for rendering

## Feature Coverage Comparison

### Executable Code Cells

| Feature | tree-sitter-quarto | Quarto Parser |
|---------|-------------------|---------------|
| Recognize `{python}` syntax | ✅ | ⚠️ (as code block) |
| Parse chunk options | ✅ | ❌ (knitr does this) |
| Semantic `chunk_option` nodes | ✅ | ❌ |
| Language injection | ✅ | N/A |

### Cross-References

| Feature | tree-sitter-quarto | Quarto Parser |
|---------|-------------------|---------------|
| Parse `@fig-plot` | ✅ | ✅ |
| Distinguish from `@author2020` | ✅ | ❌ |
| Semantic `cross_reference` node | ✅ | ❌ (both as citations) |
| Extract type prefix | ✅ | ❌ |

### Enhanced Divs

| Feature | tree-sitter-quarto | Quarto Parser |
|---------|-------------------|---------------|
| Parse callout blocks | ✅ Semantic nodes | ⚠️ Generic divs |
| Parse tabsets | ✅ Semantic nodes | ⚠️ Generic divs |
| Parse conditional content | ✅ Semantic nodes | ⚠️ Generic divs |
| Attribute parsing | ✅ Captured in tokens | ✅ Full parsing |

### Shortcodes

| Feature | tree-sitter-quarto | Quarto Parser |
|---------|-------------------|---------------|
| Parse `{{< video >}}` | ✅ | ✅ |
| Block vs inline distinction | ✅ | ✅ |
| Semantic nodes | ✅ | ✅ |

## Performance Characteristics

### tree-sitter-quarto

- **Parsing speed:** O(n) linear time (LR(1))
- **Incremental parsing:** ✅ Yes (only re-parses changed sections)
- **Target latency:** <100ms for typical documents
- **Memory usage:** Low (streaming parser)
- **Best for:** Interactive editing with live updates

### Quarto Parser

- **Parsing speed:** Fast (Rust implementation)
- **Incremental parsing:** ❌ No (batch processing)
- **Target latency:** Not critical (offline rendering)
- **Memory usage:** Moderate (full AST in memory)
- **Best for:** Batch rendering of documents

## Related Documentation

- **Architecture deep-dive:** [plan.md](./plan.md)
- **Relationship to Quarto Parser:** [relationship-to-quarto-markdown.md](./relationship-to-quarto-markdown.md)
- **Editor integration:** [editor-integration.md](./editor-integration.md)
- **Technical limitations:** [generic-fenced-div-limitation.md](./generic-fenced-div-limitation.md)

## References

### Related Projects

- **tree-sitter-pandoc-markdown:** https://github.com/ck37/tree-sitter-pandoc-markdown
- **Quarto Markdown Parser:** https://github.com/quarto-dev/quarto-markdown
- **tree-sitter-markdown:** https://github.com/tree-sitter-grammars/tree-sitter-markdown
- **Quarto:** https://quarto.org/

### Further Reading

- **Quarto Documentation:** https://quarto.org/docs/
- **Tree-sitter Documentation:** https://tree-sitter.github.io/tree-sitter/
- **Pandoc Documentation:** https://pandoc.org/
