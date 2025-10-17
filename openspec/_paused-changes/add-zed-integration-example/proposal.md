# Add Zed Editor Integration Example

## Why

The parser is feature-complete (100% spec coverage, 145/145 tests passing) and ready for editor integration, but lacks concrete examples showing how to use it in real editors. Without working examples, potential users face a steep learning curve integrating the parser.

**Current state:**
- ✅ Parser fully functional with all Quarto features
- ✅ Highlight queries for semantic scoping (standard + Zed-specific)
- ✅ Language injection queries for code cells
- ❌ No working editor integration examples
- ❌ No documentation for editor setup
- ❌ Users must figure out integration from scratch

**Why Zed first:**
- You already have `zed-quarto-extension` repository
- Zed has first-class tree-sitter support
- Zed requires specific query file structure (queries/zed/)
- This parser already has Zed-compatible queries prepared
- Straightforward integration path

**Value to users:**
- **Developers**: Working example to learn from
- **Editor users**: Immediate Quarto support in Zed
- **Other editors**: Template for Neovim, Helix, VSCode integrations
- **Project**: Proof of production readiness

## What Changes

### 1. Zed Extension Development
- Create example Zed extension in `examples/zed-extension/`
- Configure extension.toml with grammar metadata
- Wire up tree-sitter-quarto parser
- Include highlight queries (use existing queries/zed/highlights.scm)
- Include language injection queries

### 2. Extension Testing
- Test extension with sample.qmd
- Verify syntax highlighting works for all Quarto features:
  - Executable code cells
  - Chunk options
  - Cross-references
  - Inline code cells
  - Shortcodes
  - Enhanced divs (callouts, tabsets)
  - Inline formatting (strikethrough, highlight, sub/super script)
- Test language injection in code cells
- Verify performance is acceptable

### 3. Documentation
- Create docs/zed-integration.md with step-by-step guide
- Document how to install extension in Zed
- Document how to customize (if needed)
- Add screenshots showing syntax highlighting
- Link to zed-quarto-extension if more complete version exists

### 4. README Updates
- Add "Editor Support" section to README
- Link to Zed example
- Note that other editors (Neovim, Helix) will follow similar pattern
- Encourage community contributions for other editors

### 5. Optional: Publish to Zed Extension Registry
- If extension is production-ready, submit to Zed registry
- Makes installation one-click for Zed users
- Demonstrates real-world production use

**No parser changes** - This uses the existing parser

## Impact

- **Affected specs**: editor-integration (new capability)
- **Affected code**:
  - Create `examples/zed-extension/` directory with extension code
  - No parser code changes
- **Affected documentation**:
  - Create docs/zed-integration.md
  - Update README with editor support section
  - Add screenshots/examples
- **New artifacts**:
  - Working Zed extension example
  - Integration guide
- **Breaking changes**: None

**Enables:**
- Immediate Quarto support in Zed editor
- Template for other editor integrations
- Demonstration of parser capabilities
- User adoption and feedback
- Evidence of production readiness

**Relationship to zed-quarto-extension:**
- If `ck37/zed-quarto-extension` already exists and works, this example can reference it
- If not complete, this provides working baseline
- Can exist as example/reference even if separate extension published
