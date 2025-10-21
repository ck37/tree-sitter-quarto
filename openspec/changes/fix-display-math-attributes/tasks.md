# Implementation Tasks

## Phase 1: Grammar Modification

### 1.1 Update display_math rule in grammar.js
- [ ] Locate `display_math` rule (line ~419)
- [ ] Add optional attribute list support after closing delimiter
- [ ] Add pattern: `optional(seq(/[ \t]+/, field("attributes", $.attribute_list)))`
- [ ] Ensure it comes before the final newline
- [ ] Add inline comment explaining attribute support

**Validation:** `node --check grammar.js` passes

### 1.2 Regenerate parser
- [ ] Run `npx tree-sitter generate`
- [ ] Check for new warnings or conflicts
- [ ] Verify `src/parser.c` regenerates successfully
- [ ] Build parser: ensure no compilation errors

**Validation:** Clean build with no errors

## Phase 2: Testing

### 2.1 Add display math attribute tests to corpus
- [ ] Create or update test file `test/corpus/block-attributes.txt`
- [ ] Add test: "Display math with ID attribute"
- [ ] Add test: "Display math with multiple attributes (ID + class)"
- [ ] Add test: "Display math with key-value attributes"
- [ ] Add test: "Display math without attributes (backward compat)"
- [ ] Add test: "Single-line display math with attributes"

**Validation:** New tests added, syntax valid

### 2.2 Run existing tests
- [ ] Run `npx tree-sitter test`
- [ ] Verify all existing display_math tests pass
- [ ] Check that new attribute tests pass
- [ ] Fix any test failures

**Validation:** 202+ tests passing (new tests added)

### 2.3 Test benchmark documents
- [ ] Parse `benchmarks/documents/medium.qmd`
- [ ] Verify display math ERROR nodes are gone (check lines 148, 161)
- [ ] Parse `benchmarks/documents/large.qmd` and `complex.qmd`
- [ ] Check for any display math-specific errors

**Validation:** Zero display math ERROR nodes in benchmark documents

### 2.4 Test cross-references
- [ ] Create test with `$$ ... $$ {#eq-test}` and `@eq-test` reference
- [ ] Verify equation attribute is parsed
- [ ] Verify cross-reference links to equation
- [ ] Check reference type is `eq`

**Validation:** Cross-references to equations work correctly

## Phase 3: Real-World Validation

### 3.1 Test with quarto-web corpus samples
- [ ] Run `npm run validate:sample` or parse sample files
- [ ] Verify display math with attributes parses correctly
- [ ] Check for any remaining display math ERROR nodes
- [ ] Document any edge cases found

**Validation:** >90% of files with display math attributes parse cleanly

### 3.2 Performance check
- [ ] Run `npm run benchmark:compare`
- [ ] Verify display math parsing doesn't regress throughput
- [ ] Check parse times remain stable (<10% variance)
- [ ] Test with math-heavy document

**Validation:** Performance stable

## Phase 4: Documentation & Validation

### 4.1 Update examples
- [ ] Add display math with attributes to `examples/sample.qmd`
- [ ] Include example of equation cross-reference
- [ ] Verify example parses cleanly

**Validation:** Sample document parses without errors

### 4.2 OpenSpec validation
- [ ] Run `openspec validate fix-display-math-attributes --strict`
- [ ] Resolve any validation issues
- [ ] Ensure spec delta is correctly formatted

**Validation:** OpenSpec validation passes

### 4.3 Create verification.md
- [ ] Document test results
- [ ] Document benchmark improvements (ERROR count before/after)
- [ ] List any known limitations
- [ ] Add examples of now-working patterns

**Validation:** Verification complete, ready to archive

## Phase 5: CI Verification

### 5.1 Commit and push
- [ ] Commit grammar changes with descriptive message
- [ ] Commit test additions
- [ ] Push to GitHub
- [ ] Monitor CI jobs

**Validation:** All CI jobs pass

### 5.2 Archive OpenSpec change
- [ ] Run `openspec archive fix-display-math-attributes`
- [ ] Verify specs updated correctly
- [ ] Commit archived change

**Validation:** Change archived successfully

## Success Criteria

- ✅ All existing tests pass (202/202 minimum)
- ✅ New display math attribute tests pass (5+ scenarios)
- ✅ Benchmark display math ERROR nodes eliminated:
  - medium.qmd: Lines 148, 161 parse cleanly
  - large.qmd: Display math errors eliminated
  - complex.qmd: Display math errors eliminated
- ✅ Cross-references to equations work (@eq-id)
- ✅ Performance stable (<10% variance)
- ✅ OpenSpec validation passes
- ✅ CI jobs green

## Dependencies

**No blocking dependencies** - `attribute_list` rule already exists in grammar

**Sequential work:**
1. Phase 1 (Grammar) must complete before Phase 2 (Testing)
2. Phase 2 must complete before Phase 3 (Validation)
3. Phase 4 can run parallel with Phase 3 after tests pass

## Rollback Plan

If implementation causes issues:
1. Revert grammar.js change to `display_math` rule
2. Regenerate parser with `npx tree-sitter generate`
3. Run tests to verify rollback successful
4. Document failure reason in proposal
