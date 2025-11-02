---
name: h-implement-generic-fenced-divs
branch: feature/h-implement-generic-fenced-divs
status: pending
created: 2025-11-02
---

# Implement Generic Fenced Divs (`::: {.custom-class}`)

## Problem/Goal

Generic fenced divs with custom class attributes (`::: {.custom-class}`) do not parse correctly. This is a known limitation from the base tree-sitter-pandoc-markdown grammar, rooted in tree-sitter's lexer/parser separation architecture.

**Current behavior:** Creates ERROR nodes instead of proper `fenced_div` nodes
**Expected behavior:** Parse as structured `fenced_div` with attributes

**Impact:** High - Affects ~40% of corpus validation failures (12+ files). Current corpus validation is 25%; fixing this should improve to 50-60%.

**Root cause:** Tree-sitter's two-phase architecture (lexer → parser) creates a chicken-and-egg problem. Enhanced divs work because they use atomic tokens matching complete opening lines (`::: {.callout-note}`), but generic divs fail because the lexer doesn't recognize arbitrary class names.

**Related:** GitHub issue #16

## Success Criteria
- [ ] Generic fenced divs with custom classes parse correctly (e.g., `::: {.custom-class}`, `::: {#myid .class1 .class2}`)
- [ ] Fenced div nodes include proper structure: `fenced_div_delimiter`, `attribute_list`, content, closing delimiter
- [ ] All existing enhanced div tests continue to pass (callouts, tabsets, conditional content)
- [ ] Corpus validation success rate improves from 25% to at least 35% (validating affected files from the 12+ currently failing)
- [ ] No ERROR nodes generated for valid generic fenced div syntax
- [ ] Tests added for various generic div patterns (single class, multiple classes, with IDs, with attributes)

## Context Manifest
<!-- Added by context-gathering agent -->

### How Fenced Divs Currently Work in tree-sitter-quarto

**The Problem: Lexer/Parser Two-Phase Architecture**

Tree-sitter uses a two-phase parsing architecture that creates a fundamental chicken-and-egg problem for generic fenced divs. Understanding this architecture is critical to implementing a solution.

**Phase 1: Lexer (Tokenization)**
The lexer runs FIRST and commits to tokenization decisions before the parser ever sees the input. The lexer looks at the raw characters and tries to match them against token patterns defined in the grammar. For fenced divs, when the lexer encounters `:::`, it tries to match it against these token patterns in order:

1. `callout_open` token: Matches `::: {.callout-note}` (and the 4 other callout types)
2. `tabset_open` token: Matches `::: {.panel-tabset}`
3. `conditional_open` token: Matches `::: {.content-visible` and `::: {.content-hidden`
4. No generic `:::` token exists

If none of these specific patterns match, the lexer has NO token for a generic `:::` delimiter. It falls back to lexing the characters as inline text. This happens BEFORE the parser gets involved.

**Phase 2: Parser (Tree Building)**
The parser receives tokens from the lexer and tries to match them against grammar rules. The `fenced_div` rule in grammar.js (lines 338-358) is defined as:

```javascript
fenced_div: $ => prec.left(1, seq(
  field("open", alias(/:::+/, $.fenced_div_delimiter)),  // This is a PARSER pattern, not a lexer token
  optional(seq(
    /[ \t]*/,
    "{",
    /[ \t]*/,
    field("attributes", $.attribute_list),
    /[ \t]*/,
    "}",
  )),
  /\r?\n/,
  repeat($._block),
  field("close", alias(/:::+/, $.fenced_div_delimiter)),
  /\r?\n/,
)),
```

The critical issue: `alias(/:::+/, $.fenced_div_delimiter)` is a PARSER-LEVEL pattern, not a lexer token. The parser never gets a chance to match this pattern because the lexer has already tokenized `::: {.my-custom-class}` as inline text tokens.

**Why Enhanced Divs Work Perfectly**

Enhanced divs (callouts, tabsets, conditional content) work because they use ATOMIC TOKENS that match the COMPLETE opening line at the lexer level. Look at the `callout_block` implementation (grammar.js lines 454-480):

