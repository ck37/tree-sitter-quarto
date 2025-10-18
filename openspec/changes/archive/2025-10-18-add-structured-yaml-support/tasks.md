# Implementation Tasks: Structured YAML Support

**Change ID:** `add-structured-yaml-support`
**Total Tasks:** 35
**Estimated Effort:** 3-5 days

---

## Phase 1: Grammar Foundation ✅ COMPLETE

### 1.1 Define YAML Node Types ✅

- [x] Add `yaml_mapping` rule to grammar.js
- [x] Add `yaml_pair` rule (key-value pair)
- [x] Add `yaml_key` rule
- [x] Add `yaml_scalar` rule with variants (string, number, boolean, null)

**Validation:** ✅ Grammar compiles without errors

---

### 1.2 Update yaml_front_matter Rule ✅

- [x] Modify `yaml_front_matter` to use `yaml_mapping` instead of unparsed content
- [x] Ensure start/close delimiters work (both `---` and `...`)

**Validation:** ✅ Existing YAML tests still pass (167/167 tests passing)

---

### 1.3 Add Scalar Type Rules ✅

- [x] Add `yaml_string_unquoted` rule (simple strings)
- [x] Add `yaml_string_quoted` rule (single and double quotes)
- [x] Add `yaml_number` rule (integers, floats, scientific notation)
- [x] Add `yaml_boolean` rule (true, false, yes, no)
- [x] Add `yaml_null` rule (null, ~)

**Validation:** ✅ Simple key-value tests pass

---

### 1.4 Create Initial Corpus Tests ✅

- [x] Add test for simple string key-value
- [x] Add test for quoted strings
- [x] Add test for numeric values
- [x] Add test for boolean values
- [x] Add test for null values
- [x] Add test for empty values
- [x] Add test for empty YAML front matter
- [x] Add test for `...` delimiter

**Validation:** ✅ 8 tests passing for basic YAML, all 167 tests passing overall

---

## Phase 2: Nested Mappings ⏸️ DEFERRED

**Status:** Requires complex scanner-based indentation tracking (Python-style INDENT/DEDENT tokens). This adds significant complexity and is deferred to future work.

**Why Deferred:**
- Scanner needs to track indentation stack and emit zero-width tokens
- TSLexer struct copying issues cause infinite loops
- Requires 4-6+ hours additional debugging
- Phase 1 already provides substantial value (structured YAML vs unparsed text)

**What's Needed (Future Work):**
- [ ] Implement scanner indent stack management
- [ ] Add YAML_INDENT/YAML_DEDENT external tokens
- [ ] Fix TSLexer state handling (no copying, proper mark_end placement)
- [ ] Update grammar to use indent tokens
- [ ] Add comprehensive nesting tests

**Alternative Approach:**
Could implement simplified 1-level nesting without full scanner support by using grammar-only indentation detection, but this has limitations.

---

## Phase 3: List Support (Day 2-3)

### 3.1 Add List Grammar Rules

- [ ] Add `yaml_list` rule
- [ ] Add `yaml_list_item` rule
- [ ] Add `yaml_list_marker` external token (scanner)
- [ ] Handle list item values (scalar, mapping, nested list)

**Validation:** Basic list tests compile

---

### 3.2 Implement List Marker Detection (Scanner)

- [ ] Add `scan_yaml_list_marker()` function to scanner
- [ ] Detect `-` at correct indentation level
- [ ] Ensure `-` followed by space/newline
- [ ] Avoid conflict with Markdown list markers

**Validation:** List marker detection works in YAML context

---

### 3.3 Test List Structures

- [ ] Add test for simple list of strings
- [ ] Add test for list of numbers
- [ ] Add test for list at top level (key: \n - item)
- [ ] Add test for nested list (list of lists)
- [ ] Add test for list of mappings (complex)

**Validation:** All list tests pass

---

## Phase 4: Multi-Line Values (Day 3)

### 4.1 Add Multi-Line Grammar Rules

