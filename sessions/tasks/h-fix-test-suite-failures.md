---
name: h-fix-test-suite-failures
branch: fix/h-fix-test-suite-failures
status: pending
created: 2025-11-02
---

# Fix Test Suite Failures

## Problem/Goal
The test suite currently has 7 failing tests (217/224 passing = 96.9%). These failures need to be resolved to ensure the parser is working correctly and to unblock releases.

## Success Criteria
- [ ] All tests in the test suite pass (224/224)
- [ ] No new test failures introduced
- [ ] Root causes of failures documented in work log

## Context Manifest
<!-- Added by context-gathering agent -->

### How the Test Suite Works

Tree-sitter uses a corpus-based testing system where test files in `test/corpus/*.txt` define test cases with input text and expected parse trees. Each test case follows this format:

```
==================
Test name
==================

Input markdown text here

---

(expected parse tree structure)
```

The test runner (`npx tree-sitter test`) parses the input text and compares the actual parse tree against the expected tree. Failures occur when:
1. **Unexpected nodes appear** - Parser produces nodes that shouldn't be there (shown in red)
2. **Expected nodes missing** - Parser doesn't produce nodes that should be there (shown in green)

Currently **7 out of 224 tests are failing (96.9% pass rate)**. All failures follow the same pattern: unexpected `(colon)` and `(text)` nodes appearing where they shouldn't.

### Root Cause Analysis: The Colon Exclusion Problem

The failures are caused by a **text parsing rule that excludes colons** from regular text tokens. Here's what happens:

