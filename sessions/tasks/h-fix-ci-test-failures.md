---
name: h-fix-ci-test-failures
branch: fix/h-fix-ci-test-failures
status: pending
created: 2025-11-02
---

# Fix CI Test Failures

## Problem/Goal

The CI is failing because the workflows are configured for the old single-grammar architecture, but the codebase has been refactored to use a dual-grammar architecture (block + inline grammars in separate `grammars/` directories).

**Main CI Failures:**
1. **Grammar not found** - CI runs `npx tree-sitter generate` from root, but `grammar.js` is now in `grammars/block/` and `grammars/inline/`
2. **Missing parser files** - Build process expects `src/parser.o` and `src/scanner.o` in root, but they're now in `grammars/*/src/`
3. **All 217 block grammar tests failing locally** - Tests expect inline content to be parsed as `(inline (text))` but getting just `(inline)` without text nodes

**Affected CI Jobs:**
- Validate Grammar
- Zed Editor Compatibility
- Test Parser (all platforms/node versions)
- Validate Queries
- Lint Code

## Success Criteria
- [ ] CI workflows updated to use dual-grammar build commands (`npm run build:all`, `npm run test:grammars`)
- [ ] All block grammar tests passing (currently 0/217 passing)
- [ ] All inline grammar tests passing
- [ ] GitHub Actions CI run completes successfully (all jobs green)
- [ ] WASM builds successfully in CI
- [ ] Bindings build successfully in CI

## Context Manifest

### How the Dual-Grammar Architecture Currently Works

**The Architectural Shift:**

The repository recently migrated from a unified grammar architecture (single grammar.js at root) to a **dual-grammar architecture** (separate block and inline grammars in `grammars/` subdirectories). This architectural change was completed in the codebase but the CI workflows were not updated, causing all CI jobs to fail.

**Current Directory Structure:**

```
tree-sitter-quarto/
├── grammars/
│   ├── block/                    # Block-level grammar (production-ready)
│   │   ├── grammar.js            # 437 lines - block rules only
│   │   ├── package.json          # name: "tree-sitter-quarto-block"
│   │   ├── tree-sitter.json      # Grammar config for CLI 0.25.10
│   │   ├── src/
│   │   │   ├── parser.c          # Generated - exports tree_sitter_quarto_block()
│   │   │   ├── scanner.c         # 306 lines - block scanner
│   │   │   └── tree_sitter/      # Parser headers
│   │   ├── queries/              # Block-specific queries
│   │   │   ├── highlights.scm
│   │   │   ├── injections.scm    # KEY: Injects quarto_inline grammar
│   │   │   └── ...
│   │   └── test/corpus/          # Block grammar test suites
│   └── inline/                   # Inline-level grammar (integrated)
│       ├── grammar.js            # 395 lines - inline rules
│       ├── package.json          # name: "tree-sitter-quarto-inline"
│       ├── tree-sitter.json
│       ├── src/
│       │   ├── parser.c          # Generated - exports tree_sitter_quarto_inline()
│       │   ├── scanner.c         # Inline scanner
│       │   └── tree_sitter/
│       ├── queries/
│       └── test/corpus/          # Inline grammar test suites
│
├── src/                          # Root src - ONLY contains tree_sitter headers
│   └── tree_sitter/
│       ├── parser.h              # Tree-sitter 0.25.10 headers
│       ├── alloc.h
│       └── array.h
│
├── bindings/
│   └── node/
│       └── binding.cc            # Node bindings - expects tree_sitter_quarto()
│
├── binding.gyp                   # Build configuration - points to src/parser.c, src/scanner.c
├── package.json                  # Root package - has build:all, test:grammars scripts
├── tree-sitter.json              # Root config - name: "quarto" (not "quarto_block")
└── (No grammar.js at root!)      # THIS IS KEY - grammar moved to grammars/
```

