# tree-sitter-quarto Implementation Checklist

**Status:** Planning Phase
**Last Updated:** 2025-10-13

## Stage 1: Setup & Foundation

### Repository Setup
- [ ] Initialize git repository
- [ ] Copy grammar from tree-sitter-pandoc-markdown
- [ ] Set up npm package structure
- [ ] Create package.json with dependencies
- [ ] Configure tree-sitter bindings
- [ ] Set up CI/CD (GitHub Actions)

### Documentation
- [x] Create PLAN.md
- [x] Create README.md
- [x] Create TODO.md
- [x] Create example .qmd file
- [ ] Create CONTRIBUTING.md
- [ ] Create LICENSE

### Test Infrastructure
- [ ] Copy test framework from tree-sitter-pandoc-markdown
- [ ] Create test/corpus/ directory structure
- [ ] Set up tree-sitter test command
- [ ] Configure test runner scripts

## Stage 2: Core Grammar Implementation

### Block Grammar (tree-sitter-quarto-block)

#### Executable Code Cells
- [ ] Define `executable_code_cell` rule
- [ ] Parse cell delimiter (` ``` `)
- [ ] Parse language specifier (`{python}`, `{r}`, etc.)
- [ ] Parse cell attributes (`{python echo=FALSE}`)
- [ ] Parse cell content
- [ ] Test: Basic Python cell
- [ ] Test: Basic R cell
- [ ] Test: Basic Julia cell
- [ ] Test: Cell with attributes
- [ ] Test: Empty cell

#### Chunk Options
- [ ] Define `chunk_options` rule
- [ ] Parse `#|` prefix
- [ ] Parse option key
- [ ] Parse option value
- [ ] Handle multi-line values (with `|` continuation)
- [ ] Test: Single option
- [ ] Test: Multiple options
- [ ] Test: Multi-line option value
- [ ] Test: Edge case - option at cell end

#### Enhanced Divs
- [ ] Extend fenced_div for callouts
- [ ] Recognize callout types (note, warning, important, tip, caution)
- [ ] Parse tabsets (`.panel-tabset`)
- [ ] Parse conditional content (`.content-visible`, `.content-hidden`)
- [ ] Test: Basic callout
- [ ] Test: All callout types
- [ ] Test: Tabsets
- [ ] Test: Conditional divs

### Inline Grammar (tree-sitter-quarto-inline)

#### Cross-References
- [ ] Define `cross_reference` token (distinct from citations)
- [ ] Parse `@fig:id`, `@tbl:id`, `@eq:id` patterns
- [ ] Parse `@sec:id`, `@lst:id` patterns
- [ ] Test: Figure reference
- [ ] Test: Table reference
- [ ] Test: Equation reference
- [ ] Test: Section reference
- [ ] Test: Mixed with citations

#### Inline Code Cells
- [ ] Define `inline_code_cell` rule
- [ ] Parse `` `{python} expr` `` syntax
- [ ] Parse `` `{r} expr` `` syntax
- [ ] Parse language specifier
- [ ] Parse cell content
- [ ] Test: Python inline cell
- [ ] Test: R inline cell
- [ ] Test: Mixed with code spans

#### Shortcodes
- [ ] Define `shortcode` rule
- [ ] Parse `{{< name args >}}` syntax
- [ ] Parse shortcode name
- [ ] Parse shortcode arguments
- [ ] Test: Basic shortcodes (video, embed, include)
- [ ] Test: Shortcodes with URLs
- [ ] Test: Shortcodes with file paths
- [ ] Test: Self-closing shortcodes

#### Enhanced Citations
- [ ] Keep existing citation rule
- [ ] Ensure cross-references don't conflict
- [ ] Test: Citation vs cross-reference distinction
- [ ] Test: `@author` (citation) vs `@fig-1` (cross-ref)

### External Scanner (Required)

- [ ] Extend pandoc-markdown scanner with Quarto tokens
- [ ] Implement `CHUNK_OPTION_MARKER` token for `#|` at cell start
- [ ] Implement `CELL_BOUNDARY` token for context-aware delimiters
- [ ] Handle multi-line chunk option continuation (`|`)
- [ ] Test scanner with edge cases
- [ ] Test nested code blocks in cells

## Stage 3: Test Suite

### Basic Tests
- [ ] test/corpus/executable-cells.txt (10+ cases)
- [ ] test/corpus/chunk-options.txt (10+ cases)
- [ ] test/corpus/cross-references.txt (10+ cases)
- [ ] test/corpus/inline-cells.txt (5+ cases)
- [ ] test/corpus/shortcodes.txt (8+ cases)
- [ ] test/corpus/callouts.txt (6+ cases)
- [ ] test/corpus/tabsets.txt (3+ cases)

### Edge Cases
- [ ] Nested divs
- [ ] Cells inside callouts
- [ ] Multi-line chunk options
- [ ] Empty cells
- [ ] Missing closing delimiters
- [ ] Multiple languages in one file

### Integration Tests
- [ ] Parse examples/sample.qmd without errors
- [ ] Clone quarto-web and test on real files
- [ ] Measure parse time for large documents
- [ ] Validate AST structure matches expectations

## Stage 4: Queries & Highlighting

### Syntax Highlighting (queries/highlights.scm)
- [ ] Highlight chunk option keys
- [ ] Highlight chunk option values
- [ ] Highlight language specifiers
- [ ] Highlight cross-references (distinct from citations)
- [ ] Highlight callout types
- [ ] Highlight cell boundaries
- [ ] Test in Neovim
- [ ] Test in Zed
- [ ] Test in Helix

### Code Injection (queries/injections.scm)
- [ ] Inject Python syntax in Python cells
- [ ] Inject R syntax in R cells
- [ ] Inject Julia syntax in Julia cells
- [ ] Inject SQL syntax in SQL cells
- [ ] Inject Bash syntax in Bash cells
- [ ] Test multi-language documents

### Folding (queries/folds.scm)
- [ ] Fold executable cells
- [ ] Fold callouts
- [ ] Fold tabsets
- [ ] Fold divs

### Indentation (queries/indents.scm)
- [ ] Indent cell content
- [ ] Indent div content
- [ ] Indent chunk options

## Stage 5: Editor Integration

### Neovim
- [ ] Test with nvim-treesitter
- [ ] Verify syntax highlighting
- [ ] Verify code injection
- [ ] Verify folding
- [ ] Create installation instructions

### Zed
- [ ] Test in Zed editor
- [ ] Verify syntax highlighting
- [ ] Create configuration guide

### Helix
- [ ] Test in Helix
- [ ] Verify syntax highlighting
- [ ] Create setup instructions

### VSCode (stretch goal)
- [ ] Investigate VSCode extension
- [ ] Test basic integration

## Stage 6: Validation & Advanced Features

### Cross-Reference Validation
- [ ] Define validation queries
- [ ] Check undefined references
- [ ] Warn on typos in reference types
- [ ] Suggest available references

### Chunk Option Validation
- [ ] Define validation queries
- [ ] Check option name typos
- [ ] Validate option value types
- [ ] Check language-specific options

### Language Detection
- [ ] Detect all supported languages
- [ ] Validate language names
- [ ] Warn on unsupported languages

### YAML Enhancement
- [ ] Parse Quarto-specific YAML keys
- [ ] Validate format options
- [ ] Type-check YAML values

## Stage 7: Documentation & Release

### User Documentation
- [ ] Write comprehensive README
- [ ] Document all node types
- [ ] Create query examples
- [ ] Write editor integration guides
- [ ] Add troubleshooting section

### Developer Documentation
- [ ] Document grammar structure
- [ ] Explain design decisions
- [ ] Create contribution guidelines
- [ ] Document testing procedures
- [ ] Add release process

### Release Preparation
- [ ] Version 0.1.0 (first functional release)
- [ ] Publish to npm
- [ ] Submit to tree-sitter-grammars org
- [ ] Announce on Quarto forum
- [ ] Create demo videos/screenshots

## Metrics & Goals

### Performance
- [ ] Parse 1000-line document in <100ms
- [ ] Parse examples/sample.qmd in <10ms
- [ ] No memory leaks in long editing sessions
- [ ] Incremental parsing works correctly

### Quality
- [ ] 100+ test cases passing
- [ ] 0 known parse errors on quarto-web
- [ ] All queries working in 3+ editors
- [ ] Documentation complete and clear

### Adoption
- [ ] 10+ GitHub stars
- [ ] Adopted by at least one editor community
- [ ] Positive feedback from Quarto users
- [ ] Active issue tracking and resolution

## Decision Log

### Architecture Decisions
- [x] Use "Copy & Extend" strategy (not git submodules)
  - Rationale: Simpler build, easier to customize
  - Implementation: Copy grammar.js from tree-sitter-pandoc-markdown
  - Future: Consider npm package if needed

- [x] Scanner strategy (Decided)
  - Decision: Extend existing scanner with Quarto-specific tokens
  - Add: `CHUNK_OPTION_MARKER` for `#|` at cell start
  - Add: `CELL_BOUNDARY` for context-aware cell delimiters
  - Rationale: Chunk options and cell boundaries need context-sensitive parsing

- [x] Validation approach (Decided)
  - Decision: Separate language server (not in grammar)
  - Rationale: Keeps grammar fast and focused on structure
  - Grammar: Parse structure only
  - LSP: Validate semantics, provide autocomplete

### Implementation Decisions
- [ ] Chunk option parsing strategy (TBD)
  - Option 1: Token per option
  - Option 2: Single chunk_options node with children
  - Decision: TBD after experimentation

## Open Questions

### Technical
1. Do we need external scanner for cell boundaries?
2. Should multi-line chunk option values be supported?
3. How do we handle incomplete cells during editing?
4. Should we validate chunk option semantics in grammar?

### Community
1. Should we coordinate with Quarto team?
2. Should we coordinate with tree-sitter-grammars org?
3. How do we handle Quarto version differences?
4. What's the process for adding new Quarto features?

## Resources

### Reference Implementations
- tree-sitter-pandoc-markdown: `../tree-sitter-pandoc-markdown`
- Quarto Markdown Parser: https://github.com/quarto-dev/quarto-markdown
- tree-sitter-markdown: https://github.com/tree-sitter-grammars/tree-sitter-markdown

### Documentation
- Quarto Docs: https://quarto.org/docs/
- Tree-sitter Docs: https://tree-sitter.github.io/tree-sitter/
- Chunk Options: https://quarto.org/docs/computations/execution-options.html

---

**Progress:** 0% (5/200+ tasks complete - planning phase)
**Next Milestone:** Stage 1 complete (repository setup)
**Estimated Timeline:** 6 weeks to Stage 7
