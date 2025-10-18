# Corpus Validation Report

**Date:** 2025-10-18 02:32:13 UTC
**Corpus:** quarto-web (https://github.com/quarto-dev/quarto-web.git)
**Parser:** tree-sitter-quarto

## Summary

| Metric | Value |
|--------|-------|
| Total files | 20 |
| Successful parses | 5 |
| Failed parses | 15 |
| Success rate | 25.0% |

## Result

**Status:** ✗ FAIL - Success rate <90%

## Failed Files

The following files failed to parse:

### File 1: `docs/dashboards/_examples/gapminder-content.qmd`

**Error:** Parse failed: (document [0, 0] - [34, 3]
  (yaml_front_matter [0, 0] - [7, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [5, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 55]
          (yaml_string [1, 7] - [1, 55]
            (yaml_string_quoted [1, 7] - [1, 55]))))
      (yaml_pair [2, 0] - [5, 0]
        key: (yaml_key [2, 0] - [2, 6])
        (ERROR [2, 6] - [4, 15]
          (yaml_scalar [3, 2] - [3, 11]
            (yaml_string [3, 2] - [3, 11]
              (yaml_string_unquoted [3, 2] - [3, 11])))
          (yaml_scalar [4, 4] - [4, 15]
            (yaml_string [4, 4] - [4, 15]
              (yaml_string_unquoted [4, 4] - [4, 15]))))
        value: (yaml_scalar [4, 17] - [4, 24]
          (yaml_string [4, 17] - [4, 24]
            (yaml_string_unquoted [4, 17] - [4, 24])))))
    close: (yaml_front_matter_delimiter [5, 0] - [5, 3]))
  (executable_code_cell [7, 0] - [12, 0]
    open_delimiter: (code_fence_delimiter [7, 0] - [7, 3])
    language: (language_name [7, 4] - [7, 10])
    content: (cell_content [8, 0] - [10, 0]
      (code_line [8, 0] - [8, 27])
      (code_line [9, 0] - [9, 24]))
    close_delimiter: (code_fence_delimiter [10, 0] - [10, 3]))
  (atx_heading [12, 0] - [14, 0]
    marker: (atx_heading_marker [12, 0] - [12, 3])
    content: (inline [12, 3] - [12, 9]
      (text [12, 3] - [12, 9])))
  (executable_code_cell [14, 0] - [21, 0]
    open_delimiter: (code_fence_delimiter [14, 0] - [14, 3])
    language: (language_name [14, 4] - [14, 10])
    chunk_options: (chunk_options [15, 0] - [16, 0]
      (chunk_option [15, 0] - [16, 0]
        key: (chunk_option_key [15, 3] - [15, 8])
        value: (chunk_option_value [15, 10] - [15, 20])))
    content: (cell_content [16, 0] - [18, 0]
      (code_line [16, 0] - [16, 50])
      (code_line [17, 0] - [17, 29]))
    close_delimiter: (code_fence_delimiter [18, 0] - [18, 3]))
  (executable_code_cell [21, 0] - [27, 0]
    open_delimiter: (code_fence_delimiter [21, 0] - [21, 3])
    language: (language_name [21, 4] - [21, 10])
    chunk_options: (chunk_options [22, 0] - [23, 0]
      (chunk_option [22, 0] - [23, 0]
        key: (chunk_option_key [22, 3] - [22, 8])
        value: (chunk_option_value [22, 10] - [22, 25])))
    content: (cell_content [23, 0] - [25, 0]
      (code_line [23, 0] - [23, 54])
      (code_line [24, 0] - [24, 29]))
    close_delimiter: (code_fence_delimiter [25, 0] - [25, 3]))
  (ERROR [27, 0] - [34, 3]
    (text [27, 0] - [27, 4])
    (attribute_class [27, 5] - [27, 10])
    (attribute_class [27, 10] - [27, 16])
    (citation_key [29, 0] - [29, 9])
    (citation_key [29, 9] - [29, 18])
    (citation_key [29, 18] - [29, 23])
    (citation_key [29, 23] - [29, 28])
    (citation_key [29, 28] - [29, 37])
    (citation_key [29, 37] - [29, 45])
    (citation_key [29, 45] - [29, 50])
    (citation_key [30, 0] - [30, 6])
    (citation_key [30, 6] - [30, 15])
    (citation_key [30, 15] - [30, 20])
    (citation_key [30, 21] - [30, 27])
    (citation_key [30, 27] - [30, 32])
    (citation_key [30, 32] - [30, 36])
    (ERROR [30, 36] - [30, 39])
    (citation_key [30, 39] - [30, 40])
    (citation_key [30, 40] - [30, 43])
    (citation_key [30, 43] - [30, 49])
    (citation_key [31, 0] - [31, 9])
    (ERROR [31, 9] - [31, 10])
    (citation_key [31, 10] - [31, 16])
    (citation_key [31, 16] - [31, 21])
    (citation_key [31, 21] - [31, 27])
    (citation_key [31, 27] - [31, 31])
    (citation_key [31, 31] - [31, 41])
    (citation_key [31, 41] - [31, 49])
    (citation_key [31, 49] - [31, 52])
    (html_open_tag [31, 52] - [32, 34])
    (html_block_content [32, 34] - [32, 35])
    (html_block_content [34, 0] - [34, 3])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/dashboards/_examples/gapminder-content.qmd	Parse:    0.88 ms	   746 bytes/ms	(ERROR [2, 6] - [4, 15])

### File 2: `docs/books/book-basics.qmd`

**Error:** Parse failed: (document [0, 0] - [249, 0]
  (yaml_front_matter [0, 0] - [7, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [5, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 24]
          (yaml_string [1, 7] - [1, 24]
            (yaml_string_quoted [1, 7] - [1, 24]))))
      (yaml_pair [2, 0] - [5, 0]
        key: (yaml_key [2, 0] - [2, 6])
        (ERROR [2, 6] - [4, 15]
          (yaml_scalar [3, 2] - [3, 6]
            (yaml_string [3, 2] - [3, 6]
              (yaml_string_unquoted [3, 2] - [3, 6])))
          (yaml_scalar [4, 4] - [4, 15]
            (yaml_string [4, 4] - [4, 15]
              (yaml_string_unquoted [4, 4] - [4, 15]))))
        value: (yaml_scalar [4, 17] - [4, 27]
          (yaml_string [4, 17] - [4, 27]
            (yaml_string_unquoted [4, 17] - [4, 27])))))
    close: (yaml_front_matter_delimiter [5, 0] - [5, 3]))
  (atx_heading [7, 0] - [9, 0]
    marker: (atx_heading_marker [7, 0] - [7, 3])
    content: (inline [7, 3] - [7, 11]
      (text [7, 3] - [7, 11])))
  (paragraph [9, 0] - [11, 0]
    content: (inline [9, 0] - [9, 134]
      (text [9, 0] - [9, 134])))
  (paragraph [11, 0] - [12, 0]
    content: (inline [11, 0] - [11, 8]
      (text [11, 0] - [11, 8])))
  (paragraph [12, 0] - [13, 0]
    content: (inline [12, 0] - [12, 7]
      (text [12, 0] - [12, 7])))
  (paragraph [13, 0] - [14, 0]
    content: (inline [13, 0] - [13, 11]
      (text [13, 0] - [13, 11])))
  (paragraph [14, 0] - [15, 0]
    content: (inline [14, 0] - [14, 8]
      (text [14, 0] - [14, 8])))
  (paragraph [15, 0] - [17, 0]
    content: (inline [15, 0] - [15, 12]
      (text [15, 0] - [15, 12])))
  (paragraph [17, 0] - [19, 0]
    content: (inline [17, 0] - [17, 364]
      (text [17, 0] - [17, 47])
      (link [17, 47] - [17, 98]
        text: (link_text [17, 48] - [17, 62])
        destination: (link_destination [17, 64] - [17, 97]))
      (text [17, 98] - [17, 280])
      (link [17, 280] - [17, 336]
        text: (link_text [17, 281] - [17, 297])
        destination: (link_destination [17, 299] - [17, 335]))
      (text [17, 336] - [17, 364])))
  (paragraph [19, 0] - [21, 0]
    content: (inline [19, 0] - [19, 52]
      (text [19, 0] - [19, 52])))
  (pipe_table [21, 0] - [26, 0]
    (pipe_table_start [21, 0] - [21, 0])
    (pipe_table_header [21, 0] - [22, 0]
      content: (table_cell [21, 1] - [21, 83])
      content: (table_cell [21, 84] - [21, 147]))
    (pipe_table_delimiter [22, 0] - [23, 0]
      (table_delimiter_cell [22, 1] - [22, 41])
      (table_delimiter_cell [22, 42] - [22, 73]))
    (pipe_table_row [23, 0] - [24, 0])
    (pipe_table_row [24, 0] - [25, 0])
    (pipe_table_row [25, 0] - [26, 0]))
  (blank_line [26, 0] - [27, 0])
  (paragraph [27, 0] - [30, 0]
    content: (inline [27, 0] - [27, 272]
      (text [27, 0] - [27, 199])
      (link [27, 199] - [27, 248]
        text: (link_text [27, 200] - [27, 219])
        destination: (link_destination [27, 221] - [27, 247]))
      (text [27, 248] - [27, 272])))
  (atx_heading [30, 0] - [32, 0]
    marker: (atx_heading_marker [30, 0] - [30, 3])
    content: (inline [30, 3] - [30, 14]
      (text [30, 3] - [30, 14])))
  (paragraph [32, 0] - [34, 0]
    content: (inline [32, 0] - [32, 162]
      (text [32, 0] - [32, 162])))
  (tabset_block [34, 0] - [118, 0]
    (tabset_open [34, 0] - [34, 40])
    content: (atx_heading [36, 0] - [38, 0]
      marker: (atx_heading_marker [36, 0] - [36, 4])
      content: (inline [36, 4] - [36, 12]
        (text [36, 4] - [36, 12])))
    content: (paragraph [38, 0] - [40, 0]
      content: (inline [38, 0] - [38, 118]
        (text [38, 0] - [38, 58])
        (strong_emphasis [38, 58] - [38, 84]
          (strong_emphasis_delimiter [38, 58] - [38, 60])
          (text [38, 60] - [38, 82])
          (strong_emphasis_delimiter [38, 82] - [38, 84]))
        (text [38, 84] - [38, 118])))
    content: (paragraph [40, 0] - [44, 0]
      content: (inline [40, 0] - [42, 30]
        (image [40, 0] - [40, 62]
          alt: (image_alt [40, 2] - [40, 2])
          source: (image_source [40, 4] - [40, 61]))
        (ERROR [40, 62] - [42, 12]
          (attribute_class [40, 63] - [40, 76])
          (attribute_class [40, 76] - [40, 84])
          (citation_key [42, 0] - [42, 4])
          (ERROR [42, 4] - [42, 5])
          (citation_key [42, 5] - [42, 12]))
        (text [42, 12] - [42, 13])
        (strong_emphasis [42, 13] - [42, 29]
          (strong_emphasis_delimiter [42, 13] - [42, 15])
          (text [42, 15] - [42, 27])
          (strong_emphasis_delimiter [42, 27] - [42, 29]))
        (text [42, 29] - [42, 30])))
    content: (paragraph [44, 0] - [48, 0]
      content: (inline [44, 0] - [44, 44]
        (image [44, 0] - [44, 44]
          alt: (image_alt [44, 2] - [44, 2])
          source: (image_source [44, 4] - [44, 43])))
      (ERROR [44, 44] - [46, 144]
        (attribute_class [44, 45] - [44, 58])
        (attribute_class [44, 58] - [44, 66])
        (citation_key [46, 0] - [46, 3])
        (citation_key [46, 4] - [46, 6])
        (citation_key [46, 6] - [46, 9])
        (citation_key [46, 9] - [46, 18])
        (citation_key [46, 18] - [46, 21])
        (citation_key [46, 21] - [46, 28])
        (citation_key [46, 28] - [46, 30])
        (citation_key [46, 30] - [46, 37])
        (citation_key [46, 37] - [46, 47])
        (citation_key [46, 47] - [46, 50])
        (citation_key [46, 50] - [46, 57])
        (citation_key [46, 57] - [46, 61])
        (citation_key [46, 61] - [46, 69])
        (citation_key [46, 69] - [46, 76])
        (ERROR [46, 76] - [46, 77])
        (citation_key [46, 77] - [46, 82])
        (ERROR [46, 82] - [46, 83])
        (citation_key [46, 83] - [46, 87])
        (citation_key [46, 88] - [46, 90])
        (citation_key [46, 90] - [46, 93])
        (citation_key [46, 93] - [46, 99])
        (citation_key [46, 99] - [46, 102])
        (citation_key [46, 102] - [46, 107])
        (citation_key [46, 107] - [46, 111])
        (citation_key [46, 111] - [46, 121])
        (citation_key [46, 121] - [46, 125])
        (citation_key [46, 125] - [46, 130])
        (citation_key [46, 130] - [46, 135])
        (citation_key [46, 135] - [46, 143])))
    content: (paragraph [48, 0] - [52, 0]
      content: (inline [48, 0] - [50, 294]
        (image [48, 0] - [48, 64]
          alt: (image_alt [48, 2] - [48, 2])
          source: (image_source [48, 4] - [48, 63]))
        (ERROR [48, 64] - [50, 74]
          (attribute_class [48, 65] - [48, 78])
          (attribute_class [48, 78] - [48, 86])
          (citation_key [50, 0] - [50, 3])
          (citation_key [50, 3] - [50, 7])
          (citation_key [50, 7] - [50, 12])
          (citation_key [50, 12] - [50, 20])
          (citation_key [50, 20] - [50, 25])
          (citation_key [50, 25] - [50, 28])
          (citation_key [50, 28] - [50, 36])
          (citation_key [50, 36] - [50, 40])
          (citation_key [50, 40] - [50, 47])
          (citation_key [50, 47] - [50, 54])
          (citation_key [50, 54] - [50, 63])
          (ERROR [50, 63] - [50, 64])
          (citation_key [50, 64] - [50, 70])
          (citation_key [50, 70] - [50, 74]))
        (text [50, 74] - [50, 75])
        (strong_emphasis [50, 75] - [50, 86]
          (strong_emphasis_delimiter [50, 75] - [50, 77])
          (text [50, 77] - [50, 84])
          (strong_emphasis_delimiter [50, 84] - [50, 86]))
        (text [50, 86] - [50, 96])
        (link [50, 96] - [50, 142]
          destination: (link_destination [50, 99] - [50, 141]))
        (ERROR [50, 142] - [50, 165]
          (attribute_class [50, 143] - [50, 157])
          (reference_type [50, 157] - [50, 161])
          (citation_key [50, 162] - [50, 165]))
        (equals_sign [50, 165] - [50, 166])
        (text [50, 166] - [50, 182])
        (link [50, 182] - [50, 234]
          destination: (link_destination [50, 185] - [50, 233]))
        (ERROR [50, 234] - [50, 256]
          (attribute_class [50, 235] - [50, 248])
          (reference_type [50, 248] - [50, 252])
          (citation_key [50, 253] - [50, 256]))
        (equals_sign [50, 256] - [50, 257])
        (text [50, 257] - [50, 294])))
    content: (paragraph [52, 0] - [56, 0]
      content: (inline [52, 0] - [54, 161]
        (image [52, 0] - [52, 51]
          alt: (image_alt [52, 2] - [52, 2])
          source: (image_source [52, 4] - [52, 50]))
        (ERROR [52, 51] - [54, 71]
          (attribute_class [52, 52] - [52, 65])
          (attribute_class [52, 65] - [52, 73])
          (citation_key [54, 0] - [54, 3])
          (citation_key [54, 3] - [54, 11])
          (citation_key [54, 11] - [54, 16])
          (citation_key [54, 16] - [54, 21])
          (citation_key [54, 21] - [54, 24])
          (citation_key [54, 24] - [54, 28])
          (citation_key [54, 28] - [54, 34])
          (citation_key [54, 34] - [54, 37])
          (citation_key [54, 37] - [54, 41])
          (citation_key [54, 41] - [54, 48])
          (citation_key [54, 48] - [54, 53])
          (ERROR [54, 53] - [54, 54])
          (citation_key [54, 54] - [54, 57])
          (citation_key [54, 57] - [54, 61])
          (citation_key [54, 61] - [54, 64])
          (citation_key [54, 65] - [54, 71]))
        (text [54, 71] - [54, 72])
        (code_span [54, 72] - [54, 83]
          (code_span_delimiter [54, 72] - [54, 73])
          (code_span_content [54, 73] - [54, 82])
          (code_span_delimiter [54, 82] - [54, 83]))
        (text [54, 83] - [54, 111])
        (code_span [54, 111] - [54, 122]
          (code_span_delimiter [54, 111] - [54, 112])
          (code_span_content [54, 112] - [54, 121])
          (code_span_delimiter [54, 121] - [54, 122]))
        (text [54, 122] - [54, 161])))
    content: (atx_heading [56, 0] - [58, 0]
      marker: (atx_heading_marker [56, 0] - [56, 4])
      content: (inline [56, 4] - [56, 11]
        (text [56, 4] - [56, 11])))
    content: (paragraph [58, 0] - [60, 0]
      content: (inline [58, 0] - [58, 117]
        (text [58, 0] - [58, 57])
        (strong_emphasis [58, 57] - [58, 83]
          (strong_emphasis_delimiter [58, 57] - [58, 59])
          (text [58, 59] - [58, 81])
          (strong_emphasis_delimiter [58, 81] - [58, 83]))
        (text [58, 83] - [58, 117])))
    content: (paragraph [60, 0] - [62, 0]
      content: (inline [60, 0] - [60, 60]
        (image [60, 0] - [60, 60]
          alt: (image_alt [60, 2] - [60, 2])
          source: (image_source [60, 4] - [60, 59]))))
    content: (paragraph [62, 0] - [64, 0]
      content: (inline [62, 0] - [62, 30]
        (text [62, 0] - [62, 13])
        (strong_emphasis [62, 13] - [62, 29]
          (strong_emphasis_delimiter [62, 13] - [62, 15])
          (text [62, 15] - [62, 27])
          (strong_emphasis_delimiter [62, 27] - [62, 29]))
        (text [62, 29] - [62, 30])))
    content: (paragraph [64, 0] - [68, 0]
      content: (inline [64, 0] - [64, 57]
        (image [64, 0] - [64, 57]
          alt: (image_alt [64, 2] - [64, 2])
          source: (image_source [64, 4] - [64, 56])))
      (ERROR [64, 57] - [66, 144]
        (attribute_class [64, 58] - [64, 65])
        (citation_key [66, 0] - [66, 3])
        (citation_key [66, 4] - [66, 6])
        (citation_key [66, 6] - [66, 9])
        (citation_key [66, 9] - [66, 18])
        (citation_key [66, 18] - [66, 21])
        (citation_key [66, 21] - [66, 28])
        (citation_key [66, 28] - [66, 30])
        (citation_key [66, 30] - [66, 37])
        (citation_key [66, 37] - [66, 47])
        (citation_key [66, 47] - [66, 50])
        (citation_key [66, 50] - [66, 57])
        (citation_key [66, 57] - [66, 61])
        (citation_key [66, 61] - [66, 69])
        (citation_key [66, 69] - [66, 76])
        (ERROR [66, 76] - [66, 77])
        (citation_key [66, 77] - [66, 82])
        (ERROR [66, 82] - [66, 83])
        (citation_key [66, 83] - [66, 87])
        (citation_key [66, 88] - [66, 90])
        (citation_key [66, 90] - [66, 93])
        (citation_key [66, 93] - [66, 99])
        (citation_key [66, 99] - [66, 102])
        (citation_key [66, 102] - [66, 107])
        (citation_key [66, 107] - [66, 111])
        (citation_key [66, 111] - [66, 121])
        (citation_key [66, 121] - [66, 125])
        (citation_key [66, 125] - [66, 130])
        (citation_key [66, 130] - [66, 135])
        (citation_key [66, 135] - [66, 143])))
    content: (paragraph [68, 0] - [72, 0]
      content: (inline [68, 0] - [70, 293]
        (image [68, 0] - [68, 62]
          alt: (image_alt [68, 2] - [68, 2])
          source: (image_source [68, 4] - [68, 61]))
        (ERROR [68, 62] - [70, 73]
          (attribute_class [68, 63] - [68, 70])
          (citation_key [70, 0] - [70, 3])
          (citation_key [70, 3] - [70, 7])
          (citation_key [70, 7] - [70, 12])
          (citation_key [70, 12] - [70, 20])
          (citation_key [70, 20] - [70, 25])
          (citation_key [70, 25] - [70, 28])
          (citation_key [70, 28] - [70, 36])
          (citation_key [70, 36] - [70, 40])
          (citation_key [70, 40] - [70, 47])
          (citation_key [70, 47] - [70, 54])
          (citation_key [70, 54] - [70, 57])
          (citation_key [70, 57] - [70, 62])
          (ERROR [70, 62] - [70, 63])
          (citation_key [70, 63] - [70, 69])
          (citation_key [70, 69] - [70, 73]))
        (text [70, 73] - [70, 74])
        (strong_emphasis [70, 74] - [70, 85]
          (strong_emphasis_delimiter [70, 74] - [70, 76])
          (text [70, 76] - [70, 83])
          (strong_emphasis_delimiter [70, 83] - [70, 85]))
        (text [70, 85] - [70, 95])
        (link [70, 95] - [70, 141]
          destination: (link_destination [70, 98] - [70, 140]))
        (ERROR [70, 141] - [70, 164]
          (attribute_class [70, 142] - [70, 156])
          (reference_type [70, 156] - [70, 160])
          (citation_key [70, 161] - [70, 164]))
        (equals_sign [70, 164] - [70, 165])
        (text [70, 165] - [70, 181])
        (link [70, 181] - [70, 233]
          destination: (link_destination [70, 184] - [70, 232]))
        (ERROR [70, 233] - [70, 255]
          (attribute_class [70, 234] - [70, 247])
          (reference_type [70, 247] - [70, 251])
          (citation_key [70, 252] - [70, 255]))
        (equals_sign [70, 255] - [70, 256])
        (text [70, 256] - [70, 293])))
    content: (paragraph [72, 0] - [74, 0]
      content: (inline [72, 0] - [72, 64]
        (image [72, 0] - [72, 64]
          alt: (image_alt [72, 2] - [72, 2])
          source: (image_source [72, 4] - [72, 63]))))
    content: (paragraph [74, 0] - [77, 0]
      content: (inline [74, 0] - [74, 161]
        (text [74, 0] - [74, 72])
        (code_span [74, 72] - [74, 83]
          (code_span_delimiter [74, 72] - [74, 73])
          (code_span_content [74, 73] - [74, 82])
          (code_span_delimiter [74, 82] - [74, 83]))
        (text [74, 83] - [74, 111])
        (code_span [74, 111] - [74, 122]
          (code_span_delimiter [74, 111] - [74, 112])
          (code_span_content [74, 112] - [74, 121])
          (code_span_delimiter [74, 121] - [74, 122]))
        (text [74, 122] - [74, 161])))
    content: (atx_heading [77, 0] - [79, 0]
      marker: (atx_heading_marker [77, 0] - [77, 4])
      content: (inline [77, 4] - [77, 11]
        (text [77, 4] - [77, 11])))
    content: (paragraph [79, 0] - [81, 0]
      content: (inline [79, 0] - [79, 104]
        (text [79, 0] - [79, 53])
        (strong_emphasis [79, 53] - [79, 68]
          (strong_emphasis_delimiter [79, 53] - [79, 55])
          (text [79, 55] - [79, 66])
          (strong_emphasis_delimiter [79, 66] - [79, 68]))
        (text [79, 68] - [79, 88])
        (strong_emphasis [79, 88] - [79, 103]
          (strong_emphasis_delimiter [79, 88] - [79, 90])
          (text [79, 90] - [79, 101])
          (strong_emphasis_delimiter [79, 101] - [79, 103]))
        (text [79, 103] - [79, 104])))
    (ERROR [81, 0] - [81, 15]
      (fenced_div_delimiter [81, 0] - [81, 3])
      (citation_key [81, 4] - [81, 10])
      (citation_key [81, 11] - [81, 15]))
    content: (paragraph [81, 15] - [83, 0]
      content: (inline [81, 15] - [81, 20]
        (equals_sign [81, 15] - [81, 16])
        (text [81, 16] - [81, 20])))
    content: (paragraph [83, 0] - [85, 0]
      content: (inline [83, 0] - [83, 60]
        (image [83, 0] - [83, 60]
          alt: (image_alt [83, 2] - [83, 2])
          source: (image_source [83, 4] - [83, 59])))
      (ERROR [83, 60] - [83, 69]
        (attribute_class [83, 61] - [83, 68])))
    content: (paragraph [85, 0] - [90, 0]
      content: (inline [85, 0] - [85, 51]
        (image [85, 0] - [85, 51]
          alt: (image_alt [85, 2] - [85, 2])
          source: (image_source [85, 4] - [85, 50])))
      (ERROR [85, 51] - [88, 71]
        (attribute_class [85, 52] - [85, 59])
        (citation_key [88, 0] - [88, 4])
        (ERROR [88, 4] - [88, 5])
        (citation_key [88, 5] - [88, 13])
        (citation_key [88, 13] - [88, 15])
        (citation_key [88, 15] - [88, 25])
        (citation_key [88, 25] - [88, 30])
        (citation_key [88, 30] - [88, 34])
        (citation_key [88, 34] - [88, 40])
        (citation_key [88, 40] - [88, 49])
        (citation_key [88, 49] - [88, 57])
        (citation_key [88, 57] - [88, 61])
        (citation_key [88, 61] - [88, 65])
        (citation_key [88, 65] - [88, 70])))
    content: (paragraph [90, 0] - [94, 0]
      content: (inline [90, 0] - [92, 48]
        (image [90, 0] - [90, 59]
          alt: (image_alt [90, 2] - [90, 2])
          source: (image_source [90, 4] - [90, 58]))
        (ERROR [90, 59] - [92, 9]
          (attribute_class [90, 60] - [90, 67])
          (citation_key [92, 0] - [92, 5])
          (citation_key [92, 5] - [92, 9]))
        (text [92, 9] - [92, 10])
        (strong_emphasis [92, 10] - [92, 20]
          (strong_emphasis_delimiter [92, 10] - [92, 12])
          (text [92, 12] - [92, 18])
          (strong_emphasis_delimiter [92, 18] - [92, 20]))
        (text [92, 20] - [92, 48])))
    content: (paragraph [94, 0] - [96, 0]
      content: (inline [94, 0] - [94, 59]
        (image [94, 0] - [94, 59]
          alt: (image_alt [94, 2] - [94, 2])
          source: (image_source [94, 4] - [94, 58]))))
    content: (paragraph [96, 0] - [99, 0]
      content: (inline [96, 0] - [96, 161]
        (text [96, 0] - [96, 72])
        (code_span [96, 72] - [96, 83]
          (code_span_delimiter [96, 72] - [96, 73])
          (code_span_content [96, 73] - [96, 82])
          (code_span_delimiter [96, 82] - [96, 83]))
        (text [96, 83] - [96, 111])
        (code_span [96, 111] - [96, 122]
          (code_span_delimiter [96, 111] - [96, 112])
          (code_span_content [96, 112] - [96, 121])
          (code_span_delimiter [96, 121] - [96, 122]))
        (text [96, 122] - [96, 161])))
    content: (atx_heading [99, 0] - [101, 0]
      marker: (atx_heading_marker [99, 0] - [99, 4])
      content: (inline [99, 4] - [99, 12]
        (text [99, 4] - [99, 12])))
    content: (paragraph [101, 0] - [103, 0]
      content: (inline [101, 0] - [101, 204]
        (text [101, 0] - [101, 56])
        (code_span [101, 56] - [101, 79]
          (code_span_delimiter [101, 56] - [101, 57])
          (code_span_content [101, 57] - [101, 78])
          (code_span_delimiter [101, 78] - [101, 79]))
        (text [101, 79] - [101, 204])))
    (ERROR [103, 0] - [103, 18]
      (code_fence_delimiter [103, 0] - [103, 3])
      (attribute_class [103, 4] - [103, 9])
      (citation_key [103, 9] - [103, 18]))
    content: (paragraph [103, 18] - [104, 0]
      content: (inline [103, 18] - [103, 30]
        (equals_sign [103, 18] - [103, 19])
        (text [103, 19] - [103, 30])))
    content: (paragraph [104, 0] - [105, 0]
      content: (inline [104, 0] - [104, 33]
        (text [104, 0] - [104, 33])))
    content: (fenced_code_block [105, 0] - [113, 0]
      open: (code_fence_delimiter [105, 0] - [105, 3])
      (code_line [107, 0] - [107, 146])
      (code_line [109, 0] - [109, 30])
      (code_line [110, 0] - [110, 21])
      close: (code_fence_delimiter [111, 0] - [111, 3]))
    content: (paragraph [113, 0] - [115, 0]
      content: (inline [113, 0] - [113, 153]
        (text [113, 0] - [113, 70])
        (code_span [113, 70] - [113, 81]
          (code_span_delimiter [113, 70] - [113, 71])
          (code_span_content [113, 71] - [113, 80])
          (code_span_delimiter [113, 80] - [113, 81]))
        (text [113, 81] - [113, 103])
        (code_span [113, 103] - [113, 114]
          (code_span_delimiter [113, 103] - [113, 104])
          (code_span_content [113, 104] - [113, 113])
          (code_span_delimiter [113, 113] - [113, 114]))
        (text [113, 114] - [113, 153])))
    close: (fenced_div_delimiter [115, 0] - [115, 3]))
  (atx_heading [118, 0] - [120, 0]
    marker: (atx_heading_marker [118, 0] - [118, 3])
    content: (inline [118, 3] - [118, 11]
      (text [118, 3] - [118, 11])))
  (paragraph [120, 0] - [122, 0]
    content: (inline [120, 0] - [120, 204]
      (text [120, 0] - [120, 96])
      (code_span [120, 96] - [120, 107]
        (code_span_delimiter [120, 96] - [120, 97])
        (code_span_content [120, 97] - [120, 106])
        (code_span_delimiter [120, 106] - [120, 107]))
      (text [120, 107] - [120, 109])
      (code_span [120, 109] - [120, 120]
        (code_span_delimiter [120, 109] - [120, 110])
        (code_span_content [120, 110] - [120, 119])
        (code_span_delimiter [120, 119] - [120, 120]))
      (text [120, 120] - [120, 122])
      (code_span [120, 122] - [120, 135]
        (code_span_delimiter [120, 122] - [120, 123])
        (code_span_content [120, 123] - [120, 134])
        (code_span_delimiter [120, 134] - [120, 135]))
      (text [120, 135] - [120, 204])))
  (atx_heading [122, 0] - [124, 0]
    marker: (atx_heading_marker [122, 0] - [122, 4])
    content: (inline [122, 4] - [122, 15]
      (text [122, 4] - [122, 15])))
  (paragraph [124, 0] - [126, 0]
    content: (inline [124, 0] - [124, 158]
      (text [124, 0] - [124, 23])
      (code_span [124, 23] - [124, 36]
        (code_span_delimiter [124, 23] - [124, 24])
        (code_span_content [124, 24] - [124, 35])
        (code_span_delimiter [124, 35] - [124, 36]))
      (text [124, 36] - [124, 158])))
  (fenced_code_block [126, 0] - [153, 0]
    open: (code_fence_delimiter [126, 0] - [126, 3])
    info: (info_string [126, 3] - [126, 8])
    (code_line [127, 0] - [127, 8])
    (code_line [128, 0] - [128, 12])
    (code_line [130, 0] - [130, 5])
    (code_line [131, 0] - [131, 17])
    (code_line [132, 0] - [132, 20])
    (code_line [133, 0] - [133, 19])
    (ERROR [134, 0] - [148, 26]
      (chunk_option_value [134, 0] - [134, 11])
      (table_delimiter_cell [134, 11] - [135, 6])
      (citation_key [135, 6] - [135, 11])
      (attribute_class [135, 11] - [135, 15])
      (citation_key [136, 5] - [136, 11])
      (attribute_class [136, 11] - [136, 15])
      (citation_key [137, 5] - [137, 13])
      (attribute_class [137, 13] - [137, 17])
      (citation_key [138, 5] - [138, 16])
      (attribute_class [138, 16] - [138, 20])
      (citation_key [140, 0] - [140, 12])
      (citation_key [140, 13] - [140, 24])
      (attribute_class [140, 24] - [140, 28])
      (citation_key [142, 0] - [142, 6])
      (citation_key [143, 0] - [143, 6])
      (citation_key [144, 0] - [144, 9])
      (citation_key [144, 10] - [144, 16])
      (citation_key [145, 0] - [145, 5])
      (citation_key [146, 0] - [146, 17])
      (citation_key [146, 18] - [146, 27])
      (citation_key [147, 0] - [147, 6])
      (citation_key [148, 0] - [148, 9])
      (citation_key [148, 10] - [148, 15])
      (citation_key [148, 16] - [148, 22])
      (attribute_class [148, 22] - [148, 26]))
    close: (code_fence_delimiter [149, 0] - [149, 3]))
  (paragraph [153, 0] - [155, 0]
    content: (inline [153, 0] - [153, 181]
      (text [153, 0] - [153, 8])
      (link [153, 8] - [153, 60]
        text: (link_text [153, 9] - [153, 23])
        destination: (link_destination [153, 25] - [153, 59]))
      (text [153, 60] - [153, 181])))
  (atx_heading [155, 0] - [157, 0]
    marker: (atx_heading_marker [155, 0] - [155, 4])
    content: (inline [155, 4] - [155, 16]
      (text [155, 4] - [155, 16])))
  (paragraph [157, 0] - [159, 0]
    content: (inline [157, 0] - [157, 234]
      (text [157, 0] - [157, 41])
      (strong_emphasis [157, 41] - [157, 52]
        (strong_emphasis_delimiter [157, 41] - [157, 43])
        (text [157, 43] - [157, 50])
        (strong_emphasis_delimiter [157, 50] - [157, 52]))
      (text [157, 52] - [157, 74])
      (strong_emphasis [157, 74] - [157, 84]
        (strong_emphasis_delimiter [157, 74] - [157, 76])
        (text [157, 76] - [157, 82])
        (strong_emphasis_delimiter [157, 82] - [157, 84]))
      (text [157, 84] - [157, 134])
      (code_span [157, 134] - [157, 150]
        (code_span_delimiter [157, 134] - [157, 135])
        (code_span_content [157, 135] - [157, 149])
        (code_span_delimiter [157, 149] - [157, 150]))
      (text [157, 150] - [157, 234])))
  (ERROR [159, 0] - [159, 19]
    (code_fence_delimiter [159, 0] - [159, 3])
    (info_string [159, 3] - [159, 4])
    (attribute_class [159, 5] - [159, 10])
    (citation_key [159, 10] - [159, 19]))
  (paragraph [159, 19] - [160, 0]
    content: (inline [159, 19] - [159, 31]
      (equals_sign [159, 19] - [159, 20])
      (text [159, 20] - [159, 31])))
  (atx_heading [160, 0] - [161, 0]
    marker: (atx_heading_marker [160, 0] - [160, 2])
    content: (inline [160, 2] - [160, 43]
      (text [160, 2] - [160, 43])))
  (paragraph [161, 0] - [162, 0]
    content: (inline [161, 0] - [161, 14]
      (text [161, 0] - [161, 14])))
  (fenced_code_block [162, 0] - [183, 0]
    open: (code_fence_delimiter [162, 0] - [162, 3])
    (code_line [164, 0] - [164, 257])
    (code_line [166, 0] - [166, 282])
    (code_line [169, 0] - [169, 21])
    (code_line [170, 0] - [170, 393])
    (code_line [171, 0] - [171, 3])
    (code_line [173, 0] - [173, 123])
    (code_line [175, 0] - [175, 14])
    (code_line [177, 0] - [177, 94])
    (code_line [179, 0] - [179, 31])
    (code_line [180, 0] - [180, 13])
    close: (code_fence_delimiter [181, 0] - [181, 3]))
  (paragraph [183, 0] - [185, 0]
    content: (inline [183, 0] - [183, 138]
      (text [183, 0] - [183, 28])
      (code_span [183, 28] - [183, 43]
        (code_span_delimiter [183, 28] - [183, 29])
        (code_span_content [183, 29] - [183, 42])
        (code_span_delimiter [183, 42] - [183, 43]))
      (text [183, 43] - [183, 122])
      (code_span [183, 122] - [183, 128]
        (code_span_delimiter [183, 122] - [183, 123])
        (code_span_content [183, 123] - [183, 127])
        (code_span_delimiter [183, 127] - [183, 128]))
      (text [183, 128] - [183, 138])))
  (ERROR [185, 0] - [185, 19]
    (code_fence_delimiter [185, 0] - [185, 3])
    (info_string [185, 3] - [185, 4])
    (attribute_class [185, 5] - [185, 10])
    (citation_key [185, 10] - [185, 19]))
  (paragraph [185, 19] - [186, 0]
    content: (inline [185, 19] - [185, 31]
      (equals_sign [185, 19] - [185, 20])
      (text [185, 20] - [185, 31])))
  (paragraph [186, 0] - [187, 0]
    content: (inline [186, 0] - [186, 44]
      (text [186, 0] - [186, 44])))
  (paragraph [187, 0] - [188, 0]
    content: (inline [187, 0] - [187, 48]
      (text [187, 0] - [187, 48])))
  (fenced_code_block [188, 0] - [200, 0]
    open: (code_fence_delimiter [188, 0] - [188, 3])
    (code_line [190, 0] - [190, 90])
    (code_line [192, 0] - [192, 31])
    (code_line [193, 0] - [193, 7])
    (code_line [194, 0] - [194, 8])
    (code_line [195, 0] - [195, 37])
    (code_line [196, 0] - [196, 14])
    (code_line [197, 0] - [197, 15])
    close: (code_fence_delimiter [198, 0] - [198, 3]))
  (paragraph [200, 0] - [202, 0]
    content: (inline [200, 0] - [200, 301]
      (text [200, 0] - [200, 25])
      (link [200, 25] - [200, 74]
        text: (link_text [200, 26] - [200, 45])
        destination: (link_destination [200, 47] - [200, 73]))
      (text [200, 74] - [200, 193])
      (code_span [200, 193] - [200, 205]
        (code_span_delimiter [200, 193] - [200, 194])
        (code_span_content [200, 194] - [200, 204])
        (code_span_delimiter [200, 204] - [200, 205]))
      (text [200, 205] - [200, 228])
      (code_span [200, 228] - [200, 235]
        (code_span_delimiter [200, 228] - [200, 229])
        (code_span_content [200, 229] - [200, 234])
        (code_span_delimiter [200, 234] - [200, 235]))
      (text [200, 235] - [200, 273])
      (code_span [200, 273] - [200, 280]
        (code_span_delimiter [200, 273] - [200, 274])
        (code_span_content [200, 274] - [200, 279])
        (code_span_delimiter [200, 279] - [200, 280]))
      (text [200, 280] - [200, 293])
      (code_span [200, 293] - [200, 300]
        (code_span_delimiter [200, 293] - [200, 294])
        (code_span_content [200, 294] - [200, 299])
        (code_span_delimiter [200, 299] - [200, 300]))
      (text [200, 300] - [200, 301])))
  (ERROR [202, 0] - [202, 20]
    (atx_heading_marker [202, 0] - [202, 4])
    (text [202, 4] - [202, 19]))
  (atx_heading [202, 20] - [204, 0]
    marker: (atx_heading_marker [202, 20] - [202, 21])
    content: (inline [202, 21] - [202, 36]
      (text [202, 21] - [202, 36])))
  (paragraph [204, 0] - [206, 0]
    content: (inline [204, 0] - [204, 379]
      (text [204, 0] - [204, 379])))
  (atx_heading [206, 0] - [208, 0]
    marker: (atx_heading_marker [206, 0] - [206, 5])
    content: (inline [206, 5] - [206, 40]
      (text [206, 5] - [206, 40])))
  (paragraph [208, 0] - [210, 0]
    content: (inline [208, 0] - [208, 179]
      (text [208, 0] - [208, 179])))
  (paragraph [210, 0] - [210, 71]
    content: (inline [210, 0] - [210, 71]
      (text [210, 0] - [210, 71])))
  (ERROR [210, 71] - [249, 0]
    (html_open_tag [210, 71] - [210, 131])
    (html_block_content [212, 0] - [212, 116])
    (html_block_content [214, 0] - [214, 12])
    (html_block_content [215, 0] - [215, 55])
    (html_block_content [216, 0] - [216, 7])
    (html_block_content [218, 0] - [218, 64])
    (html_block_content [220, 0] - [220, 37])
    (html_block_content [222, 0] - [222, 181])
    (html_block_content [224, 0] - [224, 125])
    (html_block_content [226, 0] - [226, 115])
    (html_block_content [228, 0] - [228, 12])
    (html_block_content [229, 0] - [229, 51])
    (html_block_content [230, 0] - [230, 7])
    (html_block_content [232, 0] - [232, 305])
    (html_block_content [234, 0] - [234, 16])
    (html_block_content [236, 0] - [236, 118])
    (html_block_content [238, 0] - [238, 179])
    (html_block_content [240, 0] - [240, 141])
    (html_block_content [242, 0] - [242, 185])
    (html_block_content [244, 0] - [244, 125])
    (html_block_content [246, 0] - [246, 164])
    (html_block_content [248, 0] - [248, 174])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/books/book-basics.qmd	Parse:    0.83 ms	 14059 bytes/ms	(ERROR [2, 6] - [4, 15])

### File 3: `docs/projects/virtual-environments.qmd`

**Error:** Parse failed: (document [0, 0] - [335, 0]
  (yaml_front_matter [0, 0] - [5, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [3, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 29]
          (yaml_string [1, 7] - [1, 29]
            (yaml_string_quoted [1, 7] - [1, 29]))))
      (yaml_pair [2, 0] - [3, 0]
        key: (yaml_key [2, 0] - [2, 6])
        value: (yaml_scalar [2, 8] - [2, 12]
          (yaml_string [2, 8] - [2, 12]
            (yaml_string_unquoted [2, 8] - [2, 12])))))
    close: (yaml_front_matter_delimiter [3, 0] - [3, 3]))
  (paragraph [5, 0] - [7, 0]
    content: (inline [5, 0] - [5, 325]
      (text [5, 0] - [5, 325])))
  (paragraph [7, 0] - [9, 0]
    content: (inline [7, 0] - [7, 96]
      (text [7, 0] - [7, 96])))
  (paragraph [9, 0] - [11, 0]
    content: (inline [9, 0] - [9, 147]
      (text [9, 0] - [9, 4])
      (link [9, 4] - [9, 125]
        text: (link_text [9, 5] - [9, 9])
        destination: (link_destination [9, 11] - [9, 124]))
      (text [9, 125] - [9, 147])))
  (paragraph [11, 0] - [13, 0]
    content: (inline [11, 0] - [11, 133]
      (text [11, 0] - [11, 4])
      (link [11, 4] - [11, 101]
        text: (link_text [11, 5] - [11, 10])
        destination: (link_destination [11, 12] - [11, 100]))
      (text [11, 101] - [11, 133])))
  (paragraph [13, 0] - [15, 0]
    content: (inline [13, 0] - [13, 99]
      (text [13, 0] - [13, 4])
      (link [13, 4] - [13, 61]
        text: (link_text [13, 5] - [13, 9])
        destination: (link_destination [13, 11] - [13, 60]))
      (text [13, 61] - [13, 99])))
  (paragraph [15, 0] - [17, 0]
    content: (inline [15, 0] - [15, 267]
      (text [15, 0] - [15, 267])))
  (paragraph [17, 0] - [19, 0]
    content: (inline [17, 0] - [17, 143]
      (text [17, 0] - [17, 49])
      (link [17, 49] - [17, 74]
        text: (link_text [17, 50] - [17, 60])
        destination: (link_destination [17, 62] - [17, 73]))
      (text [17, 74] - [17, 76])
      (link [17, 76] - [17, 95]
        text: (link_text [17, 77] - [17, 84])
        destination: (link_destination [17, 86] - [17, 94]))
      (text [17, 95] - [17, 97])
      (link [17, 97] - [17, 118]
        text: (link_text [17, 98] - [17, 106])
        destination: (link_destination [17, 108] - [17, 117]))
      (text [17, 118] - [17, 123])
      (link [17, 123] - [17, 142]
        text: (link_text [17, 124] - [17, 131])
        destination: (link_destination [17, 133] - [17, 141]))
      (text [17, 142] - [17, 143])))
  (paragraph [19, 0] - [21, 0]
    content: (inline [19, 0] - [19, 161]
      (text [19, 0] - [19, 122])
      (link [19, 122] - [19, 160]
        text: (link_text [19, 123] - [19, 147])
        destination: (link_destination [19, 149] - [19, 159]))
      (text [19, 160] - [19, 161])))
  (ERROR [21, 0] - [21, 15]
    (atx_heading_marker [21, 0] - [21, 3])
    (text [21, 3] - [21, 14]))
  (atx_heading [21, 15] - [23, 0]
    marker: (atx_heading_marker [21, 15] - [21, 16])
    content: (inline [21, 16] - [21, 43]
      (text [21, 16] - [21, 43])))
  (paragraph [23, 0] - [25, 0]
    content: (inline [23, 0] - [23, 289]
      (text [23, 0] - [23, 88])
      (link [23, 88] - [23, 223]
        text: (link_text [23, 89] - [23, 107])
        destination: (link_destination [23, 109] - [23, 222]))
      (text [23, 223] - [23, 289])))
  (paragraph [25, 0] - [27, 0]
    content: (inline [25, 0] - [25, 68]
      (text [25, 0] - [25, 62])
      (code_span [25, 62] - [25, 67]
        (code_span_delimiter [25, 62] - [25, 63])
        (code_span_content [25, 63] - [25, 66])
        (code_span_delimiter [25, 66] - [25, 67]))
      (text [25, 67] - [25, 68])))
  (paragraph [27, 0] - [28, 0]
    content: (inline [27, 0] - [27, 65]
      (text [27, 0] - [27, 65])))
  (paragraph [28, 0] - [29, 0]
    content: (inline [28, 0] - [28, 65]
      (text [28, 0] - [28, 65])))
  (ERROR [29, 0] - [30, 35]
    (list_marker [29, 0] - [29, 1])
    (setext_heading_marker [29, 1] - [29, 15])
    (list_marker [29, 15] - [29, 16])
    (setext_heading_marker [29, 16] - [29, 64])
    (list_marker [29, 64] - [29, 65])
    (citation_key [30, 1] - [30, 5])
    (ERROR [30, 5] - [30, 6])
    (citation_key [30, 6] - [30, 11])
    (code_fence_delimiter [30, 16] - [30, 20])
    (attribute_class [30, 21] - [30, 26])
    (citation_key [30, 26] - [30, 35]))
  (paragraph [30, 35] - [31, 0]
    content: (inline [30, 35] - [30, 65]
      (equals_sign [30, 35] - [30, 36])
      (text [30, 36] - [30, 65])))
  (paragraph [31, 0] - [32, 0]
    content: (inline [31, 0] - [31, 65]
      (text [31, 0] - [31, 65])))
  (paragraph [32, 0] - [35, 0]
    content: (inline [32, 0] - [34, 65]
      (text [32, 0] - [32, 17])
      (ERROR [32, 17] - [32, 19]
        (inline_cell_delimiter [32, 17] - [32, 18])
        (inline_cell_delimiter [32, 18] - [32, 19]))
      (code_span [32, 19] - [34, 18]
        (code_span_delimiter [32, 19] - [32, 20])
        (code_span_content [32, 20] - [34, 17])
        (code_span_delimiter [34, 17] - [34, 18]))
      (ERROR [34, 18] - [34, 41]
        (inline_cell_delimiter [34, 18] - [34, 19])
        (inline_cell_delimiter [34, 19] - [34, 21])
        (attribute_class [34, 21] - [34, 32])
        (citation_key [34, 32] - [34, 41]))
      (equals_sign [34, 41] - [34, 42])
      (text [34, 42] - [34, 65])))
  (paragraph [35, 0] - [36, 0]
    content: (inline [35, 0] - [35, 65]
      (text [35, 0] - [35, 65])))
  (paragraph [36, 0] - [45, 0]
    content: (inline [36, 0] - [44, 59]
      (text [36, 0] - [36, 17])
      (ERROR [36, 17] - [36, 19]
        (inline_cell_delimiter [36, 17] - [36, 18])
        (inline_cell_delimiter [36, 18] - [36, 19]))
      (code_span [36, 19] - [44, 19]
        (code_span_delimiter [36, 19] - [36, 20])
        (code_span_content [36, 20] - [44, 18])
        (code_span_delimiter [44, 18] - [44, 19]))
      (ERROR [44, 19] - [44, 36]
        (inline_cell_delimiter [44, 19] - [44, 20])
        (inline_cell_delimiter [44, 20] - [44, 22])
        (attribute_class [44, 22] - [44, 27])
        (citation_key [44, 27] - [44, 36]))
      (equals_sign [44, 36] - [44, 37])
      (text [44, 37] - [44, 59])))
  (paragraph [45, 0] - [46, 0]
    content: (inline [45, 0] - [45, 59]
      (text [45, 0] - [45, 59])))
  (paragraph [46, 0] - [49, 0]
    content: (inline [46, 0] - [48, 59]
      (text [46, 0] - [46, 18])
      (ERROR [46, 18] - [46, 20]
        (inline_cell_delimiter [46, 18] - [46, 19])
        (inline_cell_delimiter [46, 19] - [46, 20]))
      (code_span [46, 20] - [48, 19]
        (code_span_delimiter [46, 20] - [46, 21])
        (code_span_content [46, 21] - [48, 18])
        (code_span_delimiter [48, 18] - [48, 19]))
      (ERROR [48, 19] - [48, 42]
        (inline_cell_delimiter [48, 19] - [48, 20])
        (inline_cell_delimiter [48, 20] - [48, 22])
        (attribute_class [48, 22] - [48, 33])
        (citation_key [48, 33] - [48, 42]))
      (equals_sign [48, 42] - [48, 43])
      (text [48, 43] - [48, 59])))
  (paragraph [49, 0] - [50, 0]
    content: (inline [49, 0] - [49, 59]
      (text [49, 0] - [49, 59])))
  (paragraph [50, 0] - [53, 0]
    content: (inline [50, 0] - [52, 59]
      (text [50, 0] - [50, 18])
      (ERROR [50, 18] - [50, 20]
        (inline_cell_delimiter [50, 18] - [50, 19])
        (inline_cell_delimiter [50, 19] - [50, 20]))
      (code_span [50, 20] - [52, 19]
        (code_span_delimiter [50, 20] - [50, 21])
        (code_span_content [50, 21] - [52, 18])
        (code_span_delimiter [52, 18] - [52, 19]))
      (ERROR [52, 19] - [52, 42]
        (inline_cell_delimiter [52, 19] - [52, 20])
        (inline_cell_delimiter [52, 20] - [52, 22])
        (attribute_class [52, 22] - [52, 33])
        (citation_key [52, 33] - [52, 42]))
      (equals_sign [52, 42] - [52, 43])
      (text [52, 43] - [52, 59])))
  (paragraph [53, 0] - [54, 0]
    content: (inline [53, 0] - [53, 59]
      (text [53, 0] - [53, 59])))
  (paragraph [54, 0] - [63, 0]
    content: (inline [54, 0] - [62, 30]
      (text [54, 0] - [54, 18])
      (ERROR [54, 18] - [54, 20]
        (inline_cell_delimiter [54, 18] - [54, 19])
        (inline_cell_delimiter [54, 19] - [54, 20]))
      (code_span [54, 20] - [62, 1]
        (code_span_delimiter [54, 20] - [54, 21])
        (code_span_content [54, 21] - [62, 0])
        (code_span_delimiter [62, 0] - [62, 1]))
      (ERROR [62, 1] - [62, 18]
        (inline_cell_delimiter [62, 1] - [62, 2])
        (inline_cell_delimiter [62, 2] - [62, 4])
        (attribute_class [62, 4] - [62, 9])
        (citation_key [62, 9] - [62, 18]))
      (equals_sign [62, 18] - [62, 19])
      (text [62, 19] - [62, 30])))
  (paragraph [63, 0] - [64, 0]
    content: (inline [63, 0] - [63, 68]
      (text [63, 0] - [63, 68])))
  (fenced_code_block [64, 0] - [89, 0]
    open: (code_fence_delimiter [64, 0] - [64, 3])
    (code_line [65, 0] - [65, 3])
    (code_line [67, 0] - [67, 299])
    (code_line [69, 0] - [69, 71])
    (code_line [70, 0] - [70, 71])
    (code_line [71, 0] - [71, 71])
    (code_line [72, 0] - [72, 71])
    (code_line [73, 0] - [73, 71])
    (code_line [74, 0] - [74, 71])
    (code_line [75, 0] - [75, 71])
    (code_line [76, 0] - [76, 71])
    (code_line [77, 0] - [77, 71])
    (code_line [78, 0] - [78, 71])
    (code_line [79, 0] - [79, 71])
    (code_line [81, 0] - [81, 175])
    (code_line [83, 0] - [83, 58])
    (code_line [85, 0] - [85, 30])
    (code_line [86, 0] - [86, 10])
    close: (code_fence_delimiter [87, 0] - [87, 3]))
  (atx_heading [89, 0] - [93, 0]
    marker: (atx_heading_marker [89, 0] - [89, 4])
    content: (inline [89, 4] - [91, 168]
      (text [89, 4] - [89, 24])
      (ERROR [89, 24] - [91, 59]
        (attribute_class [89, 25] - [89, 40])
        (citation_key [91, 0] - [91, 2])
        (citation_key [91, 2] - [91, 7])
        (citation_key [91, 7] - [91, 12])
        (citation_key [91, 12] - [91, 24])
        (citation_key [91, 24] - [91, 37])
        (ERROR [91, 37] - [91, 38])
        (citation_key [91, 38] - [91, 42])
        (citation_key [91, 42] - [91, 47])
        (citation_key [91, 47] - [91, 50])
        (citation_key [91, 50] - [91, 57])
        (citation_key [91, 57] - [91, 59]))
      (text [91, 59] - [91, 60])
      (code_span [91, 60] - [91, 78]
        (code_span_delimiter [91, 60] - [91, 61])
        (code_span_content [91, 61] - [91, 77])
        (code_span_delimiter [91, 77] - [91, 78]))
      (text [91, 78] - [91, 147])
      (code_span [91, 147] - [91, 159]
        (code_span_delimiter [91, 147] - [91, 148])
        (code_span_content [91, 148] - [91, 158])
        (code_span_delimiter [91, 158] - [91, 159]))
      (text [91, 159] - [91, 168])))
  (paragraph [93, 0] - [94, 0]
    content: (inline [93, 0] - [93, 63]
      (text [93, 0] - [93, 63])))
  (paragraph [94, 0] - [95, 0]
    content: (inline [94, 0] - [94, 63]
      (text [94, 0] - [94, 63])))
  (ERROR [95, 0] - [96, 35]
    (list_marker [95, 0] - [95, 1])
    (setext_heading_marker [95, 1] - [95, 15])
    (list_marker [95, 15] - [95, 16])
    (setext_heading_marker [95, 16] - [95, 62])
    (list_marker [95, 62] - [95, 63])
    (citation_key [96, 1] - [96, 5])
    (ERROR [96, 5] - [96, 6])
    (citation_key [96, 6] - [96, 11])
    (code_fence_delimiter [96, 16] - [96, 20])
    (attribute_class [96, 21] - [96, 26])
    (citation_key [96, 26] - [96, 35]))
  (paragraph [96, 35] - [97, 0]
    content: (inline [96, 35] - [96, 63]
      (equals_sign [96, 35] - [96, 36])
      (text [96, 36] - [96, 63])))
  (paragraph [97, 0] - [98, 0]
    content: (inline [97, 0] - [97, 63]
      (text [97, 0] - [97, 63])))
  (paragraph [98, 0] - [101, 0]
    content: (inline [98, 0] - [100, 63]
      (text [98, 0] - [98, 17])
      (ERROR [98, 17] - [98, 19]
        (inline_cell_delimiter [98, 17] - [98, 18])
        (inline_cell_delimiter [98, 18] - [98, 19]))
      (code_span [98, 19] - [100, 18]
        (code_span_delimiter [98, 19] - [98, 20])
        (code_span_content [98, 20] - [100, 17])
        (code_span_delimiter [100, 17] - [100, 18]))
      (ERROR [100, 18] - [100, 41]
        (inline_cell_delimiter [100, 18] - [100, 19])
        (inline_cell_delimiter [100, 19] - [100, 21])
        (attribute_class [100, 21] - [100, 32])
        (citation_key [100, 32] - [100, 41]))
      (equals_sign [100, 41] - [100, 42])
      (text [100, 42] - [100, 63])))
  (paragraph [101, 0] - [102, 0]
    content: (inline [101, 0] - [101, 63]
      (text [101, 0] - [101, 63])))
  (paragraph [102, 0] - [119, 0]
    content: (inline [102, 0] - [118, 65]
      (text [102, 0] - [102, 17])
      (ERROR [102, 17] - [102, 19]
        (inline_cell_delimiter [102, 17] - [102, 18])
        (inline_cell_delimiter [102, 18] - [102, 19]))
      (code_span [102, 19] - [105, 32]
        (code_span_delimiter [102, 19] - [102, 20])
        (code_span_content [102, 20] - [105, 31])
        (code_span_delimiter [105, 31] - [105, 32]))
      (text [105, 32] - [105, 48])
      (code_span [105, 48] - [109, 104]
        (code_span_delimiter [105, 48] - [105, 49])
        (code_span_content [105, 49] - [109, 103])
        (code_span_delimiter [109, 103] - [109, 104]))
      (text [109, 104] - [109, 115])
      (code_span [109, 115] - [109, 124]
        (code_span_delimiter [109, 115] - [109, 116])
        (code_span_content [109, 116] - [109, 123])
        (code_span_delimiter [109, 123] - [109, 124]))
      (text [109, 124] - [109, 140])
      (code_span [109, 140] - [113, 29]
        (code_span_delimiter [109, 140] - [109, 141])
        (code_span_content [109, 141] - [113, 28])
        (code_span_delimiter [113, 28] - [113, 29]))
      (text [113, 29] - [113, 45])
      (code_span [113, 45] - [118, 18]
        (code_span_delimiter [113, 45] - [113, 46])
        (code_span_content [113, 46] - [118, 17])
        (code_span_delimiter [118, 17] - [118, 18]))
      (ERROR [118, 18] - [118, 35]
        (inline_cell_delimiter [118, 18] - [118, 19])
        (inline_cell_delimiter [118, 19] - [118, 21])
        (attribute_class [118, 21] - [118, 26])
        (citation_key [118, 26] - [118, 35]))
      (equals_sign [118, 35] - [118, 36])
      (text [118, 36] - [118, 65])))
  (paragraph [119, 0] - [120, 0]
    content: (inline [119, 0] - [119, 65]
      (text [119, 0] - [119, 65])))
  (paragraph [120, 0] - [123, 0]
    content: (inline [120, 0] - [122, 65]
      (text [120, 0] - [120, 17])
      (ERROR [120, 17] - [120, 19]
        (inline_cell_delimiter [120, 17] - [120, 18])
        (inline_cell_delimiter [120, 18] - [120, 19]))
      (code_span [120, 19] - [122, 18]
        (code_span_delimiter [120, 19] - [120, 20])
        (code_span_content [120, 20] - [122, 17])
        (code_span_delimiter [122, 17] - [122, 18]))
      (ERROR [122, 18] - [122, 35]
        (inline_cell_delimiter [122, 18] - [122, 19])
        (inline_cell_delimiter [122, 19] - [122, 21])
        (attribute_class [122, 21] - [122, 26])
        (citation_key [122, 26] - [122, 35]))
      (equals_sign [122, 35] - [122, 36])
      (text [122, 36] - [122, 65])))
  (paragraph [123, 0] - [124, 0]
    content: (inline [123, 0] - [123, 65]
      (text [123, 0] - [123, 65])))
  (paragraph [124, 0] - [134, 0]
    content: (inline [124, 0] - [133, 30]
      (text [124, 0] - [124, 17])
      (ERROR [124, 17] - [124, 19]
        (inline_cell_delimiter [124, 17] - [124, 18])
        (inline_cell_delimiter [124, 18] - [124, 19]))
      (code_span [124, 19] - [131, 46]
        (code_span_delimiter [124, 19] - [124, 20])
        (code_span_content [124, 20] - [131, 45])
        (code_span_delimiter [131, 45] - [131, 46]))
      (text [131, 46] - [131, 49])
      (code_span [131, 49] - [133, 1]
        (code_span_delimiter [131, 49] - [131, 50])
        (code_span_content [131, 50] - [133, 0])
        (code_span_delimiter [133, 0] - [133, 1]))
      (ERROR [133, 1] - [133, 18]
        (inline_cell_delimiter [133, 1] - [133, 2])
        (inline_cell_delimiter [133, 2] - [133, 4])
        (attribute_class [133, 4] - [133, 9])
        (citation_key [133, 9] - [133, 18]))
      (equals_sign [133, 18] - [133, 19])
      (text [133, 19] - [133, 30])))
  (paragraph [134, 0] - [135, 0]
    content: (inline [134, 0] - [134, 32]
      (text [134, 0] - [134, 32])))
  (fenced_code_block [135, 0] - [182, 0]
    open: (code_fence_delimiter [135, 0] - [135, 3])
    (code_line [137, 0] - [137, 144])
    (code_line [139, 0] - [139, 62])
    (code_line [140, 0] - [140, 62])
    (code_line [141, 0] - [141, 62])
    (code_line [142, 0] - [142, 62])
    (code_line [143, 0] - [143, 62])
    (code_line [144, 0] - [144, 62])
    (code_line [145, 0] - [145, 62])
    (code_line [146, 0] - [146, 62])
    (code_line [147, 0] - [147, 62])
    (code_line [148, 0] - [148, 62])
    (code_line [149, 0] - [149, 62])
    (code_line [150, 0] - [150, 62])
    (code_line [151, 0] - [151, 62])
    (code_line [152, 0] - [152, 62])
    (code_line [153, 0] - [153, 62])
    (code_line [154, 0] - [154, 62])
    (code_line [155, 0] - [155, 62])
    (code_line [156, 0] - [156, 62])
    (code_line [157, 0] - [157, 62])
    (code_line [159, 0] - [159, 104])
    (code_line [161, 0] - [161, 72])
    (code_line [163, 0] - [163, 55])
    (code_line [164, 0] - [164, 55])
    (code_line [165, 0] - [165, 55])
    (code_line [166, 0] - [166, 55])
    (code_line [167, 0] - [167, 55])
    (code_line [168, 0] - [168, 55])
    (code_line [169, 0] - [169, 55])
    (code_line [170, 0] - [170, 55])
    (code_line [171, 0] - [171, 55])
    (code_line [172, 0] - [172, 55])
    (code_line [173, 0] - [173, 55])
    (code_line [175, 0] - [175, 309])
    (code_line [177, 0] - [177, 30])
    (code_line [178, 0] - [178, 21])
    (code_line [179, 0] - [179, 32])
    close: (code_fence_delimiter [180, 0] - [180, 3]))
  (paragraph [182, 0] - [184, 0]
    content: (inline [182, 0] - [182, 175]
      (text [182, 0] - [182, 75])
      (code_span [182, 75] - [182, 83]
        (code_span_delimiter [182, 75] - [182, 76])
        (code_span_content [182, 76] - [182, 82])
        (code_span_delimiter [182, 82] - [182, 83]))
      (text [182, 83] - [182, 88])
      (code_span [182, 88] - [182, 100]
        (code_span_delimiter [182, 88] - [182, 89])
        (code_span_content [182, 89] - [182, 99])
        (code_span_delimiter [182, 99] - [182, 100]))
      (text [182, 100] - [182, 128])
      (code_span [182, 128] - [182, 143]
        (code_span_delimiter [182, 128] - [182, 129])
        (code_span_content [182, 129] - [182, 142])
        (code_span_delimiter [182, 142] - [182, 143]))
      (text [182, 143] - [182, 175])))
  (paragraph [184, 0] - [186, 0]
    content: (inline [184, 0] - [184, 56]
      (text [184, 0] - [184, 4])
      (code_span [184, 4] - [184, 22]
        (code_span_delimiter [184, 4] - [184, 5])
        (code_span_content [184, 5] - [184, 21])
        (code_span_delimiter [184, 21] - [184, 22]))
      (text [184, 22] - [184, 56])))
  (ERROR [186, 0] - [186, 18]
    (code_fence_delimiter [186, 0] - [186, 3])
    (attribute_class [186, 4] - [186, 9])
    (citation_key [186, 9] - [186, 18]))
  (paragraph [186, 18] - [187, 0]
    content: (inline [186, 18] - [186, 30]
      (equals_sign [186, 18] - [186, 19])
      (text [186, 19] - [186, 30])))
  (paragraph [187, 0] - [188, 0]
    content: (inline [187, 0] - [187, 16]
      (text [187, 0] - [187, 16])))
  (fenced_code_block [188, 0] - [198, 0]
    open: (code_fence_delimiter [188, 0] - [188, 3])
    (code_line [190, 0] - [190, 23])
    (code_line [192, 0] - [192, 172])
    (code_line [194, 0] - [194, 30])
    (code_line [195, 0] - [195, 34])
    close: (code_fence_delimiter [196, 0] - [196, 3]))
  (paragraph [198, 0] - [200, 0]
    content: (inline [198, 0] - [198, 75]
      (text [198, 0] - [198, 31])
      (code_span [198, 31] - [198, 48]
        (code_span_delimiter [198, 31] - [198, 32])
        (code_span_content [198, 32] - [198, 47])
        (code_span_delimiter [198, 47] - [198, 48]))
      (text [198, 48] - [198, 75])))
  (atx_heading [200, 0] - [202, 0]
    marker: (atx_heading_marker [200, 0] - [200, 4])
    content: (inline [200, 4] - [200, 26]
      (text [200, 4] - [200, 26])))
  (paragraph [202, 0] - [204, 0]
    content: (inline [202, 0] - [202, 126]
      (text [202, 0] - [202, 66])
      (code_span [202, 66] - [202, 83]
        (code_span_delimiter [202, 66] - [202, 67])
        (code_span_content [202, 67] - [202, 82])
        (code_span_delimiter [202, 82] - [202, 83]))
      (text [202, 83] - [202, 107])
      (code_span [202, 107] - [202, 125]
        (code_span_delimiter [202, 107] - [202, 108])
        (code_span_content [202, 108] - [202, 124])
        (code_span_delimiter [202, 124] - [202, 125]))
      (text [202, 125] - [202, 126])))
  (ERROR [204, 0] - [204, 18]
    (code_fence_delimiter [204, 0] - [204, 3])
    (attribute_class [204, 4] - [204, 9])
    (citation_key [204, 9] - [204, 18]))
  (paragraph [204, 18] - [205, 0]
    content: (inline [204, 18] - [204, 30]
      (equals_sign [204, 18] - [204, 19])
      (text [204, 19] - [204, 30])))
  (paragraph [205, 0] - [206, 0]
    content: (inline [205, 0] - [205, 48]
      (text [205, 0] - [205, 48])))
  (fenced_code_block [206, 0] - [221, 0]
    open: (code_fence_delimiter [206, 0] - [206, 3])
    (code_line [208, 0] - [208, 20])
    (code_line [210, 0] - [210, 174])
    (code_line [212, 0] - [212, 13])
    (code_line [214, 0] - [214, 255])
    (code_line [216, 0] - [216, 5])
    (code_line [217, 0] - [217, 24])
    (code_line [218, 0] - [218, 12])
    close: (code_fence_delimiter [219, 0] - [219, 3]))
  (paragraph [221, 0] - [223, 0]
    content: (inline [221, 0] - [221, 143]
      (text [221, 0] - [221, 32])
      (code_span [221, 32] - [221, 43]
        (code_span_delimiter [221, 32] - [221, 33])
        (code_span_content [221, 33] - [221, 42])
        (code_span_delimiter [221, 42] - [221, 43]))
      (text [221, 43] - [221, 143])))
  (paragraph [223, 0] - [225, 0]
    content: (inline [223, 0] - [223, 150]
      (text [223, 0] - [223, 21])
      (strong_emphasis [223, 21] - [223, 29]
        (strong_emphasis_delimiter [223, 21] - [223, 23])
        (text [223, 23] - [223, 27])
        (strong_emphasis_delimiter [223, 27] - [223, 29]))
      (text [223, 29] - [223, 150])))
  (fenced_code_block [225, 0] - [229, 0]
    open: (code_fence_delimiter [225, 0] - [225, 3])
    info: (info_string [225, 3] - [225, 5])
    (code_line [226, 0] - [226, 18])
    close: (code_fence_delimiter [227, 0] - [227, 3]))
  (paragraph [229, 0] - [231, 0]
    content: (inline [229, 0] - [229, 155]
      (text [229, 0] - [229, 41])
      (code_span [229, 41] - [229, 59]
        (code_span_delimiter [229, 41] - [229, 42])
        (code_span_content [229, 42] - [229, 58])
        (code_span_delimiter [229, 58] - [229, 59]))
      (text [229, 59] - [229, 117])
      (code_span [229, 117] - [229, 132]
        (code_span_delimiter [229, 117] - [229, 118])
        (code_span_content [229, 118] - [229, 131])
        (code_span_delimiter [229, 131] - [229, 132]))
      (text [229, 132] - [229, 155])))
  (fenced_code_block [231, 0] - [236, 0]
    open: (code_fence_delimiter [231, 0] - [231, 3])
    info: (info_string [231, 3] - [231, 5])
    (code_line [232, 0] - [232, 52])
    (code_line [233, 0] - [233, 54])
    close: (code_fence_delimiter [234, 0] - [234, 3]))
  (paragraph [236, 0] - [238, 0]
    content: (inline [236, 0] - [236, 96]
      (text [236, 0] - [236, 36])
      (code_span [236, 36] - [236, 41]
        (code_span_delimiter [236, 36] - [236, 37])
        (code_span_content [236, 37] - [236, 40])
        (code_span_delimiter [236, 40] - [236, 41]))
      (text [236, 41] - [236, 96])))
  (atx_heading [238, 0] - [240, 0]
    marker: (atx_heading_marker [238, 0] - [238, 4])
    content: (inline [238, 4] - [238, 23]
      (text [238, 4] - [238, 23])))
  (paragraph [240, 0] - [242, 0]
    content: (inline [240, 0] - [240, 110]
      (text [240, 0] - [240, 82])
      (code_span [240, 82] - [240, 100]
        (code_span_delimiter [240, 82] - [240, 83])
        (code_span_content [240, 83] - [240, 99])
        (code_span_delimiter [240, 99] - [240, 100]))
      (text [240, 100] - [240, 110])))
  (fenced_code_block [242, 0] - [246, 0]
    open: (code_fence_delimiter [242, 0] - [242, 3])
    info: (info_string [242, 3] - [242, 5])
    (code_line [243, 0] - [243, 16])
    close: (code_fence_delimiter [244, 0] - [244, 3]))
  (paragraph [246, 0] - [248, 0]
    content: (inline [246, 0] - [246, 155]
      (text [246, 0] - [246, 20])
      (code_span [246, 20] - [246, 31]
        (code_span_delimiter [246, 20] - [246, 21])
        (code_span_content [246, 21] - [246, 30])
        (code_span_delimiter [246, 30] - [246, 31]))
      (text [246, 31] - [246, 58])
      (code_span [246, 58] - [246, 76]
        (code_span_delimiter [246, 58] - [246, 59])
        (code_span_content [246, 59] - [246, 75])
        (code_span_delimiter [246, 75] - [246, 76]))
      (text [246, 76] - [246, 155])))
  (atx_heading [248, 0] - [250, 0]
    marker: (atx_heading_marker [248, 0] - [248, 4])
    content: (inline [248, 4] - [248, 26]
      (text [248, 4] - [248, 26])))
  (paragraph [250, 0] - [252, 0]
    content: (inline [250, 0] - [250, 83]
      (text [250, 0] - [250, 56])
      (code_span [250, 56] - [250, 73]
        (code_span_delimiter [250, 56] - [250, 57])
        (code_span_content [250, 57] - [250, 72])
        (code_span_delimiter [250, 72] - [250, 73]))
      (text [250, 73] - [250, 83])))
  (fenced_code_block [252, 0] - [256, 0]
    open: (code_fence_delimiter [252, 0] - [252, 3])
    info: (info_string [252, 3] - [252, 5])
    (code_line [253, 0] - [253, 15])
    close: (code_fence_delimiter [254, 0] - [254, 3]))
  (ERROR [256, 0] - [256, 15]
    (atx_heading_marker [256, 0] - [256, 3])
    (text [256, 3] - [256, 14]))
  (atx_heading [256, 15] - [258, 0]
    marker: (atx_heading_marker [256, 15] - [256, 16])
    content: (inline [256, 16] - [256, 43]
      (text [256, 16] - [256, 43])))
  (paragraph [258, 0] - [260, 0]
    content: (inline [258, 0] - [258, 158]
      (text [258, 0] - [258, 158])))
  (paragraph [260, 0] - [261, 0]
    content: (inline [260, 0] - [260, 63]
      (text [260, 0] - [260, 63])))
  (paragraph [261, 0] - [262, 0]
    content: (inline [261, 0] - [261, 63]
      (text [261, 0] - [261, 63])))
  (ERROR [262, 0] - [263, 43]
    (list_marker [262, 0] - [262, 1])
    (setext_heading_marker [262, 1] - [262, 23])
    (list_marker [262, 23] - [262, 24])
    (setext_heading_marker [262, 24] - [262, 62])
    (list_marker [262, 62] - [262, 63])
    (code_fence_delimiter [263, 24] - [263, 28])
    (attribute_class [263, 29] - [263, 34])
    (citation_key [263, 34] - [263, 43]))
  (paragraph [263, 43] - [264, 0]
    content: (inline [263, 43] - [263, 63]
      (equals_sign [263, 43] - [263, 44])
      (text [263, 44] - [263, 63])))
  (paragraph [264, 0] - [265, 0]
    content: (inline [264, 0] - [264, 63]
      (text [264, 0] - [264, 63])))
  (paragraph [265, 0] - [266, 0]
    content: (inline [265, 0] - [265, 63]
      (text [265, 0] - [265, 63])))
  (paragraph [266, 0] - [269, 0]
    content: (inline [266, 0] - [268, 63]
      (text [266, 0] - [266, 25])
      (ERROR [266, 25] - [266, 27]
        (inline_cell_delimiter [266, 25] - [266, 26])
        (inline_cell_delimiter [266, 26] - [266, 27]))
      (code_span [266, 27] - [268, 26]
        (code_span_delimiter [266, 27] - [266, 28])
        (code_span_content [266, 28] - [268, 25])
        (code_span_delimiter [268, 25] - [268, 26]))
      (ERROR [268, 26] - [268, 49]
        (inline_cell_delimiter [268, 26] - [268, 27])
        (inline_cell_delimiter [268, 27] - [268, 29])
        (attribute_class [268, 29] - [268, 40])
        (citation_key [268, 40] - [268, 49]))
      (equals_sign [268, 49] - [268, 50])
      (text [268, 50] - [268, 63])))
  (paragraph [269, 0] - [270, 0]
    content: (inline [269, 0] - [269, 63]
      (text [269, 0] - [269, 63])))
  (paragraph [270, 0] - [271, 0]
    content: (inline [270, 0] - [270, 63]
      (text [270, 0] - [270, 63])))
  (paragraph [271, 0] - [274, 0]
    content: (inline [271, 0] - [273, 63]
      (text [271, 0] - [271, 25])
      (ERROR [271, 25] - [271, 27]
        (inline_cell_delimiter [271, 25] - [271, 26])
        (inline_cell_delimiter [271, 26] - [271, 27]))
      (code_span [271, 27] - [273, 26]
        (code_span_delimiter [271, 27] - [271, 28])
        (code_span_content [271, 28] - [273, 25])
        (code_span_delimiter [273, 25] - [273, 26]))
      (ERROR [273, 26] - [273, 49]
        (inline_cell_delimiter [273, 26] - [273, 27])
        (inline_cell_delimiter [273, 27] - [273, 29])
        (attribute_class [273, 29] - [273, 40])
        (citation_key [273, 40] - [273, 49]))
      (equals_sign [273, 49] - [273, 50])
      (text [273, 50] - [273, 63])))
  (paragraph [274, 0] - [275, 0]
    content: (inline [274, 0] - [274, 63]
      (text [274, 0] - [274, 63])))
  (paragraph [275, 0] - [276, 0]
    content: (inline [275, 0] - [275, 63]
      (text [275, 0] - [275, 63])))
  (ERROR [276, 0] - [335, 0]
    (text [276, 0] - [276, 25])
    (ERROR [276, 25] - [276, 27]
      (inline_cell_delimiter [276, 25] - [276, 26])
      (inline_cell_delimiter [276, 26] - [276, 27]))
    (code_span [276, 27] - [279, 49]
      (code_span_delimiter [276, 27] - [276, 28])
      (code_span_content [276, 28] - [279, 48])
      (code_span_delimiter [279, 48] - [279, 49]))
    (text [279, 49] - [279, 52])
    (code_span [279, 52] - [289, 40]
      (code_span_delimiter [279, 52] - [279, 53])
      (code_span_content [279, 53] - [289, 39])
      (code_span_delimiter [289, 39] - [289, 40]))
    (text [289, 40] - [289, 56])
    (code_span [289, 56] - [289, 111]
      (code_span_delimiter [289, 56] - [289, 57])
      (code_span_content [289, 57] - [289, 110])
      (code_span_delimiter [289, 110] - [289, 111]))
    (text [289, 111] - [289, 114])
    (code_span [289, 114] - [289, 120]
      (code_span_delimiter [289, 114] - [289, 115])
      (code_span_content [289, 115] - [289, 119])
      (code_span_delimiter [289, 119] - [289, 120]))
    (text [289, 120] - [289, 125])
    (code_span [289, 125] - [293, 191]
      (code_span_delimiter [289, 125] - [289, 126])
      (code_span_content [289, 126] - [293, 190])
      (code_span_delimiter [293, 190] - [293, 191]))
    (text [293, 191] - [293, 194])
    (code_span [293, 194] - [299, 39]
      (code_span_delimiter [293, 194] - [293, 195])
      (code_span_content [293, 195] - [299, 38])
      (code_span_delimiter [299, 38] - [299, 39]))
    (ERROR [299, 39] - [299, 47]
      (citation_key [299, 40] - [299, 46]))
    (code_span [299, 47] - [299, 54]
      (code_span_delimiter [299, 47] - [299, 48])
      (code_span_content [299, 48] - [299, 53])
      (code_span_delimiter [299, 53] - [299, 54]))
    (ERROR [299, 54] - [299, 57]
      (citation_key [299, 55] - [299, 56]))
    (code_span [299, 57] - [299, 459]
      (code_span_delimiter [299, 57] - [299, 58])
      (code_span_content [299, 58] - [299, 458])
      (code_span_delimiter [299, 458] - [299, 459]))
    (text [299, 459] - [299, 468])
    (code_span [299, 468] - [301, 1]
      (code_span_delimiter [299, 468] - [299, 469])
      (code_span_content [299, 469] - [301, 0])
      (code_span_delimiter [301, 0] - [301, 1]))
    (ERROR [301, 1] - [301, 2]
      (inline_cell_delimiter [301, 1] - [301, 2]))
    (code_span [301, 2] - [303, 1]
      (code_span_delimiter [301, 2] - [301, 3])
      (code_span_content [301, 3] - [303, 0])
      (code_span_delimiter [303, 0] - [303, 1]))
    (ERROR [303, 1] - [303, 2]
      (inline_cell_delimiter [303, 1] - [303, 2]))
    (code_span [303, 2] - [308, 52]
      (code_span_delimiter [303, 2] - [303, 3])
      (code_span_content [303, 3] - [308, 51])
      (code_span_delimiter [308, 51] - [308, 52]))
    (text [308, 52] - [308, 55])
    (code_span [308, 55] - [308, 61]
      (code_span_delimiter [308, 55] - [308, 56])
      (code_span_content [308, 56] - [308, 60])
      (code_span_delimiter [308, 60] - [308, 61]))
    (text [308, 61] - [308, 66])
    (code_span [308, 66] - [315, 40]
      (code_span_delimiter [308, 66] - [308, 67])
      (code_span_content [308, 67] - [315, 39])
      (code_span_delimiter [315, 39] - [315, 40]))
    (text [315, 40] - [315, 56])
    (code_span [315, 56] - [315, 111]
      (code_span_delimiter [315, 56] - [315, 57])
      (code_span_content [315, 57] - [315, 110])
      (code_span_delimiter [315, 110] - [315, 111]))
    (text [315, 111] - [315, 114])
    (code_span [315, 114] - [315, 120]
      (code_span_delimiter [315, 114] - [315, 115])
      (code_span_content [315, 115] - [315, 119])
      (code_span_delimiter [315, 119] - [315, 120]))
    (text [315, 120] - [315, 125])
    (code_span [315, 125] - [319, 42]
      (code_span_delimiter [315, 125] - [315, 126])
      (code_span_content [315, 126] - [319, 41])
      (code_span_delimiter [319, 41] - [319, 42]))
    (text [319, 42] - [319, 46])
    (code_span [319, 46] - [319, 52]
      (code_span_delimiter [319, 46] - [319, 47])
      (code_span_content [319, 47] - [319, 51])
      (code_span_delimiter [319, 51] - [319, 52]))
    (text [319, 52] - [319, 57])
    (code_span [319, 57] - [327, 42]
      (code_span_delimiter [319, 57] - [319, 58])
      (code_span_content [319, 58] - [327, 41])
      (code_span_delimiter [327, 41] - [327, 42]))
    (text [327, 42] - [327, 46])
    (code_span [327, 46] - [327, 56]
      (code_span_delimiter [327, 46] - [327, 47])
      (code_span_content [327, 47] - [327, 55])
      (code_span_delimiter [327, 55] - [327, 56]))
    (text [327, 56] - [327, 60])
    (inline_cell_delimiter [327, 60] - [327, 61])
    (code_span_content [327, 61] - [335, 0])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/projects/virtual-environments.qmd	Parse:    0.74 ms	 24496 bytes/ms	(ERROR [21, 0] - [21, 15])

### File 4: `docs/dashboards/interactivity/shiny-python/index.qmd`

**Error:** Contains ERROR nodes

### File 5: `docs/dashboards/_examples/inputs/input-panel.qmd`

**Error:** Parse failed: (document [0, 0] - [40, 0]
  (yaml_front_matter [0, 0] - [6, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [4, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 22]
          (yaml_string [1, 7] - [1, 22]
            (yaml_string_quoted [1, 7] - [1, 22]))))
      (yaml_pair [2, 0] - [3, 0]
        key: (yaml_key [2, 0] - [2, 6])
        value: (yaml_scalar [2, 8] - [2, 17]
          (yaml_string [2, 8] - [2, 17]
            (yaml_string_unquoted [2, 8] - [2, 17]))))
      (yaml_pair [3, 0] - [4, 0]
        key: (yaml_key [3, 0] - [3, 6])
        value: (yaml_scalar [3, 8] - [3, 13]
          (yaml_string [3, 8] - [3, 13]
            (yaml_string_unquoted [3, 8] - [3, 13])))))
    close: (yaml_front_matter_delimiter [4, 0] - [4, 3]))
  (executable_code_cell [6, 0] - [12, 0]
    open_delimiter: (code_fence_delimiter [6, 0] - [6, 3])
    language: (language_name [6, 4] - [6, 10])
    content: (cell_content [7, 0] - [9, 0]
      (code_line [7, 0] - [7, 21])
      (code_line [8, 0] - [8, 39]))
    close_delimiter: (code_fence_delimiter [9, 0] - [9, 3]))
  (ERROR [12, 0] - [12, 13]
    (atx_heading_marker [12, 0] - [12, 3])
    (attribute_class [12, 4] - [12, 12]))
  (atx_heading [12, 13] - [19, 0]
    marker: (atx_heading_marker [12, 13] - [17, 3])
    content: (inline [17, 3] - [17, 6]
      (text [17, 3] - [17, 6])))
  (ERROR [19, 0] - [19, 19]
    (text [19, 0] - [19, 4])
    (attribute_class [19, 5] - [19, 18]))
  (executable_code_cell [19, 19] - [30, 0]
    open_delimiter: (code_fence_delimiter [19, 19] - [21, 3])
    language: (language_name [21, 4] - [21, 10])
    chunk_options: (chunk_options [22, 0] - [23, 0]
      (chunk_option [22, 0] - [23, 0]
        key: (chunk_option_key [22, 3] - [22, 10])
        value: (chunk_option_value [22, 12] - [22, 24])))
    content: (cell_content [23, 0] - [28, 0]
      (code_line [23, 0] - [23, 36])
      (code_line [24, 0] - [24, 33])
      (code_line [25, 0] - [25, 60])
      (code_line [26, 0] - [26, 65])
      (code_line [27, 0] - [27, 57]))
    close_delimiter: (code_fence_delimiter [28, 0] - [28, 3]))
  (ERROR [30, 0] - [40, 0]
    (fenced_div_delimiter [30, 0] - [30, 3])
    (executable_code_cell [32, 0] - [40, 0]
      open_delimiter: (code_fence_delimiter [32, 0] - [32, 3])
      language: (language_name [32, 4] - [32, 10])
      content: (cell_content [33, 0] - [38, 0]
        (code_line [33, 0] - [33, 12])
        (code_line [34, 0] - [34, 14])
        (code_line [35, 0] - [35, 16])
        (code_line [36, 0] - [36, 55])
        (code_line [37, 0] - [37, 56]))
      close_delimiter: (code_fence_delimiter [38, 0] - [38, 3]))))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/dashboards/_examples/inputs/input-panel.qmd	Parse:    0.13 ms	  5015 bytes/ms	(ERROR [12, 0] - [12, 13])

