# Changelog

All notable changes to tree-sitter-quarto will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