```javascript
callout_block: $ => prec.dynamic(3, seq(
  alias(token(seq(        // token() wraps the entire pattern - ATOMIC LEXER TOKEN
    /:::+/,
    /[ \t]*/,
    "{",
    /[ \t]*/,
    /\.callout-(note|warning|important|tip|caution)/,  // SPECIFIC class pattern
    /[^}\r\n]*/,          // Captures any additional attributes
    "}",
  )), $.callout_open),
  /\r?\n/,
  field("content", repeat($._block)),
  field("close", alias(token(prec(10, /:::+/)), $.fenced_div_delimiter)),
  /\r?\n/,
)),
```

The `token()` wrapper tells the lexer: "This entire sequence is ONE INDIVISIBLE TOKEN." When the lexer sees `::: {.callout-note}`, it:
1. Matches the entire atomic pattern as `callout_open` token ✅
2. Returns that single token to the parser
3. Parser successfully completes the `callout_block` rule
4. Closing delimiter uses `token(prec(10, /:::+/))` with high precedence to ensure it's recognized

This same atomic token approach is used for:
- `tabset_block` (lines 492-518): Matches `::: {.panel-tabset...}`
- `conditional_block` (lines 529-555): Matches `::: {.content-visible...}` and `::: {.content-hidden...}`

All three use `prec.dynamic(3)` for high precedence and close with `token(prec(10, /:::+/))` to ensure closing delimiters are recognized even in ambiguous contexts.

**What Happens with Generic Divs - Detailed Trace**

Input: `::: {.my-custom-class}\nContent\n:::`

Lexer processing:
1. Sees `:::`
2. Tries `callout_open` pattern: `::: {.callout-(note|warning|important|tip|caution)...}` → NO MATCH (wrong class name)
3. Tries `tabset_open` pattern: `::: {.panel-tabset...}` → NO MATCH
4. Tries `conditional_open` pattern: `::: {.content-visible...}` or `::: {.content-hidden...}` → NO MATCH
5. No generic `:::` token defined
6. Falls back to lexing as INLINE TEXT ❌
7. Continues lexing `{.my-custom-class}` as more text
8. Lexes content lines as text
9. Lexes closing `:::` as text

Parser processing:
1. Receives tokens: `[text, text, text, ...]`
2. Tries to match `fenced_div` rule but can't - no `:::` delimiter token available
3. Creates ERROR node containing all the text tokens
4. Parser continues with rest of document

**Result**: Massive ERROR node wrapping what should be a clean `fenced_div` structure.

**Current Grammar Structure - Block Rules**

The `_block` choice in grammar.js (lines 96-122) shows the precedence order:

```javascript
_block: $ => choice(
  $.executable_code_cell,           // Quarto: ```{python}
  $.fenced_div,                      // Generic divs (currently broken)
  $.callout_block,                   // Enhanced div: prec.dynamic(3)
  $.tabset_block,                    // Enhanced div: prec.dynamic(3)
  $.conditional_block,               // Enhanced div: prec.dynamic(3)
  $.atx_heading,
  $.setext_heading,
  // ... other blocks
),
```

Note: `fenced_div` appears BEFORE the enhanced divs in the choice list, but the enhanced divs use `prec.dynamic(3)` which gives them higher precedence during conflict resolution. The comment on line 100 states "fenced_div must come before enhanced divs for fallback" - this was the INTENDED design, but it doesn't work because of the lexer/parser separation issue.

**Conflicts Array**

The grammar defines several conflicts related to divs (grammar.js lines 60-86):

```javascript
conflicts: $ => [
  // ... other conflicts
  [$.callout_block, $.fenced_div],        // Enhanced divs vs generic divs
  [$.tabset_block, $.fenced_div],
  [$.conditional_block, $.fenced_div],
  // ... more conflicts
],
```

These conflicts acknowledge that the parser might have ambiguity between enhanced and generic divs, but the real problem happens earlier at the lexer level.

**Attribute List Parsing**

The `attribute_list` rule (grammar.js lines 648-693) correctly handles Pandoc attribute syntax and supports:
- IDs: `#myid`
- Classes: `.class1 .class2`
- Key-value pairs: `key="value"` or `key='value'` or `key=unquoted`

