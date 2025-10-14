# tree-sitter-qmd Implementation Plan

**Created:** 2025-10-13
**Status:** Planning Phase
**Goal:** Create a Quarto Markdown parser optimized for editor integration and tooling

## Project Vision

Build a tree-sitter parser for Quarto Markdown (`.qmd` files) that combines the best of both worlds:
- **Editor-focused design** from tree-sitter-pandoc-markdown (semantic precision, rich nodes)
- **Quarto-specific features** that the Quarto Markdown Parser handles in their execution phase
- **Standalone parser** that works in editors before code execution

### Why This Project Exists

**Problem:** There are currently two Pandoc Markdown parsers with different goals:

1. **tree-sitter-pandoc-markdown** (this repository's sibling)
   - Editor-focused: syntax highlighting, navigation, folding
   - Pandoc Markdown features: citations, divs, shortcodes
   - Missing: Quarto-specific features (chunk options, executable cells metadata)

2. **Quarto Markdown Parser** (Posit's project)
   - Rendering-focused: produces Pandoc AST for filter pipeline
   - Parses post-execution output (after knitr/jupyter runs)
   - Not optimized for pre-execution editor experience

**Gap:** Neither parser handles the full Quarto authoring experience in editors:
- Chunk options (`#| label: foo`) not parsed as first-class constructs
- Executable cell metadata not distinguished from code content
- No semantic distinction between cross-references and citations
- Cell boundaries not explicit in AST

**Solution:** tree-sitter-qmd fills this gap by providing rich AST for Quarto documents as they're being authored, before execution.

## Architecture

### Relationship to tree-sitter-pandoc-markdown

```
tree-sitter-qmd/
├── tree-sitter-qmd-block/        # Extends pandoc-markdown block grammar
│   ├── grammar.js                # Adds: executable cells, chunk options
│   ├── src/scanner.c             # Extends: cell boundary detection
│   └── queries/
│       ├── highlights.scm        # Quarto-specific highlighting
│       └── injections.scm        # Language injection for cells
│
├── tree-sitter-qmd-inline/       # Extends pandoc-markdown inline grammar
│   ├── grammar.js                # Adds: cross-reference distinction
│   ├── queries/
│       └── highlights.scm        # Enhanced citation/xref highlighting
│
└── common/
    ├── qmd-extensions.js         # Quarto-specific rules
    └── cell-languages.json       # Supported cell languages
```

### Design Philosophy

**Extend, Don't Fork:**
- Import rules from tree-sitter-pandoc-markdown via git submodules
- Add Quarto-specific extensions on top
- Maintain compatibility with base Pandoc features

**Editor-First:**
- Parse raw `.qmd` files (before execution)
- Provide semantic nodes for all Quarto constructs
- Enable rich editor features (autocomplete, validation, navigation)

**Execution-Aware:**
- Distinguish executable cells from regular code blocks
- Parse chunk options as structured data
- Identify cell language and execution context

## Core Features

### Phase 1: Foundation (Extends tree-sitter-pandoc-markdown)

**1.1 Executable Code Cells**

```qmd
```{python}
#| label: fig-plot
#| echo: false
#| fig-cap: "Sample plot"
import matplotlib.pyplot as plt
plt.plot([1, 2, 3])
```
```

**AST Structure:**
```
(executable_code_cell
  (cell_delimiter)
  (cell_language (language_name))
  (chunk_options
    (chunk_option (key) (value))
    (chunk_option (key) (value))
    (chunk_option (key) (value)))
  (cell_content (python_code))
  (cell_delimiter))
```

**Grammar Rules:**
```javascript
executable_code_cell: $ => seq(
  $.cell_delimiter,
  '{', $.language_name, optional($.cell_attributes), '}',
  '\n',
  optional($.chunk_options),
  $.cell_content,
  $.cell_delimiter
),

chunk_options: $ => repeat1($.chunk_option),

chunk_option: $ => seq(
  '#|',
  field('key', $.chunk_option_key),
  ':',
  field('value', $.chunk_option_value),
  '\n'
),

chunk_option_key: $ => /[a-zA-Z][a-zA-Z0-9-]*/,
chunk_option_value: $ => /[^\r\n]+/,
```

**Why This Matters:**
- Syntax highlighting for chunk option keys vs values
- Autocomplete for valid chunk option names
- Validation of chunk option values
- Navigation: jump between cell definitions
- Folding: collapse cell content

**1.2 Cross-Reference Enhancement**

Distinguish cross-references from citations at parse time:

```qmd
See @fig-plot for details.           → (cross_reference type:fig id:plot)
According to @smith2020, we find...  → (citation id:smith2020)
```

**Grammar Rules:**
```javascript
cross_reference: $ => token(/@[A-Za-z]+:[A-Za-z0-9_-]+/),
citation: $ => token(/@[A-Za-z0-9_-]+/),
```

**Why This Matters:**
- Different colors for xrefs vs citations
- Jump-to-definition: xref → figure/table, citation → bibliography
- Validation: ensure referenced figures exist
- Autocomplete: suggest available figure labels

**1.3 Inline Code Cells**

```qmd
The result is `r mean(x)`.
The value is `{python} compute_value()`.
```

**AST Structure:**
```
(inline_code_cell
  (cell_delimiter)
  (language_name)
  (cell_content)
  (cell_delimiter))
```

**Why This Matters:**
- Language injection for inline cells
- Execution context awareness
- Distinguish from regular code spans

### Phase 2: Advanced Quarto Features

**2.1 Cell Options Shorthand**

```qmd
```{python}
#| echo: false
...
```

vs

```{python echo=FALSE}
...
```
```

Parse both syntaxes with semantic equivalence.

**2.2 Callout Blocks (Enhanced Divs)**

```qmd
::: {.callout-note}
## Title
Content
:::
```

Recognize callout types: note, warning, important, tip, caution

**AST Structure:**
```
(callout_block
  (callout_type)
  (callout_title)
  (callout_content))
```

**2.3 Tabsets**

```qmd
::: {.panel-tabset}
## Tab 1
Content 1

## Tab 2
Content 2
:::
```

**2.4 Conditional Content**

```qmd
::: {.content-visible when-format="html"}
HTML-only content
:::
```

Parse conditional attributes for format-specific content.

**2.5 Figure/Table Cross-Reference Metadata**

```qmd
![Caption](image.png){#fig-plot}

| A | B |
|---|---|
| 1 | 2 |
: Table caption {#tbl-data}
```

Link table captions to cross-reference IDs.

### Phase 3: Validation & Advanced Editor Features

**3.1 Cross-Reference Validation**
- Check that `@fig-plot` references an existing figure
- Warn on undefined cross-references
- Suggest available references for autocomplete

**3.2 Chunk Option Validation**
- Validate option names (warn on typos: `lable:` → `label:`)
- Type-check option values (boolean, string, numeric)
- Language-specific options (Python cells don't have R-specific options)

**3.3 Cell Language Detection**
- Parse language specifier: `{python}`, `{r}`, `{julia}`
- Enable language-specific injection queries
- Validate language is supported by Quarto

**3.4 YAML Front Matter Enhancement**
- Parse Quarto-specific YAML keys
- Validate format options
- Type-check YAML values

## Implementation Strategy

### Stage 1: Setup & Foundation (Week 1)

1. **Project Structure**
   ```bash
   git init tree-sitter-qmd
   git submodule add ../tree-sitter-pandoc-markdown
   ```

2. **Import Base Grammar**
   ```javascript
   // grammar.js
   const pandoc = require('../tree-sitter-pandoc-markdown/tree-sitter-pandoc-markdown/grammar.js');

   module.exports = grammar(pandoc, {
     name: 'qmd',
     externals: $ => [
       ...pandoc.externals,
       $.cell_boundary,
     ],
     rules: {
       // Extend pandoc rules
       _block: $ => choice(
         ...pandoc._block.members,
         $.executable_code_cell
       ),
       // ... additional rules
     }
   });
   ```

3. **Test Infrastructure**
   - Copy test framework from tree-sitter-pandoc-markdown
   - Create `test/corpus/executable-cells.txt`
   - Add CI/CD pipeline

### Stage 2: Core Features (Week 2-3)

1. **Executable Cells** (3 days)
   - Grammar rules for cell delimiters
   - Language specifier parsing
   - Cell content capture
   - Test with Python, R, Julia

2. **Chunk Options** (3 days)
   - `#|` prefix recognition
   - Key-value parsing
   - Multi-line chunk options
   - Test edge cases

3. **Cross-References** (2 days)
   - Distinguish from citations
   - Parse type and ID separately
   - Test with all reference types

4. **Inline Code Cells** (2 days)
   - Backtick + language syntax
   - Language injection
   - Test with various languages

### Stage 3: Queries & Highlighting (Week 4)

1. **Syntax Highlighting**
   - `queries/highlights.scm` for Quarto features
   - Distinct colors for chunk options
   - Language injection for cells

2. **Code Injection**
   - `queries/injections.scm` for cell content
   - Python, R, Julia, SQL, Bash support
   - Handle multiple languages in one file

3. **Folding & Indentation**
   - `queries/folds.scm` for cells
   - `queries/indents.scm` for cell structure

### Stage 4: Advanced Features (Week 5-6)

1. **Callouts & Tabsets** (Week 5)
2. **Validation Queries** (Week 6)
3. **Documentation** (Week 6)

## Testing Strategy

### Unit Tests (test/corpus/)

```
test/corpus/
├── executable-cells.txt           # Basic cell syntax
├── chunk-options.txt              # All option types
├── cross-references.txt           # Xrefs vs citations
├── inline-cells.txt               # Inline execution
├── callouts.txt                   # Callout blocks
├── tabsets.txt                    # Panel tabsets
├── edge-cases.txt                 # Complex nesting
└── real-world.txt                 # From quarto-web
```

### Integration Tests

Test with real Quarto documents:
- Clone `quarto-web` repository
- Parse all `.qmd` files
- Ensure no parse errors
- Validate AST structure

### Editor Integration Tests

Test in actual editors:
- Neovim with nvim-treesitter
- Zed editor
- Helix editor
- VSCode (if extension available)

## Success Criteria

### Phase 1 Success
- [x] Parse executable code cells with chunk options
- [x] Distinguish cross-references from citations
- [x] Parse inline code cells
- [x] All tests passing (20+ test cases)
- [x] Basic syntax highlighting works

### Phase 2 Success
- [x] Callouts and tabsets parse correctly
- [x] Conditional content recognized
- [x] Figure/table cross-reference metadata
- [x] 50+ test cases passing
- [x] Advanced highlighting queries

### Phase 3 Success
- [x] Cross-reference validation
- [x] Chunk option validation
- [x] Language detection
- [x] Editor integration in 3+ editors
- [x] Documentation complete

### Production Ready
- [x] Parse quarto-web without errors
- [x] Performance: <100ms for typical documents
- [x] Published to tree-sitter-grammars organization
- [x] Adopted by at least one editor
- [x] Community feedback incorporated

## Maintenance & Evolution

### Version Compatibility

Track compatibility with:
- tree-sitter-pandoc-markdown versions
- Quarto versions (chunk option additions)
- Tree-sitter ABI versions

### Feature Parity with Quarto

Monitor Quarto releases for new syntax:
- New chunk options
- New callout types
- New div classes with semantic meaning

### Community Engagement

1. **Documentation**
   - Comprehensive README
   - Grammar documentation
   - Editor integration guides

2. **Examples**
   - Sample `.qmd` files
   - Query examples
   - Integration examples

3. **Issue Tracking**
   - Bug reports
   - Feature requests
   - Quarto syntax changes

## Comparison: tree-sitter-qmd vs Alternatives

| Feature | tree-sitter-qmd | Quarto Parser | tree-sitter-pandoc-markdown |
|---------|----------------|---------------|----------------------------|
| **Goal** | Editor integration | Rendering pipeline | Base Pandoc features |
| **Parses** | Raw `.qmd` | Post-execution `.md` | `.md` files |
| **Chunk options** | ✅ First-class nodes | ❌ Handled by knitr | ❌ Not Quarto-aware |
| **Cross-refs** | ✅ Distinct from citations | ⚠️  As citations (Pandoc) | ✅ Distinct nodes |
| **Executable cells** | ✅ Explicit AST nodes | ⚠️  Language attr only | ❌ Regular code blocks |
| **Callouts** | ✅ Semantic nodes | ⚠️  Generic divs | ⚠️  Generic divs |
| **Output** | Tree-sitter nodes | Pandoc AST | Tree-sitter nodes |
| **Use case** | Editor features | Document rendering | General Pandoc editing |

## Open Questions

### 1. Submodule vs Copy Strategy

**Option A: Git Submodule**
```
tree-sitter-qmd/
├── tree-sitter-pandoc-markdown/  (submodule)
└── tree-sitter-qmd/
    └── grammar.js                (extends submodule)
```

**Pros:**
- Automatic updates from upstream
- Clear dependency relationship
- Smaller repository size

**Cons:**
- Submodule complexity
- Version pinning challenges
- Build system complexity

**Option B: Copy & Extend**
```
tree-sitter-qmd/
└── grammar.js                    (copies + extends rules)
```

**Pros:**
- Simpler build system
- No submodule complexity
- Full control over grammar

**Cons:**
- Manual synchronization
- Potential drift from upstream
- Code duplication

**Recommendation:** Start with **Copy & Extend** (Option B) for simplicity, consider submodules later if upstream changes frequently.

### 2. Scanner Complexity

**Question:** Do we need a new external scanner or extend the existing one?

**Answer:** Extend existing scanner from tree-sitter-pandoc-markdown:
- Add `CELL_BOUNDARY` token for cell start/end detection
- Add `CHUNK_OPTION_START` token for `#|` lines inside cells
- Keep all existing tokens for Pandoc features

### 3. Language Injection Strategy

**Question:** How do we handle code injection for multiple languages in one file?

**Answer:** Use tree-sitter injection queries:

```scheme
; queries/injections.scm
((executable_code_cell
  (language_name) @_lang
  (#eq? @_lang "python")
  (cell_content) @injection.content)
 (#set! injection.language "python"))

((executable_code_cell
  (language_name) @_lang
  (#eq? @_lang "r")
  (cell_content) @injection.content)
 (#set! injection.language "r"))
```

### 4. Chunk Option Validation

**Question:** Should validation be in the grammar or in a separate tool?

**Answer:** Separate tool (language server):
- Grammar parses structure only
- Language server validates semantics
- Keeps grammar simple and fast
- Enables editor-specific validation

## Next Steps

1. **Review this plan** - Get feedback on architecture decisions
2. **Create repository structure** - Set up directories and files
3. **Port base grammar** - Copy tree-sitter-pandoc-markdown grammar.js
4. **Implement executable cells** - First feature to prove concept
5. **Test in editor** - Validate approach with real editor integration

## References

### Related Projects
- **tree-sitter-pandoc-markdown:** `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-pandoc-markdown`
- **Quarto Markdown Parser:** https://github.com/quarto-dev/quarto-markdown
- **tree-sitter-markdown:** https://github.com/tree-sitter-grammars/tree-sitter-markdown

### Documentation
- **Quarto Documentation:** https://quarto.org/docs/
- **Quarto Chunk Options:** https://quarto.org/docs/computations/execution-options.html
- **Tree-sitter Documentation:** https://tree-sitter.github.io/tree-sitter/

### Comparison Analysis
- **quarto-parser-comparison.md:** `../tree-sitter-pandoc-markdown/docs/quarto-parser-comparison.md`

---

**Plan Version:** 1.0
**Status:** Ready for Implementation
**Estimated Timeline:** 6 weeks to production-ready