### File 6: `docs/reference/formats/docx.qmd`

**Error:** Parse failed: (document [0, 0] - [9, 0]
  (yaml_front_matter [0, 0] - [6, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [4, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 24]
          (yaml_string [1, 7] - [1, 24]
            (yaml_string_quoted [1, 7] - [1, 24]))))
      (yaml_pair [2, 0] - [4, 0]
        key: (yaml_key [2, 0] - [2, 4])
        (ERROR [2, 4] - [3, 6]
          (yaml_scalar [2, 6] - [2, 11]
            (yaml_string [2, 6] - [2, 11]
              (yaml_string_unquoted [2, 6] - [2, 11])))
          (ERROR [2, 12] - [2, 14])
          (citation_key [2, 14] - [2, 16])
          (attribute_class [2, 16] - [2, 26])
          (attribute_class [2, 26] - [2, 30])
          (ERROR [2, 30] - [2, 31])
          (citation_key [2, 31] - [2, 35])
          (ERROR [2, 35] - [2, 36])
          (citation_key [2, 36] - [2, 51])
          (citation_key [3, 0] - [3, 6]))
        value: (yaml_scalar [3, 8] - [3, 12]
          (yaml_boolean [3, 8] - [3, 12]))))
    close: (yaml_front_matter_delimiter [4, 0] - [4, 3]))
  (paragraph [6, 0] - [6, 135]
    content: (inline [6, 0] - [6, 135]
      (text [6, 0] - [6, 135])))
  (ERROR [6, 135] - [9, 0]
    (html_open_tag [6, 135] - [6, 182])
    (html_block_content [6, 182] - [6, 183])
    (html_block_content [8, 0] - [8, 126])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/reference/formats/docx.qmd	Parse:    0.09 ms	  4690 bytes/ms	(ERROR [2, 4] - [3, 6])

### File 7: `docs/publishing/ci.qmd`

**Error:** Parse failed: (document [0, 0] - [194, 0]
  (yaml_front_matter [0, 0] - [4, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [2, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 52]
          (yaml_string [1, 7] - [1, 52]
            (yaml_string_quoted [1, 7] - [1, 52])))))
    close: (yaml_front_matter_delimiter [2, 0] - [2, 3]))
  (atx_heading [4, 0] - [6, 0]
    marker: (atx_heading_marker [4, 0] - [4, 3])
    content: (inline [4, 3] - [4, 11]
      (text [4, 3] - [4, 11])))
  (paragraph [6, 0] - [8, 0]
    content: (inline [6, 0] - [6, 235]
      (text [6, 0] - [6, 235])))
  (paragraph [8, 0] - [10, 0]
    content: (inline [8, 0] - [8, 118]
      (text [8, 0] - [8, 118])))
  (paragraph [10, 0] - [16, 0]
    content: (inline [10, 0] - [14, 195]
      (text [10, 0] - [10, 185])
      (link [10, 185] - [14, 97]
        text: (link_text [10, 186] - [10, 202])
        (ERROR [10, 203] - [14, 71]
          (ERROR [10, 204] - [10, 205])
          (citation_key [12, 1] - [12, 7])
          (citation_key [12, 7] - [12, 16])
          (citation_key [12, 16] - [12, 25])
          (citation_key [12, 25] - [12, 32])
          (citation_key [12, 32] - [12, 37])
          (citation_key [12, 37] - [12, 45])
          (citation_key [12, 45] - [12, 53])
          (citation_key [12, 53] - [12, 59])
          (citation_key [12, 59] - [12, 65])
          (citation_key [12, 65] - [12, 73])
          (citation_key [12, 73] - [12, 77])
          (citation_key [12, 77] - [12, 85])
          (citation_key [12, 85] - [12, 91])
          (citation_key [12, 91] - [12, 101])
          (ERROR [12, 101] - [12, 102])
          (citation_key [14, 0] - [14, 4])
          (citation_key [14, 4] - [14, 12])
          (citation_key [14, 12] - [14, 19])
          (citation_key [14, 19] - [14, 23])
          (citation_key [14, 23] - [14, 26])
          (citation_key [14, 26] - [14, 36])
          (citation_key [14, 36] - [14, 39])
          (citation_key [14, 39] - [14, 43])
          (citation_key [14, 43] - [14, 50])
          (citation_key [14, 50] - [14, 56])
          (citation_key [14, 56] - [14, 63])
          (citation_key [14, 63] - [14, 71]))
        destination: (link_destination [14, 73] - [14, 96]))
      (text [14, 97] - [14, 195])))
  (atx_heading [16, 0] - [18, 0]
    marker: (atx_heading_marker [16, 0] - [16, 3])
    content: (inline [16, 3] - [16, 19]
      (text [16, 3] - [16, 19])))
  (paragraph [18, 0] - [20, 0]
    content: (inline [18, 0] - [18, 317]
      (text [18, 0] - [18, 151])
      (code_span [18, 151] - [18, 166]
        (code_span_delimiter [18, 151] - [18, 152])
        (code_span_content [18, 152] - [18, 165])
        (code_span_delimiter [18, 165] - [18, 166]))
      (text [18, 166] - [18, 317])))
  (paragraph [20, 0] - [22, 0]
    content: (inline [20, 0] - [20, 100]
      (text [20, 0] - [20, 100])))
  (paragraph [22, 0] - [24, 0]
    content: (inline [22, 0] - [22, 115]
      (text [22, 0] - [22, 115])))
  (paragraph [24, 0] - [26, 0]
    content: (inline [24, 0] - [24, 138]
      (text [24, 0] - [24, 138])))
  (paragraph [26, 0] - [28, 0]
    content: (inline [26, 0] - [26, 154]
      (text [26, 0] - [26, 154])))
  (paragraph [28, 0] - [30, 0]
    content: (inline [28, 0] - [28, 193]
      (text [28, 0] - [28, 116])
      (code_span [28, 116] - [28, 131]
        (code_span_delimiter [28, 116] - [28, 117])
        (code_span_content [28, 117] - [28, 130])
        (code_span_delimiter [28, 130] - [28, 131]))
      (text [28, 131] - [28, 193])))
  (paragraph [30, 0] - [32, 0]
    content: (inline [30, 0] - [30, 413]
      (text [30, 0] - [30, 4])
      (strong_emphasis [30, 4] - [30, 37]
        (strong_emphasis_delimiter [30, 4] - [30, 6])
        (text [30, 6] - [30, 35])
        (strong_emphasis_delimiter [30, 35] - [30, 37]))
      (text [30, 37] - [30, 115])
      (code_span [30, 115] - [30, 122]
        (code_span_delimiter [30, 115] - [30, 116])
        (code_span_content [30, 116] - [30, 121])
        (code_span_delimiter [30, 121] - [30, 122]))
      (text [30, 122] - [30, 413])))
  (paragraph [32, 0] - [34, 0]
    content: (inline [32, 0] - [32, 430]
      (text [32, 0] - [32, 4])
      (strong_emphasis [32, 4] - [32, 41]
        (strong_emphasis_delimiter [32, 4] - [32, 6])
        (text [32, 6] - [32, 39])
        (strong_emphasis_delimiter [32, 39] - [32, 41]))
      (text [32, 41] - [32, 115])
      (link [32, 115] - [32, 186]
        text: (link_text [32, 116] - [32, 143])
        destination: (link_destination [32, 145] - [32, 185]))
      (text [32, 186] - [32, 232])
      (code_span [32, 232] - [32, 241]
        (code_span_delimiter [32, 232] - [32, 233])
        (code_span_content [32, 233] - [32, 240])
        (code_span_delimiter [32, 240] - [32, 241]))
      (text [32, 241] - [32, 329])
      (code_span [32, 329] - [32, 338]
        (code_span_delimiter [32, 329] - [32, 330])
        (code_span_content [32, 330] - [32, 337])
        (code_span_delimiter [32, 337] - [32, 338]))
      (text [32, 338] - [32, 430])))
  (paragraph [34, 0] - [36, 0]
    content: (inline [34, 0] - [34, 469]
      (text [34, 0] - [34, 4])
      (strong_emphasis [34, 4] - [34, 34]
        (strong_emphasis_delimiter [34, 4] - [34, 6])
        (text [34, 6] - [34, 32])
        (strong_emphasis_delimiter [34, 32] - [34, 34]))
      (text [34, 34] - [34, 244])
      (code_span [34, 244] - [34, 255]
        (code_span_delimiter [34, 244] - [34, 245])
        (code_span_content [34, 245] - [34, 254])
        (code_span_delimiter [34, 254] - [34, 255]))
      (text [34, 255] - [34, 264])
      (code_span [34, 264] - [34, 282]
        (code_span_delimiter [34, 264] - [34, 265])
        (code_span_content [34, 265] - [34, 281])
        (code_span_delimiter [34, 281] - [34, 282]))
      (text [34, 282] - [34, 469])))
  (paragraph [36, 0] - [38, 0]
    content: (inline [36, 0] - [36, 212]
      (text [36, 0] - [36, 69])
      (link [36, 69] - [36, 112]
        text: (link_text [36, 70] - [36, 84])
        (ERROR [36, 85] - [36, 95]
          (ERROR [36, 85] - [36, 86])
          (citation_key [36, 86] - [36, 95]))
        reference: (reference_label [36, 97] - [36, 111]))
      (text [36, 112] - [36, 175])
      (link [36, 175] - [36, 211]
        text: (link_text [36, 176] - [36, 189])
        destination: (link_destination [36, 191] - [36, 210]))
      (text [36, 211] - [36, 212])))
  (atx_heading [38, 0] - [40, 0]
    marker: (atx_heading_marker [38, 0] - [38, 3])
    content: (inline [38, 3] - [38, 17]
      (text [38, 3] - [38, 17])))
  (paragraph [40, 0] - [42, 0]
    content: (inline [40, 0] - [40, 396]
      (link [40, 0] - [40, 52]
        (ERROR [40, 1] - [40, 15]
          (reference_label [40, 1] - [40, 15]))
        destination: (link_destination [40, 17] - [40, 51]))
      (ERROR [40, 52] - [40, 65]
        (citation_key [40, 53] - [40, 57])
        (citation_key [40, 58] - [40, 65]))
      (equals_sign [40, 65] - [40, 66])
      (text [40, 66] - [40, 252])
      (link [40, 252] - [40, 308]
        text: (link_text [40, 253] - [40, 261])
        destination: (link_destination [40, 263] - [40, 307]))
      (text [40, 308] - [40, 396])))
  (paragraph [42, 0] - [44, 0]
    content: (inline [42, 0] - [42, 71]
      (text [42, 0] - [42, 71])))
  (paragraph [44, 0] - [45, 0]
    content: (inline [44, 0] - [44, 46]
      (text [44, 0] - [44, 4])
      (link [44, 4] - [44, 46]
        text: (link_text [44, 5] - [44, 15])
        destination: (link_destination [44, 17] - [44, 45]))))
  (paragraph [45, 0] - [46, 0]
    content: (inline [45, 0] - [45, 50]
      (text [45, 0] - [45, 4])
      (link [45, 4] - [45, 50]
        text: (link_text [45, 5] - [45, 17])
        destination: (link_destination [45, 19] - [45, 49]))))
  (paragraph [46, 0] - [48, 0]
    content: (inline [46, 0] - [46, 40]
      (text [46, 0] - [46, 4])
      (link [46, 4] - [46, 40]
        text: (link_text [46, 5] - [46, 12])
        destination: (link_destination [46, 14] - [46, 39]))))
  (paragraph [48, 0] - [50, 0]
    content: (inline [48, 0] - [48, 168]
      (text [48, 0] - [48, 83])
      (link [48, 83] - [48, 156]
        text: (link_text [48, 84] - [48, 109])
        destination: (link_destination [48, 111] - [48, 155]))
      (text [48, 156] - [48, 168])))
  (atx_heading [50, 0] - [52, 0]
    marker: (atx_heading_marker [50, 0] - [50, 3])
    content: (inline [50, 3] - [50, 16]
      (text [50, 3] - [50, 16])))
  (paragraph [52, 0] - [54, 0]
    content: (inline [52, 0] - [52, 205]
      (text [52, 0] - [52, 205])))
  (paragraph [54, 0] - [56, 0]
    content: (inline [54, 0] - [54, 141]
      (text [54, 0] - [54, 51])
      (link [54, 51] - [54, 122]
        text: (link_text [54, 52] - [54, 70])
        destination: (link_destination [54, 72] - [54, 121]))
      (text [54, 122] - [54, 141])))
  (atx_heading [56, 0] - [58, 0]
    marker: (atx_heading_marker [56, 0] - [56, 3])
    content: (inline [56, 3] - [56, 17]
      (text [56, 3] - [56, 17])))
  (paragraph [58, 0] - [60, 0]
    content: (inline [58, 0] - [58, 140]
      (text [58, 0] - [58, 30])
      (code_span [58, 30] - [58, 46]
        (code_span_delimiter [58, 30] - [58, 31])
        (code_span_content [58, 31] - [58, 45])
        (code_span_delimiter [58, 45] - [58, 46]))
      (text [58, 46] - [58, 140])))
  (paragraph [60, 0] - [61, 0]
    content: (inline [60, 0] - [60, 27]
      (text [60, 0] - [60, 27])))
  (paragraph [61, 0] - [62, 0]
    content: (inline [61, 0] - [61, 83]
      (text [61, 0] - [61, 83])))
  (paragraph [62, 0] - [64, 0]
    content: (inline [62, 0] - [62, 53]
      (text [62, 0] - [62, 53])))
  (shortcode_block [64, 0] - [65, 0]
    (shortcode_open [64, 0] - [64, 4])
    name: (shortcode_name [64, 4] - [64, 11])
    arguments: (shortcode_arguments [64, 11] - [64, 35])
    (shortcode_close [64, 35] - [65, 0]))
  (blank_line [65, 0] - [66, 0])
  (paragraph [66, 0] - [68, 0]
    content: (inline [66, 0] - [66, 118]
      (text [66, 0] - [66, 118])))
  (atx_heading [68, 0] - [70, 0]
    marker: (atx_heading_marker [68, 0] - [68, 4])
    content: (inline [68, 4] - [68, 25]
      (text [68, 4] - [68, 25])))
  (paragraph [70, 0] - [72, 0]
    content: (inline [70, 0] - [70, 105]
      (text [70, 0] - [70, 105])))
  (ERROR [72, 0] - [72, 18]
    (code_fence_delimiter [72, 0] - [72, 3])
    (attribute_class [72, 4] - [72, 9])
    (citation_key [72, 9] - [72, 18]))
  (paragraph [72, 18] - [73, 0]
    content: (inline [72, 18] - [72, 30]
      (equals_sign [72, 18] - [72, 19])
      (text [72, 19] - [72, 30])))
  (paragraph [73, 0] - [74, 0]
    content: (inline [73, 0] - [73, 14]
      (text [73, 0] - [73, 14])))
  (fenced_code_block [74, 0] - [84, 0]
    open: (code_fence_delimiter [74, 0] - [74, 3])
    (code_line [76, 0] - [76, 122])
    (code_line [78, 0] - [78, 99])
    (code_line [80, 0] - [80, 30])
    (code_line [81, 0] - [81, 26])
    close: (code_fence_delimiter [82, 0] - [82, 3]))
  (paragraph [84, 0] - [86, 0]
    content: (inline [84, 0] - [84, 439]
      (text [84, 0] - [84, 24])
      (code_span [84, 24] - [84, 40]
        (code_span_delimiter [84, 24] - [84, 25])
        (code_span_content [84, 25] - [84, 39])
        (code_span_delimiter [84, 39] - [84, 40]))
      (text [84, 40] - [84, 375])
      (link [84, 375] - [84, 438]
        text: (link_text [84, 376] - [84, 396])
        destination: (link_destination [84, 398] - [84, 437]))
      (text [84, 438] - [84, 439])))
  (paragraph [86, 0] - [88, 0]
    content: (inline [86, 0] - [86, 212]
      (text [86, 0] - [86, 96])
      (link [86, 96] - [86, 146]
        text: (link_text [86, 97] - [86, 103])
        destination: (link_destination [86, 105] - [86, 145]))
      (text [86, 146] - [86, 193])
      (code_span [86, 193] - [86, 206]
        (code_span_delimiter [86, 193] - [86, 194])
        (code_span_content [86, 194] - [86, 205])
        (code_span_delimiter [86, 205] - [86, 206]))
      (text [86, 206] - [86, 212])))
  (fenced_code_block [88, 0] - [93, 0]
    open: (code_fence_delimiter [88, 0] - [88, 3])
    info: (info_string [88, 3] - [88, 8])
    (code_line [89, 0] - [89, 8])
    (code_line [90, 0] - [90, 14])
    close: (code_fence_delimiter [91, 0] - [91, 3]))
  (paragraph [93, 0] - [95, 0]
    content: (inline [93, 0] - [93, 293]
      (text [93, 0] - [93, 80])
      (code_span [93, 80] - [93, 89]
        (code_span_delimiter [93, 80] - [93, 81])
        (code_span_content [93, 81] - [93, 88])
        (code_span_delimiter [93, 88] - [93, 89]))
      (text [93, 89] - [93, 145])
      (code_span [93, 145] - [93, 161]
        (code_span_delimiter [93, 145] - [93, 146])
        (code_span_content [93, 146] - [93, 160])
        (code_span_delimiter [93, 160] - [93, 161]))
      (text [93, 161] - [93, 165])
      (code_span [93, 165] - [93, 180]
        (code_span_delimiter [93, 165] - [93, 166])
        (code_span_content [93, 166] - [93, 179])
        (code_span_delimiter [93, 179] - [93, 180]))
      (text [93, 180] - [93, 293])))
  (atx_heading [95, 0] - [97, 0]
    marker: (atx_heading_marker [95, 0] - [95, 4])
    content: (inline [95, 4] - [95, 26]
      (text [95, 4] - [95, 26])))
  (paragraph [97, 0] - [99, 0]
    content: (inline [97, 0] - [97, 87]
      (text [97, 0] - [97, 62])
      (code_span [97, 62] - [97, 78]
        (code_span_delimiter [97, 62] - [97, 63])
        (code_span_content [97, 63] - [97, 77])
        (code_span_delimiter [97, 77] - [97, 78]))
      (text [97, 78] - [97, 87])))
  (paragraph [99, 0] - [100, 0]
    content: (inline [99, 0] - [99, 78]
      (text [99, 0] - [99, 26])
      (code_span [99, 26] - [99, 40]
        (code_span_delimiter [99, 26] - [99, 27])
        (code_span_content [99, 27] - [99, 39])
        (code_span_delimiter [99, 39] - [99, 40]))
      (text [99, 40] - [99, 78])))
  (paragraph [100, 0] - [102, 0]
    content: (inline [100, 0] - [100, 63]
      (text [100, 0] - [100, 40])
      (code_span [100, 40] - [100, 46]
        (code_span_delimiter [100, 40] - [100, 41])
        (code_span_content [100, 41] - [100, 45])
        (code_span_delimiter [100, 45] - [100, 46]))
      (text [100, 46] - [100, 51])
      (code_span [100, 51] - [100, 61]
        (code_span_delimiter [100, 51] - [100, 52])
        (code_span_content [100, 52] - [100, 60])
        (code_span_delimiter [100, 60] - [100, 61]))
      (text [100, 61] - [100, 63])))
  (paragraph [102, 0] - [104, 0]
    content: (inline [102, 0] - [102, 163]
      (text [102, 0] - [102, 21])
      (code_span [102, 21] - [102, 37]
        (code_span_delimiter [102, 21] - [102, 22])
        (code_span_content [102, 22] - [102, 36])
        (code_span_delimiter [102, 36] - [102, 37]))
      (text [102, 37] - [102, 103])
      (code_span [102, 103] - [102, 117]
        (code_span_delimiter [102, 103] - [102, 104])
        (code_span_content [102, 104] - [102, 116])
        (code_span_delimiter [102, 116] - [102, 117]))
      (text [102, 117] - [102, 163])))
  (fenced_code_block [104, 0] - [111, 0]
    open: (code_fence_delimiter [104, 0] - [104, 3])
    info: (info_string [104, 3] - [104, 8])
    (code_line [105, 0] - [105, 17])
    (ERROR [106, 0] - [108, 55]
      (chunk_option_value [106, 0] - [106, 10])
      (table_delimiter_cell [106, 10] - [107, 6])
      (citation_key [107, 6] - [107, 8])
      (ERROR [107, 11] - [107, 12])
      (citation_key [107, 12] - [107, 19])
      (ERROR [107, 20] - [107, 22])
      (citation_key [107, 22] - [107, 24])
      (ERROR [107, 25] - [107, 26])
      (citation_key [107, 26] - [107, 29])
      (ERROR [107, 30] - [107, 33])
      (citation_key [107, 33] - [107, 34])
      (ERROR [107, 35] - [107, 36])
      (citation_key [107, 36] - [107, 47])
      (citation_key [108, 0] - [108, 9])
      (citation_key [108, 12] - [108, 17])
      (ERROR [108, 18] - [108, 20])
      (citation_key [108, 20] - [108, 27])
      (citation_key [108, 28] - [108, 35])
      (ERROR [108, 36] - [108, 38])
      (citation_key [108, 38] - [108, 42])
      (attribute_class [108, 42] - [108, 50])
      (attribute_class [108, 50] - [108, 54]))
    close: (code_fence_delimiter [109, 0] - [109, 3]))
  (paragraph [111, 0] - [113, 0]
    content: (inline [111, 0] - [111, 295]
      (text [111, 0] - [111, 18])
      (code_span [111, 18] - [111, 32]
        (code_span_delimiter [111, 18] - [111, 19])
        (code_span_content [111, 19] - [111, 31])
        (code_span_delimiter [111, 31] - [111, 32]))
      (text [111, 32] - [111, 133])
      (code_span [111, 133] - [111, 149]
        (code_span_delimiter [111, 133] - [111, 134])
        (code_span_content [111, 134] - [111, 148])
        (code_span_delimiter [111, 148] - [111, 149]))
      (text [111, 149] - [111, 190])
      (code_span [111, 190] - [111, 204]
        (code_span_delimiter [111, 190] - [111, 191])
        (code_span_content [111, 191] - [111, 203])
        (code_span_delimiter [111, 203] - [111, 204]))
      (text [111, 204] - [111, 290])
      (code_span [111, 290] - [111, 294]
        (code_span_delimiter [111, 290] - [111, 291])
        (code_span_content [111, 291] - [111, 293])
        (code_span_delimiter [111, 293] - [111, 294]))
      (text [111, 294] - [111, 295])))
  (ERROR [113, 0] - [113, 18]
    (code_fence_delimiter [113, 0] - [113, 3])
    (attribute_class [113, 4] - [113, 9])
    (citation_key [113, 9] - [113, 18]))
  (paragraph [113, 18] - [114, 0]
    content: (inline [113, 18] - [113, 30]
      (equals_sign [113, 18] - [113, 19])
      (text [113, 19] - [113, 30])))
  (paragraph [114, 0] - [115, 0]
    content: (inline [114, 0] - [114, 22]
      (text [114, 0] - [114, 22])))
  (fenced_code_block [115, 0] - [123, 0]
    open: (code_fence_delimiter [115, 0] - [115, 3])
    (code_line [117, 0] - [117, 95])
    (code_line [119, 0] - [119, 30])
    (code_line [120, 0] - [120, 64])
    close: (code_fence_delimiter [121, 0] - [121, 3]))
  (paragraph [123, 0] - [125, 0]
    content: (inline [123, 0] - [123, 129]
      (text [123, 0] - [123, 53])
      (code_span [123, 53] - [123, 67]
        (code_span_delimiter [123, 53] - [123, 54])
        (code_span_content [123, 54] - [123, 66])
        (code_span_delimiter [123, 66] - [123, 67]))
      (text [123, 67] - [123, 77])
      (code_span [123, 77] - [123, 83]
        (code_span_delimiter [123, 77] - [123, 78])
        (code_span_content [123, 78] - [123, 82])
        (code_span_delimiter [123, 82] - [123, 83]))
      (text [123, 83] - [123, 129])))
  (atx_heading [125, 0] - [127, 0]
    marker: (atx_heading_marker [125, 0] - [125, 4])
    content: (inline [125, 4] - [125, 26]
      (text [125, 4] - [125, 26])))
  (paragraph [127, 0] - [129, 0]
    content: (inline [127, 0] - [127, 178]
      (text [127, 0] - [127, 178])))
  (pipe_table [129, 0] - [135, 0]
    (pipe_table_start [129, 0] - [129, 0])
    (pipe_table_header [129, 0] - [130, 0]
      content: (table_cell [129, 1] - [129, 18])
      content: (table_cell [129, 19] - [129, 94]))
    (pipe_table_delimiter [130, 0] - [131, 0]
      (table_delimiter_cell [130, 1] - [130, 18])
      (table_delimiter_cell [130, 19] - [130, 94]))
    (pipe_table_row [131, 0] - [132, 0])
    (pipe_table_row [132, 0] - [133, 0])
    (pipe_table_row [133, 0] - [134, 0])
    (pipe_table_row [134, 0] - [135, 0]))
  (blank_line [135, 0] - [136, 0])
  (paragraph [136, 0] - [138, 0]
    content: (inline [136, 0] - [136, 96]
      (text [136, 0] - [136, 66])
      (code_span [136, 66] - [136, 82]
        (code_span_delimiter [136, 66] - [136, 67])
        (code_span_content [136, 67] - [136, 81])
        (code_span_delimiter [136, 81] - [136, 82]))
      (text [136, 82] - [136, 96])))
  (ERROR [138, 0] - [138, 18]
    (code_fence_delimiter [138, 0] - [138, 3])
    (attribute_class [138, 4] - [138, 9])
    (citation_key [138, 9] - [138, 18]))
  (paragraph [138, 18] - [139, 0]
    content: (inline [138, 18] - [138, 30]
      (equals_sign [138, 18] - [138, 19])
      (text [138, 19] - [138, 30])))
  (paragraph [139, 0] - [140, 0]
    content: (inline [139, 0] - [139, 38]
      (text [139, 0] - [139, 14])
      (emphasis [139, 14] - [139, 20]
        (emphasis_delimiter [139, 14] - [139, 15])
        (text [139, 15] - [139, 19])
        (emphasis_delimiter [139, 19] - [139, 20]))
      (text [139, 20] - [139, 25])
      (equals_sign [139, 25] - [139, 26])
      (text [139, 26] - [139, 38])))
  (paragraph [140, 0] - [141, 0]
    content: (inline [140, 0] - [140, 23]
      (text [140, 0] - [140, 23])))
  (fenced_code_block [141, 0] - [151, 0]
    open: (code_fence_delimiter [141, 0] - [141, 3])
    (code_line [143, 0] - [143, 100])
    (code_line [145, 0] - [145, 30])
    (code_line [146, 0] - [146, 50])
    (code_line [147, 0] - [147, 35])
    (code_line [148, 0] - [148, 64])
    close: (code_fence_delimiter [149, 0] - [149, 3]))
  (atx_heading [151, 0] - [153, 0]
    marker: (atx_heading_marker [151, 0] - [151, 4])
    content: (inline [151, 4] - [151, 21]
      (text [151, 4] - [151, 21])))
  (paragraph [153, 0] - [155, 0]
    content: (inline [153, 0] - [153, 97]
      (text [153, 0] - [153, 97])))
  (ERROR [155, 0] - [155, 18]
    (code_fence_delimiter [155, 0] - [155, 3])
    (attribute_class [155, 4] - [155, 9])
    (citation_key [155, 9] - [155, 18]))
  (paragraph [155, 18] - [156, 0]
    content: (inline [155, 18] - [155, 30]
      (equals_sign [155, 18] - [155, 19])
      (text [155, 19] - [155, 30])))
  (atx_heading [156, 0] - [158, 0]
    marker: (atx_heading_marker [156, 0] - [156, 2])
    content: (inline [156, 2] - [157, 41]
      (text [156, 2] - [156, 49])
      (emphasis [156, 49] - [157, 14]
        (emphasis_delimiter [156, 49] - [156, 50])
        (text [156, 50] - [156, 61])
        (text [157, 0] - [157, 13])
        (emphasis_delimiter [157, 13] - [157, 14]))
      (text [157, 14] - [157, 17])
      (emphasis [157, 17] - [157, 23]
        (emphasis_delimiter [157, 17] - [157, 18])
        (text [157, 18] - [157, 22])
        (emphasis_delimiter [157, 22] - [157, 23]))
      (text [157, 23] - [157, 28])
      (equals_sign [157, 28] - [157, 29])
      (text [157, 29] - [157, 41])))
  (paragraph [158, 0] - [159, 0]
    content: (inline [158, 0] - [158, 37]
      (text [158, 0] - [158, 37])))
  (fenced_code_block [159, 0] - [167, 0]
    open: (code_fence_delimiter [159, 0] - [159, 3])
    (code_line [161, 0] - [161, 30])
    (code_line [162, 0] - [162, 53])
    (code_line [163, 0] - [163, 38])
    (code_line [164, 0] - [164, 22])
    close: (code_fence_delimiter [165, 0] - [165, 3]))
  (ERROR [167, 0] - [167, 18]
    (code_fence_delimiter [167, 0] - [167, 3])
    (attribute_class [167, 4] - [167, 9])
    (citation_key [167, 9] - [167, 18]))
  (paragraph [167, 18] - [168, 0]
    content: (inline [167, 18] - [167, 30]
      (equals_sign [167, 18] - [167, 19])
      (text [167, 19] - [167, 30])))
  (atx_heading [168, 0] - [169, 0]
    marker: (atx_heading_marker [168, 0] - [168, 2])
    content: (inline [168, 2] - [168, 53]
      (text [168, 2] - [168, 53])))
  (paragraph [169, 0] - [170, 0]
    content: (inline [169, 0] - [169, 38]
      (text [169, 0] - [169, 14])
      (emphasis [169, 14] - [169, 20]
        (emphasis_delimiter [169, 14] - [169, 15])
        (text [169, 15] - [169, 19])
        (emphasis_delimiter [169, 19] - [169, 20]))
      (text [169, 20] - [169, 25])
      (equals_sign [169, 25] - [169, 26])
      (text [169, 26] - [169, 38])))
  (paragraph [170, 0] - [171, 0]
    content: (inline [170, 0] - [170, 76]
      (text [170, 0] - [170, 76])))
  (fenced_code_block [171, 0] - [180, 0]
    open: (code_fence_delimiter [171, 0] - [171, 3])
    (code_line [173, 0] - [173, 30])
    (code_line [174, 0] - [174, 58])
    (code_line [175, 0] - [175, 50])
    (code_line [176, 0] - [176, 35])
    (code_line [177, 0] - [177, 34])
    close: (code_fence_delimiter [178, 0] - [178, 3]))
  (ERROR [180, 0] - [180, 18]
    (code_fence_delimiter [180, 0] - [180, 3])
    (attribute_class [180, 4] - [180, 9])
    (citation_key [180, 9] - [180, 18]))
  (paragraph [180, 18] - [181, 0]
    content: (inline [180, 18] - [180, 30]
      (equals_sign [180, 18] - [180, 19])
      (text [180, 19] - [180, 30])))
  (atx_heading [181, 0] - [182, 0]
    marker: (atx_heading_marker [181, 0] - [181, 2])
    content: (inline [181, 2] - [181, 48]
      (text [181, 2] - [181, 48])))
  (paragraph [182, 0] - [189, 0]
    content: (inline [182, 0] - [188, 56]
      (text [182, 0] - [182, 14])
      (emphasis [182, 14] - [183, 15]
        (emphasis_delimiter [182, 14] - [182, 15])
        (text [182, 15] - [182, 21])
        (equals_sign [182, 21] - [182, 22])
        (text [182, 22] - [182, 50])
        (text [183, 0] - [183, 14])
        (emphasis_delimiter [183, 14] - [183, 15]))
      (text [183, 15] - [183, 18])
      (emphasis [183, 18] - [188, 45]
        (emphasis_delimiter [183, 18] - [183, 19])
        (text [183, 19] - [183, 22])
        (equals_sign [183, 22] - [183, 23])
        (text [183, 23] - [183, 35])
        (text [184, 0] - [184, 64])
        (ERROR [185, 0] - [185, 2]
          (inline_cell_delimiter [185, 0] - [185, 1])
          (inline_cell_delimiter [185, 1] - [185, 2]))
        (code_span [185, 2] - [187, 1]
          (code_span_delimiter [185, 2] - [185, 3])
          (code_span_content [185, 3] - [187, 0])
          (code_span_delimiter [187, 0] - [187, 1]))
        (ERROR [187, 1] - [187, 18]
          (inline_cell_delimiter [187, 1] - [187, 2])
          (inline_cell_delimiter [187, 2] - [187, 4])
          (attribute_class [187, 4] - [187, 9])
          (citation_key [187, 9] - [187, 18]))
        (equals_sign [187, 18] - [187, 19])
        (text [187, 19] - [187, 30])
        (text [188, 0] - [188, 44])
        (emphasis_delimiter [188, 44] - [188, 45]))
      (text [188, 45] - [188, 56])))
  (paragraph [189, 0] - [190, 0]
    content: (inline [189, 0] - [189, 41]
      (text [189, 0] - [189, 17])
      (emphasis [189, 17] - [189, 23]
        (emphasis_delimiter [189, 17] - [189, 18])
        (text [189, 18] - [189, 22])
        (emphasis_delimiter [189, 22] - [189, 23]))
      (text [189, 23] - [189, 28])
      (equals_sign [189, 28] - [189, 29])
      (text [189, 29] - [189, 41])))
  (paragraph [190, 0] - [191, 0]
    content: (inline [190, 0] - [190, 45]
      (text [190, 0] - [190, 17])
      (emphasis [190, 17] - [190, 23]
        (emphasis_delimiter [190, 17] - [190, 18])
        (text [190, 18] - [190, 22])
        (emphasis_delimiter [190, 22] - [190, 23]))
      (text [190, 23] - [190, 28])
      (equals_sign [190, 28] - [190, 29])
      (text [190, 29] - [190, 34])
      (citation [190, 34] - [190, 41]
        key: (citation_key [190, 35] - [190, 41]))
      (text [190, 41] - [190, 45])))
  (ERROR [191, 0] - [194, 0]
    (text [191, 0] - [191, 17])
    (emphasis_delimiter [191, 17] - [191, 18])
    (text [191, 18] - [191, 24])
    (equals_sign [191, 24] - [191, 25])
    (text [191, 25] - [191, 54])
    (text [192, 0] - [192, 50])
    (ERROR [193, 0] - [193, 2]
      (inline_cell_delimiter [193, 0] - [193, 1])
      (inline_cell_delimiter [193, 1] - [193, 2]))
    (inline_cell_delimiter [193, 2] - [193, 3])
    (code_span_content [193, 3] - [194, 0])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/publishing/ci.qmd	Parse:    0.50 ms	 21015 bytes/ms	(ERROR [10, 203] - [14, 71])

### File 8: `docs/get-started/hello/rstudio.qmd`

**Error:** Parse failed: (document [0, 0] - [146, 0]
  (yaml_front_matter [0, 0] - [10, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [8, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 32]
          (yaml_string [1, 7] - [1, 32]
            (yaml_string_quoted [1, 7] - [1, 32]))))
      (yaml_pair [2, 0] - [5, 0]
        key: (yaml_key [2, 0] - [2, 14])
        (ERROR [2, 14] - [4, 8]
          (yaml_scalar [3, 2] - [3, 10]
            (yaml_string [3, 2] - [3, 10]
              (yaml_string_unquoted [3, 2] - [3, 10])))
          (citation_key [4, 0] - [4, 8]))
        value: (yaml_scalar [4, 10] - [4, 18]
          (yaml_string [4, 10] - [4, 18]
            (yaml_string_unquoted [4, 10] - [4, 18]))))
      (yaml_pair [5, 4] - [6, 0]
        key: (yaml_key [5, 4] - [5, 13])
        value: (yaml_scalar [5, 15] - [5, 19]
          (yaml_boolean [5, 15] - [5, 19])))
      (yaml_pair [6, 0] - [8, 0]
        key: (yaml_key [6, 0] - [6, 4])
        (ERROR [6, 4] - [7, 6]
          (yaml_scalar [7, 2] - [7, 6]
            (yaml_string [7, 2] - [7, 6]
              (yaml_string_unquoted [7, 2] - [7, 6]))))
        value: (yaml_scalar [7, 8] - [7, 15]
          (yaml_string [7, 8] - [7, 15]
            (yaml_string_unquoted [7, 8] - [7, 15])))))
    close: (yaml_front_matter_delimiter [8, 0] - [8, 3]))
  (shortcode_block [10, 0] - [11, 0]
    (shortcode_open [10, 0] - [10, 4])
    name: (shortcode_name [10, 4] - [10, 11])
    arguments: (shortcode_arguments [10, 11] - [10, 32])
    (shortcode_close [10, 32] - [11, 0]))
  (atx_heading [11, 0] - [14, 0]
    marker: (atx_heading_marker [11, 0] - [12, 3])
    content: (inline [12, 3] - [12, 11]
      (text [12, 3] - [12, 11])))
  (paragraph [14, 0] - [16, 0]
    content: (inline [14, 0] - [14, 241]
      (text [14, 0] - [14, 28])
      (link [14, 28] - [14, 70]
        text: (link_text [14, 29] - [14, 44])
        destination: (link_destination [14, 46] - [14, 69]))
      (text [14, 70] - [14, 241])))
  (paragraph [16, 0] - [17, 0]
    content: (inline [16, 0] - [16, 64]
      (text [16, 0] - [16, 64])))
  (paragraph [17, 0] - [19, 0]
    content: (inline [17, 0] - [17, 174]
      (text [17, 0] - [17, 174])))
  (paragraph [19, 0] - [20, 0]
    content: (inline [19, 0] - [19, 131]
      (text [19, 0] - [19, 54])
      (code_span [19, 54] - [19, 60]
        (code_span_delimiter [19, 54] - [19, 55])
        (code_span_content [19, 55] - [19, 59])
        (code_span_delimiter [19, 59] - [19, 60]))
      (text [19, 60] - [19, 131])))
  (paragraph [20, 0] - [22, 0]
    content: (inline [20, 0] - [20, 77]
      (text [20, 0] - [20, 77])))
  (paragraph [22, 0] - [24, 0]
    content: (inline [22, 0] - [22, 233]
      (image [22, 0] - [22, 29]
        alt: (image_alt [22, 2] - [22, 2])
        source: (image_source [22, 4] - [22, 28]))
      (ERROR [22, 29] - [22, 64]
        (attribute_class [22, 30] - [22, 48])
        (attribute_class [22, 48] - [22, 56])
        (reference_type [22, 56] - [22, 60])
        (citation_key [22, 61] - [22, 64]))
      (equals_sign [22, 64] - [22, 65])
      (text [22, 65] - [22, 223])
      (equals_sign [22, 223] - [22, 224])
      (text [22, 224] - [22, 233])))
  (paragraph [24, 0] - [26, 0]
    content: (inline [24, 0] - [24, 116]
      (text [24, 0] - [24, 116])))
  (paragraph [26, 0] - [28, 0]
    content: (inline [26, 0] - [26, 351]
      (text [26, 0] - [26, 94])
      (link [26, 94] - [26, 149]
        text: (link_text [26, 95] - [26, 118])
        destination: (link_destination [26, 120] - [26, 148]))
      (text [26, 149] - [26, 351])))
  (shortcode_block [28, 0] - [29, 0]
    (shortcode_open [28, 0] - [28, 4])
    name: (shortcode_name [28, 4] - [28, 9])
    arguments: (shortcode_arguments [28, 9] - [28, 54])
    (shortcode_close [28, 54] - [29, 0]))
  (blank_line [29, 0] - [30, 0])
  (paragraph [30, 0] - [32, 0]
    content: (inline [30, 0] - [30, 110]
      (text [30, 0] - [30, 110])))
  (paragraph [32, 0] - [35, 4]
    content: (inline [32, 0] - [35, 4]
      (text [32, 0] - [32, 55])
      (text [32, 55] - [34, 8])
      (ERROR [34, 8] - [34, 28]
        (attribute_class [34, 9] - [34, 17])
        (citation_key [34, 17] - [34, 28]))
      (equals_sign [34, 28] - [34, 29])
      (text [34, 29] - [34, 39])
      (text [34, 39] - [35, 4])))
  (html_block [35, 4] - [35, 34]
    open: (html_open_tag [35, 4] - [35, 30])
    close: (html_close_tag [35, 30] - [35, 34]))
  (paragraph [35, 34] - [38, 0]
    content: (inline [35, 34] - [36, 7]
      (text [35, 34] - [35, 35])
      (link [35, 35] - [35, 97]
        text: (link_text [35, 36] - [35, 52])
        destination: (link_destination [35, 54] - [35, 96]))
      (text [35, 97] - [36, 7])))
  (ERROR [38, 0] - [111, 8]
    (text [38, 0] - [38, 40])
    (code_span [38, 40] - [38, 51]
      (code_span_delimiter [38, 40] - [38, 41])
      (code_span_content [38, 41] - [38, 50])
      (code_span_delimiter [38, 50] - [38, 51]))
    (text [38, 51] - [38, 56])
    (code_span [38, 56] - [38, 72]
      (code_span_delimiter [38, 56] - [38, 57])
      (code_span_content [38, 57] - [38, 71])
      (code_span_delimiter [38, 71] - [38, 72]))
    (text [38, 72] - [38, 82])
    (text [38, 82] - [40, 4])
    (ERROR [40, 4] - [40, 6]
      (inline_cell_delimiter [40, 4] - [40, 5])
      (inline_cell_delimiter [40, 5] - [40, 6]))
    (code_span [40, 6] - [43, 5]
      (code_span_delimiter [40, 6] - [40, 7])
      (code_span_content [40, 7] - [43, 4])
      (code_span_delimiter [43, 4] - [43, 5]))
    (ERROR [43, 5] - [43, 6]
      (inline_cell_delimiter [43, 5] - [43, 6]))
    (code_span [43, 6] - [45, 35]
      (code_span_delimiter [43, 6] - [43, 7])
      (code_span_content [43, 7] - [45, 34])
      (code_span_delimiter [45, 34] - [45, 35]))
    (text [45, 35] - [45, 39])
    (code_span [45, 39] - [65, 1]
      (code_span_delimiter [45, 39] - [45, 40])
      (code_span_content [45, 40] - [65, 0])
      (code_span_delimiter [65, 0] - [65, 1]))
    (ERROR [65, 1] - [65, 2]
      (inline_cell_delimiter [65, 1] - [65, 2]))
    (code_span [65, 2] - [68, 1]
      (code_span_delimiter [65, 2] - [65, 3])
      (code_span_content [65, 3] - [68, 0])
      (code_span_delimiter [68, 0] - [68, 1]))
    (ERROR [68, 1] - [68, 2]
      (inline_cell_delimiter [68, 1] - [68, 2]))
    (code_span [68, 2] - [77, 118]
      (code_span_delimiter [68, 2] - [68, 3])
      (code_span_content [68, 3] - [77, 117])
      (code_span_delimiter [77, 117] - [77, 118]))
    (strong_emphasis [77, 118] - [77, 126]
      (strong_emphasis_delimiter [77, 118] - [77, 120])
      (text [77, 120] - [77, 124])
      (strong_emphasis_delimiter [77, 124] - [77, 126]))
    (code_span [77, 126] - [88, 55]
      (code_span_delimiter [77, 126] - [77, 127])
      (code_span_content [77, 127] - [88, 54])
      (code_span_delimiter [88, 54] - [88, 55]))
    (text [88, 55] - [88, 58])
    (code_span [88, 58] - [90, 1]
      (code_span_delimiter [88, 58] - [88, 59])
      (code_span_content [88, 59] - [90, 0])
      (code_span_delimiter [90, 0] - [90, 1]))
    (ERROR [90, 1] - [90, 2]
      (inline_cell_delimiter [90, 1] - [90, 2]))
    (code_span [90, 2] - [96, 1]
      (code_span_delimiter [90, 2] - [90, 3])
      (code_span_content [90, 3] - [96, 0])
      (code_span_delimiter [96, 0] - [96, 1]))
    (ERROR [96, 1] - [96, 2]
      (inline_cell_delimiter [96, 1] - [96, 2]))
    (code_span [96, 2] - [98, 20]
      (code_span_delimiter [96, 2] - [96, 3])
      (code_span_content [96, 3] - [98, 19])
      (code_span_delimiter [98, 19] - [98, 20]))
    (text [98, 20] - [98, 25])
    (code_span [98, 25] - [98, 29]
      (code_span_delimiter [98, 25] - [98, 26])
      (code_span_content [98, 26] - [98, 28])
      (code_span_delimiter [98, 28] - [98, 29]))
    (text [98, 29] - [98, 44])
    (code_span [98, 44] - [99, 63]
      (code_span_delimiter [98, 44] - [98, 45])
      (code_span_content [98, 45] - [99, 62])
      (code_span_delimiter [99, 62] - [99, 63]))
    (text [99, 63] - [99, 67])
    (code_span [99, 67] - [99, 70]
      (code_span_delimiter [99, 67] - [99, 68])
      (code_span_content [99, 68] - [99, 69])
      (code_span_delimiter [99, 69] - [99, 70]))
    (text [99, 70] - [99, 76])
    (code_span [99, 76] - [99, 115]
      (code_span_delimiter [99, 76] - [99, 77])
      (code_span_content [99, 77] - [99, 114])
      (code_span_delimiter [99, 114] - [99, 115]))
    (text [99, 115] - [99, 121])
    (code_span [99, 121] - [99, 124]
      (code_span_delimiter [99, 121] - [99, 122])
      (code_span_content [99, 122] - [99, 123])
      (code_span_delimiter [99, 123] - [99, 124]))
    (text [99, 124] - [99, 130])
    (code_span [99, 130] - [101, 61]
      (code_span_delimiter [99, 130] - [99, 131])
      (code_span_content [99, 131] - [101, 60])
      (code_span_delimiter [101, 60] - [101, 61]))
    (text [101, 61] - [101, 71])
    (code_span [101, 71] - [102, 80]
      (code_span_delimiter [101, 71] - [101, 72])
      (code_span_content [101, 72] - [102, 79])
      (code_span_delimiter [102, 79] - [102, 80]))
    (text [102, 80] - [102, 86])
    (code_span [102, 86] - [102, 90]
      (code_span_delimiter [102, 86] - [102, 87])
      (code_span_content [102, 87] - [102, 89])
      (code_span_delimiter [102, 89] - [102, 90]))
    (text [102, 90] - [102, 98])
    (code_span [102, 98] - [102, 102]
      (code_span_delimiter [102, 98] - [102, 99])
      (code_span_content [102, 99] - [102, 101])
      (code_span_delimiter [102, 101] - [102, 102]))
    (text [102, 102] - [102, 106])
    (code_span [102, 106] - [102, 147]
      (code_span_delimiter [102, 106] - [102, 107])
      (code_span_content [102, 107] - [102, 146])
      (code_span_delimiter [102, 146] - [102, 147]))
    (text [102, 147] - [102, 152])
    (code_span [102, 152] - [102, 156]
      (code_span_delimiter [102, 152] - [102, 153])
      (code_span_content [102, 153] - [102, 155])
      (code_span_delimiter [102, 155] - [102, 156]))
    (text [102, 156] - [102, 165])
    (code_span [102, 165] - [102, 169]
      (code_span_delimiter [102, 165] - [102, 166])
      (code_span_content [102, 166] - [102, 168])
      (code_span_delimiter [102, 168] - [102, 169]))
    (text [102, 169] - [102, 178])
    (code_span [102, 178] - [108, 31]
      (code_span_delimiter [102, 178] - [102, 179])
      (code_span_content [102, 179] - [108, 30])
      (code_span_delimiter [108, 30] - [108, 31]))
    (ERROR [108, 31] - [108, 34]
      (citation_key [108, 32] - [108, 33]))
    (code_span [108, 34] - [108, 97]
      (code_span_delimiter [108, 34] - [108, 35])
      (code_span_content [108, 35] - [108, 96])
      (code_span_delimiter [108, 96] - [108, 97]))
    (text [108, 97] - [108, 99])
    (code_span [108, 99] - [110, 1]
      (code_span_delimiter [108, 99] - [108, 100])
      (code_span_content [108, 100] - [110, 0])
      (code_span_delimiter [110, 0] - [110, 1]))
    (inline_cell_delimiter [110, 1] - [110, 2])
    (citation_key [111, 5] - [111, 6]))
  (atx_heading [111, 8] - [113, 0]
    marker: (atx_heading_marker [111, 8] - [112, 1])
    content: (inline [112, 1] - [112, 23]
      (text [112, 1] - [112, 23])))
  (atx_heading [113, 0] - [115, 0]
    marker: (atx_heading_marker [113, 0] - [113, 1])
    content: (inline [113, 1] - [113, 17]
      (text [113, 1] - [113, 17])))
  (paragraph [115, 0] - [116, 0]
    content: (inline [115, 0] - [115, 18]
      (text [115, 0] - [115, 18])))
  (paragraph [116, 0] - [117, 0]
    content: (inline [116, 0] - [116, 23]
      (text [116, 0] - [116, 23])))
  (fenced_code_block [117, 0] - [120, 0]
    open: (code_fence_delimiter [117, 0] - [117, 3])
    close: (code_fence_delimiter [118, 0] - [118, 4]))
  (paragraph [120, 0] - [122, 0]
    content: (inline [120, 0] - [120, 192]
      (text [120, 0] - [120, 18])
      (code_span [120, 18] - [120, 25]
        (code_span_delimiter [120, 18] - [120, 19])
        (code_span_content [120, 19] - [120, 24])
        (code_span_delimiter [120, 24] - [120, 25]))
      (text [120, 25] - [120, 47])
      (code_span [120, 47] - [120, 62]
        (code_span_delimiter [120, 47] - [120, 48])
        (code_span_content [120, 48] - [120, 61])
        (code_span_delimiter [120, 61] - [120, 62]))
      (text [120, 62] - [120, 75])
      (code_span [120, 75] - [120, 84]
        (code_span_delimiter [120, 75] - [120, 76])
        (code_span_content [120, 76] - [120, 83])
        (code_span_delimiter [120, 83] - [120, 84]))
      (text [120, 84] - [120, 88])
      (code_span [120, 88] - [120, 95]
        (code_span_delimiter [120, 88] - [120, 89])
        (code_span_content [120, 89] - [120, 94])
        (code_span_delimiter [120, 94] - [120, 95]))
      (text [120, 95] - [120, 192])))
  (paragraph [122, 0] - [123, 0]
    content: (inline [122, 0] - [122, 326]
      (text [122, 0] - [122, 169])
      (link [122, 169] - [122, 287]
        destination: (link_destination [122, 172] - [122, 286]))
      (text [122, 287] - [122, 326])))
  (paragraph [123, 0] - [125, 0]
    content: (inline [123, 0] - [123, 130]
      (text [123, 0] - [123, 130])))
  (paragraph [125, 0] - [127, 0]
    content: (inline [125, 0] - [125, 453]
      (image [125, 0] - [125, 37]
        alt: (image_alt [125, 2] - [125, 2])
        source: (image_source [125, 4] - [125, 36]))
      (ERROR [125, 37] - [125, 45]
        (reference_type [125, 38] - [125, 41])
        (citation_key [125, 42] - [125, 45]))
      (equals_sign [125, 45] - [125, 46])
      (text [125, 46] - [125, 443])
      (equals_sign [125, 443] - [125, 444])
      (text [125, 444] - [125, 453])))
  (atx_heading [127, 0] - [129, 0]
    marker: (atx_heading_marker [127, 0] - [127, 4])
    content: (inline [127, 4] - [127, 17]
      (text [127, 4] - [127, 17])))
  (paragraph [129, 0] - [131, 0]
    content: (inline [129, 0] - [129, 106]
      (text [129, 0] - [129, 106])))
  (paragraph [131, 0] - [133, 0]
    content: (inline [131, 0] - [131, 192]
      (image [131, 0] - [131, 28]
        alt: (image_alt [131, 2] - [131, 2])
        source: (image_source [131, 4] - [131, 27]))
      (ERROR [131, 28] - [131, 44]
        (attribute_class [131, 29] - [131, 36])
        (reference_type [131, 36] - [131, 40])
        (citation_key [131, 41] - [131, 44]))
      (equals_sign [131, 44] - [131, 45])
      (text [131, 45] - [131, 182])
      (equals_sign [131, 182] - [131, 183])
      (text [131, 183] - [131, 192])))
  (paragraph [133, 0] - [134, 0]
    content: (inline [133, 0] - [133, 37]
      (text [133, 0] - [133, 37])))
  (paragraph [134, 0] - [135, 0]
    content: (inline [134, 0] - [134, 190]
      (text [134, 0] - [134, 190])))
  (paragraph [135, 0] - [137, 0]
    content: (inline [135, 0] - [135, 103]
      (text [135, 0] - [135, 81])
      (code_span [135, 81] - [135, 85]
        (code_span_delimiter [135, 81] - [135, 82])
        (code_span_content [135, 82] - [135, 84])
        (code_span_delimiter [135, 84] - [135, 85]))
      (text [135, 85] - [135, 87])
      (code_span [135, 87] - [135, 97]
        (code_span_delimiter [135, 87] - [135, 88])
        (code_span_content [135, 88] - [135, 96])
        (code_span_delimiter [135, 96] - [135, 97]))
      (text [135, 97] - [135, 103])))
  (atx_heading [137, 0] - [139, 0]
    marker: (atx_heading_marker [137, 0] - [137, 3])
    content: (inline [137, 3] - [137, 15]
      (text [137, 3] - [137, 15])))
  (paragraph [139, 0] - [140, 0]
    content: (inline [139, 0] - [139, 189]
      (text [139, 0] - [139, 41])
      (link [139, 41] - [139, 74]
        text: (link_text [139, 42] - [139, 47])
        destination: (link_destination [139, 49] - [139, 73]))
      (text [139, 74] - [139, 189])))
  (paragraph [140, 0] - [141, 0]
    content: (inline [140, 0] - [140, 113]
      (text [140, 0] - [140, 49])
      (link [140, 49] - [140, 77]
        text: (link_text [140, 50] - [140, 56])
        destination: (link_destination [140, 58] - [140, 76]))
      (text [140, 77] - [140, 113])))
  (paragraph [141, 0] - [143, 0]
    content: (inline [141, 0] - [141, 90]
      (text [141, 0] - [141, 90])))
  (paragraph [143, 0] - [145, 0]
    content: (inline [143, 0] - [143, 183]
      (image [143, 0] - [143, 40]
        alt: (image_alt [143, 2] - [143, 2])
        source: (image_source [143, 4] - [143, 39]))
      (ERROR [143, 40] - [143, 56]
        (attribute_class [143, 41] - [143, 48])
        (reference_type [143, 48] - [143, 52])
        (citation_key [143, 53] - [143, 56]))
      (equals_sign [143, 56] - [143, 57])
      (text [143, 57] - [143, 173])
      (equals_sign [143, 173] - [143, 174])
      (text [143, 174] - [143, 183])))
  (shortcode_block [145, 0] - [146, 0]
    (shortcode_open [145, 0] - [145, 4])
    name: (shortcode_name [145, 4] - [145, 11])
    arguments: (shortcode_arguments [145, 11] - [145, 23])
    (shortcode_close [145, 23] - [146, 0])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/get-started/hello/rstudio.qmd	Parse:    0.47 ms	 18684 bytes/ms	(ERROR [2, 14] - [4, 8])

### File 9: `docs/get-started/hello/jupyter.qmd`

**Error:** Parse failed: (document [0, 0] - [230, 0]
  (yaml_front_matter [0, 0] - [10, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [8, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 32]
          (yaml_string [1, 7] - [1, 32]
            (yaml_string_quoted [1, 7] - [1, 32]))))
      (yaml_pair [2, 0] - [5, 0]
        key: (yaml_key [2, 0] - [2, 14])
        (ERROR [2, 14] - [4, 8]
          (yaml_scalar [3, 2] - [3, 10]
            (yaml_string [3, 2] - [3, 10]
              (yaml_string_unquoted [3, 2] - [3, 10])))
          (citation_key [4, 0] - [4, 8]))
        value: (yaml_scalar [4, 10] - [4, 18]
          (yaml_string [4, 10] - [4, 18]
            (yaml_string_unquoted [4, 10] - [4, 18]))))
      (yaml_pair [5, 4] - [6, 0]
        key: (yaml_key [5, 4] - [5, 13])
        value: (yaml_scalar [5, 15] - [5, 19]
          (yaml_boolean [5, 15] - [5, 19])))
      (yaml_pair [6, 0] - [8, 0]
        key: (yaml_key [6, 0] - [6, 4])
        (ERROR [6, 4] - [7, 6]
          (yaml_scalar [7, 2] - [7, 6]
            (yaml_string [7, 2] - [7, 6]
              (yaml_string_unquoted [7, 2] - [7, 6]))))
        value: (yaml_scalar [7, 8] - [7, 15]
          (yaml_string [7, 8] - [7, 15]
            (yaml_string_unquoted [7, 8] - [7, 15])))))
    close: (yaml_front_matter_delimiter [8, 0] - [8, 3]))
  (shortcode_block [10, 0] - [11, 0]
    (shortcode_open [10, 0] - [10, 4])
    name: (shortcode_name [10, 4] - [10, 11])
    arguments: (shortcode_arguments [10, 11] - [10, 32])
    (shortcode_close [10, 32] - [11, 0]))
  (atx_heading [11, 0] - [14, 0]
    marker: (atx_heading_marker [11, 0] - [12, 3])
    content: (inline [12, 3] - [12, 11]
      (text [12, 3] - [12, 11])))
  (paragraph [14, 0] - [15, 0]
    content: (inline [14, 0] - [14, 67]
      (text [14, 0] - [14, 67])))
  (paragraph [15, 0] - [17, 0]
    content: (inline [15, 0] - [15, 146]
      (text [15, 0] - [15, 146])))
  (paragraph [17, 0] - [19, 0]
    content: (inline [17, 0] - [17, 43]
      (text [17, 0] - [17, 43])))
  (paragraph [19, 0] - [21, 0]
    content: (inline [19, 0] - [19, 261]
      (image [19, 0] - [19, 38]
        alt: (image_alt [19, 2] - [19, 2])
        source: (image_source [19, 4] - [19, 37]))
      (ERROR [19, 38] - [19, 46]
        (reference_type [19, 39] - [19, 42])
        (citation_key [19, 43] - [19, 46]))
      (equals_sign [19, 46] - [19, 47])
      (text [19, 47] - [19, 261])))
  (paragraph [21, 0] - [22, 0]
    content: (inline [21, 0] - [21, 82]
      (text [21, 0] - [21, 28])
      (emphasis [21, 28] - [21, 38]
        (emphasis_delimiter [21, 28] - [21, 29])
        (text [21, 29] - [21, 37])
        (emphasis_delimiter [21, 37] - [21, 38]))
      (text [21, 38] - [21, 82])))
  (paragraph [22, 0] - [24, 0]
    content: (inline [22, 0] - [22, 217]
      (text [22, 0] - [22, 127])
      (link [22, 127] - [22, 181]
        text: (link_text [22, 128] - [22, 142])
        destination: (link_destination [22, 144] - [22, 180]))
      (text [22, 181] - [22, 217])))
  (paragraph [24, 0] - [25, 0]
    content: (inline [24, 0] - [24, 16]
      (text [24, 0] - [24, 16])))
  (paragraph [25, 0] - [26, 0]
    content: (inline [25, 0] - [25, 151]
      (text [25, 0] - [25, 64])
      (link [25, 64] - [25, 119]
        text: (link_text [25, 65] - [25, 71])
        destination: (link_destination [25, 73] - [25, 118]))
      (text [25, 119] - [25, 151])))
  (paragraph [26, 0] - [27, 0]
    content: (inline [26, 0] - [26, 86]
      (text [26, 0] - [26, 19])
      (link [26, 19] - [26, 62]
        text: (link_text [26, 20] - [26, 31])
        destination: (link_destination [26, 33] - [26, 61]))
      (text [26, 62] - [26, 86])))
  (fenced_div [27, 0] - [227, 0]
    open: (fenced_div_delimiter [27, 0] - [27, 3])
    (atx_heading [29, 0] - [31, 0]
      marker: (atx_heading_marker [29, 0] - [29, 3])
      content: (inline [29, 3] - [29, 12]
        (text [29, 3] - [29, 12])))
    (paragraph [31, 0] - [32, 0]
      content: (inline [31, 0] - [31, 109]
        (text [31, 0] - [31, 39])
        (code_span [31, 39] - [31, 52]
          (code_span_delimiter [31, 39] - [31, 40])
          (code_span_content [31, 40] - [31, 51])
          (code_span_delimiter [31, 51] - [31, 52]))
        (text [31, 52] - [31, 109])))
    (paragraph [32, 0] - [34, 0]
      content: (inline [32, 0] - [32, 94]
        (text [32, 0] - [32, 94])))
    (callout_block [34, 0] - [38, 0]
      (callout_open [34, 0] - [34, 40])
      content: (html_block [35, 0] - [35, 34]
        open: (html_open_tag [35, 0] - [35, 30])
        close: (html_close_tag [35, 30] - [35, 34]))
      content: (paragraph [35, 34] - [36, 0]
        content: (inline [35, 34] - [35, 95]
          (text [35, 34] - [35, 35])
          (link [35, 35] - [35, 71]
            text: (link_text [35, 36] - [35, 56])
            destination: (link_destination [35, 58] - [35, 70]))
          (ERROR [35, 71] - [35, 80]
            (citation_key [35, 72] - [35, 80]))
          (equals_sign [35, 80] - [35, 81])
          (text [35, 81] - [35, 95])))
      close: (fenced_div_delimiter [36, 0] - [36, 3]))
    (paragraph [38, 0] - [40, 0]
      content: (inline [38, 0] - [38, 127]
        (text [38, 0] - [38, 127])))
    (paragraph [40, 0] - [42, 0]
      content: (inline [40, 0] - [40, 159]
        (text [40, 0] - [40, 97])
        (code_span [40, 97] - [40, 109]
          (code_span_delimiter [40, 97] - [40, 98])
          (code_span_content [40, 98] - [40, 108])
          (code_span_delimiter [40, 108] - [40, 109]))
        (text [40, 109] - [40, 114])
        (code_span [40, 114] - [40, 124]
          (code_span_delimiter [40, 114] - [40, 115])
          (code_span_content [40, 115] - [40, 123])
          (code_span_delimiter [40, 123] - [40, 124]))
        (text [40, 124] - [40, 159])))
    (paragraph [42, 0] - [43, 0]
      content: (inline [42, 0] - [42, 66]
        (text [42, 0] - [42, 66])))
    (paragraph [43, 0] - [44, 0]
      content: (inline [43, 0] - [43, 66]
        (text [43, 0] - [43, 66])))
    (ERROR [44, 0] - [45, 36]
      (list_marker [44, 0] - [44, 1])
      (setext_heading_marker [44, 1] - [44, 16])
      (list_marker [44, 16] - [44, 17])
      (setext_heading_marker [44, 17] - [44, 65])
      (list_marker [44, 65] - [44, 66])
      (citation_key [45, 1] - [45, 5])
      (ERROR [45, 5] - [45, 6])
      (citation_key [45, 6] - [45, 11])
      (code_fence_delimiter [45, 17] - [45, 21])
      (attribute_class [45, 22] - [45, 27])
      (citation_key [45, 27] - [45, 36]))
    (paragraph [45, 36] - [46, 0]
      content: (inline [45, 36] - [45, 66]
        (equals_sign [45, 36] - [45, 37])
        (text [45, 37] - [45, 66])))
    (paragraph [46, 0] - [47, 0]
      content: (inline [46, 0] - [46, 66]
        (text [46, 0] - [46, 66])))
    (paragraph [47, 0] - [48, 0]
      content: (inline [47, 0] - [47, 66]
        (text [47, 0] - [47, 66])))
    (paragraph [48, 0] - [49, 0]
      content: (inline [48, 0] - [48, 66]
        (text [48, 0] - [48, 66])))
    (paragraph [49, 0] - [52, 0]
      content: (inline [49, 0] - [51, 66]
        (text [49, 0] - [49, 18])
        (ERROR [49, 18] - [49, 20]
          (inline_cell_delimiter [49, 18] - [49, 19])
          (inline_cell_delimiter [49, 19] - [49, 20]))
        (code_span [49, 20] - [51, 19]
          (code_span_delimiter [49, 20] - [49, 21])
          (code_span_content [49, 21] - [51, 18])
          (code_span_delimiter [51, 18] - [51, 19]))
        (ERROR [51, 19] - [51, 36]
          (inline_cell_delimiter [51, 19] - [51, 20])
          (inline_cell_delimiter [51, 20] - [51, 22])
          (attribute_class [51, 22] - [51, 27])
          (citation_key [51, 27] - [51, 36]))
        (equals_sign [51, 36] - [51, 37])
        (text [51, 37] - [51, 66])))
    (paragraph [52, 0] - [53, 0]
      content: (inline [52, 0] - [52, 66]
        (text [52, 0] - [52, 66])))
    (paragraph [53, 0] - [54, 0]
      content: (inline [53, 0] - [53, 66]
        (text [53, 0] - [53, 66])))
    (paragraph [54, 0] - [55, 0]
      content: (inline [54, 0] - [54, 66]
        (text [54, 0] - [54, 66])))
    (ERROR [55, 0] - [71, 13]
      (text [55, 0] - [55, 18])
      (ERROR [55, 18] - [55, 20]
        (inline_cell_delimiter [55, 18] - [55, 19])
        (inline_cell_delimiter [55, 19] - [55, 20]))
      (code_span [55, 20] - [60, 1]
        (code_span_delimiter [55, 20] - [55, 21])
        (code_span_content [55, 21] - [60, 0])
        (code_span_delimiter [60, 0] - [60, 1]))
      (ERROR [60, 1] - [60, 3]
        (inline_cell_delimiter [60, 1] - [60, 2])
        (inline_cell_delimiter [60, 2] - [60, 3]))
      (code_span [60, 3] - [71, 1]
        (code_span_delimiter [60, 3] - [60, 4])
        (code_span_content [60, 4] - [71, 0])
        (code_span_delimiter [71, 0] - [71, 1]))
      (inline_cell_delimiter [71, 1] - [71, 2])
      (inline_cell_delimiter [71, 2] - [71, 4])
      (citation_key [71, 5] - [71, 11]))
    (atx_heading [71, 13] - [73, 0]
      marker: (atx_heading_marker [71, 13] - [72, 1])
      content: (inline [72, 1] - [72, 19]
        (text [72, 1] - [72, 19])))
    (atx_heading [73, 0] - [75, 0]
      marker: (atx_heading_marker [73, 0] - [73, 1])
      content: (inline [73, 1] - [73, 41]
        (text [73, 1] - [73, 41])))
    (paragraph [75, 0] - [76, 0]
      content: (inline [75, 0] - [75, 18]
        (text [75, 0] - [75, 18])))
    (paragraph [76, 0] - [78, 0]
      content: (inline [76, 0] - [76, 31]
        (text [76, 0] - [76, 31])))
    (paragraph [78, 0] - [79, 0]
      content: (inline [78, 0] - [78, 25]
        (text [78, 0] - [78, 2])
        (equals_sign [78, 2] - [78, 3])
        (text [78, 3] - [78, 25])))
    (paragraph [79, 0] - [80, 0]
      content: (inline [79, 0] - [79, 21]
        (text [79, 0] - [79, 6])
        (equals_sign [79, 6] - [79, 7])
        (text [79, 7] - [79, 10])
        (emphasis [79, 10] - [79, 19]
          (emphasis_delimiter [79, 10] - [79, 11])
          (text [79, 11] - [79, 18])
          (emphasis_delimiter [79, 18] - [79, 19]))
        (text [79, 19] - [79, 21])))
    (paragraph [80, 0] - [206, 0]
      content: (inline [80, 0] - [205, 13]
        (text [80, 0] - [80, 8])
        (equals_sign [80, 8] - [80, 9])
        (text [80, 9] - [80, 23])
        (text [80, 23] - [81, 9])
        (emphasis [81, 9] - [201, 10]
          (emphasis_delimiter [81, 9] - [81, 10])
          (text [81, 10] - [81, 13])
          (equals_sign [81, 13] - [81, 14])
          (text [81, 14] - [81, 15])
          (ERROR [81, 15] - [84, 14]
            (citation_key [81, 17] - [81, 27])
            (citation_key [81, 31] - [81, 36])
            (citation_key [83, 0] - [83, 2])
            (attribute_class [83, 2] - [83, 7])
            (citation_key [83, 8] - [83, 13])
            (ERROR [83, 13] - [83, 14])
            (citation_key [83, 14] - [83, 16])
            (citation_key [84, 0] - [84, 2])
            (attribute_class [84, 2] - [84, 13]))
          (link [84, 14] - [85, 13]
            text: (link_text [84, 15] - [84, 29])
            (ERROR [84, 30] - [85, 7]
              (citation_key [85, 0] - [85, 2])
              (attribute_class [85, 2] - [85, 7]))
            destination: (link_destination [85, 8] - [85, 12]))
          (text [86, 0] - [86, 10])
          (ERROR [87, 0] - [87, 2]
            (inline_cell_delimiter [87, 0] - [87, 1])
            (inline_cell_delimiter [87, 1] - [87, 2]))
          (code_span [87, 2] - [88, 1]
            (code_span_delimiter [87, 2] - [87, 3])
            (code_span_content [87, 3] - [88, 0])
            (code_span_delimiter [88, 0] - [88, 1]))
          (ERROR [88, 1] - [88, 3]
            (inline_cell_delimiter [88, 1] - [88, 2])
            (inline_cell_delimiter [88, 2] - [88, 3]))
          (code_span [88, 3] - [98, 1]
            (code_span_delimiter [88, 3] - [88, 4])
            (code_span_content [88, 4] - [98, 0])
            (code_span_delimiter [98, 0] - [98, 1]))
          (ERROR [98, 1] - [98, 2]
            (inline_cell_delimiter [98, 1] - [98, 2]))
          (code_span [98, 2] - [101, 1]
            (code_span_delimiter [98, 2] - [98, 3])
            (code_span_content [98, 3] - [101, 0])
            (code_span_delimiter [101, 0] - [101, 1]))
          (ERROR [101, 1] - [101, 2]
            (inline_cell_delimiter [101, 1] - [101, 2]))
          (code_span [101, 2] - [103, 41]
            (code_span_delimiter [101, 2] - [101, 3])
            (code_span_content [101, 3] - [103, 40])
            (code_span_delimiter [103, 40] - [103, 41]))
          (text [103, 41] - [103, 52])
          (code_span [103, 52] - [111, 5]
            (code_span_delimiter [103, 52] - [103, 53])
            (code_span_content [103, 53] - [111, 4])
            (code_span_delimiter [111, 4] - [111, 5]))
          (text [111, 5] - [111, 18])
          (code_span [111, 18] - [112, 42]
            (code_span_delimiter [111, 18] - [111, 19])
            (code_span_content [111, 19] - [112, 41])
            (code_span_delimiter [112, 41] - [112, 42]))
          (text [112, 42] - [112, 56])
          (code_span [112, 56] - [113, 35]
            (code_span_delimiter [112, 56] - [112, 57])
            (code_span_content [112, 57] - [113, 34])
            (code_span_delimiter [113, 34] - [113, 35]))
          (text [113, 35] - [113, 46])
          (code_span [113, 46] - [115, 1]
            (code_span_delimiter [113, 46] - [113, 47])
            (code_span_content [113, 47] - [115, 0])
            (code_span_delimiter [115, 0] - [115, 1]))
          (ERROR [115, 1] - [115, 2]
            (inline_cell_delimiter [115, 1] - [115, 2]))
          (code_span [115, 2] - [117, 1]
            (code_span_delimiter [115, 2] - [115, 3])
            (code_span_content [115, 3] - [117, 0])
            (code_span_delimiter [117, 0] - [117, 1]))
          (ERROR [117, 1] - [117, 2]
            (inline_cell_delimiter [117, 1] - [117, 2]))
          (code_span [117, 2] - [129, 42]
            (code_span_delimiter [117, 2] - [117, 3])
            (code_span_content [117, 3] - [129, 41])
            (code_span_delimiter [129, 41] - [129, 42]))
          (text [129, 42] - [129, 47])
          (code_span [129, 47] - [131, 5]
            (code_span_delimiter [129, 47] - [129, 48])
            (code_span_content [129, 48] - [131, 4])
            (code_span_delimiter [131, 4] - [131, 5]))
          (ERROR [131, 5] - [131, 6]
            (inline_cell_delimiter [131, 5] - [131, 6]))
          (code_span [131, 6] - [133, 5]
            (code_span_delimiter [131, 6] - [131, 7])
            (code_span_content [131, 7] - [133, 4])
            (code_span_delimiter [133, 4] - [133, 5]))
          (ERROR [133, 5] - [133, 6]
            (inline_cell_delimiter [133, 5] - [133, 6]))
          (code_span [133, 6] - [147, 1]
            (code_span_delimiter [133, 6] - [133, 7])
            (code_span_content [133, 7] - [147, 0])
            (code_span_delimiter [147, 0] - [147, 1]))
          (ERROR [147, 1] - [147, 2]
            (inline_cell_delimiter [147, 1] - [147, 2]))
          (code_span [147, 2] - [155, 1]
            (code_span_delimiter [147, 2] - [147, 3])
            (code_span_content [147, 3] - [155, 0])
            (code_span_delimiter [155, 0] - [155, 1]))
          (ERROR [155, 1] - [155, 2]
            (inline_cell_delimiter [155, 1] - [155, 2]))
          (code_span [155, 2] - [159, 18]
            (code_span_delimiter [155, 2] - [155, 3])
            (code_span_content [155, 3] - [159, 17])
            (code_span_delimiter [159, 17] - [159, 18]))
          (text [159, 18] - [159, 27])
          (code_span [159, 27] - [159, 40]
            (code_span_delimiter [159, 27] - [159, 28])
            (code_span_content [159, 28] - [159, 39])
            (code_span_delimiter [159, 39] - [159, 40]))
          (text [159, 40] - [159, 45])
          (code_span [159, 45] - [161, 1]
            (code_span_delimiter [159, 45] - [159, 46])
            (code_span_content [159, 46] - [161, 0])
            (code_span_delimiter [161, 0] - [161, 1]))
          (ERROR [161, 1] - [161, 2]
            (inline_cell_delimiter [161, 1] - [161, 2]))
          (code_span [161, 2] - [165, 1]
            (code_span_delimiter [161, 2] - [161, 3])
            (code_span_content [161, 3] - [165, 0])
            (code_span_delimiter [165, 0] - [165, 1]))
          (ERROR [165, 1] - [165, 2]
            (inline_cell_delimiter [165, 1] - [165, 2]))
          (code_span [165, 2] - [176, 1]
            (code_span_delimiter [165, 2] - [165, 3])
            (code_span_content [165, 3] - [176, 0])
            (code_span_delimiter [176, 0] - [176, 1]))
          (ERROR [176, 1] - [176, 2]
            (inline_cell_delimiter [176, 1] - [176, 2]))
          (code_span [176, 2] - [180, 1]
            (code_span_delimiter [176, 2] - [176, 3])
            (code_span_content [176, 3] - [180, 0])
            (code_span_delimiter [180, 0] - [180, 1]))
          (ERROR [180, 1] - [180, 2]
            (inline_cell_delimiter [180, 1] - [180, 2]))
          (code_span [180, 2] - [190, 1]
            (code_span_delimiter [180, 2] - [180, 3])
            (code_span_content [180, 3] - [190, 0])
            (code_span_delimiter [190, 0] - [190, 1]))
          (ERROR [190, 1] - [198, 1]
            (inline_cell_delimiter [190, 1] - [190, 2])
            (citation_key [191, 5] - [191, 11])
            (atx_heading_marker [192, 0] - [192, 1])
            (citation_key [192, 2] - [192, 8])
            (reference_type [192, 9] - [192, 13])
            (citation_key [192, 14] - [192, 19])
            (atx_heading_marker [193, 0] - [193, 1])
            (reference_type [193, 2] - [193, 6])
            (citation_key [193, 7] - [193, 10])
            (citation_key [193, 13] - [193, 14])
            (citation_key [193, 14] - [193, 19])
            (citation_key [193, 19] - [193, 24])
            (citation_key [193, 24] - [193, 27])
            (citation_key [193, 27] - [193, 29])
            (citation_key [193, 29] - [193, 35])
            (citation_key [193, 35] - [193, 40])
            (citation_key [195, 0] - [195, 6])
            (citation_key [195, 6] - [195, 12])
            (citation_key [195, 12] - [195, 15])
            (citation_key [195, 15] - [195, 18])
            (citation_key [196, 0] - [196, 6])
            (citation_key [196, 6] - [196, 17])
            (attribute_class [196, 17] - [196, 24])
            (citation_key [196, 24] - [196, 27])
            (citation_key [196, 27] - [196, 31])
            (citation_key [198, 0] - [198, 1]))
          (text [198, 1] - [198, 2])
          (equals_sign [198, 2] - [198, 3])
          (text [198, 3] - [198, 25])
          (text [199, 0] - [199, 6])
          (equals_sign [199, 6] - [199, 7])
          (text [199, 7] - [199, 10])
          (emphasis [199, 10] - [199, 19]
            (emphasis_delimiter [199, 10] - [199, 11])
            (text [199, 11] - [199, 18])
            (emphasis_delimiter [199, 18] - [199, 19]))
          (text [199, 19] - [199, 21])
          (text [200, 0] - [200, 8])
          (equals_sign [200, 8] - [200, 9])
          (text [200, 9] - [200, 23])
          (text [201, 0] - [201, 9])
          (emphasis_delimiter [201, 9] - [201, 10]))
        (text [201, 10] - [201, 13])
        (equals_sign [201, 13] - [201, 14])
        (text [201, 14] - [201, 15])
        (ERROR [201, 15] - [204, 14]
          (citation_key [201, 17] - [201, 27])
          (citation_key [201, 31] - [201, 36])
          (citation_key [203, 0] - [203, 2])
          (attribute_class [203, 2] - [203, 7])
          (citation_key [203, 8] - [203, 13])
          (ERROR [203, 13] - [203, 14])
          (citation_key [203, 14] - [203, 16])
          (citation_key [204, 0] - [204, 2])
          (attribute_class [204, 2] - [204, 13]))
        (link [204, 14] - [205, 13]
          text: (link_text [204, 15] - [204, 29])
          (ERROR [204, 30] - [205, 7]
            (citation_key [205, 0] - [205, 2])
            (attribute_class [205, 2] - [205, 7]))
          destination: (link_destination [205, 8] - [205, 12]))))
    (paragraph [206, 0] - [207, 0]
      content: (inline [206, 0] - [206, 10]
        (text [206, 0] - [206, 10])))
    (fenced_code_block [207, 0] - [210, 0]
      open: (code_fence_delimiter [207, 0] - [207, 3])
      close: (code_fence_delimiter [208, 0] - [208, 4]))
    (paragraph [210, 0] - [212, 0]
      content: (inline [210, 0] - [210, 162]
        (image [210, 0] - [210, 28]
          alt: (image_alt [210, 2] - [210, 2])
          source: (image_source [210, 4] - [210, 27]))
        (ERROR [210, 28] - [210, 44]
          (attribute_class [210, 29] - [210, 36])
          (reference_type [210, 36] - [210, 40])
          (citation_key [210, 41] - [210, 44]))
        (equals_sign [210, 44] - [210, 45])
        (text [210, 45] - [210, 162])))
    (paragraph [212, 0] - [213, 0]
      content: (inline [212, 0] - [212, 92]
        (text [212, 0] - [212, 63])
        (code_span [212, 63] - [212, 70]
          (code_span_delimiter [212, 63] - [212, 64])
          (code_span_content [212, 64] - [212, 69])
          (code_span_delimiter [212, 69] - [212, 70]))
        (text [212, 70] - [212, 75])
        (code_span [212, 75] - [212, 84]
          (code_span_delimiter [212, 75] - [212, 76])
          (code_span_content [212, 76] - [212, 83])
          (code_span_delimiter [212, 83] - [212, 84]))
        (text [212, 84] - [212, 92])))
    (paragraph [213, 0] - [215, 0]
      content: (inline [213, 0] - [213, 75]
        (text [213, 0] - [213, 69])
        (code_span [213, 69] - [213, 73]
          (code_span_delimiter [213, 69] - [213, 70])
          (code_span_content [213, 70] - [213, 72])
          (code_span_delimiter [213, 72] - [213, 73]))
        (text [213, 73] - [213, 75])))
    (paragraph [215, 0] - [216, 0]
      content: (inline [215, 0] - [215, 83]
        (text [215, 0] - [215, 83])))
    (paragraph [216, 0] - [218, 0]
      content: (inline [216, 0] - [216, 118]
        (text [216, 0] - [216, 17])
        (code_span [216, 17] - [216, 26]
          (code_span_delimiter [216, 17] - [216, 18])
          (code_span_content [216, 18] - [216, 25])
          (code_span_delimiter [216, 25] - [216, 26]))
        (text [216, 26] - [216, 118])))
    (paragraph [218, 0] - [219, 0]
      content: (inline [218, 0] - [218, 125]
        (text [218, 0] - [218, 28])
        (link [218, 28] - [218, 83]
          text: (link_text [218, 29] - [218, 41])
          destination: (link_destination [218, 43] - [218, 82]))
        (text [218, 83] - [218, 125])))
    (paragraph [219, 0] - [221, 0]
      content: (inline [219, 0] - [219, 52]
        (text [219, 0] - [219, 52])))
    (paragraph [221, 0] - [222, 0]
      content: (inline [221, 0] - [221, 16]
        (text [221, 0] - [221, 16])))
    (paragraph [222, 0] - [223, 0]
      content: (inline [222, 0] - [222, 148]
        (text [222, 0] - [222, 51])
        (code_span [222, 51] - [222, 60]
          (code_span_delimiter [222, 51] - [222, 52])
          (code_span_content [222, 52] - [222, 59])
          (code_span_delimiter [222, 59] - [222, 60]))
        (text [222, 60] - [222, 148])))
    (paragraph [223, 0] - [224, 0]
      content: (inline [223, 0] - [223, 168]
        (text [223, 0] - [223, 27])
        (link [223, 27] - [223, 153]
          text: (link_text [223, 28] - [223, 67])
          destination: (link_destination [223, 69] - [223, 152]))
        (text [223, 153] - [223, 168])))
    close: (fenced_div_delimiter [224, 0] - [224, 3]))
  (shortcode_block [227, 0] - [228, 0]
    (shortcode_open [227, 0] - [227, 4])
    name: (shortcode_name [227, 4] - [227, 11])
    arguments: (shortcode_arguments [227, 11] - [227, 23])
    (shortcode_close [227, 23] - [228, 0]))
  (blank_line [228, 0] - [229, 0])
  (paragraph [229, 0] - [230, 0]
    content: (inline [229, 0] - [229, 181]
      (text [229, 0] - [229, 42])
      (link [229, 42] - [229, 110]
        text: (link_text [229, 43] - [229, 70])
        destination: (link_destination [229, 72] - [229, 109]))
      (text [229, 110] - [229, 181]))))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/get-started/hello/jupyter.qmd	Parse:    0.60 ms	 15429 bytes/ms	(ERROR [2, 14] - [4, 8])

