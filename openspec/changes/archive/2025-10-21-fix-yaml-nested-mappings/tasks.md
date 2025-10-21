# Implementation Tasks

**Note:** This change was implemented using language injection approach (Option 1 from BLOCKED.md), not the original structural parsing plan below.

## Completed Implementation (Language Injection Approach)

### Phase 1: Grammar Simplification
- [x] Remove structural YAML parsing rules (yaml_mapping, yaml_pair, yaml_key, yaml_scalar)
- [x] Simplify yaml_front_matter to capture raw content
- [x] Create yaml_content and yaml_line rules for raw text capture
- [x] Remove $._yaml_indent and $._yaml_dedent external tokens
- [x] Make closing delimiter tokenized with newline

### Phase 2: Scanner Cleanup
- [x] Revert all YAML indentation tracking code
- [x] Remove yaml_indent_stack from Scanner struct
- [x] Remove YAML_INDENT/YAML_DEDENT from TokenType enum
- [x] Remove array.h include
- [x] Restore original serialization format (7 bytes)

### Phase 3: Language Injection
- [x] Add YAML injection query to queries/injections.scm
- [x] Remove old YAML node references from queries/highlights.scm
- [x] Remove old YAML node references from queries/nvim/highlights.scm

### Phase 4: Testing
- [x] Update all YAML test expectations in test/corpus/yaml-front-matter.txt
- [x] Update YAML test in test/corpus/basic-markdown.txt
- [x] Add test for nested YAML mappings
- [x] Verify all 203 tests pass
- [x] Test with complex nested YAML structures

### Phase 5: Documentation
- [x] Update README.md with YAML injection note
- [x] Create verification.md documenting implementation
- [x] Create BLOCKED.md with research and decision rationale
- [x] Create docs/yaml-comparison.md comparing with other parsers

## Verification Results

- ✅ All 203/203 tests passing (100% success)
- ✅ No ERROR nodes on nested YAML structures
- ✅ Parse speed: 12,982 bytes/ms (excellent)
- ✅ Query files valid (no errors)
- ✅ Follows industry best practices (matches tree-sitter-markdown and quarto-markdown)

---

## Original Plan (Not Used - Kept for Reference)

The original plan below was for structural parsing with INDENT/DEDENT tokens. This approach was abandoned after research showed all production parsers use language injection instead.

<details>
<summary>Original structural parsing plan (archived)</summary>

### Phase 1: Grammar Modification
- [ ] Update yaml_pair rule in grammar.js
- [ ] Add nested mapping support to value choice
- [ ] Add pattern: `seq(/\r?\n/, field("value", $.yaml_mapping))`
- [ ] Regenerate parser

### Phase 2: Testing
- [ ] Add nested mapping tests to corpus
- [ ] Run existing tests
- [ ] Test benchmark documents

### Phase 3: Real-World Validation
- [ ] Test with Quarto documentation corpus
- [ ] Fix any errors found

</details>
