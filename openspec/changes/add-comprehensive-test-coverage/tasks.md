# Tasks: Add Comprehensive Test Coverage

## Phase 1: High Priority Features

### 1. Footnotes Test Suite
- [x] 1.1 Create `test/corpus/footnotes.txt`
- [x] 1.2 Add test: Basic inline footnote `^[note]`
- [x] 1.3 Add test: Nested inline footnotes `^[outer^[inner]]`
- [x] 1.4 Add test: Footnote reference `[^1]`
- [x] 1.5 Add test: Footnote definition `[^1]: Note text`
- [x] 1.6 Add test: Multiple footnotes in paragraph
- [x] 1.7 Add test: Footnote with inline formatting
- [x] 1.8 Run `npx tree-sitter test` - verify all footnote tests pass
- [x] 1.9 Commit: "test: add footnote test coverage"

**Deliverable:** ✅ **COMPLETE** - 10 new footnote tests passing, CI green (commit 23cf6dc, 2025-10-14)

### 2. Inline Attributes Test Suite
- [x] 2.1 Create `test/corpus/inline-attributes.txt`
- [x] 2.2 Add test: ID attribute `[text]{#myid}`
- [x] 2.3 Add test: Single class attribute `[text]{.class}`
- [x] 2.4 Add test: Multiple classes `[text]{.class1 .class2}`
- [x] 2.5 Add test: Class with period in name `[text]{.my.class}` (not supported - skipped)
- [x] 2.6 Add test: Key-value unquoted `[text]{key=value}` (not supported - skipped)
- [x] 2.7 Add test: Key-value quoted `[text]{key="value"}`
- [x] 2.8 Add test: Multiple key-values `[text]{k1="v1" k2="v2"}`
- [x] 2.9 Add test: Escaped quote in value `[text]{k="val\"ue"}` (complex - skipped)
- [x] 2.10 Add test: Mixed attributes `[text]{#id .class key="value"}`
- [x] 2.11 Add test: Empty attributes `[text]{}` (not applicable)
- [x] 2.12 Add test: Attributes with whitespace `[text]{ #id .class }` (not applicable)
- [x] 2.13 Run `npx tree-sitter test` - verify all attribute tests pass
- [x] 2.14 Commit: "test: add inline attribute test coverage"

**Deliverable:** ✅ **COMPLETE** - 15 new attribute tests passing, CI green (commit 28bb053, 2025-10-17)

### 3. Pipe Tables Test Suite
- [ ] 3.1 Create `test/corpus/pipe-tables.txt`
- [ ] 3.2 Add test: Basic table (header + delimiter + 1 row)
- [ ] 3.3 Add test: Table with multiple rows
- [ ] 3.4 Add test: Left-aligned column `|:---|`
- [ ] 3.5 Add test: Center-aligned column `|:---:|`
- [ ] 3.6 Add test: Right-aligned column `|---:|`
- [ ] 3.7 Add test: Mixed column alignment
- [ ] 3.8 Add test: Escaped pipe in cell `\|`
- [ ] 3.9 Add test: Empty cell content
- [ ] 3.10 Add test: Whitespace-only cell
- [ ] 3.11 Add test: Table followed by paragraph
- [ ] 3.12 Add test: Table followed by block quote
- [ ] 3.13 Run `npx tree-sitter test` - verify all table tests pass
- [ ] 3.14 Commit: "test: add pipe table test coverage"

**Deliverable:** 10-12 new pipe table tests passing, CI green

## Phase 2: Test Refinements & Cleanup

### 4. Test Refinements Suite
- [ ] 4.1 Create `test/corpus/test-refinements.txt`
- [ ] 4.2 Add test: Suppress author citation `-@author`
- [ ] 4.3 Add test: Bracketed citation `@{https://example.com}`
- [ ] 4.4 Add test: Suppress author with brackets `-@{url}`
- [ ] 4.5 Add test: Escaped shortcode `{{{< call >}}}`
- [ ] 4.6 Add test: Nested shortcode `{{< outer {{< inner >}} >}}`
- [ ] 4.7 Add test: Shortcode with single-quoted escaped string `{{< video 'url\'here' >}}`
- [ ] 4.8 Add test: Shortcode with double-quoted escaped string `{{< video "url\"here" >}}`
- [ ] 4.9 Add test: Code block with single-char class ` ```{.r}`
- [ ] 4.10 Add test: Code block with id/class ` ```{#mycode .python}`
- [ ] 4.11 Add test: Empty fenced div `::: {}\n:::`
- [ ] 4.12 Add test: Fenced div with trailing space at closing fence
- [ ] 4.13 Run `npx tree-sitter test` - verify all refinement tests pass
- [ ] 4.14 Commit: "test: add edge case test coverage"

**Deliverable:** 10-12 new edge case tests passing, CI green

### 5. Language Injection Cleanup
- [x] 5.1 Review current language injection rules in `queries/injections.scm`
- [x] 5.2 Remove mermaid injection (lines 100-107): executable cells
- [x] 5.3 Remove mermaid injection (if present): fenced code blocks
- [x] 5.4 Remove dot injection (lines 109-116): executable cells
- [x] 5.5 Remove dot injection (if present): fenced code blocks
- [x] 5.6 Run `npx tree-sitter test` - verify all existing tests still pass
- [x] 5.7 Test with example mermaid/dot blocks - verify they still parse (just no injection)
- [x] 5.8 Commit: "refactor: remove non-executable language injections (mermaid, dot)"

**Deliverable:** ✅ **COMPLETE** - Cleaner injection file, focused on executable code languages only (commit a584088, 2025-10-14)

## Validation & Documentation

### 6. Final Verification
- [ ] 6.1 Run full test suite: `npx tree-sitter test`
- [ ] 6.2 Verify test count increased by 32-52 tests (58 → 90-110)
- [ ] 6.3 Verify 100% pass rate maintained
- [ ] 6.4 Check CI passes on all platforms (Ubuntu/macOS, Node 18.x/20.x)
- [ ] 6.5 Verify test execution time < 1s average
- [ ] 6.6 Update README.md test badge if count changed
- [ ] 6.7 Update docs/plan.md with new test count
- [ ] 6.8 Run `openspec validate add-comprehensive-test-coverage --strict`
- [ ] 6.9 Commit: "docs: update test count in README and plan"

**Deliverable:** All tests passing, documentation updated, validation green

## Notes

**Parallelization:** Tasks 1.x, 2.x, and 3.x can be done in parallel (independent test files)

**Dependencies:**
- Task 5 (cleanup) should happen after tasks 1-4 (don't want injection cleanup blocking test additions)
- Task 6 (validation) depends on tasks 1-5 being complete

**Incremental Progress:** Each task 1.9, 2.14, 3.14, 4.14, 5.8, 6.9 creates a commit, allowing incremental review and rollback if needed

**Test Estimation:**
- Footnotes: ~6-8 tests
- Inline attributes: ~10-12 tests
- Pipe tables: ~10-12 tests
- Test refinements: ~10-12 tests
- Total new tests: ~36-44 tests
- Final count: 58 + 36-44 = 94-102 tests (likely ~95-100)
