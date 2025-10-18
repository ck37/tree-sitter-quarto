# Implementation Tasks

## Phase 1: Scanner Extension (Core Fix)

### 1.1 Extend Scanner State
- [ ] Add `inside_subscript` field to Scanner struct (uint8_t)
- [ ] Add `inside_superscript` field to Scanner struct (uint8_t)
- [ ] Update `tree_sitter_quarto_external_scanner_create()` to initialize new fields to 0
- [ ] Extend `tree_sitter_quarto_external_scanner_serialize()` to include new fields (return 6 instead of 4)
- [ ] Extend `tree_sitter_quarto_external_scanner_deserialize()` to read new fields

**Validation**: Compile scanner, ensure no warnings

### 1.2 Add Token Type Enums
- [ ] Add `SUBSCRIPT_OPEN` to TokenType enum
- [ ] Add `SUBSCRIPT_CLOSE` to TokenType enum
- [ ] Add `SUPERSCRIPT_OPEN` to TokenType enum
- [ ] Add `SUPERSCRIPT_CLOSE` to TokenType enum
- [ ] Verify enum values don't conflict with existing tokens

**Validation**: Compile scanner, check enum ordering

### 1.3 Implement scan_tilde() Function
- [ ] Create `scan_tilde(Scanner *s, TSLexer *lexer, const bool *valid_symbols)` function
- [ ] Check if current character is `~`
- [ ] Peek ahead one character to detect `~~` (strikethrough)
- [ ] If `~~`, return false (let grammar handle strikethrough)
- [ ] If `inside_subscript > 0` and `valid_symbols[SUBSCRIPT_CLOSE]`, match closing delimiter
- [ ] If `valid_symbols[SUBSCRIPT_OPEN]`, check whitespace rule and match opening delimiter
- [ ] Update scanner state accordingly
- [ ] Add comprehensive inline comments

**Validation**: Unit test with isolated subscript patterns

### 1.4 Implement scan_caret() Function
- [ ] Create `scan_caret(Scanner *s, TSLexer *lexer, const bool *valid_symbols)` function
- [ ] Check if current character is `^`
- [ ] Peek ahead one character to detect `^[` (footnote)
- [ ] If `^[`, return false (let grammar handle footnote reference)
- [ ] If `inside_superscript > 0` and `valid_symbols[SUPERSCRIPT_CLOSE]`, match closing delimiter
- [ ] If `valid_symbols[SUPERSCRIPT_OPEN]`, check whitespace rule and match opening delimiter
- [ ] Update scanner state accordingly
- [ ] Add comprehensive inline comments

**Validation**: Unit test with isolated superscript patterns

### 1.5 Update Main Scanner Function
- [ ] In `tree_sitter_quarto_external_scanner_scan()`, add tilde handling at top
- [ ] Call `scan_tilde()` when `lexer->lookahead == '~'`
- [ ] Return immediately if scan_tilde() returns true
- [ ] Add caret handling
- [ ] Call `scan_caret()` when `lexer->lookahead == '^'`
- [ ] Return immediately if scan_caret() returns true
- [ ] Ensure ordering: check new tokens before existing tokens

**Validation**: Full scanner compiles and links correctly

## Phase 2: Grammar Updates

### 2.1 Add External Token Declarations
- [ ] In `grammar.js`, locate `externals: $ => [...]` array
- [ ] Add `$._subscript_open` to externals
- [ ] Add `$._subscript_close` to externals
- [ ] Add `$._superscript_open` to externals
- [ ] Add `$._superscript_close` to externals
- [ ] Verify syntax is correct

**Validation**: `node --check grammar.js` passes

### 2.2 Update Subscript Rule
- [ ] Replace `alias(token('~'), $.subscript_delimiter)` with `alias($._subscript_open, $.subscript_delimiter)` for opening
- [ ] Replace content pattern with `repeat($._inline_element)` (allows more flexibility)
- [ ] Replace closing token with `alias($._subscript_close, $.subscript_delimiter)`
- [ ] Verify rule still allows inline formatting inside subscript

**Validation**: Grammar syntax valid

### 2.3 Update Superscript Rule
- [ ] Replace `alias(token('^'), $.superscript_delimiter)` with `alias($._superscript_open, $.superscript_delimiter)` for opening
- [ ] Replace content pattern with `repeat($._inline_element)`
- [ ] Replace closing token with `alias($._superscript_close, $.superscript_delimiter)`
- [ ] Verify rule still allows inline formatting inside superscript

**Validation**: Grammar syntax valid

