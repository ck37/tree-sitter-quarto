---
name: h-refactor-import-tree-sitter-markdown
branch: feature/import-tree-sitter-markdown
status: completed
created: 2025-11-01
---

# Refactor to Import tree-sitter-markdown

## Problem/Goal
The current "Copy & Extend" strategy copied grammar rules from tree-sitter-pandoc-markdown but did not include the external scanner that makes emphasis/strong_emphasis parsing work. This causes parsing failures with triple asterisk patterns (`***`) and creates multi-line ERROR nodes that break syntax highlighting.

**Solution Implemented:** Copy & Merge Scanner approach (Phase 3a from context manifest)
- Copied emphasis scanner functions from tree-sitter-markdown with proper attribution
- Merged with existing Quarto-specific scanner (chunk options, inline math, subscript, superscript)
- Refactored grammar rules to use external scanner tokens instead of `token("*")`
- Created inline element variants to prevent nesting conflicts
- This approach avoids npm dependency while gaining full emphasis parsing capabilities

## Success Criteria
- [x] Emphasis scanner functions copied from tree-sitter-markdown with attribution
- [x] Scanner state merged to include emphasis delimiter tracking
- [x] External tokens from tree-sitter-markdown properly exposed
- [x] Grammar rules refactored to use external scanner tokens for emphasis
- [x] Inline element variants created to prevent nesting conflicts
- [x] Triple asterisk pattern `*italic***bold***italic*` parses without ERROR nodes
- [x] All existing tests continue to pass (205/205, 100%)
- [x] test/test-issue-8.qmd parses cleanly
- [x] Syntax highlighting works correctly in test document
- [x] No performance regression (improved from 8,681 to 11,543 bytes/ms)
- [x] Query files updated to match new AST structure
- [x] Attribution added to scanner.c and README.md

## Work Log

### 2025-11-01

#### Completed
- Implemented "Copy & Merge Scanner" approach (Phase 3a)
  - Merged Scanner struct to include emphasis state fields (`state`, `num_emphasis_delimiters_left`)
  - Updated serialize/deserialize to handle 9-byte state (up from 7 bytes, with backward compatibility)
  - Copied emphasis scanning functions from tree-sitter-markdown with proper attribution
  - Added `parse_star()` and `parse_underscore()` for delimiter run handling
  - Added `is_punctuation()` helper for flanking rule checks
- Updated TokenType enum to include 6 new emphasis tokens
- Updated grammar.js externals array with emphasis tokens
- Integrated emphasis token scanning into main scan function
- Added attribution to README.md Acknowledgments section
- Regenerated parser with `tree-sitter generate`
- All 205 tests passing (100%), average speed: 9,899 bytes/ms (improved from 8,681 bytes/ms baseline)
- test/test-issue-8.qmd parses cleanly without ERROR nodes

#### Code Review & Hardening
- Added delimiter counting bounds checks (max 255 delimiters to prevent uint8_t overflow)
- Verified state serialization uses proper bounds checking for uint8_t fields
- Confirmed strong_emphasis AST structure matches tree-sitter-markdown design exactly
- Verified no infinite loop risks (tree-sitter framework handles backtracking)
- Removed Claude co-signing from commit message per user request

#### Attribution Added
- Scanner.c: Full attribution block for copied tree-sitter-markdown code (lines 521-530, 666-670)
- README.md: Acknowledgments section crediting tree-sitter-markdown (MIT License, Copyright 2021 Matthias Deiml)
- Properly documented repository, commit hash, and date of copied code

#### Next Steps
- Task complete and ready for completion protocols
- Documentation updates handled by service-documentation agent
- Ready for commit and merge to main

## Context Manifest (Implementation Complete)

### How the Current "Copy & Extend" Strategy Works

The current tree-sitter-quarto grammar was built by **copying grammar rules** from tree-sitter-pandoc-markdown and adding Quarto-specific extensions on top. This is documented in the grammar.js header (lines 13-30):

```javascript
/**
 * SOURCE TRACKING (per openspec/specs/grammar-foundation requirement):
 * - Base: tree-sitter-pandoc-markdown
 * - Repository: https://github.com/ck37/tree-sitter-pandoc-markdown
 * - Commit: 95f296eb8a9f28760f3b6ae34084282a1b9dc52a
 * - Date copied: 2025-10-14
 * - Strategy: Copy & Extend (see docs/plan.md)
 */
```

**What Was Copied:**
- Grammar rules for basic Markdown constructs (headings, paragraphs, lists, block quotes, etc.)
- Inline formatting rules (emphasis, strong_emphasis, code spans, links, etc.)
- All rule definitions from lines 208-950 in grammar.js

