---
name: h-fix-fenced-code-block-attributes
branch: fix/h-fix-fenced-code-block-attributes
status: pending
created: 2025-11-01
---

# Add Support for Fenced Code Block Attributes

## Problem/Goal

Parser currently does not support attributes on regular fenced code blocks (non-executable). This syntax is valid Pandoc Markdown but creates ERROR nodes in our parser.

**Syntax examples:**
```markdown
```{.bash}
echo "hello"
```
```

Or with multiple attributes:
```markdown
```{.python .numberLines startFrom="10"}
print("hello")
```
```

**Current behavior:** Creates ERROR nodes with the attribute_class appearing separately from the fenced_code_block.

**Expected behavior:** Should parse as a properly structured fenced_code_block with an attributes field containing the attribute_list.

**Impact:** This is the most common error pattern in corpus validation, affecting multiple files. Currently achieving 25% corpus validation success rate. Fixing this would likely improve to 40-50%+ as it's the primary blocker.

**Technical approach:**
1. Extend `fenced_code_block` rule to accept optional `attribute_list` after info_string
2. Handle both `{.class}` and `{.class key="value"}` syntax
3. Distinguish from executable code cells (which use language name, not attributes)

**Related:** Executable code cells already support attributes via `#| key: value` syntax. This is specifically for non-executable fenced code blocks per Pandoc spec.

## Success Criteria
- [ ] Grammar correctly parses fenced code blocks with single attribute class (e.g., `` ```{.bash} ``)
- [ ] Grammar correctly parses fenced code blocks with multiple attributes (e.g., `` ```{.python .numberLines startFrom="10"} ``)
- [ ] All test cases pass in `test/corpus/fenced-code-blocks.txt` including attribute variants
- [ ] No ERROR nodes generated for valid Pandoc fenced code block attribute syntax
- [ ] Corpus validation success rate improves from 25% to at least 40%
- [ ] Parser correctly distinguishes non-executable fenced code blocks with attributes from executable code cells

## Context Manifest

### How Regular Fenced Code Blocks Currently Work

