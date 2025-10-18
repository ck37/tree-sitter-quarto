# Block Attributes Implementation Findings

**Date:** 2025-10-18
**Session Focus:** Resume block attributes work from docs/block-attributes-resume.md
**Status:** BLOCKED - Fundamental parsing issue discovered
**Result:** Implementation not viable with current approach

---

## Summary

Attempted to implement Pandoc block attribute syntax (`## Title {#id .class}`) for headings and code blocks. While attributes CAN be recognized by the parser, adding the optional attribute syntax breaks parsing of plain headings without attributes, creating a critical backward compatibility failure.

**Critical Finding:** Adding `optional(seq(...'{', attributes, '}'))` to atx_heading causes ALL headings (even plain ones like `## Title`) to be parsed as ERROR nodes.

---

## What Was Attempted

### Approach 1: Specialized `heading_inline` Rule
- Created `heading_inline`, `_heading_inline_element`, and `heading_text` rules
- Goal: Stop inline content parsing before `{` to cleanly separate content from attributes
- Added conflicts: `[$.text, $.heading_text]` and `[$._inline_element, $._heading_inline_element]`
- **Result:** Parser generated but ERROR nodes persisted in content; validation remained 5%

### Approach 2: Simplified with Regular `inline`
- Reverted to using `$.inline` instead of custom heading rules
- Removed `heading_inline` complexity
- Kept only the `optional(seq(...attributes...))` additions
- **Result:** Plain headings WITHOUT attributes now parse as ERROR - backward compatibility broken!

### Approach 3: Stricter Whitespace Patterns
- Attempted to use `' '` instead of `/[ \t]*/` before `{`
- Goal: Reduce ambiguity in attribute pattern matching
- **Result:** Not tested due to file modification conflicts

---

## Test Results

### Baseline (Committed Grammar)
```
Input: ## Plain Heading
Output:
(atx_heading
  marker: (atx_heading_marker)
  content: (inline
    (text)))
```
**Status:** ✓ WORKS - No ERROR nodes

### With Attribute Additions
```
Input: ## Plain Heading
Output:
(ERROR
  (atx_heading_marker)
  (citation_key)
  (citation_key))
```
**Status:** ✗ BROKEN - Entire heading is ERROR

```
Input: ## Title {.class}
Output:
(atx_heading
  marker: (atx_heading_marker)
  (ERROR
    (citation_key))  ← "Title"
  attributes: (attribute_list
    class: (attribute_class)))
```
**Status:** ⚠️ PARTIAL - Attributes recognized but content is ERROR

```
Input: ```{.python}\ncode\n```
Output:
(fenced_code_block
  open: (code_fence_delimiter)
  attributes: (attribute_list
    class: (attribute_class))
  (code_line))
```
**Status:** ✓ WORKS - No ERROR nodes!

---

## Grammar Changes Made

### atx_heading
```javascript
// BEFORE (works)
atx_heading: $ => seq(
  field('marker', ...),
  optional(field('content', $.inline)),
  /\r?\n/
),

// AFTER (broken)
atx_heading: $ => seq(
  field('marker', ...),
  optional(field('content', $.inline)),
  optional(prec(1, seq(        ← Added this
    /[ \t]*/,
    '{',
    /[ \t]*/,
    field('attributes', $.attribute_list),
    /[ \t]*/,
    '}'
  ))),
  /\r?\n/
),
```

### setext_heading
Similar addition of `optional(seq(...attributes...))` before `\r?\n`

### fenced_code_block
Similar addition after `info_string`

### info_string
Changed from `/[^\r\n{]+/` to `token(/[^\r\n{]+/)` for token priority

---

## Why It Fails

### The Problem
When tree-sitter sees `## Title`, it needs to decide:
1. Parse "Title" as `inline` content
2. OR skip content and look for attributes `{...}`
3. OR parse nothing (both are optional)

The parser cannot reliably make this decision, leading to:
- `inline` rule tries to consume "Title"
- Individual words match `/[a-zA-Z][a-zA-Z0-9_]*/` (the citation_key pattern)
- Parser creates ERROR nodes with citation_key fragments
- Entire heading fails to parse

### Root Cause
The `/[ \t]*/` pattern before `{` creates ambiguity:
- Is the space after "Title" part of inline content?
- Or is it the whitespace before attributes?
- Parser can't decide, so it fails

**Code blocks work** because `{.python}` has NO content before `{`, eliminating ambiguity.

---

## Validation Results

| Metric | Baseline | With Changes | Target |
|--------|----------|--------------|--------|
| Success Rate | 5% (1/20) | 5% (1/20) | 60%+ |
| Plain Headings | ✓ Work | ✗ Broken | Must work |
| Headings + Attrs | N/A | ⚠️ Partial (ERROR in content) | Should work |
| Code `{.class}` | N/A | ✓ Work | Should work |

**Conclusion:** No improvement; backward compatibility broken.

---

## Why Resume Document Was Misleading

The `docs/block-attributes-resume.md` said:
> "attributes ARE being recognized"
> "ERROR nodes are acceptable IF attributes are recognized"

This was PARTIALLY true:
- ✓ Attributes ARE recognized in headings with `{attrs}`
- ✗ BUT plain headings without attributes break entirely
- ✗ This violates backward compatibility - unacceptable

The resume doc assumed ERROR nodes were cosmetic, but they actually indicate fundamental parsing failure.

---

