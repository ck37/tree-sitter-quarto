# Design: Structured YAML Front Matter Support

**Change ID:** `add-structured-yaml-support`
**Status:** Draft

---

## Architecture Overview

### Current Architecture

```
yaml_front_matter:
  - yaml_front_matter_start ("---\n")
  - yaml_front_matter_content (unparsed text, any line not starting with "---")
  - yaml_front_matter_delimiter ("---" or "...")
```

**Problem:** Everything between delimiters is unparsed text. When YAML contains `-` (list marker) or `|` (pipe), parser tries to interpret as Markdown, creating ERROR nodes.

### Proposed Architecture

```
yaml_front_matter:
  - yaml_front_matter_start ("---\n")
  - yaml_mapping
    - yaml_pair
      - yaml_key
      - yaml_value (one of: yaml_scalar, yaml_list, yaml_mapping)
  - yaml_front_matter_delimiter ("---" or "...")
```

**Solution:** Parse YAML structure within front matter boundaries, preventing leakage into Markdown parser.

---

## Component Design

### 1. Grammar Rules (`grammar.js`)

#### Top-Level Structure

```javascript
yaml_front_matter: $ => prec(-1, seq(
  field('start', alias(token(seq('---', /\r?\n/)), $.yaml_front_matter_start)),
  optional($.yaml_mapping),  // NEW: structured content
  field('close', alias(token(prec(1, choice('---', '...'))), $.yaml_front_matter_delimiter)),
  /\r?\n/
)),
```

#### YAML Mapping (Block-Style)

```javascript
yaml_mapping: $ => repeat1(
  choice(
    $.yaml_pair,
    $.yaml_comment,
    $.blank_line
  )
),

yaml_pair: $ => seq(
  field('key', $.yaml_key),
  ':',
  optional(/[ \t]+/),
  choice(
    seq(field('value', $.yaml_scalar), /\r?\n/),      // inline scalar
    seq(/\r?\n/, field('value', $.yaml_mapping)),     // nested mapping
    seq(/\r?\n/, field('value', $.yaml_list)),        // list value
    seq(field('value', $.yaml_multiline), /\r?\n/)    // | or > multiline
  )
),
```

#### YAML List

```javascript
yaml_list: $ => repeat1(
  choice(
    $.yaml_list_item,
    $.yaml_comment,
    $.blank_line
  )
),

yaml_list_item: $ => seq(
  $.yaml_list_marker,  // "-" from scanner
  /[ \t]+/,
  choice(
    seq(field('value', $.yaml_scalar), /\r?\n/),      // - scalar
    seq($.yaml_key, ':', field('value', $.yaml_value), /\r?\n/),  // - key: value
    seq(/\r?\n/, field('value', $.yaml_mapping))      // - \n  key: value
  )
),
```

#### YAML Scalar Types

```javascript
yaml_scalar: $ => choice(
  $.yaml_string_unquoted,
  $.yaml_string_quoted,
  $.yaml_number,
  $.yaml_boolean,
  $.yaml_null,
),

yaml_string_unquoted: $ => token(prec(-1, /[^\r\n:#\[\]{},"]+/)),
yaml_string_quoted: $ => choice(
  seq('"', repeat(choice(/[^"\\]/, /\\./)), '"'),
  seq("'", repeat(choice(/[^']/, "''")), "'")
),
yaml_number: $ => /-?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?/,
yaml_boolean: $ => choice('true', 'false', 'yes', 'no'),
yaml_null: $ => choice('null', '~'),
```

#### Multi-Line Values

```javascript
yaml_multiline: $ => choice(
  $.yaml_multiline_literal,   // |
  $.yaml_multiline_folded      // >
),

yaml_multiline_literal: $ => seq(
  '|',
  optional(choice('+', '-')),  // chomping indicator
  /\r?\n/,
  repeat($.yaml_multiline_line)  // from scanner: indented lines
),
```

### 2. External Scanner (`src/scanner.c`)

#### Scanner State

```c
typedef struct {
  int32_t indent_stack[MAX_INDENT_DEPTH];  // Track indentation levels
  uint8_t indent_depth;                     // Current depth
  bool in_yaml;                             // Inside YAML front matter
  bool after_key;                           // After yaml_key, before ':'
} Scanner;
```

#### Token Types (External)

```c
enum TokenType {
  YAML_LIST_MARKER,           // "-" at correct indentation
  YAML_MULTILINE_LINE,        // Indented line in | or > block
  YAML_INDENT,                // Increase indent level
  YAML_DEDENT,                // Decrease indent level
  YAML_FRONT_MATTER_CLOSE,    // "---" or "..." at column 0
};
```

#### Scanner Logic: Indent Tracking

