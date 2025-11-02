/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

/**
 * Tree-sitter grammar for Quarto Markdown
 *
 * Extends Pandoc Markdown with Quarto-specific features:
 * - Executable code cells with {language} syntax
 * - Chunk options (#| key: value)
 * - Cross-reference distinction (@fig-plot vs @citation)
 * - Inline code cells (`{python} expr`)
 *
 * SOURCE TRACKING (per openspec/specs/grammar-foundation requirement):
 * - Base: tree-sitter-pandoc-markdown
 * - Repository: https://github.com/ck37/tree-sitter-pandoc-markdown
 * - Commit: 95f296eb8a9f28760f3b6ae34084282a1b9dc52a
 * - Date copied: 2025-10-14
 * - Strategy: Copy & Extend (see docs/plan.md)
 *
 * MODIFICATIONS FROM BASE:
 * - Added executable_code_cell node for {language} syntax
 * - Added chunk_options and chunk_option nodes for #| syntax
 * - Added cross_reference node to distinguish from citations
 * - Added inline_code_cell node for inline execution
 * - Extended _block choice to include executable_code_cell
 * - Extended _inline_element choice to include inline_code_cell and cross_reference
 * - Modified conflicts array for new node types
 * - Token-based chunk option parsing with token(prec(2, '#|'))
 * - R shorthand syntax using token(seq('`r', /[ \t]+/))
 */

function thematicLine(char) {
  return token(new RegExp(`${char}(?:[ \t]*${char}){2,}[ \t]*\\r?\\n`));
}

