# Project Context

## Purpose

tree-sitter-quarto is a tree-sitter parser for Quarto Markdown (`.qmd` files), optimized for editor integration. It provides rich syntax trees that enable advanced editor features like:

- **Semantic syntax highlighting** - Distinct colors for chunk options, cross-references, executable cells
- **Jump-to-definition** - Navigate from `@fig-plot` to figure definition
- **Validation** - Catch typos in chunk options, undefined cross-references
- **Autocomplete** - Suggest valid chunk option names and values
- **Code folding** - Collapse executable cells and divs
- **Outline view** - Navigate document structure including cells

**Gap Being Filled:** This project bridges the gap between tree-sitter-pandoc-markdown (editor-focused but not Quarto-aware) and the Quarto Markdown Parser (rendering-focused, not optimized for pre-execution editor experience). It provides parse-time semantic information for Quarto documents as they're being authored, before execution.

**Current Status:** Production Ready - All Core Features Implemented
- ✅ 217/224 tests passing (96.9%)
- ✅ 116/117 requirements implemented (99%) across 11 OpenSpec specifications
- ✅ CI/CD pipeline green (Ubuntu + macOS, Node 18.x + 20.x)
- ✅ All core Quarto features parsed (cells, chunk options, cross-refs, inline cells, shortcodes, fenced divs)
- ✅ Fenced divs fully implemented with unified architecture (callouts, tabsets, conditional content, generic custom classes)
- ✅ Pandoc inline formatting extensions (strikethrough, highlight, subscript, superscript)
- ✅ Fenced code block attributes (`` ```{.python} ``, `` ```bash {.numberLines} ``)
- ✅ Comprehensive test coverage (footnotes, inline attributes, pipe tables, inline formatting, fenced code attributes, generic divs)
- ✅ Generic fenced divs now working (2025-11-02) via unified external scanner
- ✅ Corpus validation: 30% (up from 25%, improving toward 90% target)
- ⏳ Editor integration pending

**Total Specifications:** 11 (all implemented)

**Recent Improvements (2025-11-02):**
- ✅ Implemented generic fenced divs via unified external scanner architecture
- ✅ Refactored all fenced divs to unified structure (callouts, tabsets, conditional, generic)
- ✅ Added depth tracking for nested divs at arbitrary levels
- ✅ Added 11 new generic div tests (all passing)
- ✅ Updated 15 enhanced div tests to unified structure
- ✅ Corpus validation improved from 25% to 30%
- ✅ Added fenced code block attributes support (Pandoc syntax)
- ✅ Extended grammar with three-pattern choice structure
- ✅ Added language injection for 11 languages with attribute-based syntax
- ✅ 217/224 tests passing (96.9%)

**Previous Improvements (2025-11-01):**
- ✅ Merged emphasis/strong emphasis scanner from tree-sitter-markdown (properly attributed)
- ✅ Fixed triple asterisk pattern parsing (`*italic***bold***italic*`)

## Tech Stack

- **JavaScript** - Grammar definition (`grammar.js`)
- **C** - External scanner for context-sensitive parsing (`src/scanner.c`)
- **Node.js** + **npm** - Build tooling and tree-sitter CLI
- **Tree-sitter** - Parser generator framework
- **Scheme** - Query files for syntax highlighting, injections, folding (`queries/*.scm`)

### Planned Language Support (Injection)

Executable cells will support language injection for:
- Python
- R
- Julia
- SQL
- Bash
- Others as needed

## Project Conventions

### Code Style

**File Naming:**
- Use lowercase filenames: `plan.md`, `todo.md`, `readme.md`
- Exceptions: `README.md`, `CONTRIBUTING.md`, `LICENSE` (conventional names)

**Grammar Rules (JavaScript):**
- Use descriptive rule names
- Add comments for complex rules
- Group related rules together
- Use `field()` for important nodes

**Scanner Code (C):**
- Follow existing C style conventions
- Add comments explaining logic
- Handle edge cases carefully
- Test boundary conditions

**Query Files (Scheme):**
- Use consistent indentation (2 spaces)
- Group related patterns
- Add comments for non-obvious patterns
- Test with real documents

### Architecture Patterns

