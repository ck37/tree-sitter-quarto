# Corpus Validation

This document describes the real-world validation infrastructure for tree-sitter-quarto and provides results from parsing the quarto-web corpus.

## Overview

While the test corpus provides comprehensive coverage of Quarto features, real-world documents often contain edge cases, unusual formatting, and feature combinations not captured in synthetic tests. The validation infrastructure parses actual Quarto documents from the quarto-web repository to ensure production-readiness.

## Running Validation

### Quick Start

```bash
# Validate on 20-file sample (fast, for development)
npm run validate:sample

# Validate on full corpus (slow, for release validation)
npm run validate
```

### Configuration

The validation script supports environment variables:

- `MAX_SAMPLE` - Limit validation to N random files (default: 0 = all files)
- `CORPUS_DIR` - Custom corpus directory (default: temp directory)

```bash
# Validate on 50-file sample
MAX_SAMPLE=50 npm run validate
```

## Validation Corpus

### quarto-web Repository

The primary validation corpus is the quarto-web repository, which contains the official Quarto documentation.

**Why quarto-web:**
- Official Quarto documentation with diverse, real-world examples
- Actively maintained and updated with current Quarto features
- ~200+ `.qmd` files with varied complexity
- Publicly accessible (no authentication required)
- Representative of actual user documents

**Corpus statistics:**
- Total files: ~200-250 (varies with updates)
- Size range: 1KB - 100KB per file
- Average size: ~10-20KB
- Features used: YAML frontmatter, code cells, cross-references, callouts, tabsets, etc.

### Document Sources

Files are sourced from:
- `docs/` - Main documentation
  - Getting started guides
  - Tutorial content
  - Feature documentation
  - Advanced topics
- Various subdirectories with specialized content

## Validation Process

### Step 1: Corpus Acquisition

The script clones or updates quarto-web repository:

```bash
git clone --depth 1 --filter=blob:none \
  https://github.com/quarto-dev/quarto-web.git \
  /tmp/quarto-web-corpus
```

**Options:**
- `--depth 1` - Shallow clone (faster)
- `--filter=blob:none` - Sparse checkout (smaller download)

### Step 2: File Discovery

All `.qmd` files are discovered recursively:

```bash
find /tmp/quarto-web-corpus -name "*.qmd" -type f
```

Files are sorted for deterministic ordering and optionally sampled if `MAX_SAMPLE` is set.

### Step 3: Parsing

Each file is parsed with `tree-sitter parse`:

```bash
npx tree-sitter parse <file>
```

**Success criteria:**
- Parse completes without crash
- No ERROR nodes in syntax tree
- Output is valid S-expression

**Failure detection:**
- Parse exits with non-zero code
- Output contains `ERROR` string
- Parse hangs (timeout after 30s)

### Step 4: Reporting

Results are collected and summarized:

- Total files parsed
- Successful parses (clean syntax tree)
- Failed parses (ERROR nodes or crashes)
- Success rate percentage

**Output formats:**
- Console output (colored, progress bar)
- Markdown report (`benchmarks/validation/validation-report.md`)
- JSON results (`benchmarks/validation/results.json`)

## Success Criteria

### Production Readiness Targets

- **≥90% success rate** - Parser handles the vast majority of real documents
- **<5% parse failures** - Crashes or hangs are rare
- **Known limitations documented** - Failures are understood and categorized

### v0.1.0 Release Criteria

- Validation run on full quarto-web corpus
- Success rate ≥90%
- All failures analyzed and categorized
- Known limitations documented in README

## Current Results

Results are generated each validation run and stored in `benchmarks/validation/`.

**To view latest results:**

```bash
cat benchmarks/validation/validation-report.md
```

Or check the JSON results:

```bash
cat benchmarks/validation/results.json | jq '.results'
```

## Failure Analysis

When validation finds parse failures, analyze them systematically:

### 1. Categorize Failures

Group failures by error pattern:

- **YAML structure** - Complex nested mappings or lists
- **Fenced attributes** - Missing support for `{ }` attributes
- **Edge cases** - Unusual syntax combinations
- **Spec ambiguities** - Unclear or contradictory Quarto syntax

### 2. Prioritize Fixes

Determine which failures to address:

- **High priority:** Common patterns (affects >10% of failures)
- **Medium priority:** Spec violations or incorrect parses
- **Low priority:** Rare edge cases (<5% of failures)
- **Deferred:** Intentional limitations or unsupported features

### 3. Document Limitations

For known limitations, document in:

- `README.md` - Known limitations section
- `docs/validation.md` - This file
- Issue tracker - For future work

## Known Limitations

### Deferred Features

These features are intentionally not supported in current version:

1. **Nested YAML mappings** (Phase 2)
   - Requires scanner-based indentation tracking
   - Planned for v0.2.0

2. **YAML lists** (Phase 3)
   - Dependent on nested mapping support
   - Planned for v0.2.0

3. **Fenced div attributes** (Future)
   - `:::  {.class #id key="value"}`
   - Requires attribute grammar

### Edge Cases

These patterns may produce ERROR nodes:

1. **Malformed YAML** - Invalid YAML syntax (expected)
2. **Deep nesting** - >10 levels of structure
3. **Unicode edge cases** - Rare unicode characters in specific contexts

## CI/CD Integration

Validation runs automatically in GitHub Actions on:
- Pull requests to main
- Pushes to main
- Manual workflow dispatch

**Sample validation** (20 files) runs on every PR to provide quick feedback without full corpus overhead.

### Artifacts

Validation results are uploaded as artifacts:
- `validation-report` - Markdown and JSON results
- Retained for 30 days for trend analysis

### PR Comments

For pull requests, validation results are automatically posted as a comment:

```markdown
## Validation Results

**Corpus:** quarto-web (sample)
**Success Rate:** 95.0%

| Metric | Value |
|--------|-------|
| Total files | 20 |
| Successful | 19 |
| Failed | 1 |

✅ PASS - Success rate ≥90%
```

## Troubleshooting

### Clone Failures

If corpus cloning fails:

```bash
# Clean temp directory
rm -rf /tmp/quarto-web-corpus

# Re-run validation
npm run validate:sample
```

### Parse Timeouts

If files hang during parsing:

1. Identify problematic file from progress output
2. Parse file manually with debug output:
   ```bash
   npx tree-sitter parse <file> --debug
   ```
3. Report issue with minimal reproduction case

### Low Success Rate

If success rate drops below 90%:

1. Run full corpus validation to confirm
2. Analyze failure patterns with:
   ```bash
   jq '.failed_files[] | .error' benchmarks/validation/results.json
   ```
3. Categorize and prioritize failures
4. Create issues for high-priority fixes

## Future Enhancements

Planned improvements to validation infrastructure:

1. **Incremental validation** - Only validate changed files
2. **Failure categorization** - Automatic grouping by error pattern
3. **Trend analysis** - Track success rate over time
4. **Multiple corpora** - Add quarto-cli, user repos
5. **Differential testing** - Compare to Quarto's parser
6. **Performance tracking** - Measure parse times on real docs

## References

- Validation script: `scripts/validate-corpus.sh`
- CI workflow: `.github/workflows/benchmark.yml`
- Latest report: `benchmarks/validation/validation-report.md`
- Latest results: `benchmarks/validation/results.json`
- Corpus repository: https://github.com/quarto-dev/quarto-web