This parsing logic works fine when it gets invoked. The problem is that for generic divs, the parser never reaches the point where it can apply this rule because the lexer has already failed.

### External Scanner Context

**Current Scanner Capabilities**

The external scanner in src/scanner.c (811 lines) currently handles:

1. **Pipe table detection** (`scan_pipe_table_start`, lines 155-199): Zero-width lookahead to validate pipe table structure
2. **Chunk options** (`scan_chunk_option_marker`, lines 202-220): Detects `#|` at start of executable cells
3. **Chunk option continuations** (`scan_chunk_option_continuation`, lines 223-261): Multi-line chunk options
4. **Cell boundaries** (`scan_cell_boundary`, lines 685-723): Tracks executable cell context
5. **Subscript delimiters** (`scan_tilde`, lines 273-343): Context-aware `~` for subscript
6. **Superscript delimiters** (`scan_caret`, lines 356-425): Context-aware `^` for superscript
7. **Inline math delimiters** (`scan_dollar_sign`, lines 444-531): Context-aware `$` for inline math
8. **Emphasis/strong delimiters** (`parse_star`, `parse_underscore`, lines 553-676): Full CommonMark-compliant emphasis parsing copied from tree-sitter-markdown

**Scanner State Structure**

The scanner maintains state (lines 43-53):

```c
typedef struct {
  bool in_executable_cell;      // Track if inside executable cell
  bool at_cell_start;           // Track if at start of cell content
  uint32_t fence_length;        // Track opening fence length
  uint8_t inside_subscript;     // Track if inside subscript (0=false, 1=true)
  uint8_t inside_superscript;   // Track if inside superscript
  uint8_t inside_inline_math;   // Track if inside inline math
  uint8_t state;                // Parser state flags for emphasis delimiters
  uint8_t num_emphasis_delimiters_left; // Remaining chars in delimiter run
} Scanner;
```

The scanner already demonstrates the capability to track context across multiple tokens and make stateful decisions. This is exactly what would be needed for generic fenced divs.

**External Token Types**

The scanner exports these token types (lines 23-40):

```c
enum TokenType {
  PIPE_TABLE_START,
  CHUNK_OPTION_MARKER,
  CELL_BOUNDARY,
  CHUNK_OPTION_CONTINUATION,
  SUBSCRIPT_OPEN,
  SUBSCRIPT_CLOSE,
  SUPERSCRIPT_OPEN,
  SUPERSCRIPT_CLOSE,
  INLINE_MATH_OPEN,
  INLINE_MATH_CLOSE,
  EMPHASIS_OPEN_STAR,
  EMPHASIS_CLOSE_STAR,
  EMPHASIS_OPEN_UNDERSCORE,
  EMPHASIS_CLOSE_UNDERSCORE,
  LAST_TOKEN_WHITESPACE,
  LAST_TOKEN_PUNCTUATION,
};
```

To support generic fenced divs, we would need to add tokens like:
- `FENCED_DIV_OPEN` - Opening `:::` with attributes
- `FENCED_DIV_CLOSE` - Closing `:::`
- State tracking for being inside a generic fenced div

**Serialization/Deserialization**

The scanner state is serialized to 9 bytes (lines 76-94, 97-145) and persisted across incremental parses. Any new state for tracking fenced divs would need to fit within this serialization scheme or expand it carefully.

### Attempted Fixes from docs/generic-fenced-div-limitation.md

Previous investigation tried two approaches that both failed:

**Attempt 1: Add token(/:::+/) for Generic Opening**

```javascript
fenced_div: $ => seq(
  field('open', alias(token(/:::+/), $.fenced_div_delimiter)),
  ...
)
```

Result: The opening `:::` token was recognized, BUT content and closing `:::` were still parsed as text. After the opening token, the lexer continued in "normal" mode and didn't know it was inside a fenced_div block.

