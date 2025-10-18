# Performance Benchmarking Design

## Context

The tree-sitter-quarto parser is feature-complete (159/159 tests, 100% spec coverage) but lacks quantitative performance validation. The project requires:

1. **Real-world validation** - Confidence that parser works on actual Quarto documents (not just synthetic tests)
2. **Performance metrics** - Baseline measurements for parse time, memory, throughput
3. **Regression detection** - Automated checks to prevent performance degradation
4. **Release criteria** - Quantitative data to support v0.1.0 release and npm publication

**Stakeholders:**
- Editor extension developers (need performance guarantees)
- End users (need responsive editing experience)
- Contributors (need regression detection)

**Constraints:**
- Must work in CI/CD environment (GitHub Actions)
- Must not significantly increase CI/CD runtime (<5 minutes added)
- Must handle large documents (2000+ lines)
- Must support incremental parsing measurement

## Goals / Non-Goals

**Goals:**
- Validate parser on 100+ real-world `.qmd` files from quarto-web
- Measure parse performance: time, throughput, memory usage
- Detect performance regressions automatically in CI/CD
- Provide quantitative data for v0.1.0 release announcement
- Document performance characteristics for extension developers

**Non-Goals:**
- Optimizing parser performance (separate task after establishing baseline)
- Testing on documents outside quarto-web corpus (can expand later)
- Comparing to other parsers (documented separately in comparison.md)
- Load testing or stress testing (editor use case is single-document parsing)

## Decisions

### Decision 1: Real-World Corpus Source

**Choice:** Use quarto-web repository as validation corpus

**Rationale:**
- Official Quarto documentation with diverse, real-world examples
- Publicly accessible (no authentication required)
- Actively maintained (tests against current Quarto features)
- ~200+ `.qmd` files with varied complexity
- Representative of actual user documents

**Alternatives considered:**
- Create synthetic large documents → Rejected: not representative of real usage
- Use quarto-cli test fixtures → Rejected: too simplistic, focused on rendering
- User-submitted corpus → Rejected: privacy concerns, curation overhead

**Implementation:**
```bash
# Clone sparse checkout of quarto-web (docs only)
git clone --depth 1 --filter=blob:none --sparse https://github.com/quarto-dev/quarto-web
cd quarto-web
git sparse-checkout set docs
find docs -name "*.qmd" | xargs -I {} tree-sitter parse {}
```

### Decision 2: Benchmark Framework

**Choice:** Custom Node.js script using built-in performance APIs

**Rationale:**
- Zero external dependencies (project already uses Node.js)
- Direct access to tree-sitter parser via bindings
- Precise control over measurement (cold vs warm cache)
- Easy CI/CD integration (no tooling setup required)

**Alternatives considered:**
- hyperfine → Rejected: CLI overhead distorts measurements
- benchmark.js → Rejected: unnecessary complexity for our needs
- tree-sitter bench → Rejected: limited customization

**Implementation:**
```javascript
const Parser = require('tree-sitter');
const Quarto = require('./bindings/node');

function benchmark(document, iterations = 10) {
  const parser = new Parser();
  parser.setLanguage(Quarto);

  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    parser.parse(document);
  }
  const end = performance.now();

  return {
    avgTime: (end - start) / iterations,
    throughput: document.length / ((end - start) / iterations / 1000)
  };
}
```

### Decision 3: Performance Metrics

**Choice:** Track 4 key metrics

1. **Parse time** (ms) - Time to parse full document
2. **Throughput** (bytes/ms) - Parse speed normalized by document size
3. **Memory usage** (MB) - Heap and RSS during parsing
4. **Incremental efficiency** (%) - Reparse time / full parse time

**Rationale:**
- Parse time: Most visible metric to end users (editing responsiveness)
- Throughput: Normalizes for document size (fair comparison)
- Memory: Critical for editor stability (especially large documents)
- Incremental: Core tree-sitter feature, must verify efficiency

**Alternatives considered:**
- CPU usage → Rejected: not actionable in single-threaded JS
- Startup time → Rejected: WASM/native bindings handle this
- Error recovery time → Deferred: complex to measure, lower priority

### Decision 4: Performance Targets

**Choice:** Conservative initial targets based on editor responsiveness research