module.exports = grammar({
  name: "quarto",

  extras: ($) => [/\s/],

  externals: ($) => [
    $.pipe_table_start, // From pandoc-markdown
    $._chunk_option_marker, // Quarto: #| at start of cell
    $._cell_boundary, // Quarto: Track cell context
    $._chunk_option_continuation, // Quarto: Multi-line chunk option continuation
    $._subscript_open, // Pandoc: Context-aware ~ opening delimiter
    $._subscript_close, // Pandoc: Context-aware ~ closing delimiter
    $._superscript_open, // Pandoc: Context-aware ^ opening delimiter
    $._superscript_close, // Pandoc: Context-aware ^ closing delimiter
    $._inline_math_open, // Pandoc: Context-aware $ opening delimiter
    $._inline_math_close, // Pandoc: Context-aware $ closing delimiter
    $._emphasis_open_star, // Markdown: * emphasis delimiter (from tree-sitter-markdown)
    $._emphasis_close_star, // Markdown: * emphasis delimiter
    $._emphasis_open_underscore, // Markdown: _ emphasis delimiter
    $._emphasis_close_underscore, // Markdown: _ emphasis delimiter
    $._last_token_whitespace, // Markdown: Track whitespace for flanking rules
    $._last_token_punctuation, // Markdown: Track punctuation for flanking rules
    $._fenced_div_open, // Generic fenced div opening delimiter
    $._fenced_div_close, // Generic fenced div closing delimiter
  ],

  conflicts: ($) => [
    [$._inline_element, $._link_text_element],
    [$.executable_code_cell, $.fenced_code_block], // Quarto: {python} vs python
    [$.shortcode_block, $.shortcode_inline], // Shortcode can be block or inline
    [$.inline_code_cell, $.code_span], // `r expr` vs `code`
    // Emphasis conflicts (from tree-sitter-markdown)
    // For normal inline elements
    [$._emphasis_star, $._inline_element],
    [$._emphasis_star, $._strong_emphasis_star, $._inline_element],
    [$._emphasis_underscore, $._inline_element],
    [$._emphasis_underscore, $._strong_emphasis_underscore, $._inline_element],
    // For no_star context (inside star emphasis)
    [$._emphasis_star, $._inline_element_no_star],
    [$._emphasis_star, $._strong_emphasis_star, $._inline_element_no_star],
    [$._emphasis_underscore, $._inline_element_no_star],
    [$._emphasis_underscore, $._strong_emphasis_underscore, $._inline_element_no_star],
    [$._strong_emphasis_underscore, $._inline_element_no_star],
    // For no_underscore context (inside underscore emphasis)
    [$._emphasis_star, $._inline_element_no_underscore],
    [$._emphasis_star, $._strong_emphasis_star, $._inline_element_no_underscore],
    [$._emphasis_underscore, $._inline_element_no_underscore],
    [$._emphasis_underscore, $._strong_emphasis_underscore, $._inline_element_no_underscore],
    [$._strong_emphasis_star, $._inline_element_no_underscore],
  ],

  rules: {
    document: ($) =>
      choice(
        prec(2, seq($.yaml_front_matter, repeat($._block))),
        prec(2, seq($.percent_metadata, repeat($._block))),
        repeat($._block),
      ),

    _block: ($) =>
      choice(
        // Quarto-specific blocks
        $.executable_code_cell,
        // Pandoc Markdown blocks
        $.fenced_div,
        // Other Pandoc Markdown blocks
        $.atx_heading,
        $.setext_heading,
        $.block_quote,
        $.footnote_definition,
        $.link_reference_definition,
        $.display_math,
        $.pipe_table,
        $.shortcode_block,
        $.raw_block,
        $.html_block,
        $.fenced_code_block,
        $.list,
        $.thematic_break,
        $.paragraph,
        $.blank_line,
      ),

    // ============================================================================
    // QUARTO-SPECIFIC RULES
    // ============================================================================

    /**
     * Executable Code Cell
     *
     * ```{python}
     * #| label: fig-plot
     * #| echo: false
     * import matplotlib.pyplot as plt
     * plt.plot([1, 2, 3])
     * ```
     *
     * Spec: openspec/specs/executable-cells/spec.md
     */
    executable_code_cell: ($) =>
      prec(
        1,
        seq(
          field("open_delimiter", alias(token(/```+/), $.code_fence_delimiter)),
          field(
            "language_specifier",
            seq(
              "{",
              field(
                "language",
                alias(/[a-zA-Z][a-zA-Z0-9_-]*/, $.language_name),
              ),
              optional(seq(/[ \t]+/, field("attributes", $.attribute_list))),
              "}",
            ),
          ),
          /\r?\n/,
          optional(field("chunk_options", $.chunk_options)),
          optional(field("content", $.cell_content)),
          field(
            "close_delimiter",
            alias(token(/```+/), $.code_fence_delimiter),
          ),
          /\r?\n/,
        ),
      ),

    /**
     * Chunk Options
     *
     * Single-line:
     * #| label: fig-plot
     * #| echo: false
     *
     * Multi-line:
     * #| fig-cap: |
     * #|   This is a multi-line caption
     * #|   spanning multiple lines
     *
     * Spec: openspec/specs/chunk-options/spec.md
     */
    chunk_options: ($) => repeat1($.chunk_option),

    chunk_option: ($) =>
      choice(
        // Single-line chunk option
        seq(
          token(prec(2, "#|")),
          optional(/[ \t]*/),
          field("key", alias(/[a-zA-Z][a-zA-Z0-9-]*/, $.chunk_option_key)),
          ":",
          optional(
            seq(
              optional(/[ \t]*/),
              field("value", alias(/[^\r\n|]+/, $.chunk_option_value)),
            ),
          ),
          /\r?\n/,
        ),
        // Multi-line chunk option with pipe continuation
        seq(
          token(prec(2, "#|")),
          optional(/[ \t]*/),
          field("key", alias(/[a-zA-Z][a-zA-Z0-9-]*/, $.chunk_option_key)),
          ":",
          optional(/[ \t]*/),
          "|",
          /\r?\n/,
          repeat1($.chunk_option_continuation),
        ),
      ),

    chunk_option_continuation: ($) =>
      seq(
        $._chunk_option_continuation,
        optional(/[ \t]*/),
        field("value", alias(/[^\r\n]+/, $.chunk_option_value)),
        /\r?\n/,
      ),

    /**
     * Cell Content
     *
     * Code content within executable cell, excluding chunk options.
     * Used for language injection.
     */
    cell_content: ($) => repeat1(seq(alias(/[^\r\n]+/, $.code_line), /\r?\n/)),

    // ============================================================================
    // PANDOC MARKDOWN RULES (BASELINE)
    // ============================================================================

    // YAML Front Matter
    // NOTE: Standalone `---` at document start is ambiguous with thematic break.
    // This grammar treats it as (invalid) YAML front matter.
    //
    // YAML content is parsed via language injection (see queries/injections.scm)
    // using tree-sitter-yaml parser for full YAML spec support including nested mappings.
    yaml_front_matter: ($) =>
      prec(
        -1,
        seq(
          field(
            "start",
            alias(token(seq("---", /\r?\n/)), $.yaml_front_matter_start),
          ),
          optional(field("content", $.yaml_content)),
          field(
            "close",
            alias(
              token(
                prec(
                  2,
                  choice(seq("---", /[ \t]*\r?\n/), seq("...", /[ \t]*\r?\n/)),
                ),
              ),
              $.yaml_front_matter_delimiter,
            ),
          ),
        ),
      ),

    // YAML Content (raw text between delimiters, injected to tree-sitter-yaml)
    // Captures all non-empty lines that aren't closing delimiters
    yaml_content: ($) => repeat1($.yaml_line),

    yaml_line: ($) => token(prec(-2, seq(/[^\r\n]+/, /\r?\n/))),

    // Percent Metadata (Pandoc extension)
    percent_metadata: ($) =>
      repeat1(
        seq(token("%"), optional(alias(/[^\r\n]+/, $.metadata_line)), /\r?\n/),
      ),

    // Headings
    // Attribution: Heading attributes approach inspired by quarto-dev/quarto-markdown (MIT License)
    // https://github.com/quarto-dev/quarto-markdown
    atx_heading: ($) =>
      seq(
        field(
          "marker",
          alias(token(prec(1, /#{1,6}[ \t]*/)), $.atx_heading_marker),
        ),
        optional(field("content", $.inline)),
        optional(
          seq(
            "{",
            optional(/[ \t]*/),
            field("attributes", $.attribute_list),
            optional(/[ \t]*/),
            "}",
          ),
        ),
        /\r?\n/,
      ),

    setext_heading: ($) =>
      seq(
        field("content", $.inline),
        optional(
          seq(
            "{",
            optional(/[ \t]*/),
            field("attributes", $.attribute_list),
            optional(/[ \t]*/),
            "}",
          ),
        ),
        /\r?\n/,
        field(
          "underline",
          alias(choice(token(/=+/), token(/-+/)), $.setext_heading_marker),
        ),
        /\r?\n/,
      ),

    // Block Quote
    block_quote: ($) =>
      prec.right(seq($.block_quote_line, repeat($.block_quote_line))),

    block_quote_line: ($) =>
      seq(
        field(
          "marker",
          alias(
            token(prec(1, seq(">", optional(/[ \t]/)))),
            $.block_quote_marker,
          ),
        ),
        optional(field("content", $.inline)),
        /\r?\n/,
      ),

    // Paragraph
    paragraph: ($) => prec.left(-2, seq(field("content", $.inline), /\r?\n/)),

    // Fenced Div (unified rule for all div types)
    // Uses external scanner tokens to handle opening/closing delimiters
    // Type distinction (callout, tabset, etc.) happens via attributes
    fenced_div: ($) =>
      prec(2, seq(
        field("open", alias($._fenced_div_open, $.fenced_div_delimiter)),
        optional(
          seq(
            /[ \t]*/,
            "{",
            /[ \t]*/,
            field("attributes", $.attribute_list),
            /[ \t]*/,
            "}",
          ),
        ),
        /\r?\n/,
        field("content", repeat($._block)),
        field("close", alias($._fenced_div_close, $.fenced_div_delimiter)),
        /\r?\n/,
      )),

    // Fenced Code Block (regular, non-executable)
    fenced_code_block: ($) =>
      prec(
        -1,
        seq(
          field("open", alias(token(/```+/), $.code_fence_delimiter)),
          choice(
            // Pattern 1: info string + optional attributes
            seq(
              field("info", $.info_string),
              optional(
                seq(
                  optional(/[ \t]+/),
                  "{",
                  field("attributes", $.attribute_list),
                  "}",
                ),
              ),
            ),
            // Pattern 2: attributes only (no info string)
            seq(
              "{",
              field("attributes", $.attribute_list),
              "}",
            ),
            // Pattern 3: neither (backward compatibility)
            seq(),
          ),
          /\r?\n/,
          repeat(seq(alias(/[^\r\n]+/, $.code_line), /\r?\n/)),
          field("close", alias(token(/```+/), $.code_fence_delimiter)),
          /\r?\n/,
        ),
      ),

    info_string: ($) => /[^\r\n{]+/,

    // HTML Block
    html_block: ($) =>
      seq(
        field("open", alias(token(prec(1, /<[^>\s]+[^>]*>/)), $.html_open_tag)),
        repeat(seq(alias(/[^<\r\n][^\r\n]*/, $.html_block_content), /\r?\n/)),
        field("close", alias(token(/<\/[A-Za-z][^>]*>/), $.html_close_tag)),
        /\r?\n/,
      ),

    // Raw Block
    raw_block: ($) =>
      seq(
        field(
          "open",
          alias(token(prec(1, /```\{=\w+\}/)), $.raw_block_delimiter),
        ),
        /\r?\n/,
        repeat(seq(alias(/[^\r\n]+/, $.raw_block_content), /\r?\n/)),
        field("close", alias(token(/```/), $.raw_block_delimiter)),
        /\r?\n/,
      ),

    // Display Math
    display_math: ($) =>
      seq(
        field("open", alias(token("$$"), $.math_delimiter)),
        optional(field("content", alias(/[^$]+/, $.math_content))),
        field("close", alias(token("$$"), $.math_delimiter)),
        /\r?\n/,
      ),

    // Shortcode Block
    shortcode_block: ($) =>
      prec(
        1,
        seq(
          alias(token(/\{\{<[ \t]*/), $.shortcode_open),
          field("name", alias(/[a-zA-Z][a-zA-Z0-9_-]*/, $.shortcode_name)),
          optional(
            field(
              "arguments",
              alias(/[ \t]+[^ \t\r\n>][^>\r\n]*/, $.shortcode_arguments),
            ),
          ),
          alias(token(/[ \t]*>\}\}\r?\n/), $.shortcode_close),
        ),
      ),

    // Lists
    list: ($) => choice($.ordered_list, $.unordered_list),

    ordered_list: ($) => prec.right(repeat1($.ordered_list_item)),
    unordered_list: ($) => prec.right(repeat1($.unordered_list_item)),

    ordered_list_item: ($) =>
      seq(
        field("marker", alias(token(/\d+[.)]/), $.list_marker)),
        /[ \t]+/,
        optional(field("content", $.inline)),
        /\r?\n/,
      ),

    unordered_list_item: ($) =>
      seq(
        field("marker", alias(token(/[-*+]/), $.list_marker)),
        /[ \t]+/,
        optional(field("content", $.inline)),
        /\r?\n/,
      ),

    // Thematic Break
    thematic_break: ($) =>
      choice(thematicLine("\\-"), thematicLine("\\*"), thematicLine("_")),

    // Blank Line
    blank_line: ($) => /\r?\n/,

    // Footnote Definition
    footnote_definition: ($) =>
      seq(
        field("marker", alias(token(/\[\^[^\]]+\]:/), $.footnote_marker)),
        /[ \t]+/,
        field("content", $.inline),
        /\r?\n/,
      ),

    // Link Reference Definition
    link_reference_definition: ($) =>
      seq(
        field("label", seq("[", alias(/[^\]]+/, $.reference_label), "]:")),
        /[ \t]+/,
        field("destination", alias(/\S+/, $.link_destination)),
        optional(seq(/[ \t]+/, field("title", alias(/"[^"]*"/, $.link_title)))),
        /\r?\n/,
      ),

    // Pipe Table (header + delimiter + zero or more rows)
    pipe_table: ($) =>
      prec.dynamic(
        2,
        seq(
          $.pipe_table_start,
          $.pipe_table_header,
          $.pipe_table_delimiter,
          repeat(prec.dynamic(10, $.pipe_table_row)),
        ),
      ),

    pipe_table_header: ($) =>
      seq(
        token("|"),
        repeat1(
          seq(field("content", alias(/[^|\r\n]+/, $.table_cell)), token("|")),
        ),
        /\r?\n/,
      ),

    pipe_table_delimiter: ($) =>
      seq(
        token("|"),
        repeat1(
          seq(alias(/[ \t]*:?-+:?[ \t]*/, $.table_delimiter_cell), token("|")),
        ),
        /\r?\n/,
      ),

    // Pipe table data row - exposes individual cells as AST nodes
    // Matches pipe_table_header structure for consistency
    // Uses prec on leading pipe and newline to ensure row is recognized atomically
    pipe_table_row: ($) =>
      seq(
        token(prec(100, "|")),
        repeat1(
          seq(field("content", alias(/[^|\r\n]+/, $.table_cell)), token("|")),
        ),
        token(prec(100, /\r?\n/)),
      ),

    // Attribute List (for divs, cells, links/spans, headings, etc.)
    attribute_list: ($) =>
      choice(
        seq(
          field("id", alias(/#[a-zA-Z][a-zA-Z0-9_-]*/, $.attribute_id)),
          repeat(
            seq(
              /[ \t]+/,
              field(
                "class",
                alias(/\.[a-zA-Z][a-zA-Z0-9_-]*/, $.attribute_class),
              ),
            ),
          ),
          repeat(seq(/[ \t]+/, field("attribute", $.key_value_attribute))),
        ),
        seq(
          field("class", alias(/\.[a-zA-Z][a-zA-Z0-9_-]*/, $.attribute_class)),
          repeat(
            seq(
              /[ \t]+/,
              field(
                "class",
                alias(/\.[a-zA-Z][a-zA-Z0-9_-]*/, $.attribute_class),
              ),
            ),
          ),
          repeat(seq(/[ \t]+/, field("attribute", $.key_value_attribute))),
        ),
        repeat1(
          seq(optional(/[ \t]+/), field("attribute", $.key_value_attribute)),
        ),
      ),

    key_value_attribute: ($) =>
      seq(
        field("key", alias(/[a-zA-Z][a-zA-Z0-9_-]*/, $.attribute_key)),
        "=",
        field(
          "value",
          choice(
            alias(/"[^"]*"/, $.attribute_value),
            alias(/'[^']*'/, $.attribute_value),
            alias(/[^\s}]+/, $.attribute_value),
          ),
        ),
      ),

    // ============================================================================
    // INLINE RULES
    // ============================================================================

    inline: ($) => repeat1($._inline_element),

    _inline: ($) => repeat1($._inline_element),
    _inline_no_star: ($) => repeat1($._inline_element_no_star),
    _inline_no_underscore: ($) => repeat1($._inline_element_no_underscore),

    _inline_element: ($) =>
      choice(
        $.inline_footnote, // Pandoc: ^[note] - must come before text
        $.footnote_reference, // Pandoc: [^1] - must come before link
        $.inline_code_cell, // Quarto: `{python} expr` - check before code_span
        $.code_span,
        $.inline_math,
        alias($._emphasis_star, $.emphasis), // Star-based emphasis
        alias($._strong_emphasis_star, $.strong_emphasis), // Star-based strong
        alias($._emphasis_underscore, $.emphasis), // Underscore-based emphasis
        alias($._strong_emphasis_underscore, $.strong_emphasis), // Underscore-based strong
        $.strikethrough, // Pandoc: ~~text~~
        $.highlight, // Pandoc: ==text== - must come before equals_sign
        $.subscript, // Pandoc: H~2~O
        $.superscript, // Pandoc: x^2^
        $.link,
        $.image,
        $.citation,
        $.cross_reference, // Quarto: @fig-plot
        $.shortcode_inline,
        $.equals_sign, // Single = in equations (not part of ==)
        alias("~", $.tilde), // Fallback for isolated tilde when scanner rejects subscript
        alias("^", $.caret), // Fallback for isolated caret when scanner rejects superscript
        alias("$", $.dollar_sign), // Fallback for isolated dollar sign when scanner rejects math
        alias(":", $.colon), // Single colon (excluded from text to allow fenced div detection)
        $.text, // text last - fallback for anything not matched
      ),

    _inline_element_no_star: ($) =>
      choice(
        $.inline_footnote,
        $.footnote_reference,
        $.inline_code_cell,
        $.code_span,
        $.inline_math,
        alias($._emphasis_underscore, $.emphasis), // Only underscore variant allowed
        alias($._strong_emphasis_underscore, $.strong_emphasis),
        $._emphasis_open_star, // Orphaned star treated as text
        $._emphasis_open_underscore, // Orphaned underscore treated as text
        $.strikethrough,
        $.highlight,
        $.subscript,
        $.superscript,
        $.link,
        $.image,
        $.citation,
        $.cross_reference,
        $.shortcode_inline,
        $.equals_sign,
        alias("~", $.tilde),
        alias("^", $.caret),
        alias("$", $.dollar_sign),
        alias(":", $.colon),
        $.text,
      ),

    _inline_element_no_underscore: ($) =>
      choice(
        $.inline_footnote,
        $.footnote_reference,
        $.inline_code_cell,
        $.code_span,
        $.inline_math,
        alias($._emphasis_star, $.emphasis), // Only star variant allowed
        alias($._strong_emphasis_star, $.strong_emphasis),
        $._emphasis_open_star, // Orphaned star treated as text
        $._emphasis_open_underscore, // Orphaned underscore treated as text
        $.strikethrough,
        $.highlight,
        $.subscript,
        $.superscript,
        $.link,
        $.image,
        $.citation,
        $.cross_reference,
        $.shortcode_inline,
        $.equals_sign,
        alias("~", $.tilde),
        alias("^", $.caret),
        alias("$", $.dollar_sign),
        alias(":", $.colon),
        $.text,
      ),

    text: ($) => /[^\r\n`*_\[@<{^~=$:]+/,

    // Single equals sign (for equations like E=mc^2^, not part of ==)
    equals_sign: ($) => "=",

    // Text inside link brackets - excludes ] to allow proper link parsing
    link_text: ($) => /[^\r\n`*_\[@<${\]^~=]+/,

    // Text inside inline footnotes - excludes ] and ^ and [ to allow proper footnote parsing
    footnote_text: ($) => /[^\r\n`*_\[@<${\[\]^~=]+/,

    code_span: ($) =>
      seq(
        alias(token("`"), $.code_span_delimiter),
        alias(/[^`]+/, $.code_span_content),
        alias(token("`"), $.code_span_delimiter),
      ),

    inline_math: ($) =>
      seq(
        alias($._inline_math_open, $.math_delimiter),
        alias(/[^$]+/, $.math_content),
        alias($._inline_math_close, $.math_delimiter),
      ),

    // Internal emphasis rules using external scanner (from tree-sitter-markdown)
    // These get aliased to $.emphasis and $.strong_emphasis in _inline_element
    _emphasis_star: ($) =>
      prec.dynamic(
        1,
        seq(
          alias($._emphasis_open_star, $.emphasis_delimiter),
          optional($._last_token_punctuation),
          $._inline_no_star,
          alias($._emphasis_close_star, $.emphasis_delimiter),
        ),
      ),

    _emphasis_underscore: ($) =>
      prec.dynamic(
        1,
        seq(
          alias($._emphasis_open_underscore, $.emphasis_delimiter),
          optional($._last_token_punctuation),
          $._inline_no_underscore,
          alias($._emphasis_close_underscore, $.emphasis_delimiter),
        ),
      ),

    _strong_emphasis_star: ($) =>
      prec.dynamic(
        2,
        seq(
          alias($._emphasis_open_star, $.emphasis_delimiter),
          $._emphasis_star, // Nested emphasis inside strong emphasis
          alias($._emphasis_close_star, $.emphasis_delimiter),
        ),
      ),

    _strong_emphasis_underscore: ($) =>
      prec.dynamic(
        2,
        seq(
          alias($._emphasis_open_underscore, $.emphasis_delimiter),
          $._emphasis_underscore, // Nested emphasis inside strong emphasis
          alias($._emphasis_close_underscore, $.emphasis_delimiter),
        ),
      ),

    /**
     * Strikethrough (Pandoc extension)
     *
     * ~~deleted text~~
     *
     * Spec: openspec/specs/pandoc-inline-formatting/spec.md
     */
    strikethrough: ($) =>
      prec.left(
        seq(
          alias(token("~~"), $.strikethrough_delimiter),
          repeat1($._inline_element),
          alias(token("~~"), $.strikethrough_delimiter),
        ),
      ),

    /**
     * Highlight/Mark (Pandoc extension)
     *
     * ==highlighted text==
     *
     * Spec: openspec/specs/pandoc-inline-formatting/spec.md
     */
    highlight: ($) =>
      prec.left(
        seq(
          alias(token("=="), $.highlight_delimiter),
          repeat1($._inline_element),
          alias(token("=="), $.highlight_delimiter),
        ),
      ),

    /**
     * Subscript (Pandoc extension)
     *
     * H~2~O
     *
     * Uses external scanner to prevent false positives on isolated ~ in text.
     * Scanner validates context and ensures proper delimiter pairing.
     * Spec: openspec/specs/pandoc-inline-formatting/spec.md
     */
    subscript: ($) =>
      seq(
        alias($._subscript_open, $.subscript_delimiter),
        repeat1($._inline_element),
        alias($._subscript_close, $.subscript_delimiter),
      ),

    /**
     * Superscript (Pandoc extension)
     *
     * x^2^
     *
     * Uses external scanner to prevent false positives on isolated ^ in text.
     * Scanner validates context, ensures proper delimiter pairing, and disambiguates from footnotes (^[).
     * Spec: openspec/specs/pandoc-inline-formatting/spec.md
     */
    superscript: ($) =>
      seq(
        alias($._superscript_open, $.superscript_delimiter),
        repeat1($._inline_element),
        alias($._superscript_close, $.superscript_delimiter),
      ),

    link: ($) =>
      prec.right(
        seq(
          field("text", seq("[", repeat($._link_text_element), "]")),
          choice(
            // Traditional link: [text](url)
            field(
              "destination",
              seq("(", alias(/[^)]+/, $.link_destination), ")"),
            ),
            // Explicit reference: [text][ref]
            field(
              "reference",
              seq("[", alias(/[^\]]+/, $.reference_label), "]"),
            ),
            // Collapsed reference: [text][]
            field("reference", alias(token("[]"), $.reference_label)),
            // Attributed span: [text]{attrs} - Pandoc inline attributes
            seq(
              "{",
              optional(/[ \t]*/),
              field("attributes", $.attribute_list),
              optional(/[ \t]*/),
              "}",
            ),
          ),
        ),
      ),

    _link_text_element: ($) =>
      choice(
        $.link_text,
        $.code_span,
        alias($._emphasis_star, $.emphasis),
        alias($._strong_emphasis_star, $.strong_emphasis),
        alias($._emphasis_underscore, $.emphasis),
        alias($._strong_emphasis_underscore, $.strong_emphasis),
      ),

    _inline_footnote_element: ($) =>
      choice(
        $.footnote_text,
        $.code_span,
        alias($._emphasis_star, $.emphasis),
        alias($._strong_emphasis_star, $.strong_emphasis),
        alias($._emphasis_underscore, $.emphasis),
        alias($._strong_emphasis_underscore, $.strong_emphasis),
        $.inline_footnote, // Allow nested inline footnotes
      ),

    image: ($) =>
      seq(
        token("!"),
        field("alt", seq("[", alias(/[^\]]*/, $.image_alt), "]")),
        field("source", seq("(", alias(/[^)]+/, $.image_source), ")")),
      ),

    /**
     * Inline Footnote
     *
     * ^[inline note content]
     *
     * Pandoc-style inline footnote. Content can include other inline elements including
     * emphasis, strong emphasis, code spans, and nested inline footnotes.
     */
    inline_footnote: ($) =>
      prec(2, seq(token("^["), repeat1($._inline_footnote_element), "]")),

    /**
     * Footnote Reference
     *
     * [^1], [^note]
     *
     * Reference to a footnote definition.
     */
    footnote_reference: ($) =>
      alias(token(/\[\^[^\]]+\]/), $.footnote_reference_marker),

    /**
     * Citation
     *
     * @smith2020 or [@smith2020]
     *
     * Distinguished from cross-reference by lack of type prefix.
     */
    citation: ($) =>
      seq(
        token("@"),
        field("key", alias(/[a-zA-Z][a-zA-Z0-9_]*/, $.citation_key)),
      ),

    /**
     * Cross-Reference (Quarto-specific)
     *
     * @fig-plot, @tbl-data, @eq-linear, @sec-intro, @lst-code
     *
     * Spec: openspec/specs/cross-references/spec.md
     */
    cross_reference: ($) =>
      seq(
        token("@"),
        field(
          "type",
          alias(choice("fig", "tbl", "eq", "sec", "lst"), $.reference_type),
        ),
        token("-"),
        field("id", alias(/[a-zA-Z0-9_-]+/, $.reference_id)),
      ),

    /**
     * Inline Code Cell (Quarto-specific)
     *
     * `{python} mean([1, 2, 3])`
     * `r mean(x)`
     *
     * Spec: openspec/specs/inline-code-cells/spec.md
     */
    inline_code_cell: ($) =>
      prec.dynamic(
        1,
        choice(
          // Curly brace syntax: `{python} expr`
          seq(
            alias(token("`{"), $.inline_cell_delimiter),
            field("language", alias(/[a-zA-Z][a-zA-Z0-9_-]*/, $.language_name)),
            alias(token("}"), $.inline_cell_brace),
            optional(/[ \t]+/),
            field("content", alias(/[^`]*/, $.cell_content)),
            alias(token("`"), $.inline_cell_delimiter),
          ),
          // Shorthand syntax: `r expr`
          seq(
            alias(token(seq("`r", /[ \t]+/)), $.inline_cell_delimiter),
            field("content", alias(/[^`]*/, $.cell_content)),
            alias(token("`"), $.inline_cell_delimiter),
          ),
        ),
      ),

    /**
     * Inline Shortcode
     *
     * {{< video url >}}
     */
    shortcode_inline: ($) =>
      seq(
        alias(token(/\{\{<[ \t]*/), $.shortcode_open),
        field("name", alias(/[a-zA-Z][a-zA-Z0-9_-]*/, $.shortcode_name)),
        optional(
          field(
            "arguments",
            alias(/[ \t]+[^ \t\r\n>][^>]*/, $.shortcode_arguments),
          ),
        ),
        alias(token(/[ \t]*>\}\}/), $.shortcode_close),
      ),
  },
});
