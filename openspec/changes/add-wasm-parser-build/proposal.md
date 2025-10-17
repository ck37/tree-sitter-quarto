# Add WASM Parser Build

## Why

Currently, tree-sitter-quarto only builds native parsers (C binaries), limiting its use to environments where native compilation is available. WASM (WebAssembly) builds would enable the parser to run in:

**Browser-based editors:**
- CodeMirror 6 with tree-sitter support
- Monaco Editor (VSCode web)
- Ace Editor with WASM plugins

**Web applications:**
- Quarto playgrounds (live editing/preview in browser)
- Documentation sites with syntax highlighting
- Online Quarto converters

**Browser extensions:**
- Chrome/Firefox extensions for Quarto file viewing
- GitHub syntax highlighting for .qmd files

**Cross-platform distribution:**
- No native compilation required
- Single binary works across all platforms
- Easier deployment and updates

**Current gap:** Without WASM builds, the parser cannot be used in any browser-based tools, significantly limiting its reach and utility.

## What Changes

### 1. Build Configuration
- Add WASM build target to tree-sitter.json
- Configure emscripten compiler flags
- Set up output directory for WASM artifacts

### 2. Build Scripts
- Add npm script for WASM build: `npm run build:wasm`
- Generate tree-sitter-quarto.wasm output
- Generate JavaScript bindings (tree-sitter-quarto.js)
- Create combined distribution package

### 3. Testing
- Verify WASM parser loads in Node.js
- Test basic parsing in browser environment
- Validate AST output matches native parser
- Performance benchmarking (WASM vs native)

### 4. Distribution
- Add WASM artifacts to npm package
- Document how to use WASM parser in browsers
- Provide usage examples (CodeMirror, Monaco)

### 5. CI/CD
- Add WASM build step to GitHub Actions
- Verify WASM output on each commit
- Include WASM in release artifacts

**No breaking changes** - WASM build is additive to existing native builds

## Impact

- **Affected specs**: wasm-build (new capability)
- **Affected code**:
  - `tree-sitter.json`: Add WASM configuration
  - `package.json`: Add build:wasm script
  - `.github/workflows/`: Add WASM build step
- **Affected documentation**:
  - Add WASM usage guide
  - Update README with browser usage instructions
  - Document performance characteristics
- **New artifacts**:
  - `tree-sitter-quarto.wasm` (WASM binary)
  - `tree-sitter-quarto.js` (JavaScript bindings)
- **Breaking changes**: None
- **Dependencies**: emscripten (already being installed)

**Enables:**
- Browser-based Quarto editors
- Syntax highlighting in web UIs
- Online Quarto tools and playgrounds
- Cross-platform distribution
