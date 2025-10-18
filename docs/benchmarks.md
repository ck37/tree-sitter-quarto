# Performance Benchmarks

This document describes the performance characteristics of tree-sitter-quarto and the benchmarking infrastructure.

## Overview

tree-sitter-quarto uses a comprehensive benchmarking suite to measure and track performance across different document sizes and complexities. The benchmark infrastructure helps detect performance regressions and validates that the parser meets responsiveness targets for editor integration.

## Running Benchmarks

### Quick Start

```bash
# Run benchmarks and compare to baseline
npm run benchmark

# Run benchmarks and save new baseline
npm run benchmark:baseline

# Run benchmarks and compare to baseline
npm run benchmark:compare
```

### Benchmark Suite

The benchmark suite includes four test documents:

1. **small.qmd** (~100 lines, ~1-2KB)
   - Simple blog post with minimal features
   - Tests basic parsing performance
   - Target: <50ms parse time

2. **medium.qmd** (~500 lines, ~7KB)
   - Typical analysis document with mixed features
   - YAML frontmatter, code cells, markdown formatting
   - Target: <100ms parse time

3. **large.qmd** (~2000 lines, ~50KB)
   - Complex book chapter with all features
   - Tests scalability and memory usage
   - Target: <500ms parse time

4. **complex.qmd** (~300 lines, ~4KB)
   - Edge cases and deep nesting
   - Tests parser robustness
   - Target: Clean parse (no errors)

## Performance Metrics

### Parse Time

Time to parse a complete document from scratch. Measured in milliseconds (ms).

**Targets:**
- Typical document (500 lines): <100ms
- Large document (2000 lines): <500ms

**Current Performance:**
- See `benchmarks/results.json` for latest measurements
- CLI overhead adds ~300ms per parse (not representative of native bindings)

### Throughput

Parse speed normalized by document size, measured in bytes/ms.

**Targets:**
- >5,000 bytes/ms (native bindings)
- >50 bytes/ms (CLI invocation)

**Note:** Current measurements use tree-sitter CLI due to Node.js ABI issues with tree-sitter 0.25.0. Native bindings will be significantly faster when ABI compatibility is resolved.

### Memory Usage

Heap and RSS memory consumption during parsing, measured in megabytes (MB).

**Targets:**
- <50MB heap for large documents (2000+ lines)
- Minimal memory growth during incremental parsing

**Current:** Estimated based on document size (~0.5KB per document KB)

### Incremental Parsing Efficiency

Ratio of incremental reparse time to full parse time, expressed as percentage.

**Targets:**
- <10% of full parse time for small edits (single line insertion)
- <30% of full parse time for medium edits (paragraph changes)

**Note:** Incremental efficiency cannot be measured via CLI. Requires native bindings.

## Baseline and Regression Detection

### Baseline

The baseline represents expected performance on the reference machine (GitHub Actions ubuntu-latest runner). Stored in `benchmarks/baseline.json`.

**When to update baseline:**
- After verified performance optimizations
- After grammar changes that intentionally affect performance
- Never update to mask regressions

### Regression Thresholds

The CI/CD pipeline compares benchmark results to baseline:

- **>5% change:** Noted in output
- **>20% slower:** Warning issued
- **>50% slower:** Consider blocking (future)

**Current status:** Benchmarks are non-blocking to allow baseline stabilization across environments.

## CI/CD Integration

Benchmarks run automatically on:
- Pull requests to main branch
- Pushes to main branch
- Manual workflow dispatch

### Artifacts

Results are uploaded as GitHub Actions artifacts:
- `benchmark-results` - Full JSON results
- `validation-report` - Corpus validation results

Artifacts retained for 30 days for trend analysis.

## Performance Optimization Guidelines

### Grammar Optimization

1. **Minimize backtracking**
   - Use precedence to resolve conflicts
   - Avoid ambiguous patterns
   - Test with `tree-sitter test --debug-graph`

2. **Optimize hot paths**
   - Inline frequently-used rules
   - Minimize external scanner calls
   - Profile with real-world documents

3. **Control parser size**
   - Keep WASM under 200KB
   - Minimize state count
   - Use `alias()` to reduce redundant nodes

### Scanner Optimization

1. **Minimize state size**
   - Scanner state should be <100 bytes
   - Use bitfields for boolean flags
   - Serialize efficiently

2. **Avoid redundant scans**
   - Cache commonly-needed information
   - Use lookahead efficiently
   - Minimize `mark_end()` calls

3. **Handle incremental parsing**
   - Implement `serialize()` and `deserialize()`
   - Ensure scanner state is deterministic
   - Test incremental performance

## Troubleshooting

### Slow Parse Times

1. Check for ERROR nodes (indicates backtracking)
2. Profile with `tree-sitter parse --debug-time`
3. Review grammar conflicts with `tree-sitter test --debug`
4. Compare to baseline to identify regression source

### High Memory Usage

1. Verify node count is reasonable
2. Check for memory leaks in scanner
3. Test incremental parsing (should not accumulate memory)
4. Profile with memory profiler tools

### Benchmark Variability

CI/CD runners have variable performance due to:
- CPU throttling
- Shared resources
- Network latency (for CLI invocation)

**Mitigation:**
- Use relative comparisons (% change)
- Average across 10+ iterations
- Focus on trends, not absolute values

## Known Limitations

### CLI Overhead

Current benchmarks use `tree-sitter parse` CLI command due to Node.js binding ABI incompatibility. This adds ~300ms overhead per parse, making absolute times not representative of real-world editor performance.

**Impact:**
- Parse times appear much slower than native bindings
- Throughput measurements are artificially low
- Incremental parsing cannot be measured

**Resolution:** Will switch to native bindings when tree-sitter 0.25.x ABI compatibility is restored in Node.js.

### Platform Differences

Performance varies across platforms:
- macOS typically 10-20% slower than Linux
- Windows not currently tested
- ARM vs x86 differences

Baseline is calibrated for ubuntu-latest GitHub Actions runner.

## Future Enhancements

Planned improvements to benchmark infrastructure:

1. **Native binding benchmarks** - Once ABI compatibility restored
2. **Incremental parsing tests** - Realistic edit patterns
3. **Memory profiling** - Track heap usage over time
4. **Platform-specific baselines** - macOS, Windows, ARM
5. **Comparison to other parsers** - tree-sitter-markdown, etc.
6. **Stress testing** - Very large documents (10,000+ lines)

## References

- Benchmark scripts: `scripts/benchmark-cli.js`, `scripts/benchmark.js`
- Benchmark documents: `benchmarks/documents/`
- CI workflow: `.github/workflows/benchmark.yml`
- Latest results: `benchmarks/results.json`
- Baseline: `benchmarks/baseline.json`