**What Was NOT Copied:**
- **The external scanner (src/scanner.c)** - This is the critical missing piece
- The scanner handles emphasis/strong_emphasis delimiter disambiguation using stateful parsing
- Without the scanner, `token("*")` and `token("**")` are handled purely by the lexer, which cannot disambiguate `***` patterns

**Current Scanner Implementation:**

The current scanner at `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/src/scanner.c` handles:
1. `pipe_table_start` - Validates pipe table syntax
2. `_chunk_option_marker` - Detects `#|` at start of executable cells
3. `_cell_boundary` - Tracks executable cell context
4. `_chunk_option_continuation` - Multi-line chunk option continuations
5. `_subscript_open/_subscript_close` - Context-aware subscript delimiters (~)
6. `_superscript_open/_superscript_close` - Context-aware superscript delimiters (^)
7. `_inline_math_open/_inline_math_close` - Context-aware inline math delimiters ($)

**What's Missing:**
- Emphasis/strong_emphasis delimiter handling (asterisks and underscores)
- Strikethrough delimiter handling
- All the sophisticated delimiter run logic that tree-sitter-markdown has

### How tree-sitter-markdown Handles Emphasis (The Solution We Need)

Tree-sitter-markdown uses a **dual-grammar architecture** with sophisticated external scanner support for emphasis:

**Architecture:**
- `tree-sitter-markdown/grammar.js` - Block-level grammar (uses `common.js` for shared rules)
- `tree-sitter-markdown-inline/grammar.js` - Inline-level grammar with emphasis rules
- `tree-sitter-markdown-inline/src/scanner.c` - 397 lines of C code handling delimiter disambiguation

**How Emphasis Is Parsed:**

1. **External Tokens** (tree-sitter-markdown-inline/grammar.js lines 40-49):
```javascript
externals: $ => [
    $._emphasis_open_star,
    $._emphasis_open_underscore,
    $._emphasis_close_star,
    $._emphasis_close_underscore,
    $._last_token_whitespace,    // Track context for flanking rules
    $._last_token_punctuation,
],
```

2. **Scanner State** (scanner.c lines 58-67):
```c
typedef struct {
    uint8_t state;
    uint8_t code_span_delimiter_length;
    uint8_t latex_span_delimiter_length;
    uint8_t num_emphasis_delimiters_left;  // Track delimiter run
} Scanner;
```

3. **Delimiter Run Logic:**
- Scanner counts consecutive `*` or `_` characters as a "delimiter run"
- Tracks whether run is left-flanking or right-flanking based on surrounding characters
- Uses CommonMark's flanking rules to determine if run can open or close emphasis
- Handles `***` by tracking how many delimiters remain in the run
- Properly disambiguates `*italic***bold***italic*` by managing delimiter counts

**Key Insight:** The scanner doesn't just recognize individual `*` tokens - it recognizes **delimiter runs** and manages state about which delimiters are opening vs closing based on context.

### How tree-sitter-pandoc-markdown Imports tree-sitter-markdown

Tree-sitter-pandoc-markdown (the sibling project) shows us the **Import & Extend pattern**:

**File:** `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-pandoc-markdown/tree-sitter-pandoc-markdown/grammar.js`

```javascript
const MD = require('tree-sitter-markdown/tree-sitter-markdown/grammar');

module.exports = grammar(MD, {
    name: 'pandoc_markdown',
    rules: {
      // Extensions to base markdown
    }
})
```

**What This Does:**
1. Imports the full base grammar including all rules
2. Imports the external scanner implementation
3. Allows overriding/extending specific rules while keeping the base
4. The compiled parser includes the full scanner logic for emphasis handling

**Package.json Dependency:**
```json
"devDependencies": {
    "tree-sitter-markdown": "file:./tree-sitter-markdown",
    "tree-sitter-cli": "^0.23.0"
}
```

Note: Uses `file:` reference to local copy of tree-sitter-markdown (empty directory in their case, suggesting they might vendor it differently)

### Why the Triple Asterisk Pattern Fails Currently

**The Pattern:** `*italic***bold***italic*`

**Current Parser Behavior:**
1. Lexer tokenizes as: `*` `italic` `**` `*` `bold` `**` `*` `italic` `*`
2. Parser tries to match emphasis rules (grammar.js lines 706-736)
3. Both emphasis and strong_emphasis use `token()` which commits to a token choice
4. At position `***`, lexer greedily matches `**` first (longest match)
5. This leaves ambiguous `*` that could be closing or opening
6. Parser cannot determine correct interpretation with LR(1) lookahead
7. Creates ERROR node spanning multiple lines (from `[2, 0]` to `[4, 43]`)

**Test File Evidence:**
`/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/test/test-issue-8.qmd`:
```markdown
Before this line, highlighting works fine.

*italic***bold***italic*

After this line with **bold** and *italic*.
```

