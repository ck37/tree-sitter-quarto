# Validation Findings - Real-World Corpus Testing

**Date:** 2025-10-17
**Corpus:** quarto-web (https://github.com/quarto-dev/quarto-web.git)
**Sample Size:** 20 files (random sample from 509 .qmd files)
**Success Rate:** 10% (2/20 files passed without ERROR nodes)

---

## Executive Summary

Initial validation against real-world Quarto documents reveals a **10% success rate**, significantly below the 90% target for v0.1.0 release. While the parser handles basic Quarto features correctly (executable cells, simple YAML, shortcodes), it fails on **advanced Pandoc/Quarto syntax** commonly used in production documents.

**Key Finding:** The 159/159 corpus tests passing demonstrate correct *grammar implementation*, but expose a **feature completeness gap** for real-world usage.

---

## Critical Missing Features

### 1. Fenced Code Block Attributes ⚠️ **HIGH PRIORITY**

**Syntax:**
```markdown
``` {.markdown filename="index.ipynb" shortcodes="false"}
code content
```
```

**Current Behavior:** Parser treats `{.class key="value"}` as malformed, produces ERROR nodes

**Parse Error:**
```
(ERROR [4, 0] - [4, 23]
  (code_fence_delimiter [4, 0] - [4, 3])
  (info_string [4, 3] - [4, 4])        # Wrong: treats '{' as info_string
  (attribute_class [4, 5] - [4, 14])    # Partial match
  (citation_key [4, 14] - [4, 23]))     # Wrong: 'filename=...' is not a citation!
```

**Examples Found:**
- `docs/manuscripts/authoring/_embeds-ipynb.qmd` line 5
- Multiple other files with `{.python}`, `{.bash filename="..."}`, etc.

**Impact:**
- **Frequency:** Very common in real-world documents
- **Severity:** Causes parse failures for basic code documentation
- **Editor Impact:** Syntax highlighting breaks, LSP features fail

**Specification:** Pandoc fenced code attributes
- [Pandoc Docs](https://pandoc.org/MANUAL.html#fenced-code-blocks)
- Format: ` ``` {#id .class key=value} `
- Supports: classes (`.class`), ID (`#id`), key-value pairs

---

### 2. Structured YAML Front Matter ⚠️ **HIGH PRIORITY**

**Syntax:**
```yaml
---
title: "Document"
listing:
  id: my-list
  contents:
    - file1.yml
    - file2.yml
metadata-files:
  - _metadata.yml
---
```

**Current Behavior:** Parser treats all YAML as unparsed `yaml_front_matter_content`, produces ERROR nodes when encountering lists/objects

**Parse Error:**
```
(ERROR [0, 0] - [15, 5]
  (yaml_front_matter_start [0, 0] - [1, 0])
  (yaml_front_matter_content [1, 0] - [1, 26])  # title: ...
  (yaml_front_matter_content [2, 0] - [2, 9])   # listing:
  (table_delimiter_cell [4, 12] - [5, 6])       # Wrong! List item parsed as table cell
  (citation_key [5, 6] - [5, 14])               # Wrong! YAML key parsed as citation
```

**Examples Found:**
- `docs/extensions/listing-revealjs.qmd` (YAML with nested objects)
- Most production documents with complex front matter

**Impact:**
- **Frequency:** ~70% of real-world documents
- **Severity:** Blocks parsing of most production documents
- **Editor Impact:** YAML validation, completion, and folding broken

**Root Cause:** Grammar uses simple `yaml_front_matter_content` token instead of structured YAML nodes

**Solution Options:**
1. **Minimal:** Parse YAML as unparsed blocks (current), ignore structure
2. **Better:** Add basic structure detection (lists, objects, scalars)
3. **Full:** Integrate tree-sitter-yaml as external scanner

**Recommendation:** Option 2 for v0.2.0 - detect structure without full YAML parsing

---

### 3. Large HTML Blocks ⚠️ **MEDIUM PRIORITY**

**Syntax:**
```markdown
<div class="slides">
  <div>...</div>
  <div>...</div>
  <!-- hundreds of lines of HTML -->
</div>
```

**Current Behavior:** Parser creates massive ERROR nodes spanning hundreds of lines when HTML blocks are embedded in Markdown

**Parse Error:**
```
(ERROR [10, 0] - [398, 7]   # 388 lines of ERROR!
  (list_marker [10, 0] - [10, 1])
  (html_open_tag [11, 30] - [11, 36])
  (html_block_content [11, 36] - [11, 77])
  (html_block_content [12, 0] - [12, 75])
  ... 300+ more html_block_content lines ...
)
```

**Examples Found:**
- `docs/presentations/revealjs/presenting.qmd` (625-line file, 388 lines ERROR)

**Impact:**
- **Frequency:** Common in presentations/dashboards
- **Severity:** Parses complete but with ERROR, still functional
- **Editor Impact:** Error markers, slower parsing

**Root Cause:** HTML block vs. inline detection heuristics fail with complex nesting

---

### 4. Inline Attributes on Images/Links ⚠️ **LOW PRIORITY**

**Syntax:**
```markdown
![](image.png){.class fig-alt="text" width=500}
[link text](url){target="_blank"}
```

**Current Behavior:** Parses image/link correctly, but treats `{...}` suffix as ERROR

**Parse Error:**
```
(ERROR [457, 30] - [457, 46]
  (attribute_class [457, 31] - [457, 38])
  (reference_type [457, 38] - [457, 42])  # Wrong context
  (citation_key [457, 43] - [457, 46]))   # Key=value parsed wrong
```

**Impact:** Cosmetic - content parses, attributes ignored

---

## What's Working Well ✅

### Features with 100% Success

1. **Executable Code Cells**
   ```markdown
   ```{python}
   #| label: fig-plot
   #| echo: false
   code here
   ```
   ```
   - Parses language correctly
   - Chunk options recognized
   - Cell content preserved

2. **Basic YAML Front Matter**
   ```yaml
   ---
   title: "Document"
   author: "Name"
   ---
   ```
   - Simple key: value pairs work
   - Multi-line values work

3. **Shortcodes**
   ```markdown
   {{< include file.qmd >}}
   {{< embed notebook.ipynb#cell-id >}}
   ```
   - Both block and inline shortcodes parse correctly

4. **Cross-References**
   ```markdown
   See @fig-plot for details.
   ```
   - Correctly distinguished from citations

5. **Callouts**
   ```markdown
   ::: {.callout-note}
   Content
   :::
   ```
   - Div syntax works correctly

---

## Statistical Breakdown

### Errors by Category

| Error Type | Files Affected | % of Failures |
|------------|---------------|---------------|
| Fenced code block attributes | 12/18 | 67% |
| Structured YAML | 10/18 | 56% |
| HTML block parsing | 5/18 | 28% |
| Inline attributes | 8/18 | 44% |

### Most Common ERROR Patterns

1. **`citation_key` where should be YAML/attribute key** - Indicates grammar rules overlapping incorrectly
2. **`table_delimiter_cell` in YAML lists** - YAML structure detection missing
3. **Massive ERROR nodes wrapping html_block_content** - HTML/Markdown boundary detection issue

---

## Impact on v0.1.0 Release

### Current Status

- ✅ Grammar implementation: 100% complete (159/159 tests)
- ✅ Core Quarto features: Working correctly
- ⚠️ Real-world validation: 10% success rate
- ❌ Release target: 90% success rate

### Blocker Analysis

**Can we ship v0.1.0 without fixes?**

**Arguments FOR shipping:**
- Core features work (code cells, chunk options, cross-refs)
- Test corpus (159 tests) all passing
- Issues are *missing features*, not *broken features*
- Clear documentation of limitations
- Better than no parser at all

**Arguments AGAINST shipping:**
- 90% failure rate on real documents is embarrassing
- Editor integration will show errors everywhere
- Users will hit limitations immediately
- Reputational risk ("broken" parser)

### Recommendation

**Ship v0.1.0 as "Technical Preview" with:**

1. **Clear documentation** of known limitations
2. **"Works best with simple documents"** positioning
3. **Roadmap** showing v0.2.0 will fix top issues
4. **Example documents** that work well
5. **GitHub issues** for missing features

**Then immediately start v0.2.0** to fix critical issues #1 and #2

---

## v0.2.0 Implementation Plan

### Priority 1: Fenced Code Block Attributes

**Estimated Effort:** 2-3 days

**Grammar Changes:**
```javascript
fenced_code_block: $ => seq(
  $.code_fence_delimiter,
  optional($.language_name),
  optional($.code_block_attributes),  // NEW
  '\n',
  optional($.cell_content),
  $.code_fence_delimiter
),

code_block_attributes: $ => seq(
  '{',
  repeat(choice(
    $.attribute_class,   // .class
    $.attribute_id,      // #id
    $.attribute_keyval,  // key=value or key="value"
  )),
  '}'
),
```

**Testing:** Add corpus tests for all variations

### Priority 2: Structured YAML Front Matter

**Estimated Effort:** 3-5 days

**Options:**
1. **External Scanner (Recommended):** Use tree-sitter-yaml
2. **Minimal Detection:** Add list/object structure nodes

**Grammar Changes (Minimal Approach):**
```javascript
yaml_front_matter_content: $ => choice(
  $.yaml_scalar,          // key: value
  $.yaml_list_item,       // - item
  $.yaml_block_mapping,   // key:\n  nested: value
),
```

**Testing:** Parse quarto-web YAML patterns

### Priority 3: HTML Block Improvements

**Estimated Effort:** 1-2 days

**Changes:** Improve HTML block detection heuristics to handle nested structures

---

## Validation Metrics Target (v0.2.0)

| Metric | v0.1.0 | v0.2.0 Target |
|--------|--------|---------------|
| Success rate | 10% | ≥90% |
| Files with ERROR nodes | 90% | ≤10% |
| Avg parse time | ~0.3ms | <0.5ms |
| Memory usage | <5MB | <10MB |

---

## Lessons Learned

### Test Corpus ≠ Real-World Usage

- **159/159 tests passing** looked great but missed critical features
- Need to **validate against real corpus EARLIER** in development
- Synthetic tests don't capture real usage patterns

### YAML Complexity Underestimated

- Treating YAML as unparsed text seemed pragmatic
- Real documents have **complex YAML metadata**
- Need structured parsing for editor integration

### Pandoc Compatibility Critical

- Quarto is **Pandoc-based**, not pure Markdown
- Must support Pandoc extensions (attributes, divs, spans)
- Can't just rely on CommonMark spec

---

## Conclusion

The validation reveals a **mature core with incomplete feature set**. The parser handles Quarto-specific features (executable cells, chunk options, cross-references) correctly, but lacks critical Pandoc syntax support needed for real-world documents.

**Recommendation:** Ship v0.1.0 as technical preview with clear limitations, then prioritize fenced code attributes and YAML structure for v0.2.0.

---

## Appendix: Sample Error Files

### Minimal Reproduction - Fenced Code Attributes

```markdown
---
title: "Test"
---

``` {.python filename="test.py"}
print("hello")
```
```

**Expected:** Clean parse
**Actual:** ERROR node on fence line

### Minimal Reproduction - YAML Lists

```markdown
---
title: "Test"
contents:
  - item1.yml
  - item2.yml
---

# Content
```

**Expected:** Structured YAML nodes
**Actual:** ERROR node wrapping front matter

---

## References

- Validation Report: `benchmarks/validation/validation-report.md`
- Failed Files: 18/20 in sample
- Corpus: quarto-web (509 .qmd files)
- Parser Version: tree-sitter-quarto commit 60d08ea
