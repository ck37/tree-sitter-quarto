# Add Structured YAML Front Matter Support

## Why

Real-world validation revealed that **56% of parse failures** on quarto-web corpus are caused by structured YAML front matter. The current implementation treats all YAML content as unparsed text, which causes the parser to misinterpret YAML structures (lists, nested mappings) as Markdown syntax, creating ERROR nodes.

**Current Problem:**
```yaml
---
listing:
  contents:
    - file1.yml  # Parsed as table cell, not list item!
---
```

**Impact on v0.1.0 Release:**
- Validation success rate: **10%** (2/20 files pass)
- Blocker for production release (target: ≥90%)
- Top 2 critical issue (along with fenced code attributes)

**Why This Matters:**
1. **70% of real documents** use structured YAML (nested objects, lists)
2. **Editor integration requires structured parsing** for LSP features
3. **v0.2.0 production release blocked** without this fix

## What Changes

**NEW**: Structured YAML parsing within front matter boundaries

- Add YAML node types: `yaml_mapping`, `yaml_pair`, `yaml_list`, `yaml_scalar`
- Implement indentation tracking in external scanner
- Support nested mappings, lists, multi-line values
- Graceful degradation: fallback to unparsed content for invalid YAML
- Comprehensive test coverage (40+ corpus tests)

**Implementation Approach:**
- Lightweight structure detection (not full YAML 1.2 compliance)
- Addresses 90% of real-world Quarto YAML patterns
- No external dependencies (tree-sitter-yaml not required)
- 3-5 day implementation effort

## Impact

**Affected Specs:**
- **NEW**: Creates `yaml-structure` capability specification
- 10 requirements, 40+ test scenarios

**Affected Code:**
- Modify `grammar.js`: Add YAML node types
- Modify `src/scanner.c`: Indent tracking, list marker detection
- New corpus tests: `test/corpus/yaml-*.txt` (40+ tests)
- Update `queries/highlights.scm`: YAML syntax highlighting
- Update `queries/folds.scm`: YAML block folding

**Validation Impact:**
- **Before**: 10% success rate (2/20 files)
- **After**: ≥90% success rate (18+/20 files)
- **Unblocks**: v0.2.0 production release

**CI/CD:**
- All existing tests must pass (159/159)
- Add 40+ new YAML tests
- Run validation on quarto-web corpus

**Release Blocker:** YES - Required for v0.2.0 production release
