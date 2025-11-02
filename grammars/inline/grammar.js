/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

/**
 * Tree-sitter INLINE grammar for Quarto Markdown (dual-grammar architecture)
 *
 * This grammar handles inline-level constructs only. Block content is delegated
 * to the separate block grammar.
 *
 * Inline features:
 * - Emphasis and strong emphasis (*, _)
 * - Code spans and inline code cells
 * - Inline math
 * - Links, images, citations, cross-references
 * - Subscript, superscript
 * - Strikethrough, highlight
 * - Inline footnotes
 */

module.exports = grammar({
  name: "quarto_inline",

  extras: ($) => [/\s/],

  externals: ($) => [
    $._subscript_open,
    $._subscript_close,
    $._superscript_open,
    $._superscript_close,
    $._inline_math_open,
    $._inline_math_close,
    $._emphasis_open_star,
    $._emphasis_close_star,
    $._emphasis_open_underscore,
    $._emphasis_close_underscore,
    $._last_token_whitespace,
    $._last_token_punctuation,
  ],

  conflicts: ($) => [
    [$._inline_element, $._link_text_element],
    [$.inline_code_cell, $.code_span],
    [$._emphasis_star, $._inline_element],
    [$._emphasis_star, $._strong_emphasis_star, $._inline_element],
    [$._emphasis_underscore, $._inline_element],
    [$._emphasis_underscore, $._strong_emphasis_underscore, $._inline_element],
    [$._emphasis_star, $._inline_element_no_star],
    [$._emphasis_star, $._strong_emphasis_star, $._inline_element_no_star],
    [$._emphasis_underscore, $._inline_element_no_star],
    [$._emphasis_underscore, $._strong_emphasis_underscore, $._inline_element_no_star],
    [$._strong_emphasis_underscore, $._inline_element_no_star],
    [$._emphasis_star, $._inline_element_no_underscore],
    [$._emphasis_star, $._strong_emphasis_star, $._inline_element_no_underscore],
    [$._emphasis_underscore, $._inline_element_no_underscore],
    [$._emphasis_underscore, $._strong_emphasis_underscore, $._inline_element_no_underscore],
    [$._strong_emphasis_star, $._inline_element_no_underscore],
  ],

  rules: {
    document: ($) => repeat1($._inline_element),

    inline: ($) => repeat1($._inline_element),

    _inline: ($) => repeat1($._inline_element),
    _inline_no_star: ($) => repeat1($._inline_element_no_star),
    _inline_no_underscore: ($) => repeat1($._inline_element_no_underscore),

    _inline_element: ($) =>
      choice(
        $.inline_footnote,
        $.footnote_reference,
        $.inline_code_cell,
        $.code_span,
        $.inline_math,
        alias($._emphasis_star, $.emphasis),
        alias($._strong_emphasis_star, $.strong_emphasis),
        alias($._emphasis_underscore, $.emphasis),
        alias($._strong_emphasis_underscore, $.strong_emphasis),
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
        $.text,
      ),

    _inline_element_no_star: ($) =>
      choice(
        $.inline_footnote,
        $.footnote_reference,
        $.inline_code_cell,
        $.code_span,
        $.inline_math,
        alias($._emphasis_underscore, $.emphasis),
        alias($._strong_emphasis_underscore, $.strong_emphasis),
        $._emphasis_open_star,
        $._emphasis_open_underscore,
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
        $.text,
      ),

    _inline_element_no_underscore: ($) =>
      choice(
        $.inline_footnote,
        $.footnote_reference,
        $.inline_code_cell,
        $.code_span,
        $.inline_math,
        alias($._emphasis_star, $.emphasis),
        alias($._strong_emphasis_star, $.strong_emphasis),
        $._emphasis_open_star,
        $._emphasis_open_underscore,
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
        $.text,
      ),

    text: ($) => /[^\r\n`*_\[@<{^~=$]+/,

    equals_sign: ($) => "=",

    link_text: ($) => /[^\r\n`*_\[@<${\]^~=]+/,

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
          $._emphasis_star,
          alias($._emphasis_close_star, $.emphasis_delimiter),
        ),
      ),

    _strong_emphasis_underscore: ($) =>
      prec.dynamic(
        2,
        seq(
          alias($._emphasis_open_underscore, $.emphasis_delimiter),
          $._emphasis_underscore,
          alias($._emphasis_close_underscore, $.emphasis_delimiter),
        ),
      ),

    strikethrough: ($) =>
      prec.left(
        seq(
          alias(token("~~"), $.strikethrough_delimiter),
          repeat1($._inline_element),
          alias(token("~~"), $.strikethrough_delimiter),
        ),
      ),

    highlight: ($) =>
      prec.left(
        seq(
          alias(token("=="), $.highlight_delimiter),
          repeat1($._inline_element),
          alias(token("=="), $.highlight_delimiter),
        ),
      ),

    subscript: ($) =>
      seq(
        alias($._subscript_open, $.subscript_delimiter),
        repeat1($._inline_element),
        alias($._subscript_close, $.subscript_delimiter),
      ),

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
            field(
              "destination",
              seq("(", alias(/[^)]+/, $.link_destination), ")"),
            ),
            field(
              "reference",
              seq("[", alias(/[^\]]+/, $.reference_label), "]"),
            ),
            field("reference", alias(token("[]"), $.reference_label)),
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
        $.inline_footnote,
      ),

    image: ($) =>
      seq(
        token("!"),
        field("alt", seq("[", alias(/[^\]]*/, $.image_alt), "]")),
        field("source", seq("(", alias(/[^)]+/, $.image_source), ")")),
      ),

    inline_footnote: ($) =>
      prec(2, seq(token("^["), repeat1($._inline_footnote_element), "]")),

    footnote_reference: ($) =>
      alias(token(/\[\^[^\]]+\]/), $.footnote_reference_marker),

    citation: ($) =>
      seq(
        token("@"),
        field("key", alias(/[a-zA-Z][a-zA-Z0-9_]*/, $.citation_key)),
      ),

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

    inline_code_cell: ($) =>
      prec.dynamic(
        1,
        choice(
          seq(
            alias(token("`{"), $.inline_cell_delimiter),
            field("language", alias(/[a-zA-Z][a-zA-Z0-9_-]*/, $.language_name)),
            alias(token("}"), $.inline_cell_brace),
            optional(/[ \t]+/),
            field("content", alias(/[^`]*/, $.cell_content)),
            alias(token("`"), $.inline_cell_delimiter),
          ),
          seq(
            alias(token(seq("`r", /[ \t]+/)), $.inline_cell_delimiter),
            field("content", alias(/[^`]*/, $.cell_content)),
            alias(token("`"), $.inline_cell_delimiter),
          ),
        ),
      ),

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
  },
});