**Critical Problem:** The CI workflows try to run `npx tree-sitter generate` from the repository root, but there's no `grammar.js` file at the root anymore. The grammar files are now in `grammars/block/grammar.js` and `grammars/inline/grammar.js`.

**Why the Dual-Grammar Architecture Was Adopted:**

The unified grammar approach had fundamental **lexer precedence conflicts** that prevented scanner-controlled fence detection. When the parser encountered ` ```yaml ` inside a code block, the lexer rules would try to parse the YAML content as YAML syntax, creating ERROR nodes (GitHub issue #17). The dual-grammar architecture solves this by:

1. **Block grammar** - Scanner-controlled fence detection emits opaque `CODE_BLOCK_LINE` tokens for content inside fences, preventing the grammar from interfering
2. **Inline grammar** - Handles all inline content (emphasis, links, citations, cross-references)
3. **Language injection** - Block grammar's `queries/injections.scm` injects the inline grammar for all `(inline)` nodes

This matches the architecture of tree-sitter-pandoc-markdown, the sibling project.

**How Language Injection Works:**

In `grammars/block/grammar.js`, the `inline` node is defined as a minimal stub:

```javascript
inline: ($) => token(/[^\r\n]+/),
```

This creates an `(inline)` node with raw text content. Then `grammars/block/queries/injections.scm` contains:

```scm
((inline) @injection.content
 (#set! injection.language "quarto_inline"))
```

This tells tree-sitter to parse the content of every `(inline)` node using the `quarto_inline` grammar, which provides full inline parsing (emphasis, strong emphasis, links, citations, cross-references, code spans, etc.).

**Test Failures Pattern:**

When running `cd grammars/block && npx tree-sitter test`, ALL 217 tests fail with the same pattern:

- **Expected:** `(inline (text))`
- **Actual:** `(inline)` (no text node)

This happens because language injection only works in editors, NOT in the tree-sitter CLI test runner. The CLI doesn't process injection queries when running `tree-sitter test`. This is a known limitation - test expectations need to match what the block grammar alone produces (just `(inline)` with raw text), not what the injected inline grammar would produce.

### How the Build System Works (Node Bindings)

**The Build Process:**

The Node.js bindings use **node-gyp** (via node-gyp-build) to compile native addons. The build is configured in `binding.gyp`:

```json
{
  "targets": [{
    "target_name": "tree_sitter_quarto_binding",
    "include_dirs": ["src"],
    "sources": [
      "bindings/node/binding.cc",
      "src/parser.c",      // PROBLEM: Doesn't exist at root!
      "src/scanner.c"      // PROBLEM: Doesn't exist at root!
    ]
  }]
}
```

**Why CI Builds Fail:**

1. CI runs `npm install` which triggers the `install` script in package.json: `"install": "node-gyp-build"`
2. node-gyp-build tries to run `node-gyp rebuild` to compile the addon
3. binding.gyp lists `src/parser.c` and `src/scanner.c` as sources
4. These files don't exist at the root - they're in `grammars/block/src/`
5. Linker error: `cannot find Release/obj.target/tree_sitter_quarto_binding/src/parser.o`

**The Function Name Mismatch:**

`bindings/node/binding.cc` expects a C function named `tree_sitter_quarto()`:

```cpp
extern "C" TSLanguage *tree_sitter_quarto();
```

But `grammars/block/src/parser.c` exports `tree_sitter_quarto_block()`:

```c
const TSLanguage *tree_sitter_quarto_block(void) { ... }
```

And `grammars/inline/src/parser.c` exports `tree_sitter_quarto_inline()`.

**How tree-sitter-pandoc-markdown Solves This:**

Looking at the sibling project (which uses the same dual-grammar pattern), they solve this by:

1. **binding.gyp** - List BOTH grammar sources:
   ```json
   "sources": [
     "bindings/node/binding.cc",
     "tree-sitter-pandoc-markdown/src/parser.c",
     "tree-sitter-pandoc-markdown/src/scanner.c",
     "tree-sitter-pandoc-markdown-inline/src/parser.c",
     "tree-sitter-pandoc-markdown-inline/src/scanner.c"
   ]
   ```

2. **binding.cc** - Export BOTH languages:
   ```cpp
   extern "C" TSLanguage * tree_sitter_markdown();      // block grammar
   extern "C" TSLanguage * tree_sitter_markdown_inline(); // inline grammar

   exports["language"] = markdown_language;    // Main language
   exports["inline"]["language"] = md_inline_language;  // Inline sub-object
   ```

This approach compiles both grammars into the same addon and exposes both.

### How the CI Workflows Are Structured

**Current CI Jobs (.github/workflows/ci.yml):**

1. **Validate Grammar** (line 64-93)
   - Runs: `npx tree-sitter generate`
   - **Fails:** No grammar.js at root

2. **Test Parser** (line 11-62)
   - Matrix: ubuntu-latest, macos-latest × node 18.x, 20.x
   - Runs: `npx tree-sitter generate` then `npx tree-sitter test`
   - **Fails:** No grammar.js at root

3. **Lint Code** (line 94-117)
   - Runs: `node --check grammar.js`
   - **Fails:** No grammar.js at root

4. **Validate Queries** (line 118-148)
   - Runs: `npx tree-sitter generate` then checks query files
   - **Fails:** No grammar.js at root

5. **Zed Editor Compatibility** (line 149-256)
   - Runs: `npm install` (which triggers node-gyp build)
   - **Fails:** binding.gyp can't find src/parser.c

**Current Benchmark Workflow (.github/workflows/benchmark.yml):**

1. **Performance Benchmarks** (line 11-44)
   - Runs: `npx tree-sitter generate` then `npm run benchmark:compare`
   - **Fails:** No grammar.js at root

2. **Real-World Validation** (line 46-119)
   - Runs: `npx tree-sitter generate` then `npm run validate:sample`
   - **Fails:** No grammar.js at root

**Current Prebuild Workflow (.github/workflows/prebuild.yml):**

- Runs: `npx tree-sitter generate` then `npm run prebuild:ci`
- **Fails:** No grammar.js at root

**Available npm Scripts (package.json):**

The root package.json already has the correct dual-grammar scripts:

```json
"build:block": "cd grammars/block && npm run build",
"build:inline": "cd grammars/inline && npm run build",
"build:all": "npm run build:block && npm run build:inline",
"test:block": "cd grammars/block && npm test",
"test:inline": "cd grammars/inline && npm test",
"test:grammars": "npm run test:block && npm run test:inline"
```

These were added during the dual-grammar migration but the CI workflows weren't updated to use them.

### What Needs to Change for CI to Work

**Three-Part Solution:**

**Part 1: Update CI Workflows**

Replace all instances of:
- `npx tree-sitter generate` → `npm run build:all`
- `npx tree-sitter test` → `npm run test:grammars`
- `node --check grammar.js` → Remove or check both grammar files

**Part 2: Fix Build System (binding.gyp)**

Option A - Match tree-sitter-pandoc-markdown pattern:
```json
{
  "targets": [{
    "target_name": "tree_sitter_quarto_binding",
    "include_dirs": [
      "grammars/block/src",
      "grammars/inline/src"
    ],
    "sources": [
      "bindings/node/binding.cc",
      "grammars/block/src/parser.c",
      "grammars/block/src/scanner.c",
      "grammars/inline/src/parser.c",
      "grammars/inline/src/scanner.c"
    ]
  }]
}
```

Option B - Use symlinks or copy:
- Create `src/parser.c` as symlink to `grammars/block/src/parser.c`
- Create `src/scanner.c` as symlink to `grammars/block/src/scanner.c`
- Keep current binding.gyp

**Part 3: Fix Bindings (bindings/node/binding.cc)**

Update to export both grammars:
```cpp
extern "C" TSLanguage *tree_sitter_quarto_block();
extern "C" TSLanguage *tree_sitter_quarto_inline();

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports["name"] = Napi::String::New(env, "quarto");
  auto block_language = Napi::External<TSLanguage>::New(env, tree_sitter_quarto_block());
  block_language.TypeTag(&LANGUAGE_TYPE_TAG);
  exports["language"] = block_language;

  auto inline_obj = Napi::Object::New(env);
  inline_obj["name"] = Napi::String::New(env, "quarto_inline");
  auto inline_language = Napi::External<TSLanguage>::New(env, tree_sitter_quarto_inline());
  inline_language.TypeTag(&LANGUAGE_TYPE_TAG);
  inline_obj["language"] = inline_language;
  exports["inline"] = inline_obj;

  return exports;
}
```

**Part 4: Fix Test Expectations**

The 217 failing block grammar tests expect `(inline (text))` but get `(inline)`. This is because:
1. Language injection doesn't work in `tree-sitter test`
2. Test expectations need to match what the block grammar alone produces

Update test expectations in `grammars/block/test/corpus/*.txt`:
- Change: `(inline (text))` → `(inline)`
- Remove expectations of inline-grammar nodes (emphasis, strong_emphasis, code_span, etc.)
- Keep only the raw `(inline)` node that the block grammar produces

**Part 5: Fix WASM Build**

The WASM build needs to know which grammar to compile. Currently `tree-sitter.json` at root says `"name": "quarto"` but there's no grammar with that name. Need to either:
- Change root tree-sitter.json to point to block grammar
- Or create a wrapper that combines both grammars

### Technical Reference

**File Paths:**

CI workflows:
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/.github/workflows/ci.yml`
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/.github/workflows/benchmark.yml`
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/.github/workflows/prebuild.yml`

Build system:
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/binding.gyp`
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/bindings/node/binding.cc`
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/package.json`

Grammars:
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/grammars/block/grammar.js` (437 lines)
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/grammars/inline/grammar.js` (395 lines)

Test suites:
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/grammars/block/test/corpus/*.txt` (17 files, 217 tests total)
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/grammars/inline/test/corpus/*.txt` (17 files)

**Key npm Scripts:**

```bash
npm run build:all          # Build both grammars
npm run test:grammars      # Test both grammars
npm run build:block        # cd grammars/block && npm run build
npm run build:inline       # cd grammars/inline && npm run build
npm run test:block         # cd grammars/block && npm test
npm run test:inline        # cd grammars/inline && npm test
```

**Tree-sitter CLI Commands:**

From grammars/block/:
```bash
npx tree-sitter generate   # Generate parser.c from grammar.js
npx tree-sitter test       # Run test corpus
npx tree-sitter build --wasm  # Build WASM
```

**CI Cache Keys:**

Current cache keys reference files at wrong locations:
```yaml
key: build-${{ runner.os }}-${{ matrix.node-version }}-${{ hashFiles('src/parser.c', 'src/scanner.c', 'binding.gyp') }}
key: wasm-${{ hashFiles('grammar.js', 'src/scanner.c') }}
```

These need updating to reference grammars/block/src/ paths.

**Function Signatures:**

Generated parsers export:
```c
const TSLanguage *tree_sitter_quarto_block(void);
const TSLanguage *tree_sitter_quarto_inline(void);
```

Bindings currently expect:
```cpp
extern "C" TSLanguage *tree_sitter_quarto();
```

**Known Issues:**

1. Language injection queries only work in editors, not in `tree-sitter test`
2. Block grammar tests will fail if expectations include inline-parsed nodes
3. WASM build needs configuration for dual-grammar setup
4. Prebuild workflow needs to handle both grammars

## User Notes
<!-- Any specific notes or requirements from the developer -->

## Work Log
<!-- Updated as work progresses -->
- [2025-11-02] Task created