**"Copy & Merge Scanner" Strategy:**
- Copy grammar rules from tree-sitter-pandoc-markdown into this repository
- Merge emphasis/strong emphasis scanner from tree-sitter-markdown (properly attributed)
- Extend with Quarto-specific rules on top (executable cells, chunk options, cross-refs)
- Maintain compatibility with base Pandoc features
- Document source commit hashes for tracking
- Avoids npm dependency complexity while gaining full CommonMark emphasis parsing

**Editor-First Design:**
- Parse raw `.qmd` files (before execution)
- Provide semantic nodes for all Quarto constructs
- Enable rich editor features (autocomplete, validation, navigation)

**Execution-Aware Parsing:**
- Distinguish executable cells from regular code blocks
- Parse chunk options as structured data
- Identify cell language and execution context

**External Scanner Usage:**
- Handle context-sensitive parsing beyond LR(1) capability
- Required tokens: `CHUNK_OPTION_MARKER` (for `#|` lines), `CELL_BOUNDARY`
- Distinguish `#| option` from `# comment` based on cell context

**Scope Naming Philosophy:**
- Use **Zed-compatible legacy scopes** (`@text.*`, `@emphasis.strong`) as default in `queries/highlights.scm`
- **Pragmatic decision**: Zed's architecture prevents extension-level query overrides when grammars are loaded via repository reference
- **Broad compatibility**: Legacy scopes work in Zed, Helix, VSCode, and older editors
- **Modern scopes preserved**: `queries/nvim/highlights.scm` provides nvim-treesitter conventions (`@markup.*`)
- **Separation of concerns**: Grammar = semantic parsing (unchanged); queries = editor-specific presentation
- **Editor-specific query files**: Standard tree-sitter practice to provide `queries/nvim/`, `queries/helix/`, etc.
- **Reference**: https://github.com/ck37/tree-sitter-quarto/issues/5 (architectural decision)

**Why legacy scopes as default:**
Zed extensions cannot override grammar queries when referencing grammars via `repository` + `rev` in `extension.toml`. Zed clones the grammar and loads `queries/highlights.scm` directly, ignoring extension-provided queries. This architectural limitation makes it impossible to use modern scopes with Zed without making them the default. Since Zed support is a blocker for the zed-quarto-extension project, we prioritize Zed compatibility over theoretical "editor-agnostic purity."

### Testing Strategy

**Test Framework:** Tree-sitter corpus format in `test/corpus/*.txt`

**Test Categories:**
1. **Unit Tests** - Individual features (executable-cells.txt, chunk-options.txt, cross-references.txt)
2. **Edge Cases** - Boundary conditions and complex nesting
3. **Integration Tests** - Feature combinations and interactions
4. **Real-World Tests** - Parse actual Quarto documents from quarto-web repository

**Test Structure:**
```
==================
Test name
==================

Input markdown here

---

(expected_ast_structure)
```

**Testing Commands:**
- `npx tree-sitter test` - Run all tests
- `npx tree-sitter test -f <name>` - Run specific test file
- `npx tree-sitter parse examples/sample.qmd` - Parse example document
- `npx tree-sitter parse <file> --debug` - Debug parse tree

**Success Criteria:**
- ✅ All test cases passing (145/145 tests, 100%)
- ✅ 9 OpenSpec specifications verified (116/116 requirements, 100%)
- ✅ CI/CD pipeline passing on Ubuntu and macOS
- ⏳ Parse quarto-web without errors (not yet tested)
- ✅ Performance: ~13,000 bytes/ms average parse speed
- ⏳ Editor integration validated in 3+ editors (pending)

### Git Workflow

**Branching:**
- `main` - Production-ready code
- `feature/feature-name` - Feature branches

**Commit Message Format:**
```
type: brief description

Detailed explanation if needed.

Fixes #issue-number
```

**Commit Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test additions/changes
- `refactor:` - Code restructuring
- `chore:` - Maintenance tasks

**Examples:**
- `feat: add shortcode parsing support`
- `fix: correct chunk option detection in scanner`
- `docs: update architecture decisions in plan.md`

**Important:** Do NOT co-sign commits as Claude

## Domain Context

### Quarto Markdown Ecosystem