**In grammar.js (line 671):**
```javascript
text: ($) => /[^\r\n`*_\[@<{^~=$:]+/,
//                                ^ Colon excluded from text
```

This exclusion was added to enable fenced div detection (`::: {.class}` syntax), but it has an unintended side effect: **colons in regular paragraph text are parsed as separate `(colon)` tokens instead of being part of `(text)`**.

**What happens when parser encounters "Value: `{javascript} Math.PI`":**

1. Parser reads "Value" → creates `(text)` node
2. Parser encounters `:` → since `:` is excluded from the text pattern, it must emit the text node
3. Parser creates standalone `(colon)` node for the `:`
4. Parser reads " " (space) → creates new `(text)` node for the space
5. Parser encounters `` ` `` → processes inline code cell
6. Result: `(text)` + `(colon)` + `(text)` + `(inline_code_cell)` + `(text)`
7. Expected: `(text)` + `(inline_code_cell)` + `(text)`

This same pattern appears in all 7 failures.

### The 7 Failing Tests

**Pattern: Inline Code Cells (3 failures)**

All these tests have text containing a colon before the inline code cell:

1. **JavaScript inline code cell**: `Value: `{javascript} Math.PI * 2``
   - Fails because "Value:" splits into `(text)` + `(colon)` + `(text)`

2. **R shorthand with function call**: `Result: `r sum(data$column)` total`
   - Fails because "Result:" splits into `(text)` + `(colon)` + `(text)`

3. **Empty inline code cell**: `An empty cell: `{python}` here`
   - Fails because "cell:" splits into `(text)` + `(colon)` + `(text)`

**Pattern: Currency/Math Disambiguation (3 failures)**

All these tests have text containing a colon in the description:

4. **Currency: Dollar followed by digit**: `Simple amount: $50`
   - Fails because "amount:" splits into `(text)` + `(colon)` + `(text)`

5. **Currency: Range with dash**: `Price range: $25-30`
   - Fails because "range:" splits into `(text)` + `(colon)` + `(text)`

6. **Currency: Thousands separator**: `Budget: $20,000 and $30,000`
   - Fails because "Budget:" splits into `(text)` + `(colon)` + `(text)`

**Pattern: Citation Syntax (1 failure)**

7. **Bracketed citation**: `Citation @{https://example.com}.`
   - Has TWO issues:
     - Contains ERROR node from citation parsing (separate from colon issue)
     - Also fails because "example.com" text after the ERROR contains implicit colon handling

### Why the Colon Was Excluded

Looking at grammar.js and the fenced div implementation, the colon exclusion was added to enable detection of fenced div delimiters:

**Fenced div syntax in Quarto:**
```markdown
::: {.callout-note}
Content here
:::
```

The external scanner needs to detect `:::` at the start of lines. By excluding `:` from the text pattern, the grammar ensures that when the inline parser encounters a colon, it creates a separate token that can be checked by the external scanner.

**In grammar.js (lines 606-612):**
```javascript
_inline_element: ($) =>
  choice(
    $.inline_footnote,
    $.footnote_reference,
    $.inline_code_cell,
    // ... other inline elements ...
    alias(":", $.colon), // Single colon (excluded from text to allow fenced div detection)
    $.text, // text last - fallback for anything not matched
  ),
```

### Technical Details: The Grammar Architecture

**Block vs Inline Parsing**

This parser uses a **unified grammar** (single grammar.js) that handles both block-level (paragraphs, headings, divs) and inline-level (emphasis, links, code spans) parsing. This differs from tree-sitter-pandoc-markdown's dual-grammar architecture.

The challenge: Fenced divs are block-level constructs detected at line start, but the parser also needs to handle inline colons (like "Value: ") without breaking them into separate tokens.

**Current Flow:**

1. **Block parser** starts parsing a line
2. If line starts with `:::`, external scanner detects fenced div delimiter
3. Otherwise, block parser creates paragraph node
4. **Inline parser** processes paragraph content
5. When inline parser hits `:`, it cannot be part of `text` (due to regex exclusion)
6. So `:` becomes separate `(colon)` node

**External Scanner Integration:**

The external scanner (`src/scanner.c`) handles context-sensitive tokens including:
- `FENCED_DIV_OPEN` / `FENCED_DIV_CLOSE` - Detect `::: {...}` at line start
- `INLINE_MATH_OPEN` / `INLINE_MATH_CLOSE` - Context-aware `$` delimiters
- `SUBSCRIPT_OPEN` / `SUBSCRIPT_CLOSE` - Context-aware `~` delimiters
- `SUPERSCRIPT_OPEN` / `SUPERSCRIPT_CLOSE` - Context-aware `^` delimiters
- Emphasis/strong emphasis delimiters - `*` and `_` with flanking rules

**Key scanner function (src/scanner.c lines 846-853):**
```c
// Try fenced divs (before whitespace skipping)
// Fenced divs must start at the beginning of a line
if (lexer->lookahead == ':') {
  if (valid_symbols[FENCED_DIV_CLOSE] || valid_symbols[FENCED_DIV_OPEN]) {
    if (scan_fenced_div_marker(scanner, lexer, valid_symbols)) {
      return true;
    }
  }
}
```

### Why Tests Expect No Colon Token

The expected parse trees in the test files don't include separate `(colon)` nodes because:

1. **Historical behavior**: The base grammar from tree-sitter-pandoc-markdown didn't exclude colons from text
2. **Natural expectation**: Colons in regular text should be part of the text token, not separate punctuation
3. **Consistency**: Other punctuation (periods, commas, exclamation marks) are included in text tokens
4. **User experience**: Syntax highlighters would color "Value:" awkwardly if the colon is separate

### Solution Approaches (Analysis Only)

**Option 1: Make colon context-aware in external scanner**
- Similar to how `$`, `~`, `^` are handled
- Scanner only returns colon token when at line start followed by `::` pattern
- In inline context, colon is ignored by scanner, allowing text regex to match it
- **Complexity**: Would need to add `:` back to text pattern conditionally

**Option 2: Add colon back to text pattern, handle fenced div differently**
- Restore: `text: ($) => /[^\r\n`*_\[@<{^~=$]+/,` (no `:` exclusion)
- Rely entirely on external scanner to detect fenced divs at line start
- **Risk**: Parser might consume `:` as text before scanner gets a chance

**Option 3: Update test expectations to accept colon tokens**
- Change all failing test expectations to include `(colon)` and split `(text)` nodes
- **Trade-off**: Accepts suboptimal parse tree structure but matches current behavior

**Option 4: Context-aware text patterns**
- Define separate text patterns for different contexts (inline vs block start)
- Use precedence rules to prefer text-with-colon in inline contexts
- **Complexity**: May require grammar restructuring

### Related Files and Test Infrastructure

**Test corpus files:**
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/test/corpus/inline-code-cells.txt` - 3 failures here
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/test/corpus/inline-math.txt` - 3 failures here
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/test/corpus/test-refinements.txt` - 1 failure here

**Core grammar files:**
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/grammar.js` - Main grammar definition
  - Line 671: `text` rule with colon exclusion
  - Lines 587-613: `_inline_element` choice including `alias(":", $.colon)`
  - Lines 921-941: `inline_code_cell` rule
  - Lines 689-695: `inline_math` rule

**External scanner:**
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/src/scanner.c` - Context-sensitive parsing
  - Lines 22-41: Token type enum
  - Lines 44-56: Scanner state structure
  - Lines 465-552: `scan_dollar_sign()` - Shows pattern for context-aware delimiter handling
  - Lines 846-853: Fenced div detection in main scan function

**Generated parser:**
- `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/src/parser.c` - Generated from grammar.js
  - **DO NOT EDIT MANUALLY** - Always regenerate with `npx tree-sitter generate`
  - Version: Generated by tree-sitter CLI 0.25.10
  - See `docs/zed-compatibility-resolution.md` for version requirements

### Key Constraints

**Tree-sitter CLI Version:**
- Must use tree-sitter CLI 0.25.10 (as specified in package.json)
- Newer/older versions generate incompatible parser.c headers
- Always regenerate parser after grammar changes: `npx tree-sitter generate`

**Backward Compatibility:**
- Changes should not break existing passing tests
- Parse tree structure changes may affect editor integrations (Zed, Neovim)
- Language injection patterns depend on stable node types

**Performance:**
- External scanner should be fast (called for every potential token)
- Avoid excessive lookahead in scanner functions
- Current implementation: $50/ms parse rate, ~160 bytes/ms for inline math

### Testing Commands

```bash
# Run all tests
npx tree-sitter test

# Run only failing tests
npx tree-sitter test --include "JavaScript inline code cell"
npx tree-sitter test --include "R shorthand with function call"
npx tree-sitter test --include "Empty inline code cell"
npx tree-sitter test --include "Currency.*Dollar followed by digit"
npx tree-sitter test --include "Currency.*Range with dash"
npx tree-sitter test --include "Currency.*Thousands separator"
npx tree-sitter test --include "Bracketed citation"

# Run specific test file
npx tree-sitter test --file-name inline-code-cells.txt

# Debug a specific test
npx tree-sitter test --include "JavaScript inline code cell" --debug

# Update test expectations (after confirming fix)
npx tree-sitter test --update
```

### Similar Patterns in Codebase

The codebase already handles several context-sensitive tokens successfully:

**Dollar sign ($) for inline math:**
- Excluded from text: `text: ($) => /[^\r\n`*_\[@<{^~=$:]+/,`
- Fallback alias: `alias("$", $.dollar_sign)`
- Scanner function: `scan_dollar_sign()` (src/scanner.c:465-552)
- Scanner distinguishes between math delimiter and currency
- Uses lookahead to find closing delimiter
- Tracks state with `scanner->inside_inline_math`

**Tilde (~) for subscript:**
- Excluded from text pattern
- Fallback alias: `alias("~", $.tilde)`
- Scanner function: `scan_tilde()` (src/scanner.c:293-370)
- Distinguishes between subscript and strikethrough (`~~`)
- Tracks state with `scanner->inside_subscript`

**Caret (^) for superscript:**
- Excluded from text pattern
- Fallback alias: `alias("^", $.caret)`
- Scanner function: `scan_caret()` (src/scanner.c:372-446)
- Tracks state with `scanner->inside_superscript`

**The colon should follow the same pattern** but currently doesn't have a scanner function to provide context-aware behavior.

### Known Issues Documentation

Related documentation at `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/docs/inline-attributes-known-issues.md` describes similar parsing ambiguity issues with ERROR nodes at paragraph start. This demonstrates that the grammar has pre-existing challenges with context-dependent parsing at certain positions.

The colon issue is similar in nature - a token that needs different treatment depending on context (line start for fenced divs vs. inline for text).

### Success Criteria Reminder

To complete this task, all 7 failing tests must pass without breaking any currently passing tests:

- [ ] Test #94: JavaScript inline code cell
- [ ] Test #97: R shorthand with function call
- [ ] Test #99: Empty inline code cell
- [ ] Test #126: Currency: Dollar followed by digit
- [ ] Test #128: Currency: Range with dash
- [ ] Test #129: Currency: Thousands separator
- [ ] Test #205: Bracketed citation

**Critical**: Changes must not introduce new failures in the 217 currently passing tests.

## User Notes
<!-- Any specific notes or requirements from the developer -->

## Work Log
<!-- Updated as work progresses -->
- [YYYY-MM-DD] Started task, initial research
