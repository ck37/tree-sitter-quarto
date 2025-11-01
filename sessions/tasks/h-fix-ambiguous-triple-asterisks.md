---
name: h-fix-ambiguous-triple-asterisks
branch: fix/ambiguous-triple-asterisks
status: pending
created: 2025-11-01
---

# Fix Ambiguous Triple Asterisks Parser Error

## Problem/Goal
The parser fails to correctly handle the pattern `*italic***bold***italic*` (emphasis and strong emphasis with no spaces between), creating an ERROR node that consumes all subsequent content in the document. This breaks syntax highlighting from that point forward in all editor integrations (Zed, Neovim, etc.).

**Issue Reference:** https://github.com/ck37/tree-sitter-quarto/issues/8

**Current Behavior:**
- Pattern creates ERROR node spanning `[2, 0] - [4, 43]` (multiple lines)
- ERROR consumes subsequent paragraphs and all content after the pattern
- All syntax highlighting breaks for the rest of the document

**Root Cause:**
Grammar ambiguity in delimiter matching - the sequence `***` can be interpreted as either:
- `*` (close emphasis) + `**` (open strong_emphasis)
- `**` (close strong_emphasis) + `*` (open emphasis)

The parser fails to disambiguate and creates an ERROR node with poor error recovery that doesn't respect line boundaries.

## Success Criteria
- [ ] Pattern `*italic***bold***italic*` parses without ERROR nodes
- [ ] If pattern must create ERROR, it's localized to that line only (doesn't consume subsequent content)
- [ ] Test file `test/test-issue-8.qmd` parses cleanly
- [ ] Syntax highlighting works correctly after the pattern in editors
- [ ] All existing tests continue to pass
- [ ] No regressions in other emphasis/strong_emphasis patterns

## Context Manifest

### How Emphasis and Strong Emphasis Currently Work

**The Pattern in Question:**

The problematic input `*italic***bold***italic*` creates a sequence of delimiters that the parser cannot disambiguate. Let's trace through what happens:

1. **Parser encounters**: `*italic***bold***italic*`
2. **First attempt**: Parser reads opening `*` and tries to match as emphasis
3. **Ambiguity hits**: At position `italic***`, the sequence `***` can be interpreted as:
   - `*` (close emphasis) + `**` (open strong_emphasis), OR
   - `**` (open strong_emphasis) + `*` (close emphasis from an outer context)
4. **Parser fails**: Cannot resolve which interpretation is correct using LR(1) parsing
5. **ERROR node created**: Parser creates ERROR at `[2, 0]` that consumes content through `[4, 43]`
6. **Error recovery breaks**: The ERROR node doesn't respect line boundaries and consumes subsequent paragraphs

**Grammar Rules for Emphasis (grammar.js:706-720):**

```javascript
emphasis: ($) =>
  prec.left(
    choice(
      seq(
        alias(token("*"), $.emphasis_delimiter),
        repeat1($._inline_element),
        alias(token("*"), $.emphasis_delimiter),
      ),
      seq(
        alias(token("_"), $.emphasis_delimiter),
        repeat1($._inline_element),
        alias(token("_"), $.emphasis_delimiter),
      ),
    ),
  ),
```

**Grammar Rules for Strong Emphasis (grammar.js:722-736):**

```javascript
strong_emphasis: ($) =>
  prec.left(
    choice(
      seq(
        alias(token("**"), $.strong_emphasis_delimiter),
        repeat1($._inline_element),
        alias(token("**"), $.strong_emphasis_delimiter),
      ),
      seq(
        alias(token("__"), $.strong_emphasis_delimiter),
        repeat1($._inline_element),
        alias(token("__"), $.strong_emphasis_delimiter),
      ),
    ),
  ),
```

**Key Observations:**

1. **Token-based matching**: Both rules use `token()` to match delimiters as atomic lexical tokens
2. **Greedy tokenization**: `token("**")` will match `**` before `token("*")` can match individual asterisks
3. **No precedence distinction**: Both use `prec.left()` at the same level (no numeric precedence)
4. **Nested structure**: `repeat1($._inline_element)` allows emphasis/strong_emphasis to nest within each other
5. **No lookahead constraints**: Rules don't check what comes after the delimiter

