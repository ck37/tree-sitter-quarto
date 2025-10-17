# WASM Build Setup

This document describes how to set up the WebAssembly (WASM) build toolchain for tree-sitter-quarto.

## Prerequisites

### emscripten

The WASM parser build requires [emscripten](https://emscripten.org/), the WebAssembly compilation toolchain.

**macOS Installation (Homebrew):**

```bash
brew install emscripten
```

**Version Requirements:**
- emscripten 4.0.16 or compatible
- Node.js 24.10.0+ (installed automatically as emscripten dependency)

### npm Symlink Conflict Resolution

On macOS, if you encounter an npm symlink conflict during emscripten installation:

```
Error: Could not symlink bin/npm
Target /opt/homebrew/bin/npm already exists
```

**Solution:**

```bash
# Unlink and relink node to fix symlinks
brew unlink node && brew link node

# Then retry emscripten installation
brew install emscripten
```

This ensures Homebrew's node installation has proper symlinks for npm and related tools.

## Verification

After installation, verify the toolchain is working:

```bash
# Check emscripten version
emcc --version
# Should output: emcc (Emscripten gcc/clang-like replacement + linker emulating GNU ld) 4.0.16-git

# Verify all emscripten tools are available
which emcc && which em++ && which emrun

# Test basic compilation
cat > /tmp/test.c <<'EOF'
#include <stdio.h>
int main() {
    printf("Hello from emscripten!\n");
    return 0;
}
EOF

cd /tmp && emcc test.c -o test.html && node test.js
# Should output: Hello from emscripten!
```

## What This Enables

With emscripten installed, you can:
- Build WASM parser with `tree-sitter build --wasm`
- Test WASM parser in browser environments
- Integrate with browser-based editors (CodeMirror, Monaco)
- Create web-based Quarto syntax highlighting demos
- Support browser extensions

## Next Steps

See [WASM Parser Build](wasm-parser-build.md) for instructions on building and testing the WASM parser.

## Troubleshooting

### "emcc: command not found"

Ensure emscripten is installed and in your PATH:
```bash
brew info emscripten
# Should show: Installed
```

### Compilation errors with emcc

First-time compilation will build emscripten system libraries (this is normal and takes a few minutes):
```
cache:INFO: generating system library: sysroot/lib/wasm32-emscripten/libc-debug.a...
```

These libraries are cached for subsequent builds.

### Node.js version conflicts

If you have multiple Node.js installations (nvm, fnm, etc.), ensure Homebrew's node is active:
```bash
brew unlink node && brew link node
node --version  # Should match Homebrew's version
```

## Platform-Specific Notes

**macOS:**
- Uses Homebrew package manager
- npm symlink conflicts can occur with other Node.js managers (nvm, fnm)
- Solution: Let Homebrew manage node/npm symlinks

**Linux:**
- Install emscripten via package manager or [emsdk](https://emscripten.org/docs/getting_started/downloads.html)

**Windows:**
- Use [emsdk](https://emscripten.org/docs/getting_started/downloads.html) for installation
- Ensure Visual Studio Build Tools are installed

## References

- [Emscripten Documentation](https://emscripten.org/docs/getting_started/index.html)
- [tree-sitter WASM Documentation](https://tree-sitter.github.io/tree-sitter/creating-parsers#command-build)
