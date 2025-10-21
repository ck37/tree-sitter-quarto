# fix-yaml-nested-mappings

## Why

The current YAML parser only supports simple scalar values and cannot parse nested mappings (indented key-value structures). This causes ERROR nodes in real-world Quarto documents that use nested YAML structures like:

```yaml
---
format:
  html:
    code-fold: true
    toc: true
---
```

**Impact:**
- 3 of 4 benchmark documents have YAML parsing errors
- Common Quarto pattern (`format.html.toc`, `format.pdf.documentclass`, etc.) fails to parse
- ERROR nodes confuse syntax highlighters and language servers
- Breaks on quarto-web corpus documents (90%+ use nested YAML)

**Root cause:** The `yaml_pair` grammar rule in `grammar.js:236-247` only accepts:
```javascript
yaml_pair: $ => seq(
  field("key", $.yaml_key),
  ":",
  choice(
    seq(/[ \t]+/, field("value", $.yaml_scalar), /\r?\n/),  // Only scalar values!
    /\r?\n/,  // Or empty
  ),
)
```

This doesn't allow the value to be another `yaml_mapping` (nested structure).

## What Changes

Modify the `yaml_pair` rule to support nested mappings as values:

```javascript
yaml_pair: $ => seq(
  field("key", $.yaml_key),
  ":",
  choice(
    // Inline scalar value
    seq(/[ \t]+/, field("value", $.yaml_scalar), /\r?\n/),
    // Nested mapping (indented)
    seq(/\r?\n/, field("value", $.yaml_mapping)),
    // Empty value
    /\r?\n/,
  ),
)
```

**Affected specs:**
- `yaml-structure` (MODIFIED) - Update "Parse nested mappings" requirement with correct implementation pattern

**Success criteria:**
- All benchmark documents parse YAML without ERROR nodes
- Nested mappings at arbitrary depth work correctly
- Existing YAML tests continue to pass
- No performance regression

## Scope

**In scope:**
- Support nested mappings as values in `yaml_pair`
- Handle arbitrary nesting depth (e.g., `format.html.theme.light`)
- Add comprehensive tests for nested structures
- Update grammar rule and regenerate parser

**Out of scope:**
- YAML lists/sequences (already implemented separately)
- YAML anchors/aliases (advanced feature, not needed for Quarto)
- Multi-line string values with `|` or `>` (separate feature)
- YAML tags or directives

## Dependencies

None - this is a self-contained grammar fix.

## Risks

**Risk:** Indentation-based parsing could create ambiguity or conflicts  
**Mitigation:** Tree-sitter handles indentation naturally; existing `yaml_mapping` rule already uses indentation

**Risk:** Performance regression on deep nesting  
**Mitigation:** Add performance test with 10-level nesting; monitor benchmarks

**Risk:** Breaking existing YAML tests  
**Mitigation:** Run full test suite before/after; all existing tests must pass

## Related Work

- Existing `yaml_mapping` rule already supports repeating `yaml_pair` nodes
- Spec already documents requirement for nested mappings (lines 45-67)
- Just need to connect `yaml_pair` values to `yaml_mapping`
