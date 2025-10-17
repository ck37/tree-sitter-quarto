# Implementation Tasks

## 1. Grammar Implementation
- [ ] 1.1 Modify `link` rule to add explicit reference pattern: `field('reference', seq('[', alias(/[^\]]+/, $.reference_label), ']'))`
- [ ] 1.2 Add collapsed reference pattern: `field('reference', seq('[', ']'))`
- [ ] 1.3 Add shortcut reference pattern (make choice optional with appropriate precedence)
- [ ] 1.4 Test precedence to avoid conflicts with attributed spans `[text]{attrs}`
- [ ] 1.5 Run `npx tree-sitter generate` to regenerate parser

## 2. Test Coverage
- [ ] 2.1 Create `test/corpus/pandoc-links.txt` with comprehensive test cases
- [ ] 2.2 Test explicit reference: `[text][1]` with `[1]: URL`
- [ ] 2.3 Test named reference: `[text][ref-name]` with `[ref-name]: URL "Title"`
- [ ] 2.4 Test collapsed reference: `[text][]` with `[text]: URL`
- [ ] 2.5 Test shortcut reference: `[text]` with `[text]: URL`
- [ ] 2.6 Test multiple references in same paragraph
- [ ] 2.7 Test reference with title attribute
- [ ] 2.8 Test inline links still work (backward compat)
- [ ] 2.9 Test attributed spans still work (no conflict)
- [ ] 2.10 Run `npx tree-sitter test` and verify all tests pass

## 3. Validation
- [ ] 3.1 Parse `/tmp/test-ref-links.md` and verify no ERROR nodes
- [ ] 3.2 Verify link reference definitions still parse correctly
- [ ] 3.3 Test with `examples/sample.qmd` to ensure no regressions
- [ ] 3.4 Confirm CI/CD pipeline passes

## 4. Documentation
- [ ] 4.1 Update issue #4 with implementation details
- [ ] 4.2 Close issue #4 when tests pass
