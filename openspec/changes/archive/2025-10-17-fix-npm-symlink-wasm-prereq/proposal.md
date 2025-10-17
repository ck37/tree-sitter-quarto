# Fix npm Symlink Conflict (WASM Build Prerequisite)

## Why

The emscripten installation (required for WASM parser builds) is currently failing due to a Node.js symlink conflict. When running `brew install emscripten`, the installation fails with:

```
Error: Could not symlink bin/npm
Target /opt/homebrew/bin/npm
already exists. You may want to remove it:
  rm '/opt/homebrew/bin/npm'
```

This blocks WASM parser builds, which are essential for:
- Browser-based editor integration (CodeMirror, Monaco)
- Web-based Quarto playgrounds
- Browser extensions for Quarto syntax highlighting
- Cross-platform distribution without native compilation

## What Changes

**Immediate fix:**
- Resolve npm symlink conflict by running `brew link --overwrite node`
- Verify emscripten installation completes successfully
- Document the fix in project setup guide

**Testing:**
- Verify `emcc --version` works after installation
- Confirm WASM toolchain is available
- Document any version requirements

**No breaking changes** - This is pure tooling setup

## Impact

- **Affected specs**: build-tooling (new capability)
- **Affected code**: None (tooling only)
- **Affected documentation**:
  - Add setup instructions to CONTRIBUTING.md or docs/wasm-build.md
  - Document emscripten version requirements
- **Breaking changes**: None
- **Dependencies**: Homebrew, Node.js, emscripten

**Unblocks:**
- WASM parser build implementation
- Web-based editor testing
- Browser extension development
