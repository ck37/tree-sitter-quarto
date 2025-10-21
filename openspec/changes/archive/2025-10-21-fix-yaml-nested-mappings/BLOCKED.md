# BLOCKED: fix-yaml-nested-mappings

**Status:** Implementation blocked - scanner/grammar coordination complex
**Date:** 2025-10-21  
**Blocker:** YAML indentation requires sophisticated scanner state management
**Attempt 2:** External scanner tokens added but parser not recognizing them correctly

## Problem Summary

Nested YAML mappings cannot be parsed with simple grammar rules alone. The issue is that tree-sitter's LR(1) parser cannot distinguish between:

1. Empty value: `format:\n---` (end of front matter)
2. Nested mapping: `format:\n  html:\n    toc: true`

Both patterns start identically (`key: \n`) and require **indentation lookahead** to determine which path to take.

## Attempted Solutions

### Attempt 1: Pure Grammar Approach (Failed)

Added nested mapping support to `yaml_pair` rule:

```javascript
yaml_pair: $ => seq(
  field("key", $.yaml_key),
  ":",
  choice(
    seq(/[ \t]+/, field("value", $.yaml_scalar), /\r?\n/),
    prec(1, seq(/\r?\n/, field("value", $.yaml_mapping))),  // Doesn't work!
    prec(-1, /\r?\n/),
  ),
)
```

**Result:** Parser compiles but produces ERROR nodes because it can't determine when to match nested mapping vs empty value without indentation context.

### Attempt 2: External Scanner with INDENT/DEDENT Tokens (Failed)

Added YAML indentation tracking to the external scanner:

**Scanner changes:**
- Added `YAML_INDENT` and `YAML_DEDENT` to `TokenType` enum
- Added `yaml_indent_level`, `in_yaml_front_matter`, `yaml_dedent_pending` to `Scanner` struct
- Implemented `scan_yaml_indentation()` function to detect indentation changes
- Updated serialization to store YAML state (11 bytes total)

**Grammar changes:**
```javascript
externals: $ => [
  // ... existing tokens
  $._yaml_indent,
  $._yaml_dedent,
]

yaml_pair: $ => seq(
  field("key", $.yaml_key),
  ":",
  choice(
    // Inline scalar
    seq(/[ \t]+/, field("value", $.yaml_scalar), /\r?\n/),
    // Nested mapping with explicit INDENT/DEDENT
    seq(/\r?\n/, $._yaml_indent, field("value", $.yaml_mapping), $._yaml_dedent),
    // Empty value
    /\r?\n/,
  ),
)
```

**Result:** Parser compiles without conflicts, but INDENT/DEDENT tokens are not being recognized during parsing. The scanner function is being called, but the grammar is not in a state where it expects these tokens at the right moment. The coordination between when the scanner emits tokens and when the grammar expects them is not working correctly.

**Diagnosis:** The issue is likely that:
1. The scanner needs to emit INDENT immediately after seeing increased indentation, but the grammar has already consumed the newline
2. Tree-sitter's parsing model makes it difficult to emit tokens that span no characters (zero-width tokens)
3. The scanner and grammar are out of sync on when indentation should be checked

## Root Cause

Tree-sitter LR parsers are **not indentation-aware** by default. YAML's indentation-based nesting requires:

1. **External scanner** to detect indent/dedent changes
2. **Indent tokens** (`INDENT`, `DEDENT`) emitted by scanner
3. **State tracking** of current indentation level in scanner
4. **Grammar rules** that use `INDENT`/`DEDENT` tokens explicitly

## Reference Implementations

Successful indentation-based parsers in tree-sitter:

- **tree-sitter-python**: Uses external scanner for `INDENT`/`DEDENT` tokens
- **tree-sitter-yaml**: Full YAML parser with indentation tracking
- **tree-sitter-nim**: Indentation-sensitive blocks

## Required Work for Fix

To properly support nested YAML mappings:

### 1. External Scanner Extension
- Add `YAML_INDENT` and `YAML_DEDENT` tokens to `src/scanner.c`
- Track indentation stack in scanner state
- Emit `INDENT` when indentation increases
- Emit `DEDENT` when indentation decreases
- Handle mixed tabs/spaces correctly

### 2. Grammar Modifications
```javascript
yaml_pair: $ => seq(
  field("key", $.yaml_key),
  ":",
  choice(
    // Inline scalar
    seq(/[ \t]+/, field("value", $.yaml_scalar), /\r?\n/),
    // Nested mapping with explicit indentation
    seq(
      /\r?\n/,
      $.YAML_INDENT,
      field("value", $.yaml_mapping),
      $.YAML_DEDENT
    ),
    // Empty value
    /\r?\n/,
  ),
)
```

### 3. Complexity Estimate
- **External scanner work:** 4-6 hours (state tracking, indent/dedent logic)
- **Grammar updates:** 2-3 hours (integrate tokens)
- **Testing:** 3-4 hours (edge cases, mixed indentation)
- **Total:** ~10-15 hours of focused development

