# grammar-foundation Spec Delta

## ADDED Requirements

### Requirement: Table Cell Accessibility
The parser SHALL expose individual table cells as AST nodes in both header and data rows to enable cell-level queries and syntax highlighting.

#### Scenario: Data row cells are exposed as nodes
- **WHEN** parsing a pipe table data row like `| foo | bar | baz |`
- **THEN** the `pipe_table_row` node MUST have child `table_cell` nodes
- **AND** each cell corresponds to content between pipe delimiters
- **AND** cells are accessible via tree-sitter queries
- **AND** cell content is captured in the AST

#### Scenario: Cell structure is consistent across row types
- **WHEN** parsing a complete pipe table
- **THEN** `pipe_table_header` cells use `table_cell` node type
- **AND** `pipe_table_row` cells use `table_cell` node type
- **AND** both use `field("content", ...)` for consistent querying
- **AND** cell structure is identical between headers and data rows

#### Scenario: Cells support inline content
- **WHEN** parsing table cells containing inline markdown like `| **bold** | `code` |`
- **THEN** cells are exposed as separate nodes (even if inline content isn't parsed)
- **AND** cell content includes the raw text with inline markers
- **AND** enables future inline content parsing via language injection
- **AND** query engines can access cell text for highlighting

#### Scenario: Empty cells are represented
- **WHEN** parsing a row with empty cells like `| | foo | |`
- **THEN** empty cells create `table_cell` nodes
- **AND** empty cell content is represented (possibly as empty string)
- **AND** cell count matches delimiter count
- **AND** table structure remains valid

#### Scenario: Cells with escaped delimiters
- **WHEN** parsing cells with escaped pipes like `| foo\|bar |`
- **THEN** escaped pipe does not create additional cell boundary
- **AND** cell content includes escape sequence
- **AND** only unescaped pipes delimit cells
- **AND** cell parsing matches CommonMark/GFM behavior

#### Scenario: Query support for cell-level operations
- **WHEN** writing tree-sitter queries for table cells
- **THEN** can select cells via `(table_cell)` pattern
- **AND** can filter cells by position or content
- **AND** can distinguish header cells from data cells by parent node
- **AND** can apply syntax highlighting to individual cells

## MODIFIED Requirements

### Requirement: Parse Tree Structure
The parser SHALL generate well-formed syntax trees with named nodes and fields **including individual table cells in all table row types**.

#### Scenario: Named nodes for semantic constructs
- **WHEN** parsing succeeds
- **THEN** all Quarto constructs have semantic node types
- **AND** nodes use descriptive names (not generic tokens)
- **AND** table cells are exposed as `table_cell` nodes in both headers and data rows

#### Scenario: Fields identify important children
- **WHEN** defining complex nodes
- **THEN** important children use field() declarations
- **AND** fields enable query-based navigation
- **AND** table cells use `field("content", ...)` for consistent access

#### Scenario: Table row structure exposes cells
- **WHEN** parsing pipe table rows
- **THEN** `pipe_table_header` exposes individual `table_cell` nodes
- **AND** `pipe_table_row` exposes individual `table_cell` nodes
- **AND** cells are not wrapped in opaque token() blocks
- **AND** AST structure supports fine-grained queries and highlighting

## Rationale

### Why This Change Is Necessary

1. **Inconsistency**: Current grammar exposes cells in `pipe_table_header` but not in `pipe_table_row`, creating an unnecessary asymmetry.

2. **Editor Support**: Syntax highlighters and language servers need access to individual cells to provide proper highlighting and semantic analysis.

3. **Query Limitations**: Without cell nodes, tree-sitter queries cannot target specific columns, analyze cell content, or apply cell-specific styling.

4. **Downstream Issues**: The Zed editor extension for Quarto encountered this limitation (issue #11), causing cells to appear "cut off" in syntax highlighting.

5. **Alignment with Standards**: Both tree-sitter-pandoc-markdown and tree-sitter-markdown (ikatyang) expose individual table cells, suggesting this is the expected pattern.

### Technical Approach

The modification changes `pipe_table_row` from:

```javascript
// Current: Entire row wrapped in token()
pipe_table_row: ($) =>
  prec.dynamic(1, token(seq("|", repeat1(seq(/[^|\r\n]+/, "|")), /\r?\n/))),
```

To:

```javascript
// Fixed: Individual cells exposed, delimiters still tokenized
pipe_table_row: ($) =>
  prec.dynamic(
    1,
    seq(
      token("|"),
      repeat1(
        seq(field("content", alias(/[^|\r\n]+/, $.table_cell)), token("|")),
      ),
      /\r?\n/,
    ),
  ),
```

**Key changes:**
- Remove outer `token()` wrapper to allow cell parsing
- Keep `token()` on `|` delimiters to maintain table structure recognition
- Add `field("content", alias(..., $.table_cell))` to expose cells with consistent naming
- Maintain `prec.dynamic(1)` to preserve table vs. paragraph disambiguation

### Why This Is Safe

1. **Precedence Preserved**: The `prec.dynamic(1)` ensures tables are still recognized correctly and not confused with paragraphs.

2. **Delimiter Tokenization**: The `token("|")` on delimiters maintains table structure anchoring that prevents ambiguity.

3. **External Scanner**: The `pipe_table_start` external scanner already validates table context before row parsing begins.

4. **Proven Pattern**: This exact structure is used successfully in `pipe_table_header` and in tree-sitter-pandoc-markdown's implementation.

5. **No Semantic Change**: The table content and structure are unchanged, only the AST granularity increases.

### Migration Impact

**Breaking Change**: Yes - AST structure changes for `pipe_table_row` nodes.

**Affected Users**: Minimal - project is new with limited downstream usage.

**Migration Path**: Users with custom tree-sitter queries may need to update patterns to account for `table_cell` children. Example:

```scm
; Before: Match entire row
(pipe_table_row) @row

; After: Can now match individual cells
(pipe_table_row
  (table_cell) @cell)
```

### Future Enhancements Enabled

1. **Inline Content Parsing**: With cells exposed, future work can add language injection to parse bold, italic, code spans, etc. within cells.

2. **Column-Specific Queries**: Queries can now target specific column positions or content patterns.

3. **Semantic Analysis**: Tools can distinguish column types (text, numbers, dates) based on cell content patterns.

4. **Enhanced Highlighting**: Syntax highlighters can apply different styles to different columns or cell types.