```c
bool scan_yaml_indent(TSLexer *lexer, Scanner *scanner) {
  // Count leading spaces
  int32_t spaces = 0;
  while (lexer->lookahead == ' ') {
    spaces++;
    advance(lexer);
  }

  // Check if at front matter close
  if (spaces == 0 && (peek_string(lexer, "---") || peek_string(lexer, "..."))) {
    lexer->result_symbol = YAML_FRONT_MATTER_CLOSE;
    return true;
  }

  int32_t current_indent = scanner->indent_stack[scanner->indent_depth];

  // Indent increase
  if (spaces > current_indent) {
    scanner->indent_depth++;
    scanner->indent_stack[scanner->indent_depth] = spaces;
    lexer->result_symbol = YAML_INDENT;
    return true;
  }

  // Dedent
  while (scanner->indent_depth > 0 &&
         spaces < scanner->indent_stack[scanner->indent_depth]) {
    scanner->indent_depth--;
    lexer->result_symbol = YAML_DEDENT;
    return true;
  }

  return false;
}
```

#### Scanner Logic: List Marker Detection

```c
bool scan_yaml_list_marker(TSLexer *lexer, Scanner *scanner) {
  // Must be at correct indentation level
  if (get_indent(lexer) != scanner->indent_stack[scanner->indent_depth]) {
    return false;
  }

  // Must be "-" followed by space or newline
  if (lexer->lookahead == '-') {
    advance(lexer);
    if (lexer->lookahead == ' ' || lexer->lookahead == '\t' ||
        lexer->lookahead == '\r' || lexer->lookahead == '\n') {
      lexer->result_symbol = YAML_LIST_MARKER;
      return true;
    }
  }

  return false;
}
```

---

## Implementation Strategy

### Phase 1: Grammar Foundation

**Goal:** Define YAML node types, basic structure

**Changes:**
1. Add `yaml_mapping`, `yaml_pair`, `yaml_key`, `yaml_value` rules
2. Add `yaml_scalar` variants (string, number, boolean, null)
3. Update `yaml_front_matter` to use `yaml_mapping` instead of unparsed content

**Tests:**
- Simple key-value pairs
- Multiple pairs
- Different scalar types

### Phase 2: List Support

**Goal:** Parse YAML lists correctly

**Changes:**
1. Add `yaml_list`, `yaml_list_item` rules
2. Implement scanner logic for list marker detection
3. Handle list of scalars vs. list of mappings

**Tests:**
- Simple list of strings
- List of numbers
- List of mappings (common in Quarto)

### Phase 3: Nesting & Indentation

**Goal:** Handle nested structures via indentation

**Changes:**
1. Implement indent tracking in scanner
2. Add `YAML_INDENT`, `YAML_DEDENT` tokens
3. Handle nested mappings and lists

**Tests:**
- Nested mappings (2 levels, 3 levels)
- Nested lists
- Mixed nesting

### Phase 4: Multi-Line Values

**Goal:** Support `|` and `>` for multi-line strings

**Changes:**
1. Add `yaml_multiline_literal`, `yaml_multiline_folded` rules
2. Implement multi-line scanning in external scanner
3. Handle chomping indicators (`+`, `-`)

**Tests:**
- Literal block scalar (`|`)
- Folded block scalar (`>`)
- With chomping indicators

### Phase 5: Edge Cases & Polish

**Goal:** Handle real-world YAML patterns

**Changes:**
1. Inline comments (`# comment`)
2. Empty values (`key:`)
3. Quoted strings with escapes
4. Mixed indentation detection (error recovery)

**Tests:**
- All patterns from quarto-web validation failures
- Edge cases from YAML spec

---

## Data Structures

### Scanner State Management

```c
// Initialize scanner
void *tree_sitter_quarto_external_scanner_create() {
  Scanner *scanner = calloc(1, sizeof(Scanner));
  scanner->indent_stack[0] = 0;  // Base indent
  scanner->indent_depth = 0;
  scanner->in_yaml = false;
  return scanner;
}

// Serialize/Deserialize for incremental parsing
unsigned tree_sitter_quarto_external_scanner_serialize(void *payload, char *buffer) {
  Scanner *scanner = (Scanner *)payload;

  buffer[0] = scanner->indent_depth;
  buffer[1] = scanner->in_yaml ? 1 : 0;
  buffer[2] = scanner->after_key ? 1 : 0;

  int offset = 3;
  for (int i = 0; i <= scanner->indent_depth; i++) {
    buffer[offset++] = (scanner->indent_stack[i] >> 24) & 0xFF;
    buffer[offset++] = (scanner->indent_stack[i] >> 16) & 0xFF;
    buffer[offset++] = (scanner->indent_stack[i] >> 8) & 0xFF;
    buffer[offset++] = scanner->indent_stack[i] & 0xFF;
  }

  return offset;
}
```

---

## Error Recovery

