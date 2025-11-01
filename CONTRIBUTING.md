# Contributing to tree-sitter-quarto

Thank you for your interest in contributing! This guide will help you get started.

## Project Status

**Current Phase:** Alpha - Production-ready with all core features implemented

All core features are complete and tested. Contributions welcome for bug fixes, performance improvements, documentation, and expanding test coverage against real-world Quarto documents.

### Priority Areas for Contribution

1. **Real-world parsing** - Improve success rate from 20% to 90% target
2. **Bug fixes** - Address known limitations (see README.md)
3. **Editor integrations** - Extensions for Neovim, Helix, VSCode
4. **Documentation** - Improve examples and guides
5. **Performance** - Optimize parser speed and WASM size

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- C compiler (for external scanner)
- Git

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ck37/tree-sitter-quarto.git
   cd tree-sitter-quarto
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Generate the parser:
   ```bash
   npx tree-sitter generate
   ```

4. Run tests:
   ```bash
   npx tree-sitter test
   ```

## Development Workflow

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes to:
   - `grammar.js` - Grammar rules
   - `src/scanner.c` - External scanner (if needed)
   - `queries/*.scm` - Syntax highlighting queries
   - `test/corpus/*.txt` - Test cases

3. Generate and test:
   ```bash
   npx tree-sitter generate
   npx tree-sitter test
   ```

4. Parse example files:
   ```bash
   npx tree-sitter parse examples/sample.qmd
   ```

### Writing Tests

Tests follow the tree-sitter corpus format in `test/corpus/*.txt`:

```
==================
Test name
==================

Input markdown here

---

(expected_ast_structure)
```

**Guidelines:**
- One feature per test case
- Include edge cases
- Test feature interactions
- Add descriptive test names

### Code Style

**Grammar Rules:**
- Use descriptive rule names
- Add comments for complex rules
- Group related rules together
- Use `field()` for important nodes

**Scanner Code:**
- Follow existing C style
- Add comments explaining logic
- Handle edge cases
- Test boundary conditions

**Query Files:**
- Use consistent indentation (2 spaces)
- Group related patterns
- Add comments for non-obvious patterns
- Test with real documents

## File Naming Convention

**Use lowercase filenames throughout:**
- ✅ `plan.md`, `todo.md`, `readme.md`
- ❌ `PLAN.md`, `TODO.md`, `README.md`

Exception: `README.md`, `CONTRIBUTING.md`, `LICENSE` (conventional names)

## Project Structure

```
tree-sitter-quarto/
├── grammar.js              # Main grammar file
├── src/
│   └── scanner.c           # External scanner
├── queries/
│   ├── highlights.scm      # Syntax highlighting
│   ├── injections.scm      # Language injection
│   ├── folds.scm           # Code folding
│   └── locals.scm          # Local variables
├── test/
│   └── corpus/             # Test cases
│       ├── executable-cells.txt
│       ├── chunk-options.txt
│       └── ...
├── examples/
│   └── sample.qmd          # Example document
└── docs/                   # Documentation
    ├── plan.md
    ├── todo.md
    └── ...
```

## Architecture Overview

### Base Grammar

This parser extends tree-sitter-pandoc-markdown using the "Copy & Extend" strategy:
- Copy `grammar.js` from tree-sitter-pandoc-markdown
- Extend with Quarto-specific rules
- Document source commit hash

### Implemented Features

1. **Executable Code Cells** - Parses `{python}`, `{r}`, `{julia}` cells with semantic nodes
2. **Chunk Options** - Structured parsing of `#| key: value` syntax
3. **Cross-References** - Distinguishes `@fig-plot` from `@citation`
4. **Inline Code Cells** - Parses `` `{python} expr` `` with language injection
5. **Shortcodes** - Parses `{{< video url >}}` in block and inline contexts
6. **Enhanced Divs** - Callouts, tabsets, conditional content
7. **Inline Attributes** - Pandoc span syntax `[text]{.class}`
8. **Inline Formatting** - Subscript, superscript, strikethrough, highlight
9. **Footnotes** - Full Pandoc footnote support

See [README.md](./README.md) for complete feature list and [docs/plan.md](./docs/plan.md) for architecture details.

## External Scanner

The external scanner (`src/scanner.c`) handles context-sensitive parsing that can't be expressed in the grammar alone. It's fully implemented and rarely needs modification.

**Current functionality:**
- Detects `#|` chunk option markers at cell start
- Handles context-aware cell boundary detection
- Distinguishes `#| option` from `# comment` based on context

**When to modify:**
Most contributors won't need to touch the scanner. Only modify if adding features that require context-sensitive parsing beyond LR(1) grammar capability.

## Testing Guidelines

### Test Categories