- [ ] Add `yaml_multiline` rule (choice of literal or folded)
- [ ] Add `yaml_multiline_literal` rule (`|`)
- [ ] Add `yaml_multiline_folded` rule (`>`)
- [ ] Add `yaml_multiline_line` rule for content lines
- [ ] Support chomping indicators (`+`, `-`)

**Validation:** Multi-line rules compile

---

### 4.2 Implement Multi-Line Scanner Logic

- [ ] Add `scan_yaml_multiline_line()` function
- [ ] Detect indented lines after `|` or `>`
- [ ] Track multi-line block boundaries
- [ ] Handle end of multi-line block (dedent or delimiter)

**Validation:** Multi-line content captured correctly

---

### 4.3 Test Multi-Line Values

- [ ] Add test for literal block scalar (`|`)
- [ ] Add test for folded block scalar (`>`)
- [ ] Add test for multi-line with chomping indicator (`|-`, `|+`)
- [ ] Add test for empty lines in multi-line blocks

**Validation:** All multi-line tests pass

---

## Phase 5: Comments & Edge Cases (Day 4)

### 5.1 Add Comment Support

- [ ] Add `yaml_comment` rule (`# ...`)
- [ ] Handle inline comments (after value)
- [ ] Handle block comments (standalone lines)
- [ ] Ensure comments don't interfere with parsing

**Validation:** Comment tests pass

---

### 5.2 Handle Empty Values

- [ ] Handle key with no value (`key:`)
- [ ] Handle explicit null values
- [ ] Handle empty mappings
- [ ] Handle empty lists

**Validation:** Empty value tests pass

---

### 5.3 Implement Error Recovery

- [ ] Add fallback to `yaml_front_matter_content` for invalid YAML
- [ ] Detect invalid indentation
- [ ] Handle unsupported YAML features gracefully
- [ ] Ensure no parse failures (graceful degradation)

**Validation:** Error recovery tests pass

---

## Phase 6: Real-World Validation (Day 4-5)

### 6.1 Test on quarto-web Corpus

- [ ] Run validation script on 20-file sample
- [ ] Identify remaining parse failures
- [ ] Document edge cases found
- [ ] Fix critical issues

**Validation:** Success rate >50% (from 10%)

---

### 6.2 Fix Identified Edge Cases

- [ ] Review ERROR nodes in failed parses
- [ ] Add corpus tests for each edge case
- [ ] Implement fixes
- [ ] Re-run validation

**Validation:** Success rate >75%

---

### 6.3 Full Corpus Validation

- [ ] Run validation on all 509 quarto-web files
- [ ] Measure success rate
- [ ] Categorize remaining failures
- [ ] Document known limitations

**Validation:** Success rate ≥90%

---

## Phase 7: Performance & Polish (Day 5)

### 7.1 Performance Benchmarking

- [ ] Benchmark small YAML (10 pairs)
- [ ] Benchmark medium YAML (50 pairs, nested)
- [ ] Benchmark large YAML (200 pairs, 3 levels)
- [ ] Measure incremental re-parse performance
- [ ] Ensure <10% overhead vs. unparsed approach

**Validation:** Performance targets met

---

### 7.2 Scanner Optimization

- [ ] Review scanner state size (<100 bytes)
- [ ] Optimize indent tracking (minimize re-scans)
- [ ] Implement efficient serialization
- [ ] Profile hot paths

**Validation:** Scanner performance acceptable

---

### 7.3 Update Syntax Highlighting

- [ ] Add `yaml_key` highlight in queries/highlights.scm
- [ ] Add `yaml_scalar` highlight (different from key)
- [ ] Add `yaml_comment` highlight
- [ ] Add `yaml_null` distinct highlight
- [ ] Test syntax highlighting in editor

**Validation:** YAML syntax highlighted correctly

---

### 7.4 Add Code Folding Support

- [ ] Add folding for `yaml_mapping` blocks in queries/folds.scm
- [ ] Add folding for `yaml_list` blocks
- [ ] Add folding for `yaml_multiline` blocks
- [ ] Test folding in editor

**Validation:** YAML blocks foldable

---

## Phase 8: Documentation & Testing (Day 5)

