# Performance Benchmarking and Validation Infrastructure

## Why

The parser has reached production readiness (159/159 tests passing, 100% spec coverage) but lacks quantitative performance data. Before v0.1.0 release and promotion to tree-sitter-grammars org, we need:

1. **Validation on real-world documents** - Currently tested only on synthetic corpus; need confidence on actual Quarto documents
2. **Performance metrics** - No measurements for parse times, memory usage, or incremental parsing efficiency
3. **Regression prevention** - No automated benchmarking to catch performance regressions in CI/CD

Without this infrastructure, we cannot confidently claim production-readiness or identify bottlenecks for optimization.

## What Changes

- **NEW**: Performance benchmarking infrastructure with automated CI/CD integration
- **NEW**: Real-world validation corpus from quarto-web repository
- **NEW**: Benchmark suite measuring parse time, memory usage, and incremental parsing
- **NEW**: Performance regression detection in CI/CD pipeline
- **NEW**: Documentation of performance characteristics and optimization guidelines

## Impact

- **Affected specs**: Creates new `performance` capability specification
- **Affected code**:
  - New `scripts/benchmark.js` - Benchmark runner
  - New `scripts/validate-corpus.sh` - Real-world validation
  - New `.github/workflows/benchmark.yml` - CI/CD integration
  - New `benchmarks/` directory - Test corpus and results
  - Update `README.md` - Performance metrics
  - Update `docs/plan.md` - Performance validation status
- **CI/CD**: Adds performance benchmarking job (non-blocking initially)
- **Release blocker**: YES - Required for v0.1.0 release