**How Delimiter Matching Works:**

The lexer (generated from grammar.js) processes characters left-to-right:
- When it sees `*`, it checks if the next character is also `*`
- If yes, it emits a `**` token (strong_emphasis_delimiter)
- If no, it emits a `*` token (emphasis_delimiter)

This means in the sequence `***`:
- The lexer sees first `*`, checks next char (`*`), emits `**`
- Then it sees the remaining `*`, emits `*`
- Result: `**` followed by `*`

**Why the Pattern Fails:**

Input: `*italic***bold***italic*`

Parse attempt:
1. Lexer emits: `*` `italic` `**` `*` `bold` `**` `*` `italic` `*`
2. Parser tries: emphasis starting with first `*`
3. Inside emphasis, encounters `**` (strong_emphasis opener)
4. But then immediately sees `*` - is this:
   - Closing delimiter for the outer emphasis? (would leave strong_emphasis unclosed)
   - Opening delimiter for nested emphasis inside strong_emphasis?
5. **LR(1) limitation**: Parser can only look 1 token ahead, can't determine the correct interpretation
6. **Error recovery activates**: Parser creates ERROR node starting at the problematic position
7. **Recovery fails**: ERROR extends through line 4 because the parser can't find a clean recovery point

**Current Error Output (from parse attempt):**

```
(ERROR [2, 0] - [4, 43]
  (emphasis_delimiter [2, 0] - [2, 1])           # Opening *
  (text [2, 1] - [2, 7])                         # "italic"
  (strong_emphasis_delimiter [2, 7] - [2, 9])    # **
  (emphasis_delimiter [2, 9] - [2, 10])          # *
  (text [2, 10] - [2, 14])                       # "bold"
  (strong_emphasis [2, 14] - [4, 23]             # Parser partially matches
    (strong_emphasis_delimiter [2, 14] - [2, 16])
    (emphasis [2, 16] - [2, 24]
      ...
    )
    (text [4, 0] - [4, 21])                      # Consumes next line!
    (strong_emphasis_delimiter [4, 21] - [4, 23])
  )
  ...
)
```

The ERROR node consumes content from line 2 through line 4, breaking all subsequent syntax highlighting.

**Test Coverage for Emphasis/Strong Emphasis:**

From `test/corpus/inline-formatting.txt`:
- ✅ Basic strikethrough (similar `~~` pattern)
- ✅ Nested formatting (`~~**bold deleted**~~`)
- ✅ Mixed formatting with all types together
- ✅ Adjacent to punctuation

But notably **MISSING**:
- ❌ Adjacent emphasis and strong_emphasis without spaces (`*text***text***text*`)
- ❌ Triple asterisks disambiguation
- ❌ Alternating delimiter patterns

**How Other Parsers Handle This:**

CommonMark has explicit rules for delimiter runs:
- A delimiter run is a sequence of one or more `*` or `_` characters
- Left-flanking vs right-flanking rules determine open/close
- Requires complex stateful parsing beyond LR(1) capability

Tree-sitter's strength is speed and incrementality, but this comes at the cost of not handling complex delimiter disambiguation that requires arbitrary lookahead.

**External Scanner (src/scanner.c):**

The external scanner handles context-sensitive tokens:
- `~` for subscript (distinguishes `~text~` from `~~strikethrough~~`)
- `^` for superscript (distinguishes `^2^` from `^[footnote]`)
- `$` for inline math (distinguishes `$math$` from `$50` currency)
- `#|` for chunk options
- Pipe table detection

**Relevant scanner patterns:**

```c
// From scan_tilde() - shows how to disambiguate similar patterns
if (lexer->lookahead == '~') {
  lexer->advance(lexer, false);

  // Check for ~~ (strikethrough)
  if (lexer->lookahead == '~') {
    // This is ~~, let strikethrough rule handle it
    return false;
  }

  // Check if we're closing a subscript
  if (scanner->inside_subscript > 0 && valid_symbols[SUBSCRIPT_CLOSE]) {
    // ... handle closing
  }

  // Lookahead to verify closing delimiter exists
  bool has_closing = false;
  while (lookahead_count < MAX_LOOKAHEAD && ...) {
    if (lexer->lookahead == '~') {
      has_closing = true;
      break;
    }
    lexer->advance(lexer, false);
  }
}
```