Parsing this file creates an ERROR node that consumes lines 2-4, breaking all syntax highlighting after the problematic pattern.

**Related Task:** This is documented in `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/sessions/tasks/h-fix-ambiguous-triple-asterisks.md` which contains extensive analysis of the problem.

### For Implementation: What Needs to Change

**Option 1: Import tree-sitter-markdown (Recommended)**

This is the proper solution that aligns with how tree-sitter-pandoc-markdown works:

1. **Add Dependency** to package.json:
```json
{
  "dependencies": {
    "tree-sitter-markdown": "^0.7.0"  // Latest version
  }
}
```

2. **Refactor grammar.js** to use require():
```javascript
const MD = require('tree-sitter-markdown/tree-sitter-markdown/grammar');
const MD_INLINE = require('tree-sitter-markdown/tree-sitter-markdown-inline/grammar');

module.exports = grammar(MD, {
    name: 'quarto',

    // Keep existing externals array and add/merge with base
    externals: ($) => [
        // Base markdown externals (from MD)
        ...MD.externals,
        // Quarto-specific externals
        $.pipe_table_start,
        $._chunk_option_marker,
        $._cell_boundary,
        $._chunk_option_continuation,
    ],

    rules: {
        // Override/extend specific rules
        document: ($) => choice(
            prec(2, seq($.yaml_front_matter, repeat($._block))),
            prec(2, seq($.percent_metadata, repeat($._block))),
            repeat($._block),
        ),

        _block: ($) => choice(
            $.executable_code_cell,  // Quarto-specific
            ...MD.rules._block,      // Base markdown blocks
        ),

        _inline_element: ($) => choice(
            $.inline_code_cell,      // Quarto-specific
            $.cross_reference,       // Quarto-specific
            ...MD_INLINE.rules._inline_element,  // Base inline elements
        ),

        // Keep all Quarto-specific rules unchanged
        executable_code_cell: ($) => /* existing implementation */,
        chunk_options: ($) => /* existing implementation */,
        cross_reference: ($) => /* existing implementation */,
        // etc.
    }
})
```

3. **Update External Scanner:**

The current scanner at `src/scanner.c` would need to:
- **Merge** with tree-sitter-markdown's scanner logic, OR
- **Extend** the base scanner by wrapping it

Complexity: High - C scanners need careful integration. The tree-sitter-markdown scanner is 397 lines of sophisticated delimiter handling.

**Alternative: Keep Custom Scanner, Just Import Grammar Rules**

If we want to avoid C scanner complexity:
1. Import grammar structure but override emphasis/strong_emphasis rules
2. Keep current token-based emphasis rules (accepting the `***` limitation)
3. Document the limitation as a known issue
4. Focus on getting Quarto-specific features working

This is simpler but doesn't fix the triple asterisk issue.

**Option 2: Unified vs Split Grammar Architecture**

Current: tree-sitter-quarto uses a **unified grammar** (single grammar.js)
Base: tree-sitter-markdown uses a **split grammar** (block + inline)

If we import tree-sitter-markdown, we need to decide:
- **Keep unified:** Merge both grammars into our single file
- **Switch to split:** Adopt the block/inline separation

The unified approach is simpler for deployment (single WASM file, single .so file) but may make inheritance harder.

### Technical Reference Details

**File Locations:**

Current implementation:
- Grammar: `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/grammar.js`
- Scanner: `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/src/scanner.c`
- Package: `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/package.json`
- Build config: `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/binding.gyp`
- Test corpus: `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/test/corpus/`
- Problem test: `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/test/test-issue-8.qmd`

Reference implementations:
- Sibling project: `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-pandoc-markdown/`
- tree-sitter-markdown: `/tmp/ts-markdown-check/` (cloned for inspection)

**External Tokens Currently Defined:**

From grammar.js lines 41-52:
```javascript
externals: ($) => [
    $.pipe_table_start,
    $._chunk_option_marker,
    $._cell_boundary,
    $._chunk_option_continuation,
    $._subscript_open,
    $._subscript_close,
    $._superscript_open,
    $._superscript_close,
    $._inline_math_open,
    $._inline_math_close,
],
```

**Scanner State Tracking:**

From src/scanner.c lines 36-44:
```c
typedef struct {
  bool in_executable_cell;
  bool at_cell_start;
  uint32_t fence_length;
  uint8_t inside_subscript;
  uint8_t inside_superscript;
  uint8_t inside_inline_math;
} Scanner;
```

**Build Configuration:**

binding.gyp compiles both parser.c and scanner.c:
```json
"sources": [
    "bindings/node/binding.cc",
    "src/parser.c",
    "src/scanner.c"
]
```

If we import tree-sitter-markdown's scanner, we'd need to either:
1. Link against their compiled scanner
2. Copy their scanner.c and merge with ours
3. Create a wrapper that delegates to their scanner for emphasis, handles Quarto tokens ourselves

