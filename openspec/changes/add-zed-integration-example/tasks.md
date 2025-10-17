# Implementation Tasks

## 1. Research and Planning

- [ ] 1.1 Review Zed extension development documentation
- [ ] 1.2 Check status of existing zed-quarto-extension repository
- [ ] 1.3 Identify required files for Zed grammar extension
- [ ] 1.4 Plan directory structure for example extension

## 2. Extension Setup

- [ ] 2.1 Create examples/zed-extension/ directory
- [ ] 2.2 Create extension.toml with metadata:
  - [ ] Grammar name: quarto
  - [ ] File extensions: .qmd
  - [ ] Grammar source reference
- [ ] 2.3 Copy or symlink highlight queries to extension
- [ ] 2.4 Copy or symlink language injection queries to extension
- [ ] 2.5 Configure extension structure per Zed requirements

## 3. Grammar Integration

- [ ] 3.1 Reference tree-sitter-quarto parser in extension
- [ ] 3.2 Ensure queries/zed/highlights.scm is used
- [ ] 3.3 Include queries/injections.scm for language injection
- [ ] 3.4 Test parser loads correctly in Zed

## 4. Testing - Basic Highlighting

- [ ] 4.1 Install extension in Zed (development mode)
- [ ] 4.2 Open examples/sample.qmd in Zed
- [ ] 4.3 Verify syntax highlighting for:
  - [ ] YAML front matter
  - [ ] Headings (ATX and Setext)
  - [ ] Bold and italic text
  - [ ] Code spans
  - [ ] Links and images

## 5. Testing - Quarto Features

- [ ] 5.1 Verify executable code cells highlighted correctly
- [ ] 5.2 Verify chunk options (#|) have distinct highlighting
- [ ] 5.3 Verify cross-references (@fig-, @tbl-) highlighted
- [ ] 5.4 Verify inline code cells (`{python} expr`) highlighted
- [ ] 5.5 Verify shortcodes ({{< >}}) highlighted
- [ ] 5.6 Verify callouts/tabsets highlighted
- [ ] 5.7 Verify inline formatting (~~, ==, ~, ^) highlighted

## 6. Testing - Language Injection

- [ ] 6.1 Verify Python code in cells has Python syntax highlighting
- [ ] 6.2 Verify R code in cells has R syntax highlighting
- [ ] 6.3 Verify Julia code highlighting works
- [ ] 6.4 Verify SQL code highlighting works
- [ ] 6.5 Test with multiple languages in one document

## 7. Performance Testing

- [ ] 7.1 Open large .qmd file (1000+ lines) in Zed
- [ ] 7.2 Verify highlighting renders quickly
- [ ] 7.3 Test typing performance (no lag)
- [ ] 7.4 Test file switching performance
- [ ] 7.5 Check for memory leaks with long editing sessions

## 8. Documentation

- [ ] 8.1 Create docs/zed-integration.md
- [ ] 8.2 Document installation steps for Zed extension
- [ ] 8.3 Include screenshots of highlighted Quarto code
- [ ] 8.4 Document known limitations (if any)
- [ ] 8.5 Add troubleshooting section
- [ ] 8.6 Link to zed-quarto-extension if separate

## 9. README Updates

- [ ] 9.1 Add "Editor Support" section to README
- [ ] 9.2 List Zed as supported editor with link to example
- [ ] 9.3 Note other editors can follow similar pattern
- [ ] 9.4 Add screenshot of Zed with Quarto highlighting

## 10. Optional: Extension Publishing

- [ ] 10.1 Review Zed extension publishing guidelines
- [ ] 10.2 Ensure extension meets quality standards
- [ ] 10.3 Submit to Zed extension registry (if applicable)
- [ ] 10.4 Update documentation with installation from registry

## 11. Cross-reference with zed-quarto-extension

- [ ] 11.1 Check if zed-quarto-extension repo has working extension
- [ ] 11.2 If exists, document relationship in this example
- [ ] 11.3 Consider merging or referencing to avoid duplication
- [ ] 11.4 Ensure consistency between example and production extension
