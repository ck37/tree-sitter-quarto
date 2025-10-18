# Fix Subscript/Superscript Parsing with External Scanner

## Problem Statement

The current subscript and superscript grammar rules cause critical parsing failures in real-world Quarto documents, resulting in:

- **Performance Benchmarks CI**: 4/4 benchmark documents failing with ERROR nodes
- **Real-World Validation CI**: 18/20 quarto-web corpus files failing (10% success rate)
- **Throughput degradation**: 47 bytes/ms average (vs 5000 bytes/ms target)

### Root Cause

The pure grammar implementation in `grammar.js` uses `token('~')` to match subscript delimiters:

```javascript
subscript: $ => seq(
  alias(token('~'), $.subscript_delimiter),
  alias(/[^\s~]+/, $.subscript_content),
  alias(token('~'), $.subscript_delimiter)
)
```

**The bug**: This attempts to match ANY `~` character as a subscript delimiter without context validation. When encountering text like:

```markdown
This is a small test document (~100 lines) with minimal Quarto features.
```

The parser:
1. Sees the `~` in `(~100`
2. Attempts to match it as subscript opening delimiter
3. Fails to find closing `~`
4. Creates ERROR nodes
5. Misparses subsequent text as citation keys

### Impact Severity: CRITICAL

- **Blocks production use**: Parser cannot handle common documentation patterns
- **CI completely broken**: Both benchmark and validation jobs failing
- **User-facing**: Affects 90% of real-world Quarto documents
- **Baseline regression**: Previous baseline showed `hasErrors: false`, now all documents have errors

## Proposed Solution

Implement context-aware subscript/superscript parsing using external scanner tokens, following the proven approach used by **quarto-markdown**'s tree-sitter-markdown-inline parser.

### Why External Scanner?

**Pure grammar limitations:**
- LR(1) parsers cannot "peek ahead" to verify closing delimiters exist
- `token()` matches greedily without semantic context
- No way to distinguish `~` in `(~100)` from `~` in `H~2~O`

**External scanner advantages:**
- Context-aware: Only matches when `valid_symbols` indicates subscript is grammatically valid
- State tracking: Maintains `inside_subscript` flag to pair delimiters correctly
- Lookahead: Can validate that closing delimiter exists before committing to match
- Proven: quarto-markdown uses this approach successfully

### Reference Implementation

quarto-markdown's scanner.c (parse_tilde function):
- Only matches `SUBSCRIPT_OPEN` when `valid_symbols[SUBSCRIPT_OPEN]` is true
- Tracks state with `inside_subscript` flag
- Validates closing delimiter before accepting match
- Prevents false positives on isolated tildes

## Scope

### In Scope
1. Modify `pandoc-inline-formatting` spec to require external scanner
2. Add external scanner tokens: `SUBSCRIPT_OPEN`, `SUBSCRIPT_CLOSE`, `SUPERSCRIPT_OPEN`, `SUPERSCRIPT_CLOSE`
3. Implement `scan_tilde()` and `scan_caret()` functions in `src/scanner.c`
4. Update grammar.js to use external tokens instead of pure grammar rules
5. Extend scanner state to track subscript/superscript context
6. Add comprehensive tests for false positive prevention

### Out of Scope
- Nested subscript/superscript support (Pandoc doesn't support this either)
- Alternative delimiter syntaxes
- Performance optimizations beyond fixing correctness
- Other inline formatting types (strikethrough, highlight already work)

## Success Metrics

### Must-Have
- ✅ All 167 existing tests pass
- ✅ Zero ERROR nodes in `benchmarks/documents/*.qmd`
- ✅ Performance Benchmarks CI: 4/4 files parse cleanly
- ✅ Real-World Validation CI: ≥90% success rate (18/20 files)
- ✅ Throughput >1000 bytes/ms on benchmark documents

### Nice-to-Have
- Throughput approaches baseline (5000+ bytes/ms)
- Validation success rate reaches 100%
- Parser handles edge cases gracefully

## Risks & Mitigation

### Risk: Scanner complexity increases maintenance burden
**Mitigation**:
- Follow quarto-markdown's proven implementation patterns
- Add comprehensive inline comments
- Document state machine transitions
- Test edge cases thoroughly

### Risk: Performance regression from scanner calls
**Mitigation**:
- Scanner only called for `~` and `^` characters (rare in normal text)
- Early exit when `valid_symbols` is false
- No expensive operations in scanner code

### Risk: Breaking changes to existing tests
**Mitigation**:
- Run full test suite before and after
- Verify all inline-formatting.txt tests still pass
- Maintain identical parse tree structure (only fixing ERROR nodes)

## Alternatives Considered

### Alternative 1: Complex precedence rules
**Rejected**: Tree-sitter's LR(1) algorithm cannot express "only match if closing delimiter exists"

### Alternative 2: Require escaping tildes in prose
**Rejected**: Breaks compatibility with standard Markdown; unacceptable UX

### Alternative 3: Remove subscript/superscript support
**Rejected**: Essential feature for scientific writing; requested in issue #3

### Alternative 4: Lookahead with repeat patterns
**Rejected**: Tested but creates grammar conflicts and doesn't solve false positive problem

## Implementation Timeline

**Estimated effort**: 4-6 hours
- Scanner implementation: 2-3 hours
- Grammar updates: 1 hour
- Testing and validation: 1-2 hours
- Documentation: 1 hour

**Dependencies**: None (all changes contained within this repository)

## References

- **CI Failure Logs**: GitHub Actions runs 18616789213 (Benchmarks), 18616789213 (Validation)
- **Reference Implementation**: https://github.com/quarto-dev/quarto-markdown/tree/main/crates/tree-sitter-qmd/tree-sitter-markdown-inline
- **Issue**: Originally added in commit f481a03 (Oct 17, 2025)
- **Baseline**: `benchmarks/baseline.json` shows previous clean parsing (hasErrors: false)
