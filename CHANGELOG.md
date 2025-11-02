# Changelog

All notable changes to tree-sitter-quarto will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- All 7 test suite failures resolved by removing colon from text exclusion pattern ([#18](https://github.com/ck37/tree-sitter-quarto/issues/18))
  - Previously: Colons in regular text were parsed as separate `(colon)` tokens, causing test failures
  - Now: Colons are included in text tokens, matching expected parse tree structure
  - **Result**: Test suite now passes at 100% (224/224 tests passing, up from 217/224 or 96.9%)
  - **Root cause**: Colon exclusion from text pattern was added for fenced div detection but was unnecessary since external scanner handles div detection independently
  - **Technical details**: Removed `:` from text regex pattern and removed `alias(":", $.colon)` fallback nodes

### Changed

- **BREAKING**: `pipe_table_row` AST structure now exposes individual `table_cell` nodes ([#11](https://github.com/ck37/tree-sitter-quarto/issues/11))
  - Previously: Data rows were single opaque tokens with no internal structure
  - Now: Each cell is exposed as a `table_cell` node with `content` field
  - **Migration**: Update tree-sitter queries that match `pipe_table_row` to account for child `table_cell` nodes
  - **Benefit**: Enables cell-level syntax highlighting, queries, and future inline content parsing
  - **Example**:
    ```scm
    ; Before: Only the row node existed
    (pipe_table_row) @row
    
    ; After: Can query individual cells
    (pipe_table_row
      (table_cell) @cell)
    ```

### Fixed

- Table data rows now have consistent structure with header rows - both expose individual cells
- Cells with inline markdown (bold, italic, code) are now accessible in the AST (inline parsing to come in future update)

### Added

- Test cases for table cells with inline formatting
- Test cases for table cells with mixed content (math, subscript, code spans)