### 2.4 Regenerate Parser
- [ ] Run `npx tree-sitter generate`
- [ ] Check for conflicts or warnings in output
- [ ] Verify src/parser.c regenerated successfully
- [ ] Compile parser and scanner together

**Validation**: Clean build with no errors

## Phase 3: Testing & Validation

### 3.1 Run Existing Tests
- [ ] Run `npx tree-sitter test`
- [ ] Verify all 167 tests still pass (especially inline-formatting.txt)
- [ ] Fix any regressions in test expectations
- [ ] Document any necessary test updates

**Validation**: 167/167 tests passing

### 3.2 Add False Positive Prevention Tests
- [ ] Add test case: `(~100 lines)` parses without ERROR
- [ ] Add test case: `~5 minutes` parses as plain text
- [ ] Add test case: `approximately ~100 files` parses without ERROR
- [ ] Add test case: Multiple tildes in prose without pairing
- [ ] Verify all new tests pass

**Validation**: New tests added to test/corpus/inline-formatting.txt and passing

### 3.3 Test Benchmark Documents
- [ ] Run `npx tree-sitter parse benchmarks/documents/small.qmd`
- [ ] Verify NO ERROR nodes in parse tree
- [ ] Run parse on medium.qmd, large.qmd, complex.qmd
- [ ] Verify all benchmark documents parse cleanly

**Validation**: 0 ERROR nodes in all 4 benchmark files

### 3.4 Run Performance Benchmarks
- [ ] Run `npm run benchmark:compare`
- [ ] Verify throughput >1000 bytes/ms (ideally >5000)
- [ ] Verify 0 warnings in benchmark output
- [ ] Verify all documents show "Clean parse" status

**Validation**: All benchmarks passing, no warnings

### 3.5 Run Corpus Validation
- [ ] Run `npm run validate:sample`
- [ ] Verify success rate ≥90% (ideally 100%)
- [ ] Check validation report for remaining failures
- [ ] Verify improvements from baseline (was 10%, should be ≥90%)

**Validation**: ≥18/20 files successful (90%+)

## Phase 4: CI Verification

### 4.1 Push and Monitor CI
- [ ] Commit changes with descriptive message
- [ ] Push to GitHub
- [ ] Monitor "Test Parser" job (should pass all 167 tests)
- [ ] Monitor "Performance Benchmarks" job
- [ ] Monitor "Real-World Validation" job

**Validation**: All CI jobs green

### 4.2 Verify CI Metrics
- [ ] Performance Benchmarks: 4/4 files parse cleanly (0 ERROR nodes)
- [ ] Performance Benchmarks: Throughput >1000 bytes/ms
- [ ] Real-World Validation: Success rate ≥90%
- [ ] Test Parser: 167/167 tests passing on Ubuntu and macOS

**Validation**: All metrics meet success criteria

## Phase 5: Documentation & Cleanup

### 5.1 Update Documentation
- [ ] Add inline comments to scanner functions explaining logic
- [ ] Update any relevant documentation about external scanner
- [ ] Document the fix in commit message
- [ ] Reference CI failure run IDs in commit message

**Validation**: Code is well-commented

### 5.2 Archive OpenSpec Change
- [ ] Run `openspec archive fix-subscript-parsing-with-scanner`
- [ ] Verify change moved to archive with COMPLETE status
- [ ] Verify specs updated in openspec/specs/
- [ ] Commit archived change

**Validation**: OpenSpec change archived successfully

## Dependencies

**Parallel Work**: None - tasks must be done sequentially

**Critical Path**:
1. Scanner implementation (Phase 1) MUST complete before grammar updates (Phase 2)
2. Grammar updates (Phase 2) MUST complete before testing (Phase 3)
3. Testing (Phase 3) MUST pass before CI verification (Phase 4)
4. CI verification (Phase 4) MUST pass before documentation (Phase 5)

## Rollback Plan

If implementation fails or introduces regressions:

1. Revert grammar.js changes (restore `token('~')` pattern)
2. Remove new scanner token types
3. Restore scanner state serialization to 4 bytes
4. Regenerate parser with `npx tree-sitter generate`
5. Verify tests pass with reverted state
6. Document failure reasons in OpenSpec change

## Success Criteria Summary

- ✅ All 167 existing tests pass
- ✅ Zero ERROR nodes in 4/4 benchmark documents
- ✅ Performance Benchmarks CI green
- ✅ Real-World Validation CI ≥90% success rate
- ✅ Throughput >1000 bytes/ms
- ✅ Code well-commented and maintainable
