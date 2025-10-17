# Validate Against Quarto Gallery Corpus

## Why

Current testing on quarto-web showed only 16.5% success rate (84/509 files), but this is misleading because quarto-web is **documentation about Quarto** with meta-examples, nested code fences, and complex tables that don't represent typical Quarto usage.

**Current gap in validation:**
- ✅ 145/145 unit tests pass (synthetic test cases)
- ⚠️ 16.5% quarto-web success (documentation, not representative)
- ❓ Unknown success rate on real analysis documents
- ❓ Unknown common error patterns in production usage

**Need for real-world validation:**
The Quarto Gallery (https://quarto.org/docs/gallery/) contains actual Quarto documents representing real-world usage:
- Scientific papers and reports
- Data analysis notebooks
- Presentations
- Websites and blogs
- Books and manuscripts

Testing against the gallery will provide:
1. **Realistic success metrics** - How well does the parser handle actual user documents?
2. **Error pattern identification** - What real-world constructs cause issues?
3. **Priority guidance** - Which features need improvement based on actual usage?
4. **Confidence for users** - Evidence parser works on real documents, not just tests

## What Changes

### 1. Test Corpus Collection
- Clone/download Quarto Gallery examples
- Organize by document type (papers, presentations, websites, etc.)
- Document corpus characteristics (file count, avg size, features used)

### 2. Automated Testing Infrastructure
- Create test script similar to quarto-web testing
- Parse all gallery documents
- Collect statistics (success rate, error counts, error patterns)
- Generate detailed report

### 3. Analysis and Reporting
- Calculate success rates by document type
- Identify most common error patterns
- Compare to quarto-web results
- Document findings in validation report

### 4. Issue Tracking
- Create GitHub issues for high-priority failures
- Prioritize based on frequency and impact
- Link issues to specific gallery examples

### 5. Documentation
- Add validation report to docs/
- Update project.md with gallery test results
- Include in README as evidence of real-world readiness

**No code changes** - This is pure validation and documentation

## Impact

- **Affected specs**: real-world-validation (new capability)
- **Affected code**: None (validation scripts only, not part of parser)
- **Affected documentation**:
  - Create docs/quarto-gallery-validation.md
  - Update openspec/project.md with validation results
  - Update README with real-world success metrics
- **New artifacts**:
  - Validation test script
  - Corpus of gallery documents (git-ignored)
  - Detailed validation report
- **Breaking changes**: None

**Provides:**
- Realistic assessment of parser readiness
- Evidence for production use decisions
- Prioritized improvement roadmap
- User confidence in parser quality
