# Block Attributes Research - Final Conclusion

**Date:** 2025-10-18
**Research Phase:** Option C - Grammar Pattern Research
**Conclusion:** External scanner required; pure grammar solution not viable

---

## Research Summary

Investigated how other tree-sitter grammars handle optional trailing syntax, specifically looking at tree-sitter-markdown as a reference implementation.

### Key Findings

#### 1. Tree-Sitter-Markdown Uses External Scanner

**Repository:** https://github.com/ikatyang/tree-sitter-markdown

The tree-sitter-markdown grammar uses:
- **External scanner** (`src/scanner.cc` in C++) for complex markdown parsing
- **Extensive external tokens** for markers, boundaries, and context-sensitive parsing
- `repeat($._inl_nod)` pattern instead of `optional(repeat1(...))` for heading content

**Grammar Pattern:**
```javascript
_atx_hed: $ => seq(
  $._atx_bgn,                              // Heading marker
  alias(repeat($._inl_nod), $.heading_content),  // Content (can be empty)
  optional($._atx_end)                     // Optional trailing syntax
)
```

**Key Insight:** Uses `repeat()` which can match zero times (implicitly optional) vs. `optional(repeat1())`.

#### 2. Experiments with `repeat()` Pattern

**Attempt:** Adapted the tree-sitter-markdown pattern to our grammar:

```javascript
atx_heading: $ => seq(
  field('marker', ...),
  field('content', alias(repeat($._inline_element), $.inline)),
  optional(prec(2, seq(
    /[ \t]+/,
    '{',
    field('attributes', $.attribute_list),
    '}'
  ))),
  /\r?\n/
)
```

**Results:**
- ✅ Plain headings work: `## Title` parses correctly
- ✗ Headings with attributes fail: `## Title {.class}` creates ERROR

**Why It Fails:**