This same pattern could potentially be applied to `*` disambiguation, but:
- Would require tracking nesting depth
- Complex state management for multiple overlapping emphasis/strong levels
- Performance impact of lookahead in common case

### For Fixing the Issue: What Needs to Change

**Option 1: Improve Error Recovery (Minimal Change)**

The ERROR node shouldn't consume content across line boundaries. Tree-sitter has built-in error recovery, but we may need to add explicit recovery anchors.

Approach:
- Add newline as a synchronization point for error recovery
- Modify inline parsing to treat newlines as hard boundaries
- This won't fix the ambiguity but will localize the ERROR to one line

Grammar changes needed:
```javascript
// Current: inline allows repeat1($._inline_element) across any length
inline: ($) => repeat1($._inline_element),

// Potential: Add line boundary awareness
// (but this may break legitimate multi-line emphasis)
```

**Option 2: External Scanner for Asterisk Disambiguation (Medium Change)**

Add external scanner logic to track emphasis/strong_emphasis state:

```c
typedef struct {
  // ... existing fields ...
  uint8_t emphasis_depth;       // Track nesting level
  uint8_t strong_emphasis_depth;
} Scanner;
```

Scanner would:
1. Track whether we're inside emphasis or strong_emphasis
2. When encountering `*`, lookahead to determine delimiter run length
3. Validate that delimiter pairing makes sense given current nesting
4. Reject ambiguous patterns early (before ERROR propagation)

Complexity: High - emphasis can nest arbitrarily, state management is complex

**Option 3: Explicit Delimiter Run Parsing (Major Change)**

Match CommonMark's approach with explicit delimiter run nodes:

```javascript
delimiter_run: $ => choice(
  token(/\*+/),
  token(/_+/)
),

emphasis: $ => seq(
  alias(choice(token('*'), token('_')), $.emphasis_delimiter),
  // Match delimiter run and validate flanking
  repeat1($._inline_element),
  alias(choice(token('*'), token('_')), $.emphasis_delimiter),
),
```

But this requires:
- External scanner to determine flanking context
- State tracking for all active delimiter runs
- Essentially reimplementing CommonMark's algorithm

Complexity: Very High - architectural change

**Option 4: Reject Pattern as Invalid (Pragmatic)**

Document that adjacent `***` sequences are ambiguous and should be avoided:

```markdown
<!-- Avoid -->
*italic***bold***italic*

<!-- Use instead -->
*italic* **bold** *italic*
```

Add test that expects ERROR for this pattern, ensuring it's localized to one line.

Complexity: Low - documentation + improved error recovery

### Technical Reference Details

**File Locations:**
- Grammar rules: `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/grammar.js`
  - emphasis: lines 706-720
  - strong_emphasis: lines 722-736
  - _inline_element choice: lines 656-679
- External scanner: `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/src/scanner.c`
- Test file reproducing issue: `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/test/test-issue-8.qmd`
- Existing inline formatting tests: `/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto/test/corpus/inline-formatting.txt`

**Inline Element Choice Rule:**

```javascript
_inline_element: ($) =>
  choice(
    $.inline_footnote,        // ^[note] - must come before text
    $.footnote_reference,     // [^1] - must come before link
    $.inline_code_cell,       // `{python} expr` - check before code_span
    $.code_span,
    $.inline_math,
    $.emphasis,               // ← Our problematic rule
    $.strong_emphasis,        // ← Our problematic rule
    $.strikethrough,          // ~~text~~ - similar pattern but works
    $.highlight,              // ==text==
    $.subscript,              // H~2~O - uses external scanner
    $.superscript,            // x^2^ - uses external scanner
    $.link,
    $.image,
    $.citation,
    $.cross_reference,
    $.shortcode_inline,
    $.equals_sign,
    alias("~", $.tilde),      // Fallback when scanner rejects
    alias("^", $.caret),      // Fallback when scanner rejects
    alias("$", $.dollar_sign),// Fallback when scanner rejects
    $.text,                   // Fallback - anything not matched
  ),
```