**Test Suite Status:**

Current: 205 tests passing (100% success rate)

Test categories:
- basic-markdown.txt
- cross-references.txt
- enhanced-divs.txt
- executable-cells.txt
- footnotes.txt
- heading-attributes.txt
- inline-attributes.txt
- inline-code-cells.txt
- inline-formatting.txt (includes emphasis/strong tests but not triple asterisk)
- inline-math.txt
- language-injection.txt
- pandoc-links.txt
- pipe-tables.txt
- shortcodes.txt
- test-refinements.txt
- yaml-front-matter.txt

**Critical Constraint: All 205 tests must continue passing after refactor.**

**Performance Baseline:**

From test output: `average speed: 4720 bytes/ms`

Success criteria: Parse time must remain within 5% of this baseline.

**CLI Version Requirements:**

From CLAUDE.md:
- Uses tree-sitter CLI 0.25.10
- Generated parser.c must match src/tree_sitter/parser.h types
- Never manually edit src/parser.c - always regenerate with correct CLI
- tree-sitter.json required for WASM builds

**Documentation References:**

- Implementation plan: `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/docs/plan.md`
  - Lines 650-660: Discusses scanner complexity and extension strategy
  - Lines 735-762: References to related projects including tree-sitter-markdown

- Architecture lessons: `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/docs/archive/design-notes/lessons-from-pandoc-markdown.md`
  - Lines 1-100: Discusses LR(1) limitations and external scanner strategy
  - Documents split grammar rationale (which we deviated from)

- Grammar foundation spec: `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/openspec/specs/grammar-foundation/spec.md`
  - Lines 11-12: "SHALL extend tree-sitter-pandoc-markdown grammar using the 'Copy & Extend' strategy"
  - Note: This spec needs updating to reflect "Import & Extend" after refactor

**Related Issue:**

GitHub Issue #8: Ambiguous triple asterisks parser error
- Pattern `*italic***bold***italic*` creates multi-line ERROR node
- Breaks syntax highlighting for rest of document
- Root cause: Missing external scanner for emphasis delimiter runs

### Implementation Strategy Recommendation

**Recommended Approach: Phased Implementation**

**Phase 1: Add tree-sitter-markdown Dependency**
1. Add to package.json dependencies
2. Run `npm install`
3. Verify tree-sitter-markdown is available for require()

**Phase 2: Create Minimal Import**
1. Start with a test branch
2. Try importing just the grammar structure without changing scanner
3. Verify existing tests still pass
4. This validates the import mechanism works

**Phase 3: Integrate Scanner**
This is the complex part - three sub-options:

**3a. Copy & Merge Scanner (Safest)**
- Copy tree-sitter-markdown-inline/src/scanner.c emphasis functions
- Merge with our existing scanner.c
- Update token enum to include emphasis tokens
- Test thoroughly

**3b. Dual Scanner Build (Complex)**
- Build both scanners
- Wrap calls to appropriate scanner based on token type
- More maintenance burden but cleaner separation

**3c. Accept Limitation (Pragmatic)**
- Import grammar rules but keep token-based emphasis
- Document triple asterisk pattern as unsupported
- Focus on Quarto features being correct
- Consider fixing later if users report issues

**Phase 4: Update Tests**
1. Add test case for triple asterisk pattern
2. Verify ERROR handling (if accepting limitation)
3. Ensure all 205 existing tests still pass
4. Check performance hasn't regressed

**Phase 5: Update Documentation**
1. Update grammar.js header comments
2. Update openspec/specs/grammar-foundation/spec.md
3. Update CLAUDE.md if strategy changes
4. Document any new limitations

### Critical Success Factors

1. **All 205 existing tests must pass** - No regressions in working features
2. **Parse performance within 5% of baseline** - Don't slow down editors
3. **Triple asterisk pattern improvement** - Either fixes or gracefully degrades
4. **Scanner integration tested** - Emphasis, subscript, superscript all work
5. **Build system unchanged** - Same build process, same output files
6. **WASM still builds** - Verify with `npm run build:wasm`
7. **No manual parser.c edits** - Only generated via `npx tree-sitter generate`

### Potential Pitfalls to Avoid

1. **Scanner State Serialization** - If merging scanners, ensure serialize/deserialize handles all state
2. **Token Enum Ordering** - External token order matters, changes break binary compatibility
3. **Precedence Conflicts** - Merging grammars may introduce new conflicts that need resolution
4. **CLI Version Mismatch** - tree-sitter-markdown might use different CLI version
5. **WASM Size Increase** - Additional scanner logic may bloat WASM bundle
6. **Breaking Editor Extensions** - Node type changes could break Zed/Neovim integrations