The `text` rule (`/[^\r\n`*_\[@<${^~=]+/`) matches "Title " including the trailing space. This leaves NO whitespace for the `/[ \t]+/` pattern to match before `{`, causing a parsing failure.

**Parse Tree:**
```
(ERROR
  (atx_heading_marker)
  (text [0, 3] - [0, 9])      ← "Title " with space
  (attribute_class))           ← {.class} recognized but orphaned
```

The attribute_list IS recognized, but it can't be attached to the heading because the whitespace pattern fails to match.

---

## Why Pure Grammar Solutions Don't Work

### Problem 1: Text Rule Greediness

The text pattern `/[^\r\n`*_\[@<${^~=]+/` will match:
- "Title" → matched ✓
- "Title " → matched (includes space)
- "Title  " → matched (includes trailing spaces)

Once text consumes the space, the attribute sequence can't find whitespace to match.

### Problem 2: Cannot Modify Text Rule Globally

Changing the text rule to exclude trailing spaces would break:
- List items: "- Item text here"
- Links: "[link text](url)"
- All other inline contexts that expect spaces within text

### Problem 3: Optional + Optional = Ambiguity

```javascript
optional(field('content', $.inline)),
optional(seq(...attributes...))
```

When both content AND attributes are optional, the parser must decide:
1. Is this word content or an attribute?
2. Is this space part of content or before attributes?
3. Should I continue parsing content or look for attributes?

Tree-sitter's LR(1) parser cannot resolve this with finite lookahead.

---

## What Would Work: External Scanner

### How External Scanners Solve This

External scanners (written in C/C++) can:

1. **Arbitrary lookahead** - Scan ahead as far as needed
2. **Context-sensitive tokenization** - Different token boundaries based on state
3. **Emit boundary tokens** - Signal to the grammar where content ends and attributes begin

### Implementation Approach

**Add to `externals` section in grammar.js:**
```javascript
externals: $ => [
  // ... existing tokens
  $._heading_attribute_start,  // Emitted when scanner sees " {#" or " {."
]
```

**Scanner logic (pseudocode in C):**
```c
if (heading_context && lexer->lookahead == ' ') {
  mark_start(lexer);
  advance(lexer);

  if (lexer->lookahead == '{') {
    advance(lexer);
    if (lexer->lookahead == '#' || lexer->lookahead == '.') {
      // Confirmed: this is heading attributes
      lexer->result_symbol = HEADING_ATTRIBUTE_START;
      return true;
    }
  }
}
```

**Grammar rule:**
```javascript
atx_heading: $ => seq(
  field('marker', ...),
  optional(field('content', $.inline)),
  optional(seq(
    $._heading_attribute_start,  // Scanner token, not a pattern!
    field('attributes', $.attribute_list)
  )),
  /\r?\n/
)
```

The scanner emits a special token that cleanly separates content from attributes.

---

## Estimated Effort for External Scanner

### Requirements
1. C/C++ programming knowledge
2. Understanding of tree-sitter scanner API
3. State management (tracking when we're in a heading context)
4. Testing across many edge cases

### Time Estimate
- **Experienced tree-sitter developer:** 4-6 hours
- **Learning from scratch:** 12-20 hours
- **Including comprehensive testing:** +4-8 hours

### Risks
- May introduce subtle bugs in edge cases
- More complex build process (C++ compilation)
- Harder to maintain than pure grammar

---

## Alternative Solutions

### Solution 1: Attributes-Only Syntax (Simpler)

Support ONLY `{.class}` without content before it:

```markdown
## Title
{.class}

```

Or require attributes on a separate line:

```markdown
## Title
{.class}
```

**Pros:** No parsing ambiguity
**Cons:** Non-standard syntax; not Pandoc-compatible

### Solution 2: Prefix Syntax

Use attributes BEFORE content:

```markdown
## {.class} Title
```

**Pros:** No trailing ambiguity
**Cons:** Not Pandoc syntax; weird for users

### Solution 3: Accept Limitations

Document that:
- ✅ Code blocks support `{.class}` syntax
- ✗ Headings do NOT support attributes
- Focus on other features for v0.1.0

**Pros:** Move forward quickly; focus on working features
**Cons:** 67% of validation failures remain

---

## Recommendation

**Defer to v0.2.0 or later** (Option D from original analysis)

**Rationale:**
1. External scanner is the only viable solution
2. Requires significant C/C++ work
3. Not critical for initial release
4. Other features can provide value sooner

**For v0.1.0:**
- Focus on features that DON'T require optional trailing syntax
- Document known limitations
- Build experience with tree-sitter before tackling this

**For v0.2.0:**
- Implement external scanner for heading attributes
- Reference tree-sitter-markdown scanner as example
- Allocate 2-3 days for implementation and testing

---

## Documentation Updates Needed

### 1. OpenSpec Change Status

Mark `openspec/changes/add-block-element-attributes/` as:
```
STATUS: DEFERRED
REASON: Requires external scanner implementation
TARGET: v0.2.0
BLOCKED_BY: Parser ambiguity in optional trailing syntax
```

### 2. Update CLAUDE.md

Add to "Known Limitations" section:
```markdown
## Known Limitations

### Block Attributes (Deferred to v0.2.0)

Pandoc heading attribute syntax (`## Title {.class}`) is not currently supported due to
parser limitations. This requires an external C scanner to resolve ambiguity between
heading content and trailing attributes.

**Workaround:** Use fenced divs or code block attributes which do work.
```

### 3. Update README (when created)

List "Planned Features" including block attributes.

---

## Related Files

- **Initial Analysis:** `docs/archive/features/block-attributes-findings-2025-10-18.md`
- **Resume Document:** `docs/archive/features/block-attributes-resume.md`
- **OpenSpec Proposal:** `openspec/changes/add-block-element-attributes/`
- **Test Cases:** `test/corpus/block-attributes.txt` (some tests pass with current approach)

---

## Learning for Future Features

### Red Flags for Grammar-Only Solutions

1. **Optional + Optional:** Two adjacent optional constructs
2. **Trailing syntax after variable content:** Content that might end with whitespace
3. **Whitespace ambiguity:** Unclear if space belongs to content or separator
4. **Greedy text rules:** Rules that consume everything except special chars

### Patterns That Work Well

1. **Required delimiters:** `` `code` ``, `**bold**`
2. **Prefix syntax:** `#| key: value` (chunk options)
3. **Line-based parsing:** Each line is unambiguous
4. **Empty-then-attributes:** `` ```{.python} `` (no content before `{`)

---

## Conclusion

After researching tree-sitter-markdown and experimenting with the `repeat()` pattern, the conclusion is clear:

**Block attributes for headings require an external C/C++ scanner.** Pure grammar solutions create parser ambiguity that cannot be resolved with precedence or patterns.

The feature is valuable but not critical for v0.1.0. Deferring to v0.2.0 allows:
- Focus on features that work now
- Time to learn scanner API properly
- Reference implementation from tree-sitter-markdown
- Adequate testing and validation

**Status:** Research complete; external scanner confirmed as only viable path forward.