**Attempt 2: Atomic Token for Complete Opening**

```javascript
fenced_div: $ => seq(
  field('open', choice(
    alias(token(seq(/:::+/, /[ \t]*/, '{', /[^}\r\n]+/, '}')), $.fenced_div_open),
    alias(token(/:::+/), $.fenced_div_delimiter)
  )),
  ...
)
```

Result: The `fenced_div_open` token was recognized, BUT:
- Content lines were lexed as inline/text before parser could match `repeat($._block)`
- Closing `:::` was lexed as text (part of inline content) instead of as a delimiter token
- The issue: static token patterns can't handle the variability of generic class names like enhanced divs do

The fundamental problem is that enhanced divs can use atomic tokens because they know EXACTLY what the opening line looks like (`.callout-note`, `.panel-tabset`, etc.). Generic divs need to accept ANY class name (`.my-custom-class`, `.foo`, `.bar123`, etc.), which cannot be expressed as a single regex pattern that matches ALL possible custom classes while still being specific enough to avoid false positives.

### Why Fenced Code Blocks Work (For Comparison)

Fenced code blocks work with generic info strings because they use a different approach. Look at `fenced_code_block` (grammar.js lines 361-393):

```javascript
fenced_code_block: $ => prec(-1, seq(
  field("open", alias(token(/```+/), $.code_fence_delimiter)),
  choice(
    seq(field("info", $.info_string), optional(seq(/[ \t]+/, "{", field("attributes", $.attribute_list), "}"))),
    seq("{", field("attributes", $.attribute_list), "}"),
    seq(),
  ),
  /\r?\n/,
  repeat(seq(alias(/[^\r\n]+/, $.code_line), /\r?\n/)),
  field("close", alias(token(/```+/), $.code_fence_delimiter)),
  /\r?\n/,
)),

info_string: $ => /[^\r\n{]+/,
```

Key differences:
1. Opening delimiter ```` ``` ```` is visually distinct and never appears in normal inline content
2. Info string (language name) uses parser-level pattern `/[^\r\n{]+/` not a token
3. Content is explicitly `repeat($.code_line)` with each line as `/[^\r\n]+/` - simple text capture
4. Closing delimiter is `token(/```+/)` with same pattern as opening
5. Low precedence `prec(-1)` makes it a fallback choice

This works because:
- Backticks are unambiguous at lexer level
- Content model is simple (raw text lines, no recursive block parsing)
- No need for context tracking - delimiters are always recognized

Fenced divs are harder because:
1. `:::` delimiter is less distinct and could theoretically appear in prose
2. Content contains recursive `repeat($._block)` - arbitrary nested markdown structures
3. Need to track div state to ensure closing `:::` is recognized as delimiter, not text
4. Generic attribute syntax requires parser-level flexibility

### Solution Approaches (From Issue #16 and Documentation)

**Option 1: External Scanner State Tracking**

Implement context-sensitive lexing in the external scanner similar to how it tracks `in_executable_cell` state:

Pseudocode:
```c
// Add to Scanner struct:
bool in_fenced_div;
uint32_t div_fence_length;

// Add token types:
FENCED_DIV_OPEN,
FENCED_DIV_CLOSE,

// Scanning logic:
if (lexer->lookahead == ':') {
  uint32_t colon_count = count_colons(lexer);
  if (colon_count >= 3) {
    peek_ahead_for_attributes();
    if (has_generic_attributes && !matches_enhanced_div_pattern) {
      scanner->in_fenced_div = true;
      scanner->div_fence_length = colon_count;
      return FENCED_DIV_OPEN;
    }
  }
}

// When inside div:
if (scanner->in_fenced_div && at_line_start && lexer->lookahead == ':') {
  uint32_t colon_count = count_colons(lexer);
  if (colon_count >= scanner->div_fence_length) {
    scanner->in_fenced_div = false;
    return FENCED_DIV_CLOSE;
  }
}
```

Challenges:
- Need to detect generic attributes `{.classname}` vs enhanced div attributes `{.callout-note}`
- Must not interfere with enhanced div token matching (those should continue to work)
- State tracking adds complexity to scanner
- Need lookahead to distinguish opening vs closing delimiters vs text

Benefits:
- Keeps grammar.js relatively clean
- Matches the pattern used for executable cells
- Scanner already has state tracking infrastructure

**Option 2: Grammar Refactor with Enhanced Token Design**

Redesign the fenced div grammar to use a two-token approach where the external scanner provides both opening and closing tokens:

```javascript
fenced_div: $ => seq(
  $._fenced_div_open,    // External scanner token
  /\r?\n/,
  repeat($._block),
  $._fenced_div_close,   // External scanner token
  /\r?\n/,
),
```

The scanner would need to:
1. Match generic opening patterns that enhanced divs don't handle
2. Track state to recognize closing delimiters
3. Coordinate with grammar's enhanced div rules (precedence)

Challenges:
- More invasive change to grammar structure
- Complex coordination between scanner and grammar precedence
- Risk of breaking enhanced divs if not careful

Benefits:
- Cleaner separation of concerns
- Scanner fully owns the tokenization decision
- More similar to how fenced code blocks work

**Option 3: Expand Enhanced Div Patterns (Workaround)**

Instead of supporting truly arbitrary class names, add common custom class patterns as new enhanced div types:

```javascript
generic_callout: $ => token(seq(/:::+/, /[ \t]*/, "{", /[ \t]*/, /\.[a-zA-Z][a-zA-Z0-9_-]*/, /[^}\r\n]*/, "}")),
```

Challenges:
- Doesn't solve the general problem
- Still creates ERROR nodes for uncommon patterns
- Maintenance burden (adding new patterns constantly)

Benefits:
- Minimal code change
- Proven pattern (same as current enhanced divs)
- Could improve corpus validation quickly for common cases

**Option 4: Upstream Collaboration**

Work with tree-sitter-pandoc-markdown maintainers to solve this at the base grammar level, potentially designing a new architecture that other Pandoc parsers could benefit from.

Challenges:
- Slower timeline (coordination required)
- May require tree-sitter core changes
- Uncertain if solution exists within tree-sitter's constraints

Benefits:
- Solves problem for entire Pandoc ecosystem
- Could influence tree-sitter architecture improvements
- Shared maintenance burden

### Real-World Impact Data

**From Issue #16:**
- **Impact Level**: HIGH
- **Corpus Validation**: Currently 25% success rate
- **Expected After Fix**: 50-60% success rate
- **Files Affected**: ~40% of validation failures (12+ files from quarto-web corpus)
- **Example Failing Files**:
  - docs/books/book-basics.qmd
  - docs/extensions/metadata.qmd
  - docs/output-formats/docusaurus.qmd
  - docs/visual-editor/technical.qmd

**Common Generic Div Patterns in Real Documents:**
- `::: {.my-custom-class}` - Single custom class
- `::: {#myid .class1 .class2}` - ID with multiple classes
- `::: {.column-margin}` - Layout classes
- `::: {.aside}` - Semantic classes
- `::: {}` - Empty attributes (rare but valid)

### Test Infrastructure

**Current Test Coverage:**
- Enhanced divs: 15/15 tests passing (test/corpus/enhanced-divs.txt)
- No tests for generic divs (they currently fail)
- Total test suite: 213/213 tests passing (100%)

**Tests to Add After Implementation:**
- Single custom class: `::: {.my-class}`
- Multiple classes: `::: {.class1 .class2}`
- ID with classes: `::: {#id .class}`
- Key-value attributes: `::: {.class attr="value"}`
- Nested divs (generic inside generic)
- Generic div followed by enhanced div
- Empty attributes: `::: {}`
- Varying fence lengths: `:::`, `::::`, `::::::`

### Technical References

**Tree-sitter Documentation:**
- External scanners: https://tree-sitter.github.io/tree-sitter/creating-parsers#external-scanners
- Precedence and conflicts: https://tree-sitter.github.io/tree-sitter/creating-parsers#precedence
- Token function: https://tree-sitter.github.io/tree-sitter/creating-parsers#the-token-function

**Related Specifications:**
- Enhanced divs spec: openspec/specs/enhanced-divs/spec.md (lines 280-296 discuss generic div fallback)
- Grammar foundation spec: openspec/specs/grammar-foundation/spec.md
- Pandoc fenced divs: https://pandoc.org/MANUAL.html#divs-and-spans

**Project Architecture:**
- Unified grammar (single grammar.js, 1076 lines)
- External scanner (src/scanner.c, 811 lines)
- Copy & Merge Scanner strategy (emphasis from tree-sitter-markdown + Quarto-specific features)
- No npm dependencies for scanner code

**Build System:**
- tree-sitter CLI version: 0.25.10 (IMPORTANT: must match)
- Never manually edit src/parser.c (regenerate via `npx tree-sitter generate`)
- WASM target supported (tree-sitter.json required for CLI 0.25+)

### Code Locations for Implementation

**Files to Modify:**

1. **src/scanner.c**
   - Add token types to enum TokenType (around line 40)
   - Add state tracking to Scanner struct (around line 53)
   - Update serialization (lines 76-94, 97-145)
   - Implement scanning logic in main scan function (lines 726-811)
   - Add helper functions for fenced div detection

2. **grammar.js**
   - Update externals array (lines 41-58) to include new tokens
   - Modify fenced_div rule (lines 338-358) to use external tokens
   - Ensure precedence doesn't conflict with enhanced divs
   - Update conflicts array (lines 60-86) if needed

3. **test/corpus/** (create new file or extend existing)
   - Add comprehensive tests for generic div patterns
   - Test edge cases and interactions with enhanced divs

**Critical Implementation Notes:**

1. **Precedence Management**: Enhanced divs use `prec.dynamic(3)`. Generic divs should use lower precedence (maybe `prec.left(1)` or default) to ensure enhanced patterns are tried first.

2. **Enhanced Div Protection**: Scanner logic MUST NOT interfere with enhanced div tokens. When scanner sees `:::`, it should:
   - Let enhanced div tokens match first (they're more specific)
   - Only emit FENCED_DIV_OPEN for patterns that don't match enhanced types
   - This might require checking `valid_symbols` or ordering in scan function

3. **State Consistency**: Scanner state must be properly serialized/deserialized for incremental parsing to work correctly.

4. **Lookahead Limits**: Scanner lookahead should be bounded (see MAX_LOOKAHEAD=100 in subscript scanning, line 318) to avoid performance issues.

5. **Line-Start Detection**: Fenced div delimiters must be at line start (column 0) like code fences.

### Recommendation

Based on the research, **Option 1 (External Scanner State Tracking)** appears most viable:

**Reasoning:**
1. Project already uses external scanner extensively for context tracking
2. Pattern matches existing `in_executable_cell` tracking approach
3. Minimal grammar.js changes (mainly adding external tokens)
4. Proven infrastructure for state serialization
5. Can be implemented without breaking enhanced divs
6. Highest impact on corpus validation (25% → 50-60%)

**Implementation Strategy:**
1. Add fenced div state tracking to scanner (similar to cell tracking)
2. Implement generic attribute detection (lookahead for `{.classname}` patterns)
3. Add FENCED_DIV_OPEN and FENCED_DIV_CLOSE token types
4. Modify fenced_div grammar rule to use external tokens
5. Ensure enhanced div precedence is preserved
6. Add comprehensive tests
7. Validate against quarto-web corpus

**Success Criteria:**
- All existing tests continue passing (213/213)
- Generic div tests pass (8+ new tests)
- Corpus validation improves to 35%+ (conservative) or 50-60% (target)
- No ERROR nodes for valid generic fenced div syntax
- Enhanced divs continue working perfectly
- No performance regression in parser

## User Notes
<!-- Any specific notes or requirements from the developer -->

## Work Log
<!-- Updated as work progresses -->
- [YYYY-MM-DD] Started task, initial research