## Recommendation

This fix should be **deferred to v0.2.0** or later because:

1. **Complexity** - Requires significant scanner work beyond simple grammar changes
2. **Risk** - Indentation tracking can introduce subtle bugs
3. **Scope** - Affects core YAML parsing infrastructure
4. **Priority** - Workaround exists (use simple YAML without nesting)

## Alternative Approaches (Updated 2025-10-21)

### Option 1: Language Injection with tree-sitter-yaml (RECOMMENDED)

**Approach:** Replace structural YAML parsing with language injection

**Implementation:**
1. Install `@tree-sitter-grammars/tree-sitter-yaml` (maintained, v0.7.1 from 2025-05)
2. Simplify `yaml_front_matter` to capture raw content:
```javascript
yaml_front_matter: $ => seq(
  field("start", alias(token(seq("---", /\r?\n/)), $.yaml_front_matter_start)),
  field("content", $.yaml_content),  // Raw text node
  field("close", alias(token(prec(1, choice("---", "..."))), $.yaml_front_matter_delimiter)),
  /\r?\n/,
)

yaml_content: $ => /[^]*?(?=^(?:---|\.\.\.)\r?$)/  // Everything until delimiter
```
3. Add injection query in `queries/injections.scm`:
```scm
((yaml_front_matter
  content: (yaml_content) @injection.content)
 (#set! injection.language "yaml"))
```

**Pros:**
- Delegates to expert YAML parser (handles all YAML features correctly)
- Battle-tested parser used by editors (Neovim, Zed, Helix)
- Simple implementation (~2-3 hours vs 10-15 hours for scanner)
- No complex scanner state management
- Full YAML spec compliance (lists, anchors, multiline strings, etc.)

**Cons:**
- Adds dependency (but small: tree-sitter-yaml is ~100KB)
- Cannot query YAML structure directly from Quarto parser (must query injection)
- Editor must support language injection and have tree-sitter-yaml installed

**Research findings:**
- Quarto uses standard YAML (no special syntax) - see Context7 docs
- tree-sitter-pandoc-markdown doesn't parse YAML at all (confirms injection is acceptable)
- We already use injection for 15+ languages (Python, R, Julia, JS, etc.)
- Injection query pattern is well-established in our codebase

**Estimated effort:** 2-3 hours

### Option 2: Continue Scanner Approach (BLOCKED)

Already attempted with ~5 hours invested. Scanner tokens implemented but coordination with grammar is failing. Would require deep tree-sitter expertise to debug.

**Estimated effort:** 10-15 hours (uncertain)

### Option 3: Limit YAML Support
Document that nested YAML is not supported:
- Pros: No additional work
- Cons: Breaks common Quarto patterns (format.html.toc is ubiquitous)

### Option 4: Simple Heuristic (Partial Fix)
Match 1-2 levels of nesting with fixed indentation (2 or 4 spaces):
- Pros: Handles 80% of real-world cases
- Cons: Fragile, doesn't generalize, still requires scanner work

## Decision (Updated 2025-10-21)

**RECOMMENDATION: Implement Option 1 (Language Injection)**

### Rationale:

1. **Quarto uses standard YAML** - No special syntax means tree-sitter-yaml handles everything
2. **Proven pattern** - We already inject 15+ languages successfully
3. **Effort vs benefit** - 2-3 hours vs 10-15+ hours for scanner approach
4. **User impact** - Nested YAML is ubiquitous in Quarto (nearly every document uses `format.html.*`)
5. **Risk** - Low (injection is well-supported, tree-sitter-yaml is battle-tested)

### Implementation Plan:

1. Install `@tree-sitter-grammars/tree-sitter-yaml` dependency
2. Refactor `yaml_front_matter` to capture raw content instead of parsing
3. Remove `yaml_mapping`, `yaml_pair`, `yaml_key`, `yaml_scalar` rules (no longer needed)
4. Remove `$._yaml_indent`, `$._yaml_dedent` externals (revert scanner changes)
5. Add YAML injection query to `queries/injections.scm`
6. Update tests to verify injection works correctly
7. Document in README that YAML highlighting requires tree-sitter-yaml

### Next Steps:

If approved, move this change from BLOCKED to active implementation with injection approach.

### Original Decision (Pre-research):

~~**Recommend pausing this change** until:~~
~~1. Core parser features are stable~~
~~2. Team has capacity for scanner work~~
~~3. User demand justifies the complexity~~

~~Mark proposal as `DEFERRED` and update spec to reflect current limitations.~~

**Research revealed a simpler path forward via language injection.**

## Lessons Learned

- YAML indentation requires external scanner, not just grammar rules
- Tree-sitter LR parsers need explicit indent/dedent tokens for whitespace-sensitive syntax
- Always prototype grammar changes with real test cases before committing to implementation
