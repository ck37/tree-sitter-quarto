/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

/**
 * Tree-sitter BLOCK grammar for Quarto Markdown (dual-grammar architecture)
 *
 * This grammar handles block-level constructs only. Inline content is delegated
 * to the separate inline grammar.
 *
 * Block-level features:
 * - Document structure and YAML frontmatter
 * - Headings (ATX and Setext)
 * - Fenced code blocks (with scanner-controlled fence detection)
 * - Executable code cells
 * - Fenced divs (callouts, tabsets, etc.)
 * - Lists, tables, block quotes
 * - Display math, raw blocks, HTML blocks
 */

function thematicLine(char) {
  return token(new RegExp(`${char}(?:[ \t]*${char}){2,}[ \t]*\\r?\\n`));
}

module.exports = grammar({
  name: "quarto_block",

  extras: ($) => [/\s/],

  externals: ($) => [
    $.pipe_table_start,
    $._chunk_option_marker,
    $._cell_boundary,
    $._chunk_option_continuation,
    $._fenced_div_open,
    $._fenced_div_close,
    $._code_block_start,  // Scanner-controlled opening fence
    $._code_block_line,   // Opaque line content
    $._code_block_end,    // Scanner-controlled closing fence
  ],

  conflicts: ($) => [
    [$.executable_code_cell, $.fenced_code_block],
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
        $.executable_code_cell,
        $.fenced_div,
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
    // QUARTO-SPECIFIC BLOCK RULES
    // ============================================================================

    executable_code_cell: ($) =>
      prec(
        1,
        seq(
          field("open_delimiter", alias($._code_block_start, $.code_fence_delimiter)),
          field(
            "language_specifier",
            seq(
              "{",
              field("language", alias(/[a-zA-Z][a-zA-Z0-9_-]*/, $.language_name)),
              optional(seq(/[ \t]+/, field("attributes", $.attribute_list))),
              "}",
            ),
          ),
          /\r?\n/,
          optional(field("chunk_options", $.chunk_options)),
          optional(field("content", $.cell_content)),
          field("close_delimiter", alias($._code_block_end, $.code_fence_delimiter)),
          /\r?\n/,
        ),
      ),

    chunk_options: ($) => repeat1($.chunk_option),

    chunk_option: ($) =>
      choice(
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

    cell_content: ($) => repeat1(alias($._code_block_line, $.code_line)),

    // ============================================================================
    // BLOCK-LEVEL MARKDOWN RULES
    // ============================================================================

    yaml_front_matter: ($) =>
      prec(
        -1,
        seq(
          field("start", alias(token(seq("---", /\r?\n/)), $.yaml_front_matter_start)),
          optional(field("content", $.yaml_content)),
          field(
            "close",
            alias(
              token(
                prec(2, choice(seq("---", /[ \t]*\r?\n/), seq("...", /[ \t]*\r?\n/))),
              ),
              $.yaml_front_matter_delimiter,
            ),
          ),
        ),
      ),

    yaml_content: ($) => repeat1($.yaml_line),
    yaml_line: ($) => token(prec(-2, seq(/[^\r\n]+/, /\r?\n/))),

    percent_metadata: ($) =>
      repeat1(
        seq(token("%"), optional(alias(/[^\r\n]+/, $.metadata_line)), /\r?\n/),
      ),

    atx_heading: ($) =>
      seq(
        field("marker", alias(token(prec(1, /#{1,6}[ \t]*/)), $.atx_heading_marker)),
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

    block_quote: ($) =>
      prec.right(seq($.block_quote_line, repeat($.block_quote_line))),

    block_quote_line: ($) =>
      seq(
        field(
          "marker",
          alias(token(prec(1, seq(">", optional(/[ \t]/)))), $.block_quote_marker),
        ),
        optional(field("content", $.inline)),
        /\r?\n/,
      ),

    paragraph: ($) => prec.left(-2, seq(field("content", $.inline), /\r?\n/)),

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

    fenced_code_block: ($) =>
      prec(
        0,
        seq(
          field("open", alias($._code_block_start, $.code_fence_delimiter)),
          choice(
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
            seq(
              "{",
              field("attributes", $.attribute_list),
              "}",
            ),
            seq(),
          ),
          /\r?\n/,
          repeat(alias($._code_block_line, $.code_line)),
          field("close", alias($._code_block_end, $.code_fence_delimiter)),
        ),
      ),

    info_string: ($) => token(/[^\r\n{]+/),

    html_block: ($) =>
      seq(
        field("open", alias(token(prec(1, /<[^>\s]+[^>]*>/)), $.html_open_tag)),
        repeat(seq(alias(/[^<\r\n][^\r\n]*/, $.html_block_content), /\r?\n/)),
        field("close", alias(token(/<\/[A-Za-z][^>]*>/), $.html_close_tag)),
        /\r?\n/,
      ),

    raw_block: ($) =>
      seq(
        field("open", alias(token(prec(1, /```\{=\w+\}/)), $.raw_block_delimiter)),
        /\r?\n/,
        repeat(seq(alias(/[^\r\n]+/, $.raw_block_content), /\r?\n/)),
        field("close", alias(token(/```/), $.raw_block_delimiter)),
        /\r?\n/,
      ),

    display_math: ($) =>
      seq(
        field("open", alias(token("$$"), $.math_delimiter)),
        optional(field("content", alias(/[^$]+/, $.math_content))),
        field("close", alias(token("$$"), $.math_delimiter)),
        /\r?\n/,
      ),

    shortcode_block: ($) =>
      prec(
        1,
        seq(
          alias(token(/\{\{<[ \t]*/), $.shortcode_open),
          field("name", alias(/[a-zA-Z][a-zA-Z0-9_-]*/, $.shortcode_name)),
          optional(
            field("arguments", alias(/[ \t]+[^ \t\r\n>][^>\r\n]*/, $.shortcode_arguments)),
          ),
          alias(token(/[ \t]*>\}\}\r?\n/), $.shortcode_close),
        ),
      ),

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

    thematic_break: ($) =>
      choice(thematicLine("\\-"), thematicLine("\\*"), thematicLine("_")),

    blank_line: ($) => /\r?\n/,

    footnote_definition: ($) =>
      seq(
        field("marker", alias(token(/\[\^[^\]]+\]:/), $.footnote_marker)),
        /[ \t]+/,
        field("content", $.inline),
        /\r?\n/,
      ),

    link_reference_definition: ($) =>
      seq(
        field("label", seq("[", alias(/[^\]]+/, $.reference_label), "]:")),
        /[ \t]+/,
        field("destination", alias(/\S+/, $.link_destination)),
        optional(seq(/[ \t]+/, field("title", alias(/"[^"]*"/, $.link_title)))),
        /\r?\n/,
      ),

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

    pipe_table_row: ($) =>
      seq(
        token(prec(100, "|")),
        repeat1(
          seq(field("content", alias(/[^|\r\n]+/, $.table_cell)), token("|")),
        ),
        token(prec(100, /\r?\n/)),
      ),

    attribute_list: ($) =>
      choice(
        seq(
          field("id", alias(/#[a-zA-Z][a-zA-Z0-9_-]*/, $.attribute_id)),
          repeat(
            seq(
              /[ \t]+/,
              field("class", alias(/\.[a-zA-Z][a-zA-Z0-9_-]*/, $.attribute_class)),
            ),
          ),
          repeat(seq(/[ \t]+/, field("attribute", $.key_value_attribute))),
        ),
        seq(
          field("class", alias(/\.[a-zA-Z][a-zA-Z0-9_-]*/, $.attribute_class)),
          repeat(
            seq(
              /[ \t]+/,
              field("class", alias(/\.[a-zA-Z][a-zA-Z0-9_-]*/, $.attribute_class)),
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
    // MINIMAL INLINE STUB
    // ============================================================================
    // In dual-grammar architecture, this would reference the inline grammar.
    // For now, we provide a minimal stub that matches any text content.

    inline: ($) => token(/[^\r\n]+/),
  },
});
