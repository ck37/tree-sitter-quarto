# Resuming Block Element Attributes Implementation

**Date Created:** 2025-10-18
**Status:** PARTIAL IMPLEMENTATION - Needs refinement
**OpenSpec Change:** `add-block-element-attributes`

---

## Quick Summary

Attempted to implement Pandoc attribute syntax for headings and code blocks (e.g., `## Title {#id .class}`, `` ```python {.numberLines} ``) to fix 67% of validation failures. Grammar changes are in place and attributes ARE being recognized, but heading content parsing creates ERROR nodes that prevent validation improvement.

**Current validation:** 5% success rate (unchanged)
**Target validation:** 60%+ success rate
**Blocker:** Content parsing issue in headings

---

## What Was Completed

### 1. OpenSpec Proposal ✅
- **Location:** `openspec/changes/add-block-element-attributes/`
- **Files:**
  - `proposal.md` - Why, what, impact
  - `design.md` - Technical decisions and architecture
  - `tasks.md` - Implementation checklist (partially complete)
  - `specs/block-attributes/spec.md` - 17 requirements with scenarios
- **Status:** Validated with `openspec validate add-block-element-attributes --strict`

### 2. Grammar Modifications ✅
- **File:** `grammar.js`
- **Changes:**
  - Lines 265-277: `atx_heading` with optional `{attributes}` suffix
  - Lines 279-292: `setext_heading` with optional `{attributes}` suffix
  - Lines 330-345: `fenced_code_block` with optional `{attributes}` after info string
- **Parser:** Regenerated with `tree-sitter generate`

### 3. Test Coverage ✅
- **File:** `test/corpus/block-attributes.txt`
- **Tests:** 9 test cases covering:
  - ATX headings with ID, class, multiple attributes
  - Code blocks with class, filename, raw format
  - Backward compatibility (no attributes)

### 4. Validation Run ✅
- **Command:** `MAX_SAMPLE=20 bash scripts/validate-corpus.sh`
- **Result:** 5% success rate (1/20 files) - NO IMPROVEMENT
- **Report:** `benchmarks/validation/validation-report.md`

---

## The Problem

### Issue: Heading Content Parsed as ERROR

**Example:**
```markdown
## Introduction {#intro}
```

**Current Parse Tree:**
```
(atx_heading
  marker: (atx_heading_marker)     ✓ Correct
  (ERROR                           ⚠️ Problem!
    (citation_key))                   "Introduction" incorrectly parsed
  attributes: (attribute_list      ✓ Correct
    id: (attribute_id)))              #intro recognized
```

**What Works:**
- Attributes ARE recognized (see `attributes: (attribute_list ...)`)
- Code blocks with only attributes parse cleanly: `` ```{.python} `` ✓
- Backward compatibility maintained (headings without attributes work)

**What Doesn't Work:**
- Heading content before `{` creates ERROR nodes
- Similar issue with code blocks that have `info_string` + attributes
- Validation still fails due to ERROR nodes

### Root Cause

The `inline` content rule (used in headings) and `info_string` rule don't know where to stop before `{`. The parser sees:

```
## Introduction {#intro}
   ^^^^^^^^^^^          ← Should be content
               ^^^^^^^  ← Should be attributes
```

But `inline`/`text` rules consume characters including `{`, creating ambiguity. The attribute pattern eventually matches, but leaves ERROR nodes in content.

### Why This Happens

1. **text rule** (grammar.js:616): `/[^\r\n`*_\[@<${^~=]+/` - stops at `{` but after inline parsing starts
2. **Greedy inline parsing**: `optional(field('content', $.inline))` tries to consume as much as possible
3. **Precedence conflict**: Even with `prec.right` and `prec(1)`, the parser can't cleanly split content from attributes

---

## How to Resume This Work

### Step 1: Verify Current State

```bash
cd "/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto"

# Check OpenSpec status
openspec list

# Check grammar changes are present
grep -A 10 "atx_heading: \$ => prec.right" grammar.js

# Verify test file exists
ls -la test/corpus/block-attributes.txt

# Run a quick parse test
echo -e '## Title {.class}\n' | tree-sitter parse
```

**Expected output:** Attributes recognized but content has ERROR node.

### Step 2: Fix the Content Parsing Issue

This is the critical blocker. Try one of these approaches:

#### Option A: Specialized Heading Content Rule (Recommended)

Create a `heading_inline` rule that stops before `{`:

```javascript
// Add near line 616 in grammar.js
heading_inline: $ => repeat1($._heading_inline_element),

_heading_inline_element: $ => choice(
  $.heading_text,
  $.strong_emphasis,
  $.emphasis,
  $.code_span,
  // ... other inline elements except citation_key
),

heading_text: $ => /[^\r\n`*_\[@<${^~=]+(?=\s*\{|$)/,  // Lookahead to stop before {
```

Then modify `atx_heading`:
```javascript
atx_heading: $ => prec.right(seq(
  field('marker', ...),
  optional(field('content', $.heading_inline)),  // Use specialized rule
  optional(prec(1, seq(
    /[ \t]*/,
    '{',
    // ... attributes
  ))),
  /\r?\n/
)),
```

#### Option B: Negative Lookahead in Text Rule

Modify the text rule to avoid consuming content before attributes:

```javascript
text: $ => /[^\r\n`*_\[@<${^~=]+(?!\s*\{[#\.])/,  // Don't consume if { follows with # or .
```

**Warning:** This affects ALL text parsing, may have unintended side effects.

#### Option C: External Scanner Token

Add a scanner token `ATTRIBUTE_BOUNDARY` that the scanner emits when it sees ` {#` or ` {.`:

```c
// In src/scanner.c
if (lexer->lookahead == ' ' || lexer->lookahead == '\t') {
  advance(lexer);
  if (lexer->lookahead == '{') {
    advance(lexer);
    if (lexer->lookahead == '#' || lexer->lookahead == '.') {
      lexer->result_symbol = ATTRIBUTE_BOUNDARY;
      return true;
    }
  }
}
```

Then use this token to terminate inline content.

### Step 3: Regenerate and Test

```bash
# After grammar changes
tree-sitter generate

# Test the fix
echo -e '## Introduction {#intro}\n' | tree-sitter parse

# Should see clean parse:
# (atx_heading
#   marker: (atx_heading_marker)
#   content: (heading_inline        ← No ERROR!
#     (heading_text))
#   attributes: (attribute_list
#     id: (attribute_id)))
```

### Step 4: Run Full Validation

```bash
# Run existing tests (should still pass)
tree-sitter test

# Run validation
MAX_SAMPLE=20 bash scripts/validate-corpus.sh

# Check improvement
cat benchmarks/validation/results.json | grep success_rate
```

**Success criteria:** 60%+ success rate (up from 5%)

### Step 5: Complete Remaining Tasks

From `openspec/changes/add-block-element-attributes/tasks.md`:

```bash
# Syntax highlighting
# Edit queries/highlights.scm, add:
(atx_heading
  attributes: (attribute_list) @markup.attribute)

(fenced_code_block
  attributes: (attribute_list) @markup.attribute)

# Update documentation
# Edit README.md - add "Supported Attribute Syntax" section
# Edit examples/sample.qmd - add examples with attributes

# Archive the change
openspec archive add-block-element-attributes
```

---

## Technical References

### Key Files

| File | Purpose | Lines |
|------|---------|-------|
| `grammar.js` | Grammar definition | 265-277 (atx_heading), 330-345 (fenced_code_block) |
| `src/scanner.c` | External scanner | May need modifications |
| `test/corpus/block-attributes.txt` | Test cases | All |
| `queries/highlights.scm` | Syntax highlighting | Needs updates |
| `openspec/changes/add-block-element-attributes/` | Proposal docs | All |

### Relevant Commands

```bash
# Development
tree-sitter generate           # Regenerate parser
tree-sitter test               # Run tests
tree-sitter parse FILE         # Parse a file

# Validation
MAX_SAMPLE=20 bash scripts/validate-corpus.sh
cat benchmarks/validation/results.json | jq .

# OpenSpec
openspec list                                    # List active changes
openspec show add-block-element-attributes       # View proposal
openspec validate add-block-element-attributes   # Validate
openspec archive add-block-element-attributes    # Archive when done
```

### Expected Validation Results

| Metric | Before | After Fix | Target |
|--------|--------|-----------|--------|
| Success Rate | 5% (1/20) | 60%+ | 90% |
| ERROR Nodes | Most files | Few files | Minimal |
| Heading Attributes | Not recognized | Recognized ✓ | Recognized ✓ |
| Code Block Attributes | Not recognized | Recognized ✓ | Recognized ✓ |

---

## Design Decisions (from design.md)

### Why Attributes After Content?

Matches Pandoc spec: `## Heading {#id}` not `## {#id} Heading`

### Why Reuse `attribute_list`?

Consistency with existing fenced divs, executable cells, inline spans.

### Why Both `## Title {attrs}` and ```` ```{attrs} ````?

Real-world quarto-web uses both:
- ```` ```{.lang attrs} ```` - Class-based language
- ```` ```lang {attrs} ```` - Info string + attributes

---

## Testing Strategy

### Quick Manual Tests

```bash
# Test cases to verify fix
echo -e '## Plain\n' | tree-sitter parse                    # Should work
echo -e '## Title {#id}\n' | tree-sitter parse              # Should work (after fix)
echo -e '## Title {.class}\n' | tree-sitter parse           # Should work (after fix)
echo -e '```{.python}\ncode\n```\n' | tree-sitter parse     # Should work (already does)
echo -e '```python {.num}\ncode\n```\n' | tree-sitter parse # Should work (after fix)
```

### Corpus Tests

Run specific test file:
```bash
tree-sitter test --filter block-attributes
```

Should see all 9 tests pass (after fix).

### Real-World Validation

```bash
# Full validation (may take 2-3 minutes)
bash scripts/validate-corpus.sh

# Check specific failing files
tree-sitter parse /tmp/quarto-web-corpus/docs/presentations/revealjs/themes.qmd
```

---

## Known Good State to Compare

### Working Example: Inline Attributes

Inline attributes `[text]{.class}` work despite ERROR nodes in content:

```
(link
  (ERROR (reference_label))     ← ERROR present but acceptable
  attributes: (attribute_list   ← Attributes still work
    class: (attribute_class)))
```

**Key insight:** ERROR nodes are acceptable IF attributes are recognized. The validation failures may be from OTHER syntax issues, not just ERROR nodes.

---

## Alternative: Accept ERROR Nodes

If fixing content parsing proves too complex, consider:

1. **Document the behavior** - ERROR nodes are cosmetic if attributes work
2. **Focus on code blocks** - They parse cleanly with ```` ```{attrs} ````
3. **Defer heading fixes** - Implement code block attributes only for now
4. **Create follow-up proposal** - `fix-heading-content-parsing` as v0.3.0 work

Check validation report to see if code block attributes alone improve success rate.

---

## Questions to Answer

Before resuming, investigate:

1. **Are code blocks parsing cleanly?**
   ```bash
   echo -e '```{.python}\ncode\n```\n' | tree-sitter parse
   ```
   If yes, they may already be improving validation.

2. **What's actually causing validation failures?**
   ```bash
   cat benchmarks/validation/validation-report.md | head -100
   ```
   Are failures from missing attributes, or other syntax issues?

3. **Do existing tests account for ERROR nodes?**
   ```bash
   grep -r "ERROR" test/corpus/inline-attributes.txt
   ```
   If yes, ERROR nodes may be acceptable.

---

## Success Metrics

Mark this work complete when:

- [ ] `## Title {.class}` parses without ERROR in content
- [ ] `` ```python {.num} `` parses without ERROR in info
- [ ] All 9 tests in `test/corpus/block-attributes.txt` pass
- [ ] Validation success rate ≥ 60% (currently 5%)
- [ ] Syntax highlighting works for attributes
- [ ] Documentation updated
- [ ] OpenSpec change archived

---

## Contact & Context

**OpenSpec Proposal:** `openspec show add-block-element-attributes`
**Validation Report:** `benchmarks/validation/validation-report.md`
**Implementation Date:** 2025-10-18
**Claude Code Session:** This work was done in a Claude Code session

For questions, refer to:
- `openspec/changes/add-block-element-attributes/design.md` - Technical decisions
- `docs/archive/validation/validation-findings-2025-10-17.md` - Original validation analysis
- `docs/archive/releases/v0.1.0-release-readiness.md` - Release context

---

## Next Session Checklist

Starting fresh? Run these commands:

```bash
# 1. Navigate to project
cd "/Users/ck432/Partners HealthCare Dropbox/Chris Kennedy/Code/tree-sitter-quarto"

# 2. Check status
openspec list
git status

# 3. Verify grammar changes
grep -A 5 "atx_heading: \$ => prec.right" grammar.js

# 4. Test current behavior
echo -e '## Title {.class}\n' | tree-sitter parse

# 5. Read this document
cat docs/block-attributes-resume.md

# 6. Pick a fix strategy (Option A, B, or C above)

# 7. Implement, test, validate, complete tasks
```

Good luck! The foundation is solid, just needs the content parsing refinement to unlock the validation improvements.