### File 10: `docs/prerelease/1.4/ast.qmd`

**Error:** Parse failed: (document [0, 0] - [65, 28]
  (yaml_front_matter [0, 0] - [4, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [2, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 39]
          (yaml_string [1, 7] - [1, 39]
            (yaml_string_quoted [1, 7] - [1, 39])))))
    close: (yaml_front_matter_delimiter [2, 0] - [2, 3]))
  (paragraph [4, 0] - [6, 0]
    content: (inline [4, 0] - [4, 190]
      (text [4, 0] - [4, 190])))
  (atx_heading [6, 0] - [8, 0]
    marker: (atx_heading_marker [6, 0] - [6, 3])
    content: (inline [6, 3] - [6, 38]
      (text [6, 3] - [6, 38])))
  (paragraph [8, 0] - [10, 0]
    content: (inline [8, 0] - [8, 144]
      (text [8, 0] - [8, 109])
      (code_span [8, 109] - [8, 143]
        (code_span_delimiter [8, 109] - [8, 110])
        (code_span_content [8, 110] - [8, 142])
        (code_span_delimiter [8, 142] - [8, 143]))
      (text [8, 143] - [8, 144])))
  (paragraph [10, 0] - [12, 0]
    content: (inline [10, 0] - [10, 134]
      (text [10, 0] - [10, 92])
      (code_span [10, 92] - [10, 121]
        (code_span_delimiter [10, 92] - [10, 93])
        (code_span_content [10, 93] - [10, 120])
        (code_span_delimiter [10, 120] - [10, 121]))
      (text [10, 121] - [10, 134])))
  (fenced_code_block [12, 0] - [24, 0]
    open: (code_fence_delimiter [12, 0] - [12, 4])
    info: (info_string [12, 4] - [12, 7])
    (code_line [13, 0] - [13, 3])
    (code_line [14, 0] - [14, 27])
    (code_line [15, 0] - [15, 3])
    (code_line [17, 0] - [17, 50])
    (code_line [19, 0] - [19, 8])
    (code_line [20, 0] - [20, 17])
    (code_line [21, 0] - [21, 51])
    close: (code_fence_delimiter [22, 0] - [22, 3]))
  (fenced_code_block [24, 0] - [43, 0]
    open: (code_fence_delimiter [24, 0] - [24, 4])
    (code_line [26, 0] - [26, 182])
    (code_line [28, 0] - [28, 7])
    (code_line [29, 0] - [29, 3])
    (code_line [30, 0] - [30, 27])
    (code_line [31, 0] - [31, 3])
    (code_line [33, 0] - [33, 50])
    (code_line [35, 0] - [35, 34])
    (code_line [37, 0] - [37, 8])
    (code_line [38, 0] - [38, 17])
    (code_line [39, 0] - [39, 62])
    (code_line [40, 0] - [40, 21])
    close: (code_fence_delimiter [41, 0] - [41, 3]))
  (ERROR [43, 0] - [65, 28]
    (fenced_div_delimiter [43, 0] - [43, 3])
    (executable_code_cell [45, 0] - [49, 0]
      open_delimiter: (code_fence_delimiter [45, 0] - [45, 3])
      (ERROR [45, 3] - [45, 4])
      language: (language_name [45, 5] - [45, 6])
      (ERROR [45, 6] - [45, 7])
      content: (cell_content [46, 0] - [48, 0]
        (code_line [46, 0] - [46, 11])
        (code_line [47, 0] - [47, 44]))
      close_delimiter: (code_fence_delimiter [48, 0] - [48, 3]))
    (code_fence_delimiter [49, 0] - [49, 4])
    (code_line [51, 0] - [51, 46])
    (code_line [53, 0] - [53, 211])
    (code_line [54, 0] - [54, 64])
    (code_line [56, 0] - [56, 192])
    (code_line [57, 0] - [57, 94])
    (code_line [59, 0] - [59, 91])
    (code_line [60, 0] - [60, 85])
    (code_line [61, 0] - [61, 49])
    (code_line [63, 0] - [63, 98])
    (code_line [64, 0] - [64, 94])
    (chunk_option_value [65, 0] - [65, 28])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/prerelease/1.4/ast.qmd	Parse:    0.10 ms	 24515 bytes/ms	(ERROR [43, 0] - [65, 28])

### File 11: `docs/prerelease/1.3/ast.qmd`

**Error:** Parse failed: (document [0, 0] - [34, 0]
  (yaml_front_matter [0, 0] - [5, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [3, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 23]
          (yaml_string [1, 7] - [1, 23]
            (yaml_string_unquoted [1, 7] - [1, 23]))))
      (yaml_pair [2, 0] - [3, 0]
        key: (yaml_key [2, 0] - [2, 6])
        value: (yaml_scalar [2, 8] - [2, 12]
          (yaml_boolean [2, 8] - [2, 12]))))
    close: (yaml_front_matter_delimiter [3, 0] - [3, 3]))
  (shortcode_block [5, 0] - [6, 0]
    (shortcode_open [5, 0] - [5, 4])
    name: (shortcode_name [5, 4] - [5, 11])
    arguments: (shortcode_arguments [5, 11] - [5, 35])
    (shortcode_close [5, 35] - [6, 0]))
  (atx_heading [6, 0] - [9, 0]
    marker: (atx_heading_marker [6, 0] - [7, 3])
    content: (inline [7, 3] - [7, 11]
      (text [7, 3] - [7, 11])))
  (paragraph [9, 0] - [11, 0]
    content: (inline [9, 0] - [9, 119]
      (text [9, 0] - [9, 119])))
  (paragraph [11, 0] - [13, 0]
    content: (inline [11, 0] - [11, 117]
      (text [11, 0] - [11, 117])))
  (paragraph [13, 0] - [14, 0]
    content: (inline [13, 0] - [13, 44]
      (text [13, 0] - [13, 4])
      (link [13, 4] - [13, 44]
        text: (link_text [13, 5] - [13, 13])
        destination: (link_destination [13, 15] - [13, 43]))))
  (paragraph [14, 0] - [15, 0]
    content: (inline [14, 0] - [14, 42]
      (text [14, 0] - [14, 4])
      (link [14, 4] - [14, 42]
        text: (link_text [14, 5] - [14, 12])
        destination: (link_destination [14, 14] - [14, 41]))))
  (paragraph [15, 0] - [17, 0]
    content: (inline [15, 0] - [15, 64]
      (text [15, 0] - [15, 4])
      (link [15, 4] - [15, 64]
        text: (link_text [15, 5] - [15, 23])
        destination: (link_destination [15, 25] - [15, 63]))))
  (atx_heading [17, 0] - [19, 0]
    marker: (atx_heading_marker [17, 0] - [17, 3])
    content: (inline [17, 3] - [17, 20]
      (text [17, 3] - [17, 20])))
  (paragraph [19, 0] - [21, 0]
    content: (inline [19, 0] - [19, 196]
      (text [19, 0] - [19, 107])
      (code_span [19, 107] - [19, 116]
        (code_span_delimiter [19, 107] - [19, 108])
        (code_span_content [19, 108] - [19, 115])
        (code_span_delimiter [19, 115] - [19, 116]))
      (text [19, 116] - [19, 149])
      (link [19, 149] - [19, 195]
        text: (link_text [19, 150] - [19, 164])
        destination: (link_destination [19, 166] - [19, 194]))
      (text [19, 195] - [19, 196])))
  (paragraph [21, 0] - [23, 0]
    content: (inline [21, 0] - [21, 351]
      (text [21, 0] - [21, 6])
      (emphasis [21, 6] - [21, 17]
        (emphasis_delimiter [21, 6] - [21, 7])
        (text [21, 7] - [21, 16])
        (emphasis_delimiter [21, 16] - [21, 17]))
      (text [21, 17] - [21, 351])))
  (ERROR [23, 0] - [26, 14]
    (code_fence_delimiter [23, 0] - [23, 3])
    (info_string [23, 3] - [23, 7])
    (chunk_option_value [24, 0] - [24, 25])
    (table_delimiter_cell [24, 25] - [25, 5])
    (citation_key [25, 5] - [25, 7])
    (citation_key [25, 7] - [25, 17])
    (citation_key [25, 17] - [25, 22])
    (citation_key [25, 22] - [25, 26])
    (citation_key [25, 26] - [25, 34])
    (citation_key [26, 0] - [26, 9])
    (attribute_class [26, 9] - [26, 14]))
  (paragraph [26, 14] - [30, 0]
    content: (inline [26, 14] - [29, 60]
      (text [26, 14] - [26, 15])
      (equals_sign [26, 15] - [26, 16])
      (text [26, 16] - [26, 26])
      (text [26, 26] - [28, 64])
      (text [28, 64] - [29, 60])))
  (paragraph [30, 0] - [31, 0]
    content: (inline [30, 0] - [30, 3]
      (text [30, 0] - [30, 3])))
  (ERROR [31, 0] - [34, 0]
    (code_fence_delimiter [31, 0] - [31, 3])
    (code_line [33, 0] - [33, 148])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/prerelease/1.3/ast.qmd	Parse:    0.10 ms	 14853 bytes/ms	(ERROR [23, 0] - [26, 14])

### File 12: `docs/interactive/ojs/index.qmd`

**Error:** Parse failed: (document [0, 0] - [219, 0]
  (yaml_front_matter [0, 0] - [6, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [4, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 22]
          (yaml_string [1, 7] - [1, 22]
            (yaml_string_quoted [1, 7] - [1, 22]))))
      (yaml_pair [2, 0] - [4, 0]
        key: (yaml_key [2, 0] - [2, 7])
        (ERROR [3, 2] - [3, 7]
          (yaml_scalar [3, 2] - [3, 6]
            (yaml_string [3, 2] - [3, 6]
              (yaml_string_unquoted [3, 2] - [3, 6]))))
        value: (yaml_scalar [3, 7] - [3, 13]
          (yaml_boolean [3, 7] - [3, 13]))))
    close: (yaml_front_matter_delimiter [4, 0] - [4, 3]))
  (atx_heading [6, 0] - [8, 0]
    marker: (atx_heading_marker [6, 0] - [6, 3])
    content: (inline [6, 3] - [6, 11]
      (text [6, 3] - [6, 11])))
  (paragraph [8, 0] - [10, 0]
    content: (inline [8, 0] - [8, 456]
      (text [8, 0] - [8, 35])
      (link [8, 35] - [8, 117]
        text: (link_text [8, 36] - [8, 49])
        destination: (link_destination [8, 51] - [8, 116]))
      (text [8, 117] - [8, 174])
      (link [8, 174] - [8, 232]
        text: (link_text [8, 175] - [8, 187])
        destination: (link_destination [8, 189] - [8, 231]))
      (text [8, 232] - [8, 253])
      (link [8, 253] - [8, 276]
        text: (link_text [8, 254] - [8, 256])
        destination: (link_destination [8, 258] - [8, 275]))
      (text [8, 276] - [8, 317])
      (link [8, 317] - [8, 376]
        text: (link_text [8, 318] - [8, 334])
        destination: (link_destination [8, 336] - [8, 375]))
      (text [8, 376] - [8, 456])))
  (paragraph [10, 0] - [10, 73]
    content: (inline [10, 0] - [10, 73]
      (text [10, 0] - [10, 73])))
  (ERROR [10, 73] - [219, 0]
    (html_open_tag [10, 73] - [10, 100])
    (html_block_content [10, 100] - [10, 487])
    (html_block_content [12, 0] - [12, 327])
    (html_block_content [14, 0] - [14, 10])
    (html_block_content [16, 0] - [16, 281])
    (html_block_content [18, 0] - [18, 8])
    (html_block_content [19, 0] - [19, 53])
    (html_block_content [20, 0] - [20, 52])
    (html_block_content [21, 0] - [21, 42])
    (html_block_content [22, 0] - [22, 2])
    (html_block_content [23, 0] - [23, 3])
    (html_block_content [25, 0] - [25, 8])
    (html_block_content [26, 0] - [26, 38])
    (html_block_content [27, 0] - [27, 12])
    (html_block_content [28, 0] - [28, 51])
    (html_block_content [29, 0] - [29, 1])
    (html_block_content [30, 0] - [30, 33])
    (html_block_content [31, 0] - [31, 36])
    (html_block_content [32, 0] - [32, 36])
    (html_block_content [33, 0] - [33, 21])
    (html_block_content [34, 0] - [34, 3])
    (html_block_content [35, 0] - [35, 1])
    (html_block_content [36, 0] - [36, 3])
    (html_block_content [38, 0] - [38, 8])
    (html_block_content [39, 0] - [39, 21])
    (html_block_content [40, 0] - [40, 12])
    (html_block_content [41, 0] - [41, 18])
    (html_block_content [42, 0] - [42, 55])
    (html_block_content [43, 0] - [43, 4])
    (html_block_content [44, 0] - [44, 9])
    (html_block_content [45, 0] - [45, 12])
    (html_block_content [46, 0] - [46, 21])
    (html_block_content [47, 0] - [47, 15])
    (html_block_content [48, 0] - [48, 19])
    (html_block_content [49, 0] - [49, 21])
    (html_block_content [50, 0] - [50, 6])
    (html_block_content [51, 0] - [51, 12])
    (html_block_content [52, 0] - [52, 19])
    (html_block_content [53, 0] - [53, 5])
    (html_block_content [54, 0] - [54, 3])
    (html_block_content [55, 0] - [55, 1])
    (html_block_content [56, 0] - [56, 3])
    (html_block_content [58, 0] - [58, 209])
    (html_block_content [60, 0] - [60, 10])
    (html_block_content [61, 0] - [61, 65])
    (html_block_content [62, 0] - [62, 3])
    (html_block_content [64, 0] - [64, 328])
    (html_block_content [66, 0] - [66, 10])
    (html_block_content [67, 0] - [67, 38])
    (html_block_content [68, 0] - [68, 12])
    (html_block_content [69, 0] - [69, 51])
    (html_block_content [70, 0] - [70, 1])
    (html_block_content [71, 0] - [71, 33])
    (html_block_content [72, 0] - [72, 36])
    (html_block_content [73, 0] - [73, 36])
    (html_block_content [74, 0] - [74, 21])
    (html_block_content [75, 0] - [75, 3])
    (html_block_content [76, 0] - [76, 1])
    (html_block_content [77, 0] - [77, 3])
    (html_block_content [79, 0] - [79, 136])
    (html_block_content [81, 0] - [81, 10])
    (html_block_content [82, 0] - [82, 42])
    (html_block_content [83, 0] - [83, 52])
    (html_block_content [84, 0] - [84, 42])
    (html_block_content [85, 0] - [85, 2])
    (html_block_content [86, 0] - [86, 3])
    (html_block_content [88, 0] - [88, 319])
    (html_block_content [90, 0] - [90, 183])
    (html_block_content [92, 0] - [92, 10])
    (html_block_content [93, 0] - [93, 21])
    (html_block_content [94, 0] - [94, 12])
    (html_block_content [95, 0] - [95, 18])
    (html_block_content [96, 0] - [96, 55])
    (html_block_content [97, 0] - [97, 4])
    (html_block_content [98, 0] - [98, 9])
    (html_block_content [99, 0] - [99, 12])
    (html_block_content [100, 0] - [100, 21])
    (html_block_content [101, 0] - [101, 15])
    (html_block_content [102, 0] - [102, 19])
    (html_block_content [103, 0] - [103, 21])
    (html_block_content [104, 0] - [104, 6])
    (html_block_content [105, 0] - [105, 12])
    (html_block_content [106, 0] - [106, 19])
    (html_block_content [107, 0] - [107, 5])
    (html_block_content [108, 0] - [108, 3])
    (html_block_content [109, 0] - [109, 1])
    (html_block_content [110, 0] - [110, 3])
    (html_block_content [112, 0] - [112, 219])
    (html_block_content [114, 0] - [114, 142])
    (html_block_content [116, 0] - [116, 38])
    (html_block_content [117, 0] - [117, 347])
    (html_block_content [119, 0] - [119, 233])
    (html_block_content [120, 0] - [120, 3])
    (html_block_content [122, 0] - [122, 12])
    (html_block_content [124, 0] - [124, 68])
    (html_block_content [126, 0] - [126, 151])
    (html_block_content [128, 0] - [128, 149])
    (html_block_content [130, 0] - [130, 127])
    (html_block_content [132, 0] - [132, 175])
    (html_block_content [134, 0] - [134, 305])
    (html_block_content [136, 0] - [136, 10])
    (html_block_content [137, 0] - [137, 20])
    (html_block_content [138, 0] - [138, 30])
    (html_block_content [139, 0] - [139, 3])
    (html_block_content [141, 0] - [141, 129])
    (html_block_content [143, 0] - [143, 15])
    (html_block_content [145, 0] - [145, 310])
    (html_block_content [147, 0] - [147, 229])
    (html_block_content [149, 0] - [149, 183])
    (html_block_content [151, 0] - [151, 11])
    (html_block_content [152, 0] - [152, 15])
    (html_block_content [153, 0] - [153, 19])
    (html_block_content [154, 0] - [154, 45])
    (html_block_content [155, 0] - [155, 27])
    (html_block_content [156, 0] - [156, 3])
    (html_block_content [158, 0] - [158, 154])
    (html_block_content [160, 0] - [160, 238])
    (html_block_content [162, 0] - [162, 10])
    (html_block_content [163, 0] - [163, 53])
    (html_block_content [164, 0] - [164, 52])
    (html_block_content [165, 0] - [165, 42])
    (html_block_content [166, 0] - [166, 2])
    (html_block_content [167, 0] - [167, 3])
    (html_block_content [169, 0] - [169, 136])
    (html_block_content [171, 0] - [171, 12])
    (html_block_content [173, 0] - [173, 189])
    (html_block_content [175, 0] - [175, 262])
    (html_block_content [177, 0] - [177, 144])
    (html_block_content [179, 0] - [179, 8])
    (html_block_content [180, 0] - [180, 3])
    (html_block_content [181, 0] - [181, 20])
    (html_block_content [182, 0] - [182, 8])
    (html_block_content [183, 0] - [183, 13])
    (html_block_content [184, 0] - [184, 3])
    (html_block_content [185, 0] - [185, 3])
    (html_block_content [187, 0] - [187, 66])
    (html_block_content [189, 0] - [189, 10])
    (html_block_content [190, 0] - [190, 15])
    (html_block_content [191, 0] - [191, 65])
    (html_block_content [192, 0] - [192, 3])
    (html_block_content [194, 0] - [194, 113])
    (html_block_content [196, 0] - [196, 16])
    (html_block_content [198, 0] - [198, 67])
    (html_block_content [200, 0] - [200, 119])
    (html_block_content [202, 0] - [202, 114])
    (html_block_content [204, 0] - [204, 112])
    (html_block_content [206, 0] - [206, 97])
    (html_block_content [208, 0] - [208, 117])
    (html_block_content [210, 0] - [210, 154])
    (html_block_content [212, 0] - [212, 95])
    (html_block_content [214, 0] - [214, 100])
    (html_block_content [216, 0] - [216, 89])
    (html_block_content [218, 0] - [218, 85])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/interactive/ojs/index.qmd	Parse:    0.23 ms	 43843 bytes/ms	(ERROR [3, 2] - [3, 7])

### File 13: `docs/authoring/_mermaid-examples/customize.qmd`

**Error:** Parse failed: (document [0, 0] - [17, 0]
  (yaml_front_matter [0, 0] - [6, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [4, 0]
      (yaml_pair [1, 0] - [4, 0]
        key: (yaml_key [1, 0] - [1, 6])
        (ERROR [1, 6] - [3, 7]
          (yaml_scalar [2, 2] - [2, 6]
            (yaml_string [2, 2] - [2, 6]
              (yaml_string_unquoted [2, 2] - [2, 6])))
          (yaml_scalar [3, 4] - [3, 7]
            (yaml_string [3, 4] - [3, 7]
              (yaml_string_unquoted [3, 4] - [3, 7]))))
        value: (yaml_scalar [3, 9] - [3, 19]
          (yaml_string [3, 9] - [3, 19]
            (yaml_string_unquoted [3, 9] - [3, 19])))))
    close: (yaml_front_matter_delimiter [4, 0] - [4, 3]))
  (executable_code_cell [6, 0] - [17, 0]
    open_delimiter: (code_fence_delimiter [6, 0] - [6, 3])
    language: (language_name [6, 4] - [6, 11])
    content: (cell_content [7, 0] - [16, 0]
      (code_line [7, 0] - [7, 12])
      (code_line [8, 0] - [8, 22])
      (code_line [9, 0] - [9, 20])
      (code_line [10, 0] - [10, 10])
      (code_line [11, 0] - [11, 10])
      (code_line [12, 0] - [12, 20])
      (code_line [13, 0] - [13, 11])
      (code_line [14, 0] - [14, 12])
      (code_line [15, 0] - [15, 12]))
    close_delimiter: (code_fence_delimiter [16, 0] - [16, 3])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/authoring/_mermaid-examples/customize.qmd	Parse:    0.05 ms	  4109 bytes/ms	(ERROR [1, 6] - [3, 7])

### File 14: `docs/get-started/hello/_hello.qmd`

**Error:** Parse failed: (document [0, 0] - [29, 0]
  (yaml_front_matter [0, 0] - [8, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [6, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 22]
          (yaml_string [1, 7] - [1, 22]
            (yaml_string_quoted [1, 7] - [1, 22]))))
      (yaml_pair [2, 0] - [5, 0]
        key: (yaml_key [2, 0] - [2, 6])
        (ERROR [2, 6] - [4, 13]
          (yaml_scalar [3, 2] - [3, 6]
            (yaml_string [3, 2] - [3, 6]
              (yaml_string_unquoted [3, 2] - [3, 6])))
          (yaml_scalar [4, 4] - [4, 13]
            (yaml_string [4, 4] - [4, 13]
              (yaml_string_unquoted [4, 4] - [4, 13]))))
        value: (yaml_scalar [4, 15] - [4, 19]
          (yaml_boolean [4, 15] - [4, 19])))
      (yaml_pair [5, 0] - [6, 0]
        key: (yaml_key [5, 0] - [5, 7])
        value: (yaml_scalar [5, 9] - [5, 16]
          (yaml_string [5, 9] - [5, 16]
            (yaml_string_unquoted [5, 9] - [5, 16])))))
    close: (yaml_front_matter_delimiter [6, 0] - [6, 3]))
  (atx_heading [8, 0] - [10, 0]
    marker: (atx_heading_marker [8, 0] - [8, 3])
    content: (inline [8, 3] - [8, 13]
      (text [8, 3] - [8, 13])))
  (paragraph [10, 0] - [12, 0]
    content: (inline [10, 0] - [10, 67]
      (text [10, 0] - [10, 56])
      (cross_reference [10, 56] - [10, 66]
        type: (reference_type [10, 57] - [10, 60])
        id: (reference_id [10, 61] - [10, 66]))
      (text [10, 66] - [10, 67])))
  (executable_code_cell [12, 0] - [29, 0]
    open_delimiter: (code_fence_delimiter [12, 0] - [12, 3])
    language: (language_name [12, 4] - [12, 10])
    chunk_options: (chunk_options [13, 0] - [16, 0]
      (chunk_option [13, 0] - [14, 0]
        key: (chunk_option_key [13, 3] - [13, 8])
        value: (chunk_option_value [13, 10] - [13, 19]))
      (chunk_option [14, 0] - [16, 0]
        key: (chunk_option_key [14, 3] - [14, 10])
        value: (chunk_option_value [14, 12] - [14, 41])))
    content: (cell_content [16, 0] - [28, 0]
      (code_line [16, 0] - [16, 18])
      (code_line [17, 0] - [17, 31])
      (code_line [19, 0] - [19, 25])
      (code_line [20, 0] - [20, 21])
      (code_line [21, 0] - [21, 23])
      (code_line [22, 0] - [22, 39])
      (code_line [23, 0] - [23, 1])
      (code_line [24, 0] - [24, 17])
      (code_line [25, 0] - [25, 31])
      (code_line [26, 0] - [26, 13])
      (code_line [27, 0] - [27, 10]))
    close_delimiter: (code_fence_delimiter [28, 0] - [28, 3])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/get-started/hello/_hello.qmd	Parse:    0.07 ms	  7099 bytes/ms	(ERROR [2, 6] - [4, 13])

### File 15: `docs/presentations/revealjs/examples/slide-with-speaker-notes.qmd`

**Error:** Parse failed: (document [0, 0] - [12, 0]
  (yaml_front_matter [0, 0] - [5, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [3, 0]
      (yaml_pair [1, 0] - [3, 0]
        key: (yaml_key [1, 0] - [1, 6])
        value: (yaml_scalar [2, 2] - [2, 10]
          (yaml_string [2, 2] - [2, 10]
            (yaml_string_unquoted [2, 2] - [2, 10])))))
    close: (yaml_front_matter_delimiter [3, 0] - [3, 3]))
  (atx_heading [5, 0] - [7, 0]
    marker: (atx_heading_marker [5, 0] - [5, 3])
    content: (inline [5, 3] - [5, 27]
      (text [5, 3] - [5, 27])))
  (paragraph [7, 0] - [9, 0]
    content: (inline [7, 0] - [7, 13]
      (text [7, 0] - [7, 13])))
  (ERROR [9, 0] - [11, 3]
    (text [9, 0] - [9, 4])
    (attribute_class [9, 5] - [9, 11])
    (citation_key [10, 0] - [10, 7])
    (citation_key [10, 7] - [10, 13])
    (citation_key [10, 13] - [10, 16])
    (citation_key [10, 16] - [10, 21])
    (ERROR [10, 21] - [10, 22]))
  (blank_line [11, 3] - [12, 0]))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/presentations/revealjs/examples/slide-with-speaker-notes.qmd	Parse:    0.06 ms	  1743 bytes/ms	(ERROR [9, 0] - [11, 3])