**Quarto** is a scientific publishing system that extends Pandoc Markdown with:
- Executable code cells (Python, R, Julia, etc.) ✅ **Implemented**
- Chunk options for controlling cell behavior (`#| label: fig-plot`) ✅ **Implemented**
- Cross-references to figures, tables, equations (`@fig-plot`, `@tbl-data`) ✅ **Implemented**
- Inline code cells (`` `{python} expr` ``) ✅ **Implemented**
- Shortcodes (`{{< video url >}}`) ✅ **Implemented**
- Enhanced divs (callouts, tabsets, conditional content) ✅ **Implemented**
- Pandoc inline formatting (strikethrough, highlight, sub/superscript) ✅ **Implemented**

### Key Quarto Constructs

**Executable Code Cells:**
````markdown
```{python}
#| label: fig-plot
#| echo: false
import matplotlib.pyplot as plt
plt.plot([1, 2, 3])
```
````

**Cross-References vs Citations:**
- `@fig-plot` - Cross-reference to figure (type prefix: `fig`, `tbl`, `eq`, `sec`, `lst`)
- `@smith2020` - Citation (no type prefix)

**Chunk Options:**
- Format: `#| key: value`
- Must appear at start of cell content
- Support single-line and multi-line values with `|` continuation

**Inline Code Cells:**
- `` `{python} expr` `` - Inline execution with language injection

**Shortcodes:**
```markdown
{{< video https://example.com/video.mp4 >}}
{{< embed notebook.ipynb#fig-plot >}}
{{< include _content.qmd >}}
{{< var variable.name >}}
{{< meta title >}}
```
- Block-level: Standalone on their own line
- Inline: Within paragraph text
- Support common Quarto shortcodes: video, embed, include, var, meta

### Tree-sitter Parsing Context

**Parser Capabilities:**
- Incremental parsing for editor performance
- Error recovery for partial documents
- Language injection for multi-language support
- Query system for syntax highlighting, folding, navigation

**LR(1) Limitations:**
- Cannot handle unlimited lookahead
- Context-sensitive parsing requires external scanner
- Must carefully handle ambiguous constructs

### Sibling Project

**tree-sitter-pandoc-markdown** is the base grammar this project extends:
- Repository: https://github.com/ck37/tree-sitter-pandoc-markdown
- Provides: Pandoc Markdown features (citations, divs, spans, attributes)
- Missing: Quarto-specific features (chunk options, executable cell semantics)

## Important Constraints

### Technical Constraints

1. **LR(1) Parsing:** Tree-sitter uses LR(1) algorithm - context-sensitive features need external scanner
2. **External Scanner Required:** Must handle `#|` chunk option detection and cell boundary context
3. **Performance Target:** <100ms parsing time for typical documents (not yet measured)
4. **Compatibility:** Must maintain compatibility with base Pandoc Markdown features
5. **Editor Agnostic:** Uses standard tree-sitter scopes (`@markup.*`) - editor extensions handle remapping

### Design Constraints

1. **Editor-First Focus:** Parse raw `.qmd` files before execution (not post-execution markdown)
2. **No Submodules:** Use "Copy & Extend" strategy rather than git submodules for simplicity
3. **Semantic Precision:** Provide first-class nodes for all Quarto constructs (not generic fallbacks)
4. **Language Injection:** Support multiple language grammars injected into single document

### Implementation Constraints

1. **Validation Separation:** Grammar handles structure only; validation belongs in separate language server
2. **Manual Sync:** Must manually synchronize updates from tree-sitter-pandoc-markdown
3. **Documentation Version:** Track source commit hash from base grammar

## External Dependencies

### Core Dependencies

- **tree-sitter** (npm) - Parser generator framework
- **tree-sitter-cli** (npm) - Command-line tools for development
- **tree-sitter-pandoc-markdown** - Base grammar (copied, not npm dependency yet)
- **Node.js** (v16+) - Runtime for build tools
- **C compiler** - Required for compiling external scanner

### Runtime Dependencies

- Editor plugins (nvim-treesitter, Zed, Helix) will depend on compiled parser
- Language injection depends on availability of language-specific parsers (tree-sitter-python, tree-sitter-r, etc.)

### External Services

- **GitHub** - Repository hosting, issue tracking, CI/CD
- **Quarto** - Reference implementation for syntax specification
- **quarto-web** - Real-world test corpus for validation

### Related Systems

- **Quarto Markdown Parser** (Rust) - Rendering-focused parser, not competitive but complementary
- **tree-sitter-markdown** - Original upstream grammar (via tree-sitter-pandoc-markdown)
- **Pandoc** - Markdown processing system that defines much of the base syntax
