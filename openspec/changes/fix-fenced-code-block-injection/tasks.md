# Implementation Tasks

## 1. Update Injection Queries for Fenced Code Blocks

- [x] 1.1 Add `(code_line) @injection.content` and `injection.combined` to Python fenced block pattern
- [x] 1.2 Add `(code_line) @injection.content` and `injection.combined` to R fenced block pattern
- [x] 1.3 Add `(code_line) @injection.content` and `injection.combined` to Julia fenced block pattern
- [x] 1.4 Add `(code_line) @injection.content` and `injection.combined` to JavaScript fenced block pattern
- [x] 1.5 Add `(code_line) @injection.content` and `injection.combined` to JS fenced block pattern
- [x] 1.6 Add `(code_line) @injection.content` and `injection.combined` to TypeScript fenced block pattern
- [x] 1.7 Add `(code_line) @injection.content` and `injection.combined` to TS fenced block pattern
- [x] 1.8 Add `(code_line) @injection.content` and `injection.combined` to Bash fenced block pattern
- [x] 1.9 Add `(code_line) @injection.content` and `injection.combined` to sh fenced block pattern
- [x] 1.10 Add `(code_line) @injection.content` and `injection.combined` to SQL fenced block pattern
- [x] 1.11 Add `(code_line) @injection.content` and `injection.combined` to JSON fenced block pattern
- [x] 1.12 Add `(code_line) @injection.content` and `injection.combined` to YAML fenced block pattern
- [x] 1.13 Add `(code_line) @injection.content` and `injection.combined` to TOML fenced block pattern
- [x] 1.14 Add `(code_line) @injection.content` and `injection.combined` to HTML fenced block pattern
- [x] 1.15 Add `(code_line) @injection.content` and `injection.combined` to CSS fenced block pattern
- [x] 1.16 Add `(code_line) @injection.content` and `injection.combined` to Markdown fenced block pattern

## 2. Testing and Validation

- [x] 2.1 Create test file with multiple fenced code blocks in different languages
- [x] 2.2 Parse test file with tree-sitter parse to verify AST structure
- [x] 2.3 Verify injection queries load without syntax errors
- [x] 2.4 Test that executable_code_cell patterns still work (no regression)
- [ ] 2.5 Test in Zed editor with local grammar override (if available)

## 3. Documentation

- [ ] 3.1 Update GitHub issue #7 with fix details
- [ ] 3.2 Close GitHub issue #7 when change is merged

## 4. Archive

- [ ] 4.1 Run `openspec archive fix-fenced-code-block-injection` after deployment
- [ ] 4.2 Update language-injection spec with merged requirements