### Strategy: Fallback to Unparsed Content

If YAML structure cannot be determined, fall back to current behavior (unparsed content):

```javascript
yaml_front_matter: $ => prec(-1, seq(
  field('start', alias(token(seq('---', /\r?\n/)), $.yaml_front_matter_start)),
  choice(
    $.yaml_mapping,                          // Structured (new)
    repeat($.yaml_front_matter_content)      // Unparsed (fallback)
  ),
  field('close', alias(token(prec(1, choice('---', '...'))), $.yaml_front_matter_delimiter)),
  /\r?\n/
)),
```

**Benefits:**
- Graceful degradation for invalid YAML
- No breaking changes to existing behavior
- Incremental improvement as scanner improves

---

## Performance Considerations

### Scanner Efficiency

**Optimization 1: Single-pass indent tracking**
- Track indentation only when needed (list markers, nested structures)
- Avoid re-scanning for every token

**Optimization 2: Early termination**
- Detect front matter close (`---`) early to avoid unnecessary YAML parsing
- Use lexer lookahead efficiently

**Optimization 3: Minimal state**
- Keep scanner state small (<100 bytes)
- Fast serialization for incremental parsing

### Benchmarks

**Target Performance:**
- Parse time increase: <10% vs. current unparsed approach
- Memory overhead: <5MB per document
- Incremental re-parse: <5ms for typical YAML edits

**Test Documents:**
- Small YAML: 10 key-value pairs (~200 bytes)
- Medium YAML: 50 pairs, 2 levels nesting (~1KB)
- Large YAML: 200 pairs, 3 levels, lists (~5KB)

---

## Testing Strategy

### Unit Tests (Corpus)

**Coverage:**
1. Scalar types (string, number, boolean, null)
2. Simple mappings (flat key-value)
3. Nested mappings (2-4 levels)
4. Lists (scalars, mappings)
5. Multi-line values (`|`, `>`)
6. Comments (inline, block)
7. Edge cases (empty values, special characters)

**Format:**
```
==================
Simple key-value pair
==================

---
title: "Document"
author: "Name"
---

---

(document
  (yaml_front_matter
    (yaml_front_matter_start)
    (yaml_mapping
      (yaml_pair
        key: (yaml_key)
        value: (yaml_scalar))
      (yaml_pair
        key: (yaml_key)
        value: (yaml_scalar)))
    (yaml_front_matter_delimiter)))
```

### Integration Tests (Real Corpus)

**Validation:**
- Run on quarto-web corpus (509 files)
- Compare before/after success rate
- Target: 10% → ≥90% success rate

**Regression Testing:**
- All 159 existing tests must still pass
- No ERROR nodes in previously clean parses

---

## Rollout Plan

### Step 1: Implement & Test (Week 1)
- Implement grammar rules
- Implement scanner logic
- Add comprehensive corpus tests

### Step 2: Validate (Week 2)
- Run validation on quarto-web corpus
- Identify edge cases
- Refine implementation

### Step 3: Performance Benchmark (Week 2)
- Measure parse time impact
- Optimize hot paths
- Document performance characteristics

### Step 4: Documentation (Week 2)
- Update grammar documentation
- Add scanner state machine diagram
- Document YAML support limitations

### Step 5: Release (v0.2.0)
- Merge to main
- Tag v0.2.0
- Update validation metrics in README

---

## Open Technical Questions

### Q1: Should we use external scanner for all YAML parsing?

**Options:**
- A) External scanner for indent/list detection only, grammar for structure
- B) External scanner for all YAML tokens
- C) Grammar-only approach with conflict resolution

**Recommendation:** A - hybrid approach balances flexibility and performance

### Q2: How to handle invalid indentation?

**Example:**
```yaml
key:
  subkey: value
 bad_indent: value  # Wrong indent
```

**Options:**
- A) Treat as ERROR node, stop parsing
- B) Fallback to unparsed content for that section
- C) Try to recover by guessing intent

**Recommendation:** B - graceful degradation

### Q3: Should we validate YAML semantics?

**Example:**
```yaml
listing:
  contents:
    - file.yml
  id: 123        # Quarto expects string, not number
```

**Options:**
- A) Parser validates types (strings vs. numbers)
- B) Parser only handles syntax, leave validation to Quarto/LSP
- C) Add optional validation mode

**Recommendation:** B - separation of concerns, parser focuses on syntax

---

## References

- YAML 1.2 Spec: https://yaml.org/spec/1.2.2/
- tree-sitter External Scanner Guide: https://tree-sitter.github.io/tree-sitter/creating-parsers#external-scanners
- tree-sitter-yaml Implementation: https://github.com/ikatyang/tree-sitter-yaml
- Quarto YAML Metadata Reference: https://quarto.org/docs/reference/formats/
