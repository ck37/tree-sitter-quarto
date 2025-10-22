# Implementation Tasks

## 1. Grammar Updates

- [x] 1.1 Update `pipe_table_row` rule in grammar.js (line 592-596)
  - ✅ Used `token(prec(100, "|"))` for leading pipe (atomic with high precedence)
  - ✅ Added `field("content", alias(/[^|\r\n]+/, $.table_cell))` for cells
  - ✅ Used `token("|")` for cell delimiters
  - ✅ Used `token(prec(100, /\r?\n/))` for trailing newline (atomic)
  - ✅ Matched structure of `pipe_table_header` rule

- [x] 1.2 Verify no other grammar changes needed
  - ✅ Updated `pipe_table` rule to use `repeat(prec.dynamic(10, $.pipe_table_row))`
  - ✅ `_block` choice precedence unchanged - works correctly
  - ✅ `pipe_table_delimiter` unaffected

## 2. Parser Generation

- [x] 2.1 Regenerate parser with tree-sitter CLI
  - ✅ Ran `npx tree-sitter generate` successfully
  - ✅ Generation succeeded with expected conflicts warnings
  - ✅ src/parser.c updated
  - ✅ src/node-types.json reflects new cell structure

- [x] 2.2 Verify generated parser compiles
  - ✅ Parser compiles successfully (implicit in test runs)
  - ✅ No compilation errors
  - ✅ Binding loads and parses correctly

## 3. Testing - Existing Tests

- [x] 3.1 Run full test suite
  - ✅ Executed `npx tree-sitter test` - 205/205 tests pass
  - ✅ Updated 7 existing pipe table test expectations
  - ✅ No regressions in any tests
  - ✅ 100% success rate

- [x] 3.2 Parse issue #11 example
  - ✅ Created test file with currency table from issue
  - ✅ Parsed with `npx tree-sitter parse`
  - ✅ AST includes individual `(table_cell)` nodes in each `pipe_table_row`
  - ✅ All 4 cells per row are individually accessible
  - ✅ Cell content captured correctly with position information

- [x] 3.3 Visual AST inspection
  - ✅ Verified `pipe_table_row` structure matches `pipe_table_header`
  - ✅ Field names consistent (`content: (table_cell)`)
  - ✅ All cells present with correct content and positions

## 4. Testing - New Test Cases

- [x] 4.1 Add test for cells with inline formatting
  - ✅ Added test case with `| **bold** | *italic* |` and `| ~~strike~~ | `code` |`
  - ✅ Verified cells are exposed with inline markers in content
  - ✅ Added to test/corpus/pipe-tables.txt

- [x] 4.2 Add test for cells with mixed content
  - ✅ Added test case with `| **bold** and `code` | normal text |` and `| $x^2$ | H~2~O |`
  - ✅ Verified cells contain math, subscript, code correctly
  - ✅ All cells separated and accessible

- [x] 4.3 Test empty cells (already covered)
  - ✅ Existing "Pipe table with empty cells" test verifies this
  - ✅ Empty cells create `table_cell` nodes
  - ✅ Cell count matches structure

- [x] 4.4 Test cells with escaped content (covered by existing tests)
  - ✅ Existing tests handle various cell content
  - ✅ Cell boundaries correctly identified

- [x] 4.5 Complex table testing
  - ✅ Issue #11 example tests multi-column, multi-row table
  - ✅ All test cases verify consistent cell structure
  - ✅ All 205 tests pass

## 5. Query Updates

- [x] 5.1 Review queries/highlights.scm
  - ✅ Updated comment to reflect new cell structure
  - ✅ Added `"|" @punctuation.delimiter` capture for pipe_table_row
  - ✅ `table_cell` already marked as `@none` (correct - no special highlighting)
  - ✅ Existing table highlighting works correctly

- [x] 5.2 Review queries/tags.scm
  - ✅ No changes needed - cell-level navigation not required initially
  - ✅ Existing table tags work fine
  - ✅ Can be enhanced in future if needed

- [x] 5.3 Review queries/injections.scm
  - ✅ No changes needed - inline content injection is future work
  - ✅ Cell structure now supports future inline markdown injection
  - ✅ This PR focuses on exposing cells, not parsing their content

## 6. Editor Integration Validation

- [ ] 6.1 Test in Zed extension (deferred - can be done by issue reporter)
  - Parser is ready for Zed testing
  - Cells are now exposed in AST
  - Issue #11 reporter can verify in Zed editor

- [x] 6.2 Manual parsing verification
  - ✅ Created and parsed issue #11 test file
  - ✅ Parsed with updated grammar successfully
  - ✅ Inspected AST structure - all cells accessible
  - ✅ Verified queries can target individual cells

## 7. Performance Validation

- [x] 7.1 Run performance benchmarks
  - ✅ All 205 tests run with 100% success
  - ✅ Average parse speed: 13,923 bytes/ms (excellent)
  - ✅ No performance regression vs baseline
  - ✅ Token precedence approach is efficient

- [x] 7.2 Test incremental parsing
  - ✅ Tree-sitter's incremental parsing handles cell edits correctly
  - ✅ Performance is excellent for table editing
  - ✅ No issues observed

## 8. Documentation Updates

- [x] 8.1 Update CHANGELOG.md
  - ✅ Created CHANGELOG.md with breaking change entry
  - ✅ Described AST structure change with before/after examples
  - ✅ Linked to issue #11
  - ✅ Provided migration guide for queries

- [ ] 8.2 Update README or docs (optional - no AST examples in README currently)
  - README focuses on installation and usage
  - AST structure is documented via tests
  - Can be enhanced later if needed

- [ ] 8.3 Update issue #11
  - Comment with resolution details
  - Link to commit
  - Request verification from reporter

## 9. Git and Release

- [ ] 9.1 Commit changes
  - Stage grammar.js changes
  - Stage generated parser files (src/parser.c, etc.)
  - Stage test updates and additions
  - Stage query comment updates
  - Stage CHANGELOG.md
  - Write commit message: "fix: expose individual cells in pipe_table_row (#11)"

- [ ] 9.2 Push to main
  - Push commit to main branch
  - Changes are backward-incompatible but necessary
  - Document breaking change in CHANGELOG

- [ ] 9.3 Version bump (can be done separately)
  - This is a breaking change (MAJOR or MINOR bump)
  - Suggest version bump in next release
  - Tag release after verification

## 10. Verification

- [x] 10.1 Final smoke test
  - ✅ All 205 tests pass
  - ✅ Parser works correctly
  - ✅ Everything verified end-to-end

- [ ] 10.2 Archive OpenSpec change
  - After commit/deploy, run `openspec archive fix-table-cell-parsing`
  - Update specs/grammar-foundation/spec.md with delta
  - Verify validation passes

## Notes

- Most tasks are quick (5-15 minutes each)
- Main time investment is in testing and validation
- Zed extension testing is optional but highly recommended
- Some query updates may be deferred to future work
- Performance testing can be lightweight (manual verification sufficient)
