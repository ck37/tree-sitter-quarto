# Language Injection - Delta

## ADDED Requirements

### Requirement: Fenced Code Block Content Injection
The parser SHALL capture code content for standard Markdown fenced code blocks to enable syntax highlighting through language injection.

#### Scenario: Python fenced block injection
- **WHEN** parsing standard Markdown fenced code block:
  ```
  ```python
  import numpy as np
  print("hello")
  ```
  ```
- **THEN** injection query captures code_line nodes as @injection.content
- **AND** injection query sets injection.language to "python"
- **AND** Python syntax highlighting is applied to code content
- **AND** multiple code_line nodes are combined into one injection

#### Scenario: Multi-language fenced blocks in one document
- **WHEN** document contains fenced blocks in Python, R, and Julia
- **THEN** each block's code_line nodes receive appropriate language injection
- **AND** Python block gets Python highlighting
- **AND** R block gets R highlighting
- **AND** Julia block gets Julia highlighting
- **AND** languages don't interfere with each other

#### Scenario: All supported languages work
- **WHEN** fenced blocks exist for any supported language (Python, R, Julia, JavaScript, TypeScript, Bash, SQL, JSON, YAML, TOML, HTML, CSS, Markdown)
- **THEN** each language's fenced_code_block pattern includes content capture
- **AND** syntax highlighting works for all languages

### Requirement: Fenced Code Block Injection Pattern
The parser SHALL use correct tree-sitter injection query syntax for fenced code blocks.

#### Scenario: Fenced block injection pattern format
- **WHEN** injections.scm defines fenced_code_block injection
- **THEN** uses pattern with content capture:
  ```scheme
  ((fenced_code_block
    info: (info_string) @_lang
    (#eq? @_lang "python")
    (code_line) @injection.content)
   (#set! injection.language "python")
   (#set! injection.combined))
  ```
- **AND** captures info_string as language identifier
- **AND** captures code_line nodes as injection content
- **AND** sets injection.combined for multi-line blocks

#### Scenario: AST structure matches query expectations
- **WHEN** fenced_code_block is parsed
- **THEN** produces AST with structure:
  ```
  (fenced_code_block
    open: (code_fence_delimiter)
    info: (info_string)
    (code_line)
    (code_line)
    ...
    close: (code_fence_delimiter))
  ```
- **AND** code_line nodes contain the actual code content
- **AND** injection query can capture these nodes

### Requirement: Fenced Block vs Executable Cell Distinction
The parser SHALL use different injection patterns for fenced code blocks and executable code cells.

#### Scenario: Standard fenced block uses code_line capture
- **WHEN** parsing ` ```python` (standard Markdown)
- **THEN** injection query captures `(code_line) @injection.content`
- **AND** uses fenced_code_block node type

#### Scenario: Executable cell uses cell_content capture
- **WHEN** parsing ` ```{python}` (Quarto executable)
- **THEN** injection query captures `(cell_content) @injection.content`
- **AND** uses executable_code_cell node type
- **AND** both patterns coexist without conflict