When a user writes a standard Markdown fenced code block like `` ```python ``, the parser enters the `fenced_code_block` rule defined at **grammar.js:361-372**. This rule follows a simple sequence:

1. **Opening fence**: Matches the `` ``` `` delimiter (token `/```+/`)
2. **Info string** (optional): Captures language identifier like `python`, `bash`, `r` via the pattern `/[^\r\n{]+/` - note this explicitly EXCLUDES `{` characters
3. **Newline**: Required separator
4. **Code lines**: Zero or more lines of code content (pattern `/[^\r\n]+/`)
5. **Closing fence**: Matches closing `` ``` `` delimiter
6. **Final newline**: Required

The **info_string** rule (line 374) uses the pattern `/[^\r\n{]+/` which intentionally stops at `{` characters. This was designed to prevent conflicts with executable code cells that use `{python}` syntax.

**Key architectural decision**: The grammar currently distinguishes between:
- **Executable cells**: `` ```{python} `` - parsed as `executable_code_cell` (grammar.js:140-166)
- **Regular blocks**: `` ```python `` - parsed as `fenced_code_block` (grammar.js:361-372)

This works perfectly for these two cases. The conflict is declared at grammar.js:62:
```javascript
[$.executable_code_cell, $.fenced_code_block], // Quarto: {python} vs python
```

### The Problem: Pandoc Attributes Are Not Supported

Pandoc Markdown supports a third pattern that our parser does NOT handle:
- **Regular blocks with attributes**: `` ```{.python} `` or `` ```python {.numberLines} ``

According to Pandoc documentation (from context7), these patterns are valid:

**Pattern 1**: Class-only attributes
```markdown
```{.haskell}
code here
```
```

**Pattern 2**: Info string + attributes
```markdown
```python {.numberLines}
code here
```
```

**Pattern 3**: Full attribute list
```markdown
```{.python .numberLines startFrom="100"}
code here
```
```

**Pattern 4**: Info string + full attributes
```markdown
```python {.numberLines startFrom="10" filename="test.py"}
code here
```
```

The attributes follow Pandoc's attribute syntax which is **already implemented** in the grammar as `attribute_list` (grammar.js:627-672). This same rule is used for:
- Heading attributes: `## Title {#id .class}`
- Fenced div attributes: `::: {.callout-note}`
- Executable cell attributes: `{python attr=value}`
- Link span attributes: `[text]{.class}`

### Current Parse Behavior: ERROR Nodes

When the parser encounters `` ```{.python} ``, here's what happens:

**Input**:
```markdown
```{.python}
print("hello")
```
```

**Current parse tree** (WRONG):
```
(ERROR [0, 0] - [4, 0]
  (code_fence_delimiter [0, 0] - [0, 3])      ← ``` recognized
  (attribute_class [0, 4] - [0, 11])           ← {.python} recognized but orphaned
  (citation_key [1, 0] - [1, 5])               ← "print" misidentified
  (link_title [1, 6] - [1, 13])                ← ("hello") misidentified
  (code_fence_delimiter [2, 0] - [2, 3]))      ← ``` recognized
```

The parser sees the opening fence `` ``` `` but then encounters `{` which doesn't match `info_string` (since `/[^\r\n{]+/` excludes `{`). It falls back to trying to parse `{.python}` as an inline element, recognizes it as an `attribute_class`, but has nowhere to attach it. The code lines are then misinterpreted as various inline elements, creating a mess of ERROR nodes.

**Expected parse tree**:
```
(fenced_code_block
  open: (code_fence_delimiter)
  attributes: (attribute_list          ← Need to add this field
    (attribute_class))                  ← {.python} properly attached
  (code_line)
  close: (code_fence_delimiter))
```

### Why This Is the Primary Validation Blocker

From **docs/validation.md** and **GitHub issue #12**:
- Current corpus validation: **25% success rate** (50/200 files pass)
- This attribute syntax error is the **most common failure pattern**
- Affects multiple files in quarto-web corpus:
  - `docs/publishing/other.qmd`
  - `docs/projects/scripts.qmd`
  - Many others with `` ```{.lang} `` or `` ```lang {.attrs} `` patterns

The **benchmarks/documents/complex.qmd** file (line 97) contains:
```markdown
```{.python #lst-code lst-cap="Code listing"}
def complex_function():
    return 42
```
```

This is real-world Quarto syntax that completely fails to parse. Fixing this issue would likely improve validation from **25% to 40-50%+** since it's blocking so many documents.

### Distinguishing Three Syntaxes

The grammar must correctly parse three distinct patterns:

| Syntax | Example | Current Rule | Should Parse As |
|--------|---------|--------------|-----------------|
| Regular with info | `` ```python `` | `fenced_code_block` | `fenced_code_block` ✓ |
| Executable cell | `` ```{python} `` | `executable_code_cell` | `executable_code_cell` ✓ |
| Regular with attrs | `` ```{.python} `` | ERROR ❌ | `fenced_code_block` with attributes |
| Info + attrs | `` ```python {.numberLines} `` | Partial ERROR ❌ | `fenced_code_block` with both |

The key distinguishing features:
- **Executable cells**: Use `{language_name}` where language is just a word: `{python}`, `{r}`, `{julia}`
- **Attribute syntax**: Use `{.class}` or `{#id}` or `{key="value"}` - always starts with `.` or `#` or contains `=`

The `attribute_list` rule (grammar.js:627-672) already handles this distinction. It can parse:
- `.python` as `attribute_class`
- `#mycode` as `attribute_id`
- `numberLines` as part of a class `.numberLines`
- `startFrom="100"` as `key_value_attribute`

### Executable Code Cell Implementation (For Reference)

The **executable_code_cell** rule (grammar.js:140-166) successfully handles attributes:

```javascript
executable_code_cell: ($) =>
  prec(1, seq(
    field("open_delimiter", alias(token(/```+/), $.code_fence_delimiter)),
    field(
      "language_specifier",
      seq(
        "{",
        field("language", alias(/[a-zA-Z][a-zA-Z0-9_-]*/, $.language_name)),
        optional(seq(/[ \t]+/, field("attributes", $.attribute_list))),  // ← Attributes here!
        "}",
      ),
    ),
    /\r?\n/,
    optional(field("chunk_options", $.chunk_options)),
    optional(field("content", $.cell_content)),
    field("close_delimiter", alias(token(/```+/), $.code_fence_delimiter)),
    /\r?\n/,
  )),
```

Note how it handles `{python attr=value}` by:
1. Matching the opening `{`
2. Capturing the language name
3. Optionally capturing `attribute_list` after whitespace
4. Closing with `}`

### What Needs to Change

The `fenced_code_block` rule needs to be extended to accept optional attributes in two positions:

**Position 1**: After the opening fence (like executable cells)
```markdown
```{.python .numberLines}
code
```
```

**Position 2**: After the info string
```markdown
```python {.numberLines}
code
```
```

**Modified rule structure**:
```javascript
fenced_code_block: ($) =>
  prec(-1, seq(
    field("open", alias(token(/```+/), $.code_fence_delimiter)),
    choice(
      // Pattern 1: info string + optional attributes
      seq(
        field("info", $.info_string),
        optional(seq(
          /[ \t]+/,
          "{",
          field("attributes", $.attribute_list),
          "}",
        )),
      ),
      // Pattern 2: attributes only (no info string)
      seq(
        "{",
        field("attributes", $.attribute_list),
        "}",
      ),
      // Pattern 3: neither (backward compatibility)
    ),
    /\r?\n/,
    repeat(seq(alias(/[^\r\n]+/, $.code_line), /\r?\n/)),
    field("close", alias(token(/```+/), $.code_fence_delimiter)),
    /\r?\n/,
  )),
```

**Critical design decision**: Keep `info_string` as `/[^\r\n{]+/` to maintain the distinction. The `choice()` explicitly handles the three patterns.

### Conflict Resolution with Executable Cells

The existing conflict declaration (grammar.js:62) should still work:
```javascript
[$.executable_code_cell, $.fenced_code_block], // Quarto: {python} vs python
```

The parser uses precedence to distinguish:
- `executable_code_cell` has `prec(1)` (higher)
- `fenced_code_block` has `prec(-1)` (lower)

When the parser sees `` ```{python} ``, it tries `executable_code_cell` first due to higher precedence. When it sees `` ```{.python} ``, the `executable_code_cell` rule fails (because `.python` doesn't match the language pattern `[a-zA-Z][a-zA-Z0-9_-]*`), so it falls back to `fenced_code_block`.

### Language Injection Considerations

The **queries/injections.scm** file handles syntax highlighting for code blocks. Currently it injects based on `info_string`:

```scheme
((fenced_code_block
  info: (info_string) @_lang
  (#eq? @_lang "python")
  (code_line) @injection.content)
 (#set! injection.language "python"))
```

After implementing attributes, we'll need injection queries for attribute-based language specification:

```scheme
; Attribute-based language (e.g., ```{.python})
((fenced_code_block
  attributes: (attribute_list
    (attribute_class) @_lang)
  (#eq? @_lang ".python")
  (code_line) @injection.content)
 (#set! injection.language "python"))
```

Note: The attribute_class includes the dot (`.python`), so the equality check needs the dot.

### Scanner Considerations

The **src/scanner.c** external scanner currently handles:
- Pipe table detection
- Chunk option markers (`#|`)
- Cell boundaries for executable cells
- Emphasis/subscript/superscript delimiters
- Inline math delimiters

For this feature, **no scanner changes are needed**. The fenced code block attributes are handled entirely by the grammar rules since:
1. The opening fence `` ``` `` is recognized by the lexer
2. The `{` and `}` characters are simple tokens
3. The `attribute_list` rule is purely grammar-based (no context-sensitivity)

This is different from executable cells which need the scanner to track cell boundaries for chunk options. Regular fenced code blocks don't have chunk options, so no scanner state tracking is required.

### Backward Compatibility

Existing documents without attributes must continue to work:

**Pattern**: `` ```python ``
**Current**: Parses as `fenced_code_block` with `info: (info_string)`
**After change**: Must still parse identically

The `choice()` structure with `optional()` attributes ensures backward compatibility. When attributes are absent, the parse tree remains unchanged.

### Test Coverage Requirements

The solution must pass tests for:

1. **Single class attribute**: `` ```{.bash} ``
2. **Multiple attributes**: `` ```{.python .numberLines startFrom="10"} ``
3. **Info + attributes**: `` ```python {.numberLines} ``
4. **Complex attributes**: `` ```{.bash filename="Terminal"} ``
5. **Backward compat**: `` ```python `` (no attributes)
6. **Executable cells still work**: `` ```{python} `` unchanged

### Related Specifications

- **OpenSpec**: `openspec/specs/block-attributes/spec.md` - Defines requirements for block attribute parsing
- **Pandoc Manual**: Fenced code blocks section (retrieved via context7)
- **GitHub Issue #12**: Tracking this feature request

### Technical Reference

**Key Files**:
- `grammar.js` lines 361-372: Current `fenced_code_block` rule
- `grammar.js` lines 627-672: `attribute_list` rule (reuse this!)
- `grammar.js` lines 140-166: `executable_code_cell` (reference for attribute handling)
- `test/corpus/basic-markdown.txt` lines 49-63: Current fenced code block tests
- `queries/injections.scm` lines 147-269: Language injection for code blocks

**Patterns in Real Corpus**:
From grep results, real-world usage includes:
- `` ```{.python #lst-code lst-cap="Code listing"} ``
- `` ```{.bash filename="Terminal"} ``
- `` ``` {.markdown filename="index.ipynb" shortcodes="false"} ``
- `` ```python {.numberLines filename="test.py" eval=false} ``

## User Notes
<!-- Any specific notes or requirements from the developer -->

## Work Log
<!-- Updated as work progresses -->
- [YYYY-MM-DD] Started task, initial research
