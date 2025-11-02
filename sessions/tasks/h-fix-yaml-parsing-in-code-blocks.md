---
name: h-fix-yaml-parsing-in-code-blocks
branch: fix/h-fix-yaml-parsing-in-code-blocks
status: pending
created: 2025-11-02
---

# Fix YAML/Structured Content Parsing Inside Fenced Code Blocks

## Problem/Goal

Content inside fenced code blocks is being incorrectly parsed as Markdown syntax instead of being treated as opaque text. This particularly affects YAML blocks and creates ERROR nodes at delimiter positions (colons, braces, etc.).

**Issue:** GitHub issue #17 - https://github.com/ck37/tree-sitter-quarto/issues/17

**Impact:** High priority - This is the #2 corpus validation blocker affecting ~25% of validation failures (7-8 files). Users expect code blocks to be "safe zones" where any content is valid.

**Examples of affected content:**
- YAML frontmatter examples (`` ```yaml ``)
- Triple-brace syntax (`` ```{{python}} ``)
- Any structured content with special characters inside code blocks

**Current behavior:** Creates ERROR nodes at `:`, `{`, `}`, and other delimiter characters within code block content.

**Expected behavior:** Code block content should be parsed as opaque text with no structural parsing of the content.

## Success Criteria
- [ ] All test cases with YAML content in fenced code blocks parse without ERROR nodes
- [ ] Test case with triple-brace syntax (`` ```{{python}} ``) parses cleanly
- [ ] Code block content is treated as opaque text (no structural parsing of colons, braces, dashes)
- [ ] Existing test suite continues to pass (224/224 tests)
- [ ] Corpus validation success rate improves from 30% to minimum 35% (ideally 40%+)
- [ ] Verify fix works for all info_string variants (`` ```yaml ``, `` ``` ``, etc.)

## Context Manifest
<!-- Added by context-gathering agent -->

### How Fenced Code Blocks Currently Work

**The Problem: Grammar Rules Leak Into Code Block Content**

When you write a fenced code block like this:

````markdown
```yaml
nested:
  - item
```
````

The parser creates ERROR nodes at line 2 onwards, misinterpreting the YAML syntax as Markdown grammar rules:

```
(ERROR [1, 0] - [2, 8]
  (chunk_option_value)    # "nested:" matched as chunk option pattern
  (table_delimiter_cell)  # ":" and "-" matched as table delimiter
  (citation_key))         # "item" after "- " matched as citation
```

**Root Cause: Regex Patterns vs Grammar Rule Precedence**

The issue occurs because of how tree-sitter evaluates the `fenced_code_block` rule in grammar.js (lines 355-387):

```javascript
fenced_code_block: ($) =>
  prec(
    -1,  // LOW PRECEDENCE - this is critical!
    seq(
      field("open", alias(token(/```+/), $.code_fence_delimiter)),
      choice(/* info string patterns */),
      /\r?\n/,
      repeat(seq(alias(/[^\r\n]+/, $.code_line), /\r?\n/)),  // THE PROBLEM
      field("close", alias(token(/```+/), $.code_fence_delimiter)),
      /\r?\n/,
    ),
  ),
```

The `repeat()` is **optional** - when tree-sitter's LR parser encounters a line inside the code block, it:

1. **Tries to match the regex pattern** `/[^\r\n]+/` as `code_line`
2. **If that fails OR if other rules have higher precedence**, the parser tries other grammar rules
3. **Finds matches** in other parts of the grammar that have higher precedence:
   - `chunk_option_value: alias(/[^\r\n|]+/, $.chunk_option_value)` (line 190)
   - `table_delimiter_cell: alias(/[ \t]*:?-+:?[ \t]*/, $.table_delimiter_cell)` (line 512)
   - `citation: seq(token("@"), field("key", alias(/[a-zA-Z][a-zA-Z0-9_]*/, $.citation_key)))` (line 886)
4. **Creates an ERROR node** when these rules match but don't complete properly

**Why Specific Patterns Trigger Errors**

Testing reveals the exact trigger pattern:
- ✅ Single line with colon: `nested:` → Parses fine
- ✅ Two lines: `key: value\nnested:` → Parses fine
- ❌ Line with colon + line with dash: `nested:\n  - item` → ERROR!

The combination causes the parser to:
1. Match `nested:` against `chunk_option_value` pattern (which expects `key: value` format)
2. See the following line `  - item` with dash and spaces
3. Try to match it as `table_delimiter_cell` (pipe table delimiter pattern: `:?-+:?`)
4. Try to match `item` as a citation key after `@` (but there's no `@`)
5. Fail to complete any valid grammar rule
6. Emit ERROR node containing the partially matched tokens

**Why Low Precedence Matters**

The `prec(-1)` on `fenced_code_block` means it has LOWER priority than most other rules. When the parser is inside a code block and encounters ambiguous content:
- The `/[^\r\n]+/` regex for `code_line` has precedence -1 (inherited from parent rule)
- Other inline patterns have default precedence 0 or higher
- Parser prefers higher-precedence rules, breaking out of the code block content pattern

**The External Scanner Does NOT Help**

Looking at scanner.c (lines 804-899), the external scanner only handles:
- Chunk options (`#|`) inside executable cells
- Emphasis/strong emphasis delimiters (`*`, `_`)
- Subscript/superscript delimiters (`~`, `^`)
- Inline math delimiters (`$`)
- Fenced div delimiters (`:::`)

It does NOT track whether we're inside a fenced code block's content area. The scanner has no `in_code_block` state to prevent inline parsing.

### How tree-sitter-markdown Solves This Problem

The tree-sitter-markdown grammar (from tree-sitter-grammars repository) uses a **fundamentally different approach**:

```javascript
fenced_code_block: $ => prec.right(choice(
  seq(
    alias($._fenced_code_block_start_backtick, $.fenced_code_block_delimiter),
    optional($._whitespace),
    optional($.info_string),
    $._newline,
    optional($.code_fence_content),  // External scanner token!
    optional(seq(alias($._fenced_code_block_end_backtick, $.fenced_code_block_delimiter))),
  ),
)),

code_fence_content: $ => repeat1(choice($._newline, $._line)),
```

The key difference: **`$._line` and `$._newline` are external scanner tokens** (defined in externals array), not regex patterns.

The external scanner:
1. **Controls token emission** - Returns complete line tokens to the parser
2. **Prevents grammar interference** - Grammar rules never see individual characters inside code blocks
3. **Tracks context** - Scanner knows when it's inside a code block and returns opaque line tokens
4. **Handles closing delimiter** - Scanner detects the closing fence and stops emitting content tokens

This creates a "safe zone" where the LR parser grammar rules cannot interfere with code block content.

### Current Implementation Architecture

**File Structure:**
- `grammar.js` lines 355-387: `fenced_code_block` rule definition
- `grammar.js` line 389: `info_string: ($) => /[^\r\n{]+/` (can consume newlines if not present!)
- `grammar.js` line 222: `cell_content` for executable cells (same pattern as fenced blocks)
- `scanner.c` lines 804-899: External scanner main scan function
- `test/corpus/basic-markdown.txt`: Test cases (all passing, but don't cover YAML in code blocks)
- `queries/injections.scm` lines 142-245: Language injection queries for code blocks

**Executable Cells vs Regular Code Blocks:**

Both have the same problem pattern:

```javascript
// Executable cell (lines 135-161)
executable_code_cell: ($) =>
  prec(1, seq(
    /* opening fence with {language} */,
    optional(field("chunk_options", $.chunk_options)),
    optional(field("content", $.cell_content)),  // Same pattern!
    /* closing fence */
  )),

// Cell content uses same problematic pattern
cell_content: ($) => repeat1(seq(alias(/[^\r\n]+/, $.code_line), /\r?\n/)),

// Regular fenced block (lines 355-387)
fenced_code_block: ($) =>
  prec(-1, seq(
    /* opening fence */,
    /* info string or attributes */,
    /\r?\n/,
    repeat(seq(alias(/[^\r\n]+/, $.code_line), /\r?\n/)),  // Same pattern!
    /* closing fence */,
  )),
```

Both use the same `/[^\r\n]+/` regex pattern that allows grammar rule interference.

**Language Injection System:**

The `queries/injections.scm` file (lines 142-421) injects language-specific parsers for code blocks:

```scheme
; YAML injection (lines 232-237)
((fenced_code_block
  info: (info_string) @_lang
  (#eq? @_lang "yaml")
  (code_line) @injection.content)
 (#set! injection.language "yaml")
 (#set! injection.combined))
```

This injection happens AFTER parsing, so it doesn't prevent the ERROR nodes - it tries to parse the already-broken tree.

### Why Tests Pass But Real Files Fail

**Test Coverage Gap:**

Looking at `test/corpus/basic-markdown.txt`, the fenced code block tests (lines 49-227) only cover:
- Simple single-line code: `print("hello")`
- Attribute syntax variations
- Info string patterns

No tests include YAML-like content with colons and dashes that would trigger the error pattern.

**Corpus Validation Statistics:**

From GitHub issue #17:
- Current success rate: ~25% (30 out of ~120 files)
- This issue affects ~25% of failures (7-8 files)
- Example files with errors:
  - `docs/extensions/filters.qmd` (15+ ERROR nodes)
  - `docs/dashboards/inputs.qmd`
  - `docs/get-started/index.qmd`

### What Needs to Change

**Two Possible Approaches:**

**Option 1: Add External Scanner Tokens (tree-sitter-markdown approach)**
- Add `$._code_line` and `$._code_newline` to externals array
- Implement scanner functions to emit opaque line tokens
- Track `in_code_block` state in scanner
- Change grammar to use scanner tokens instead of regex

Benefits: Most robust, prevents all grammar interference
Drawbacks: Requires scanner changes, more complex implementation

**Option 2: Use Token() Wrapper with Higher Precedence**
- Change `/[^\r\n]+/` to `token(prec(10, /[^\r\n]+/))`
- Give code_line pattern very high precedence to override other rules
- Keep the regex-based approach

Benefits: Simpler change, no scanner modification needed
Drawbacks: May still have edge cases, less robust than external scanner

**Option 3: Hybrid Approach**
- Use token() wrapper for immediate fix
- Add external scanner tokens in future refactor if needed

### Technical Reference Details

**Key Grammar Patterns That Leak:**

```javascript
// Line 190 - Chunk option value pattern
chunk_option_value: alias(/[^\r\n|]+/, $.chunk_option_value)
// Matches anything except newline or pipe
// Can match "nested:" in code blocks

// Line 512 - Table delimiter cell pattern
table_delimiter_cell: alias(/[ \t]*:?-+:?[ \t]*/, $.table_delimiter_cell)
// Matches optional colons, dashes, optional colons with whitespace
// Can match ":" + "  - " pattern in code blocks

// Line 889 - Citation key pattern
citation_key: alias(/[a-zA-Z][a-zA-Z0-9_]*/, $.citation_key)
// Matches identifiers after "@"
// Can match "item" in "- item" when parser is confused
```

**Grammar Rule Precedence Values:**

- `fenced_code_block`: `prec(-1)` - LOWEST
- `executable_code_cell`: `prec(1)` - Higher, but content still vulnerable
- Default rules: `prec(0)` or implicit
- Can use `prec.dynamic()` for runtime precedence decisions

**Info String Bug:**

Line 389: `info_string: ($) => /[^\r\n{]+/`

This pattern matches "anything except newline or `{`" - but it's not wrapped in `token()`, so if there's NO newline after the opening fence, it will consume multiple lines until it hits a `{` or EOF!

Example that demonstrates this:
```markdown
```
  - item
```
Result: info_string consumes "```\n  - item" until closing fence
```

**External Scanner State Structure:**

```c
typedef struct {
  bool in_executable_cell;      // Tracks executable cells
  bool at_cell_start;           // Tracks chunk option position
  uint32_t fence_length;        // Opening fence length
  uint8_t inside_subscript;     // Subscript delimiter state
  uint8_t inside_superscript;   // Superscript delimiter state
  uint8_t inside_inline_math;   // Inline math delimiter state
  uint8_t state;                // Emphasis delimiter state
  uint8_t num_emphasis_delimiters_left;
  uint8_t fenced_div_depth;     // Fenced div nesting
} Scanner;
```

Notably missing: `bool in_fenced_code_block` or similar state to track code block content context.

### Implementation File Locations

**Files that need modification:**
- `grammar.js` lines 355-387 (fenced_code_block rule)
- `grammar.js` line 222 (cell_content rule - same issue in executable cells)
- `grammar.js` line 389 (info_string pattern - should wrap in token())
- Possibly `scanner.c` if using external scanner approach

**Test files to update:**
- `test/corpus/basic-markdown.txt` - Add YAML content test cases
- Need tests for:
  - Code block with YAML-like content (`:` and `-`)
  - Code block with triple-brace syntax (`` ```{{python}} ``)
  - Code block with multiple lines of structured content
  - All info_string variants (with/without language specifier)

**Related documentation:**
- `docs/inline-attributes-known-issues.md` - Documents similar cosmetic ERROR issues
- GitHub issue #17 - Full problem description and impact analysis

### Expected Behavior After Fix

**Test Case (currently fails):**

````markdown
```yaml
---
key: value
nested:
  - item1
  - item2
---
```
````

**Expected Parse Tree:**

```
(fenced_code_block
  open: (code_fence_delimiter)
  info: (info_string)
  (code_line)  # "---"
  (code_line)  # "key: value"
  (code_line)  # "nested:"
  (code_line)  # "  - item1"
  (code_line)  # "  - item2"
  (code_line)  # "---"
  close: (code_fence_delimiter))
```

No ERROR nodes, all content treated as opaque text lines.

## User Notes
<!-- Any specific notes or requirements from the developer -->

## Work Log
<!-- Updated as work progresses -->
- [YYYY-MM-DD] Started task, initial research