## Options Going Forward

### Option A: Accept Limitations ⚠️
**Status:** NOT RECOMMENDED

- Keep code blocks with `{.python}` syntax (they work!)
- Abandon heading attributes
- Document that `## Title {.class}` is not supported
- Focus on other features

**Pros:** Code block attributes work perfectly
**Cons:** Incomplete feature; 67% of validation failures still present

### Option B: External Scanner (Advanced) 🔧
**Status:** POSSIBLE BUT COMPLEX

Implement Option C from resume doc:
- Add C scanner token `ATTRIBUTE_BOUNDARY` that detects ` {#` or ` {.`
- Scanner can do lookahead that regex cannot
- Use token to cleanly terminate inline content

**Requires:**
1. C programming in `src/scanner.c`
2. Understanding tree-sitter external scanner API
3. Careful testing to avoid breaking other features

**Estimate:** 4-6 hours for someone experienced with tree-sitter scanners

### Option C: Research Grammar Patterns 📚
**Status:** INVESTIGATE FIRST

Study how other tree-sitter grammars handle similar patterns:
- tree-sitter-markdown (how does it handle attributes?)
- tree-sitter-html (attributes after tag names)
- tree-sitter-pandoc-markdown (if it exists)

Look for precedence/associativity tricks that might work.

**Estimate:** 2-3 hours research, unknown implementation time

### Option D: Defer to v0.2.0 📅
**Status:** RECOMMENDED

- Mark OpenSpec change as "DEFERRED"
- Focus on other v0.1.0 features that work
- Revisit after gaining more tree-sitter experience
- Consider this a "nice-to-have" not a blocker

**Pros:** Moves project forward; preserves what works
**Cons:** 67% of validation failures remain

---

## Technical Insights Gained

### Tree-Sitter Limitations
1. **Regex lookahead not supported** - Can't use `(?=...)` patterns
2. **Optional sequences are tricky** - Two optional adjacent rules create ambiguity
3. **Precedence isn't magic** - `prec(1)` and `prec.right` don't solve all conflicts
4. **Token vs Pattern matters** - `token(regex)` has different matching behavior

### What Works
- Code blocks: `` ```{.python} `` - No content before `{`
- Attributes on their own line
- Clear boundaries (no whitespace ambiguity)

### What Doesn't Work
- Optional whitespace patterns: `/[ \t]*/` before ambiguous tokens
- Two optional fields in sequence: `optional(inline), optional(attributes)`
- Content that could be parsed multiple ways (text vs citation_key)

---

## Files Modified

### Grammar
- `grammar.js` - Added attribute syntax (BROKEN - needs revert)
- `src/parser.c` - Auto-generated (needs regeneration after revert)
- `src/grammar.json` - Auto-generated
- `src/node-types.json` - Auto-generated

### Queries
- `queries/highlights.scm` - Changed `(inline)` to `(heading_inline)` then back
- `queries/nvim/highlights.scm` - Same as above

### Tests
- `test/corpus/block-attributes.txt` - 9 tests (some passing, some failing)

### Documentation
- `docs/block-attributes-resume.md` - Previous session summary
- `openspec/changes/add-block-element-attributes/` - Full proposal (not implemented)

---

## Recommended Next Steps

1. **Revert grammar changes** - `git restore grammar.js`
2. **Regenerate parser** - `tree-sitter generate`
3. **Verify baseline** - `tree-sitter test` should pass existing tests
4. **Update OpenSpec** - Mark change as "DEFERRED - Blocked by parser limitations"
5. **Focus elsewhere** - Work on features that don't require optional syntax
6. **Research** - Study other grammar implementations for patterns

---

## Lessons for Future Attempts

### Before Implementing
1. Test the grammar change in ISOLATION first
2. Verify backward compatibility with EVERY change
3. Use `git stash` frequently to test baseline vs changes
4. Check if external scanner is needed from the start

### Red Flags
- Adding two `optional()` fields in sequence
- Whitespace patterns before ambiguous tokens
- Patterns that match the same text (like text vs citation_key)

### Good Practices
- Test plain cases (no attributes) before testing with attributes
- Compare parse trees: baseline vs modified
- Run full test suite after each change
- Document what works vs what breaks

---

## Questions for Tree-Sitter Experts

1. How do you handle optional trailing syntax after optional content?
2. Is there a precedence pattern for "content then attributes" that works?
3. Should attributes be parsed as part of the heading node or as a sibling?
4. Are there examples of grammars with similar patterns?

---

## Session Time

- **Start:** Reviewing docs/block-attributes-resume.md
- **Attempts:** Heading inline approach, simplified approach, precedence tuning
- **Debugging:** Baseline testing, diff analysis, parse tree comparison
- **Outcome:** Documented findings; implementation not viable with current knowledge
- **Total Time:** ~2.5 hours

---

## Contact & References

- **OpenSpec Proposal:** `openspec/changes/add-block-element-attributes/proposal.md`
- **Design Doc:** `openspec/changes/add-block-element-attributes/design.md`
- **Previous Resume:** `docs/block-attributes-resume.md`
- **Validation Report:** `benchmarks/validation/validation-report.md`

For future attempts, consult:
- Tree-Sitter documentation: https://tree-sitter.github.io/tree-sitter/
- External scanners guide: https://tree-sitter.github.io/tree-sitter/creating-parsers#external-scanners
- Tree-sitter Slack/Discord for expert advice