**Text Pattern (line 681):**

```javascript
text: ($) => /[^\r\n`*_\[@<{^~=$]+/,
```

This excludes `*` from text, meaning every `*` must be consumed by emphasis/strong_emphasis or create an ERROR.

**Conflicts Array (lines 54-62):**

```javascript
conflicts: ($) => [
  [$._inline_element, $._link_text_element],
  [$.executable_code_cell, $.fenced_code_block],
  [$.shortcode_block, $.shortcode_inline],
  [$.inline_code_cell, $.code_span],
  [$.callout_block, $.fenced_div],
  [$.tabset_block, $.fenced_div],
  [$.conditional_block, $.fenced_div],
],
```

No conflicts declared for emphasis/strong_emphasis - parser assumes they can be disambiguated, but `***` proves otherwise.

**Precedence Values Used:**

- `prec.left()` for emphasis and strong_emphasis (no numeric precedence)
- `prec.left(-2)` for paragraph (lowest precedence)
- `prec(1)` for various block elements
- `prec(2)` for YAML front matter, inline footnotes
- `prec.dynamic(2)` and `prec.dynamic(3)` for enhanced divs

Adding numeric precedence like `prec.left(1, ...)` vs `prec.left(2, ...)` could help, but won't solve the fundamental `***` ambiguity.

**Error Recovery in Tree-sitter:**

Tree-sitter's error recovery:
1. When a parse error occurs, creates an ERROR node
2. Tries to recover by skipping tokens until it finds a valid continuation
3. Recovery points are typically structural boundaries (block boundaries, newlines in some contexts)
4. No explicit error recovery specified in grammar means default behavior

The problem: Default recovery for inline elements doesn't treat newlines as hard boundaries, so ERROR can consume multiple lines of content.

**Similar Patterns That Work:**

- `~~text~~` (strikethrough) - uses `token("~~")` which is unambiguous
- `==text==` (highlight) - uses `token("==")` which is unambiguous
- `~text~` (subscript) - uses external scanner to validate pairing
- `^text^` (superscript) - uses external scanner to validate pairing

**Key Difference:**

Subscript/superscript use external scanner with stateful validation and lookahead to verify closing delimiters exist. Emphasis/strong_emphasis rely purely on grammar rules with token-based matching.

**Performance Considerations:**

Adding external scanner logic for `*` would mean:
- Every `*` character triggers scanner check
- Very common character in Markdown (lists use `*`, emphasis is frequent)
- Could impact parse performance significantly
- Need to profile before/after to ensure acceptable performance

**Testing Strategy:**

1. Add test case to `test/corpus/inline-formatting.txt` for the problematic pattern
2. Expected outcome depends on chosen solution:
   - Option 1 (error recovery): ERROR node localized to one line
   - Option 2/3 (scanner): Clean parse with proper nesting
   - Option 4 (document limitation): ERROR node, but documented as expected
3. Ensure no regressions on existing 203 passing tests
4. Verify with `test/test-issue-8.qmd` that subsequent content highlights correctly

**Related Documentation:**

- LR parser limitations: `docs/archive/design-notes/lessons-from-pandoc-markdown.md` (lines 78-86)
- Error recovery patterns: `docs/inline-attributes-known-issues.md` (similar ERROR node issue)
- External scanner examples: `src/scanner.c` (subscript/superscript handling)

**Success Metrics:**

1. **Primary**: Pattern `*italic***bold***italic*` either parses cleanly OR creates ERROR limited to one line
2. **Secondary**: All 203 existing tests continue to pass
3. **Tertiary**: No performance regression (parse time within 5% of baseline)
4. **Editor impact**: Syntax highlighting works correctly after the problematic pattern

## User Notes
<!-- Any specific notes or requirements from the developer -->

## Work Log
<!-- Updated as work progresses -->