1. **Unit Tests** - Individual features
2. **Edge Cases** - Boundary conditions
3. **Integration Tests** - Feature combinations
4. **Real-World Tests** - Parse actual Quarto documents

### Running Tests

```bash
# Run all tests
npx tree-sitter test

# Run specific test file
npx tree-sitter test -f executable-cells

# Debug test failures
npx tree-sitter test --debug
```

### Adding Test Cases

1. Add test to appropriate `test/corpus/*.txt` file
2. Run `npx tree-sitter test`
3. If needed, update expected AST
4. Verify parse tree with `npx tree-sitter parse`

### Real-World Validation

We validate against real Quarto documents from the Quarto website. Current success rate is 20%, targeting 90%. To help:

```bash
# Run validation (requires cloning quarto-web repo)
npm run validate:corpus

# Validate specific documents
npm run validate:sample path/to/file.qmd
```

Contributions that improve real-world parsing success are especially welcome!

### Performance Benchmarking

We track parser performance and WASM size:

```bash
# Run benchmarks
npm run benchmark

# Compare against baseline
npm run benchmark:compare

# Update baseline after intentional changes
npm run benchmark:baseline

# Check WASM size
npm run wasm:size
```

Contributions should not significantly regress performance without good reason.

## Documentation

### When to Update Docs

- Adding new features → Update `README.md` and relevant docs
- Changing architecture → Update `docs/plan.md`
- Fixing bugs or limitations → Update known issues in `README.md`
- Editor integration changes → Update `docs/editor-integration.md`

### Documentation Structure

The `docs/` directory is organized into current and historical documentation:

**Current Documentation (docs/ root):**
- `README.md` - Documentation overview and organization
- `plan.md` - Implementation history and architecture
- `todo.md` - Implementation checklist
- `validation.md` - Corpus validation methodology and results
- `benchmarks.md` - Performance characteristics
- `editor-integration.md` - Guide for editor extension developers
- `comparison.md` - Parser ecosystem comparison
- `visual-comparison.md` - AST output examples
- `reference-documentation.md` - Quick reference
- Known limitations docs (generic-fenced-div-limitation.md, inline-attributes-known-issues.md, zed-compatibility-resolution.md)

**Historical Documentation (docs/archive/):**
The `archive/` directory contains point-in-time snapshots, session notes, and completed research organized by category:
- `sessions/` - Development session records
- `validation/` - Historical corpus validation results
- `performance/` - Performance investigation snapshots
- `features/` - Completed feature research
- `releases/` - Historical release planning
- `comparisons/` - Parser comparison research
- `design-notes/` - Design decisions and lessons learned
- `wasm/` - WASM build setup and test results

Update current documentation when making changes. Historical documents are preserved for context but not actively maintained.

**Project-Level Documentation:**
- `README.md` - Project overview, features, and quick start
- `CONTRIBUTING.md` - This file
- `CLAUDE.md` - Guidance for AI assistants

## OpenSpec Process

This project uses [OpenSpec](./openspec/AGENTS.md) for managing significant changes. For major features, breaking changes, or architectural shifts:

1. Create a proposal using `/openspec:proposal`
2. Wait for review and approval
3. Implement using `/openspec:apply`
4. Archive when deployed using `/openspec:archive`

For minor changes, bug fixes, and documentation updates, you can skip the OpenSpec process and submit PRs directly.

## Pull Request Process

1. **Before submitting:**
   - Run all tests (`npx tree-sitter test`)
   - Update documentation
   - Add test cases for new features
   - Follow code style guidelines
   - For major changes, create an OpenSpec proposal first

2. **PR description should include:**
   - What: Brief description of changes
   - Why: Rationale for changes
   - Testing: How you tested the changes
   - Docs: What documentation was updated

3. **Review process:**
   - Maintainers will review your PR
   - Address feedback
   - Ensure CI passes
   - Squash commits if requested

## Commit Messages

**Format:**
```
type: brief description

Detailed explanation if needed.

Fixes #issue-number
```

**Types:**
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
- `test: add edge cases for nested cells`

## Questions or Issues?

- **Bug reports:** Open a GitHub issue with reproduction steps
- **Feature requests:** Open an issue describing the use case
- **Questions:** Start a GitHub discussion
- **Security issues:** Email maintainers directly

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Assume good intentions

## Related Projects

- [zed-quarto-extension](https://github.com/ck37/zed-quarto-extension) - Zed editor extension using this parser
- [tree-sitter-pandoc-markdown](https://github.com/ck37/tree-sitter-pandoc-markdown) - Base grammar
- [quarto-markdown](https://github.com/quarto-dev/quarto-markdown) - Official Quarto grammars (planned 2026)
- [Quarto](https://quarto.org/) - Publishing system
- [tree-sitter](https://tree-sitter.github.io/) - Parser framework

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to tree-sitter-quarto!**