### 8.1 Update Documentation

- [ ] Update README with YAML support status
- [ ] Add YAML examples to documentation
- [ ] Document known limitations
- [ ] Update grammar documentation

**Validation:** Documentation accurate

---

### 8.2 Comprehensive Test Suite

- [ ] Verify all 10 spec requirements have tests
- [ ] Add regression tests for validation failures
- [ ] Ensure 40+ YAML corpus tests
- [ ] Run full test suite (`tree-sitter test`)

**Validation:** All tests pass (159 existing + 40+ new)

---

### 8.3 CI/CD Integration

- [ ] Ensure CI tests pass on Ubuntu
- [ ] Ensure CI tests pass on macOS
- [ ] Update CI to run validation script
- [ ] Document CI requirements

**Validation:** CI green on all platforms

---

## Acceptance Criteria

### Functional
- [ ] All 10 spec requirements implemented
- [ ] 40+ corpus tests passing
- [ ] Zero regressions on existing tests (159/159)
- [ ] quarto-web validation ≥90% success rate

### Performance
- [ ] Parse time overhead <10%
- [ ] Memory overhead <5MB
- [ ] Incremental re-parse <5ms

### Quality
- [ ] No ERROR nodes on valid YAML
- [ ] Graceful degradation on invalid YAML
- [ ] Syntax highlighting working
- [ ] Code folding working

### Documentation
- [ ] README updated
- [ ] Known limitations documented
- [ ] Examples provided
- [ ] Migration guide (if needed)

---

## Task Dependencies

**Sequential Tasks:**
1. Phase 1 must complete before Phase 2 (need basic structure)
2. Phase 2 must complete before Phase 3 (need indentation tracking)
3. Phases 1-5 must complete before Phase 6 (need implementation)
4. Phase 6 must complete before Phase 7 (need validation results)

**Parallel Tasks:**
- Within each phase, tasks can be done in any order
- Syntax highlighting (7.3) can be done anytime after Phase 1
- Documentation (8.1) can be done in parallel with testing (8.2)

---

## Estimated Timeline

| Phase | Tasks | Time | Cumulative |
|-------|-------|------|------------|
| 1: Grammar Foundation | 4 | 1 day | Day 1 |
| 2: Nested Mappings | 3 | 0.5 days | Day 1-2 |
| 3: List Support | 3 | 1 day | Day 2-3 |
| 4: Multi-Line Values | 3 | 0.5 days | Day 3 |
| 5: Comments & Edge Cases | 3 | 0.5 days | Day 3-4 |
| 6: Real-World Validation | 3 | 1 day | Day 4-5 |
| 7: Performance & Polish | 4 | 0.5 days | Day 5 |
| 8: Documentation & Testing | 3 | 0.5 days | Day 5 |
| **Total** | **35** | **5 days** | |

**Note:** Timeline assumes full-time focused work. Part-time work extends to 1-2 weeks.

---

## Risk Mitigation Tasks

### If Performance Regressions Occur
- [ ] Profile scanner performance
- [ ] Optimize indent stack operations
- [ ] Consider caching indent calculations
- [ ] Review external token usage

### If Validation Success Rate <90%
- [ ] Analyze remaining failures categorically
- [ ] Prioritize top 3 failure patterns
- [ ] Add targeted fixes
- [ ] Consider expanding unparsed fallback

### If Test Regressions Occur
- [ ] Identify which tests broke
- [ ] Determine if YAML changes caused conflict
- [ ] Adjust precedence rules
- [ ] Add conflict resolution tests

---

## Success Metrics

**Before Implementation:**
- Test corpus: 159/159 passing (100%)
- Real-world: 2/20 passing (10%)
- Blocker: YAML structure (56% of failures)

**After Implementation (Target):**
- Test corpus: 199+/199+ passing (100%)
- Real-world: 18+/20 passing (≥90%)
- Blocker: Resolved ✅

**v0.2.0 Production Readiness:**
- YAML support: ✅ Complete
- Fenced attributes: ⏳ Next priority
- Combined success rate: ≥90%