- Parse time: <100ms for typical document (500 lines)
- Throughput: >5,000 bytes/ms
- Memory: <50MB heap for large document (2000 lines)
- Incremental: <10% reparse time for small edit

**Rationale:**
- 100ms threshold: Human perception of "instant" response
- 5000 bytes/ms: Allows 2000-line doc (~40KB) in <10ms
- 50MB heap: Reasonable for editor extension memory budget
- 10% incremental: Validates tree-sitter's incremental parsing works

**Note:** Targets are guidelines, not hard requirements for v0.1.0. Primary goal is establishing baseline.

### Decision 5: CI/CD Integration Strategy

**Choice:** Non-blocking benchmark job with regression warnings

**Rationale:**
- Prevents false CI/CD failures from environment variance
- Allows gathering data before setting strict thresholds
- Provides visibility without blocking development
- Can make blocking after baseline stabilizes

**Implementation:**
```yaml
benchmark:
  runs-on: ubuntu-latest
  continue-on-error: true  # Non-blocking initially
  steps:
    - name: Run benchmarks
      run: npm run benchmark
    - name: Compare to baseline
      run: |
        if [ $(jq '.avgTime' results.json) -gt $(jq '.avgTime * 1.2' baseline.json) ]; then
          echo "::warning::Performance regression detected (>20% slower)"
        fi
```

### Decision 6: Benchmark Document Sizes

**Choice:** 4 test documents representing usage distribution

- **small.qmd** (~100 lines, ~2KB) - Simple blog post, minimal features
- **medium.qmd** (~500 lines, ~20KB) - Typical analysis document, mixed features
- **large.qmd** (~2000 lines, ~80KB) - Complex book chapter, all features
- **complex.qmd** (~300 lines, ~10KB) - Edge cases, deep nesting

**Rationale:**
- Covers typical use cases (90% of documents <500 lines)
- Tests scalability (large.qmd stress test)
- Tests complexity handling (complex.qmd edge cases)
- Manageable corpus size (commits ~100KB total)

## Risks / Trade-offs

### Risk 1: Environment Variance in CI/CD

**Risk:** GitHub Actions runners have variable performance (CPU throttling, shared resources)

**Mitigation:**
- Use relative comparisons (% regression vs absolute time)
- Run multiple iterations and average results
- Make benchmarks non-blocking initially
- Consider baseline per runner type if needed

### Risk 2: Parse Failures on Real-World Documents

**Risk:** quarto-web documents may expose grammar bugs or missing features

**Mitigation:**
- Analyze failures and categorize (known limitations vs bugs)
- Document known limitations clearly in validation.md
- Create issues for unexpected failures
- Consider parser fixes before v0.1.0 if blocking

### Risk 3: Incremental Parsing Measurement Complexity

**Risk:** Measuring incremental parse efficiency requires simulating realistic edits

**Mitigation:**
- Start with simple edit (insert line, delete line)
- Use tree-sitter edit API to mark changed ranges
- Defer complex edit patterns to post-v0.1.0
- Document measurement methodology

### Risk 4: Benchmark Maintenance Overhead

**Risk:** Benchmarks become stale or results diverge from reality

**Mitigation:**
- Update baseline after verified performance improvements
- Review benchmark results quarterly
- Keep benchmark documents synchronized with corpus tests
- Document when to update baseline (in benchmarks.md)

## Migration Plan

Not applicable (new infrastructure, no existing benchmarks to migrate).

**Rollout:**
1. Merge benchmark infrastructure (non-blocking CI/CD)
2. Gather baseline data over 10+ CI/CD runs
3. Analyze variance and adjust thresholds
4. Enable regression warnings (non-blocking)
5. Consider making blocking after stable baseline established

**Rollback:**
If benchmarks cause issues, disable CI/CD job (minimal blast radius).

## Open Questions

1. **Corpus size:** Should we validate all quarto-web .qmd files or sample subset?
   - **Leaning toward:** Parse all files, but sample for detailed benchmarking

2. **Incremental edit patterns:** What edits are most representative?
   - **Leaning toward:** Insert line in cell, edit chunk option, add paragraph

3. **Regression threshold:** What % slowdown should trigger warning?
   - **Leaning toward:** 20% regression = warning, 50% = consider blocking

4. **Baseline updates:** When should baseline be recalculated?
   - **Leaning toward:** After verified optimization PRs only (manual process)
