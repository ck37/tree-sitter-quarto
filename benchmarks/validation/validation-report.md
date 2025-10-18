# Corpus Validation Report

**Date:** 2025-10-18 16:58:18 UTC
**Corpus:** quarto-web (https://github.com/quarto-dev/quarto-web.git)
**Parser:** tree-sitter-quarto

## Summary

| Metric | Value |
|--------|-------|
| Total files | 20 |
| Successful parses | 1 |
| Failed parses | 19 |
| Success rate | 5.0% |

## Result

**Status:** ✗ FAIL - Success rate <90%

## Failed Files

The following files failed to parse:

### File 1: `docs/dashboards/theming.qmd`

**Error:** Parse failed: (document [0, 0] - [32, 56]
  (ERROR [0, 0] - [4, 3]
    (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_pair [1, 0] - [2, 0]
      key: (yaml_key [1, 0] - [1, 5])
      value: (yaml_scalar [1, 7] - [1, 26]
        (yaml_string [1, 7] - [1, 26]
          (yaml_string_quoted [1, 7] - [1, 26]))))
    (yaml_key [2, 0] - [2, 13])
    (reference_label [2, 16] - [2, 21])
    (citation_key [3, 0] - [3, 13]))
  (atx_heading [4, 3] - [8, 0]
    marker: (atx_heading_marker [4, 3] - [6, 3])
    content: (inline [6, 3] - [6, 11]
      (text [6, 3] - [6, 11])))
  (paragraph [8, 0] - [10, 0]
    content: (inline [8, 0] - [8, 206]
      (text [8, 0] - [8, 173])
      (code_span [8, 173] - [8, 180]
        (code_span_delimiter [8, 173] - [8, 174])
        (code_span_content [8, 174] - [8, 179])
        (code_span_delimiter [8, 179] - [8, 180]))
      (text [8, 180] - [8, 206])))
  (fenced_code_block [10, 0] - [14, 0]
    open: (code_fence_delimiter [10, 0] - [10, 3])
    info: (info_string [10, 3] - [10, 8])
    (code_line [11, 0] - [11, 12])
    close: (code_fence_delimiter [12, 0] - [12, 3]))
  (paragraph [14, 0] - [16, 0]
    content: (inline [14, 0] - [14, 188]
      (text [14, 0] - [14, 35])
      (link [14, 35] - [14, 72]
        text: (link_text [14, 36] - [14, 46])
        destination: (link_destination [14, 48] - [14, 71]))
      (text [14, 72] - [14, 116])
      (link [14, 116] - [14, 154]
        text: (link_text [14, 117] - [14, 122])
        destination: (link_destination [14, 124] - [14, 153]))
      (text [14, 154] - [14, 188])))
  (shortcode_block [16, 0] - [17, 0]
    (shortcode_open [16, 0] - [16, 4])
    name: (shortcode_name [16, 4] - [16, 11])
    arguments: (shortcode_arguments [16, 11] - [16, 48])
    (shortcode_close [16, 48] - [17, 0]))
  (blank_line [17, 0] - [18, 0])
  (paragraph [18, 0] - [20, 0]
    content: (inline [18, 0] - [18, 63]
      (text [18, 0] - [18, 35])
      (code_span [18, 35] - [18, 42]
        (code_span_delimiter [18, 35] - [18, 36])
        (code_span_content [18, 36] - [18, 41])
        (code_span_delimiter [18, 41] - [18, 42]))
      (text [18, 42] - [18, 63])))
  (fenced_code_block [20, 0] - [26, 0]
    open: (code_fence_delimiter [20, 0] - [20, 3])
    info: (info_string [20, 3] - [20, 8])
    (code_line [21, 0] - [21, 7])
    (code_line [22, 0] - [22, 12])
    (code_line [23, 0] - [23, 17])
    close: (code_fence_delimiter [24, 0] - [24, 3]))
  (paragraph [26, 0] - [28, 0]
    content: (inline [26, 0] - [26, 106]
      (text [26, 0] - [26, 106])))
  (shortcode_block [28, 0] - [29, 0]
    (shortcode_open [28, 0] - [28, 4])
    name: (shortcode_name [28, 4] - [28, 11])
    arguments: (shortcode_arguments [28, 11] - [28, 51])
    (shortcode_close [28, 51] - [29, 0]))
  (blank_line [29, 0] - [30, 0])
  (shortcode_block [30, 0] - [31, 0]
    (shortcode_open [30, 0] - [30, 4])
    name: (shortcode_name [30, 4] - [30, 11])
    arguments: (shortcode_arguments [30, 11] - [30, 50])
    (shortcode_close [30, 50] - [31, 0]))
  (blank_line [31, 0] - [32, 0])
  (shortcode_block [32, 0] - [32, 53]
    (shortcode_open [32, 0] - [32, 4])
    name: (shortcode_name [32, 4] - [32, 11])
    arguments: (shortcode_arguments [32, 11] - [32, 53])
    (shortcode_close [32, 53] - [32, 53]))
  (block_quote [32, 53] - [32, 56]
    (block_quote_line [32, 53] - [32, 56]
      marker: (block_quote_marker [32, 53] - [32, 54])
      content: (inline [32, 54] - [32, 56]
        (text [32, 54] - [32, 56])))))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/dashboards/theming.qmd	Parse:    0.52 ms	  1856 bytes/ms	(ERROR [0, 0] - [4, 3])

### File 2: `docs/authoring/_mermaid-examples/sandstone.qmd`

**Error:** Parse failed: (document [0, 0] - [21, 0]
  (yaml_front_matter [0, 0] - [6, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [4, 0]
      (yaml_pair [1, 0] - [4, 0]
        key: (yaml_key [1, 0] - [1, 6])
        (ERROR [1, 6] - [3, 9]
          (yaml_scalar [2, 2] - [2, 6]
            (yaml_string [2, 2] - [2, 6]
              (yaml_string_unquoted [2, 2] - [2, 6])))
          (yaml_scalar [3, 4] - [3, 9]
            (yaml_string [3, 4] - [3, 9]
              (yaml_string_unquoted [3, 4] - [3, 9]))))
        value: (yaml_scalar [3, 11] - [3, 20]
          (yaml_string [3, 11] - [3, 20]
            (yaml_string_unquoted [3, 11] - [3, 20])))))
    close: (yaml_front_matter_delimiter [4, 0] - [4, 3]))
  (atx_heading [6, 0] - [8, 0]
    marker: (atx_heading_marker [6, 0] - [6, 3])
    content: (inline [6, 3] - [6, 16]
      (text [6, 3] - [6, 16])))
  (executable_code_cell [8, 0] - [20, 0]
    open_delimiter: (code_fence_delimiter [8, 0] - [8, 3])
    language: (language_name [8, 4] - [8, 11])
    content: (cell_content [9, 0] - [18, 0]
      (code_line [9, 0] - [9, 12])
      (code_line [10, 0] - [10, 22])
      (code_line [11, 0] - [11, 20])
      (code_line [12, 0] - [12, 10])
      (code_line [13, 0] - [13, 10])
      (code_line [14, 0] - [14, 20])
      (code_line [15, 0] - [15, 11])
      (code_line [16, 0] - [16, 12])
      (code_line [17, 0] - [17, 12]))
    close_delimiter: (code_fence_delimiter [18, 0] - [18, 3]))
  (paragraph [20, 0] - [21, 0]
    content: (inline [20, 0] - [20, 64]
      (text [20, 0] - [20, 17])
      (link [20, 17] - [20, 64]
        text: (link_text [20, 18] - [20, 43])
        destination: (link_destination [20, 45] - [20, 63])))))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/authoring/_mermaid-examples/sandstone.qmd	Parse:    0.06 ms	  4404 bytes/ms	(ERROR [1, 6] - [3, 9])

### File 3: `docs/authoring/code-annotation.qmd`

**Error:** Parse failed: (document [0, 0] - [138, 0]
  (yaml_front_matter [0, 0] - [7, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [5, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 22]
          (yaml_string [1, 7] - [1, 22]
            (yaml_string_unquoted [1, 7] - [1, 22]))))
      (yaml_pair [2, 0] - [3, 0]
        key: (yaml_key [2, 0] - [2, 16])
        value: (yaml_scalar [2, 18] - [2, 23]
          (yaml_string [2, 18] - [2, 23]
            (yaml_string_unquoted [2, 18] - [2, 23]))))
      (yaml_pair [3, 0] - [5, 0]
        key: (yaml_key [3, 0] - [3, 7])
        value: (yaml_scalar [4, 2] - [4, 45]
          (yaml_string [4, 2] - [4, 45]
            (yaml_string_unquoted [4, 2] - [4, 45])))))
    close: (yaml_front_matter_delimiter [5, 0] - [5, 3]))
  (shortcode_block [7, 0] - [8, 0]
    (shortcode_open [7, 0] - [7, 4])
    name: (shortcode_name [7, 4] - [7, 11])
    arguments: (shortcode_arguments [7, 11] - [7, 32])
    (shortcode_close [7, 32] - [8, 0]))
  (atx_heading [8, 0] - [11, 0]
    marker: (atx_heading_marker [8, 0] - [9, 3])
    content: (inline [9, 3] - [9, 11]
      (text [9, 3] - [9, 11])))
  (paragraph [11, 0] - [13, 0]
    content: (inline [11, 0] - [11, 181]
      (text [11, 0] - [11, 181])))
  (paragraph [13, 0] - [15, 0]
    content: (inline [13, 0] - [13, 102]
      (text [13, 0] - [13, 102])))
  (fenced_code_block [15, 0] - [25, 0]
    open: (code_fence_delimiter [15, 0] - [15, 3])
    info: (info_string [15, 3] - [15, 4])
    (code_line [16, 0] - [16, 18])
    (code_line [17, 0] - [17, 23])
    (code_line [18, 0] - [18, 60])
    (code_line [19, 0] - [19, 60])
    (code_line [20, 0] - [20, 60])
    (code_line [21, 0] - [21, 60])
    (code_line [22, 0] - [22, 60])
    close: (code_fence_delimiter [23, 0] - [23, 3]))
  (paragraph [25, 0] - [26, 0]
    content: (inline [25, 0] - [25, 29]
      (text [25, 0] - [25, 8])
      (code_span [25, 8] - [25, 18]
        (code_span_delimiter [25, 8] - [25, 9])
        (code_span_content [25, 9] - [25, 17])
        (code_span_delimiter [25, 17] - [25, 18]))
      (text [25, 18] - [25, 29])))
  (paragraph [26, 0] - [28, 0]
    content: (inline [26, 0] - [26, 52]
      (text [26, 0] - [26, 52])))
  (paragraph [28, 0] - [30, 0]
    content: (inline [28, 0] - [28, 358]
      (text [28, 0] - [28, 182])
      (link [28, 182] - [28, 209]
        text: (link_text [28, 183] - [28, 194])
        destination: (link_destination [28, 196] - [28, 208]))
      (text [28, 209] - [28, 358])))
  (ERROR [30, 0] - [30, 22]
    (code_fence_delimiter [30, 0] - [30, 3])
    (attribute_class [30, 4] - [30, 9])
    (citation_key [30, 9] - [30, 14])
    (citation_key [30, 15] - [30, 22]))
  (paragraph [30, 22] - [31, 0]
    content: (inline [30, 22] - [30, 62]
      (equals_sign [30, 22] - [30, 23])
      (text [30, 23] - [30, 62])))
  (paragraph [31, 0] - [32, 0]
    content: (inline [31, 0] - [31, 16]
      (text [31, 0] - [31, 16])))
  (fenced_code_block [32, 0] - [54, 0]
    open: (code_fence_delimiter [32, 0] - [32, 3])
    (code_line [34, 0] - [34, 265])
    (code_line [36, 0] - [36, 16])
    (code_line [37, 0] - [37, 8])
    (code_line [39, 0] - [39, 97])
    (code_line [41, 0] - [41, 29])
    (code_line [43, 0] - [43, 12])
    (code_line [44, 0] - [44, 5])
    (code_line [45, 0] - [45, 18])
    (code_line [46, 0] - [46, 23])
    (code_line [47, 0] - [47, 11])
    (code_line [48, 0] - [48, 9])
    (code_line [49, 0] - [49, 48])
    (code_line [50, 0] - [50, 47])
    (code_line [51, 0] - [51, 3])
    close: (code_fence_delimiter [52, 0] - [52, 3]))
  (paragraph [54, 0] - [55, 0]
    content: (inline [54, 0] - [54, 8]
      (text [54, 0] - [54, 8])))
  (paragraph [55, 0] - [57, 0]
    content: (inline [55, 0] - [55, 26]
      (text [55, 0] - [55, 5])
      (code_span [55, 5] - [55, 15]
        (code_span_delimiter [55, 5] - [55, 6])
        (code_span_content [55, 6] - [55, 14])
        (code_span_delimiter [55, 14] - [55, 15]))
      (text [55, 15] - [55, 26])))
  (paragraph [57, 0] - [58, 0]
    content: (inline [57, 0] - [57, 11]
      (text [57, 0] - [57, 11])))
  (paragraph [58, 0] - [59, 0]
    content: (inline [58, 0] - [58, 49]
      (text [58, 0] - [58, 49])))
  (fenced_code_block [59, 0] - [88, 0]
    open: (code_fence_delimiter [59, 0] - [59, 4])
    (code_line [60, 0] - [60, 3])
    (code_line [63, 0] - [63, 240])
    (code_line [65, 0] - [65, 246])
    (code_line [67, 0] - [67, 41])
    (code_line [69, 0] - [69, 60])
    (code_line [71, 0] - [71, 279])
    (code_line [73, 0] - [73, 223])
    (code_line [75, 0] - [75, 78])
    (code_line [77, 0] - [77, 13])
    (code_line [78, 0] - [78, 4])
    (code_line [79, 0] - [79, 18])
    (code_line [80, 0] - [80, 23])
    (code_line [81, 0] - [81, 54])
    (code_line [82, 0] - [82, 54])
    (code_line [83, 0] - [83, 54])
    (code_line [84, 0] - [84, 54])
    (code_line [85, 0] - [85, 54])
    close: (code_fence_delimiter [86, 0] - [86, 3]))
  (paragraph [88, 0] - [89, 0]
    content: (inline [88, 0] - [88, 29]
      (text [88, 0] - [88, 8])
      (code_span [88, 8] - [88, 18]
        (code_span_delimiter [88, 8] - [88, 9])
        (code_span_content [88, 9] - [88, 17])
        (code_span_delimiter [88, 17] - [88, 18]))
      (text [88, 18] - [88, 29])))
  (paragraph [89, 0] - [90, 0]
    content: (inline [89, 0] - [89, 52]
      (text [89, 0] - [89, 52])))
  (fenced_code_block [90, 0] - [125, 0]
    open: (code_fence_delimiter [90, 0] - [90, 4])
    (code_line [92, 0] - [92, 34])
    (code_line [94, 0] - [94, 107])
    (code_line [96, 0] - [96, 7])
    (code_line [98, 0] - [98, 116])
    (code_line [100, 0] - [100, 7])
    (code_line [102, 0] - [102, 111])
    (code_line [104, 0] - [104, 8])
    (code_line [106, 0] - [106, 186])
    (code_line [108, 0] - [108, 82])
    (code_line [110, 0] - [110, 13])
    (code_line [111, 0] - [111, 3])
    (code_line [112, 0] - [112, 23])
    (code_line [113, 0] - [113, 3])
    (code_line [115, 0] - [115, 4])
    (code_line [116, 0] - [116, 18])
    (code_line [117, 0] - [117, 23])
    (code_line [118, 0] - [118, 54])
    (code_line [119, 0] - [119, 54])
    (code_line [120, 0] - [120, 54])
    (code_line [121, 0] - [121, 54])
    (code_line [122, 0] - [122, 54])
    close: (code_fence_delimiter [123, 0] - [123, 3]))
  (paragraph [125, 0] - [126, 0]
    content: (inline [125, 0] - [125, 29]
      (text [125, 0] - [125, 8])
      (code_span [125, 8] - [125, 18]
        (code_span_delimiter [125, 8] - [125, 9])
        (code_span_content [125, 9] - [125, 17])
        (code_span_delimiter [125, 17] - [125, 18]))
      (text [125, 18] - [125, 29])))
  (paragraph [126, 0] - [127, 0]
    content: (inline [126, 0] - [126, 52]
      (text [126, 0] - [126, 52])))
  (ERROR [127, 0] - [138, 0]
    (code_fence_delimiter [127, 0] - [127, 4])
    (code_line [129, 0] - [129, 161])
    (code_line [131, 0] - [131, 23])
    (code_line [133, 0] - [133, 260])
    (code_line [135, 0] - [135, 23])
    (code_line [137, 0] - [137, 242])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/authoring/code-annotation.qmd	Parse:    0.16 ms	 33876 bytes/ms	(ERROR [30, 0] - [30, 22])

### File 4: `docs/websites/website-search.qmd`

**Error:** Parse failed: (document [0, 0] - [214, 0]
  (yaml_front_matter [0, 0] - [4, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [2, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 23]
          (yaml_string [1, 7] - [1, 23]
            (yaml_string_quoted [1, 7] - [1, 23])))))
    close: (yaml_front_matter_delimiter [2, 0] - [2, 3]))
  (atx_heading [4, 0] - [6, 0]
    marker: (atx_heading_marker [4, 0] - [4, 3])
    content: (inline [4, 3] - [4, 11]
      (text [4, 3] - [4, 11])))
  (paragraph [6, 0] - [8, 0]
    content: (inline [6, 0] - [6, 333]
      (text [6, 0] - [6, 243])
      (link [6, 243] - [6, 326]
        text: (link_text [6, 244] - [6, 251])
        destination: (link_destination [6, 253] - [6, 325]))
      (text [6, 326] - [6, 333])))
  (atx_heading [8, 0] - [10, 0]
    marker: (atx_heading_marker [8, 0] - [8, 3])
    content: (inline [8, 3] - [8, 20]
      (text [8, 3] - [8, 20])))
  (paragraph [10, 0] - [12, 0]
    content: (inline [10, 0] - [10, 226]
      (text [10, 0] - [10, 226])))
  (pipe_table [12, 0] - [16, 0]
    (pipe_table_start [12, 0] - [12, 0])
    (pipe_table_header [12, 0] - [13, 0]
      content: (table_cell [12, 1] - [12, 13])
      content: (table_cell [12, 14] - [12, 123]))
    (pipe_table_delimiter [13, 0] - [14, 0]
      (table_delimiter_cell [13, 1] - [13, 13])
      (table_delimiter_cell [13, 14] - [13, 123]))
    (pipe_table_row [14, 0] - [15, 0])
    (pipe_table_row [15, 0] - [16, 0]))
  (blank_line [16, 0] - [17, 0])
  (paragraph [17, 0] - [19, 0]
    content: (inline [17, 0] - [17, 12]
      (text [17, 0] - [17, 12])))
  (fenced_code_block [19, 0] - [26, 0]
    open: (code_fence_delimiter [19, 0] - [19, 3])
    info: (info_string [19, 3] - [19, 8])
    (code_line [20, 0] - [20, 8])
    (code_line [21, 0] - [21, 10])
    (code_line [22, 0] - [22, 20])
    (code_line [23, 0] - [23, 17])
    close: (code_fence_delimiter [24, 0] - [24, 3]))
  (paragraph [26, 0] - [28, 0]
    content: (inline [26, 0] - [26, 194]
      (text [26, 0] - [26, 177])
      (code_span [26, 177] - [26, 192]
        (code_span_delimiter [26, 177] - [26, 178])
        (code_span_content [26, 178] - [26, 191])
        (code_span_delimiter [26, 191] - [26, 192]))
      (text [26, 192] - [26, 194])))
  (paragraph [28, 0] - [30, 0]
    content: (inline [28, 0] - [28, 55]
      (text [28, 0] - [28, 4])
      (code_span [28, 4] - [28, 13]
        (code_span_delimiter [28, 4] - [28, 5])
        (code_span_content [28, 5] - [28, 12])
        (code_span_delimiter [28, 12] - [28, 13]))
      (text [28, 13] - [28, 55])))
  (paragraph [30, 0] - [32, 0]
    content: (inline [30, 0] - [30, 326]
      (image [30, 0] - [30, 30]
        alt: (image_alt [30, 2] - [30, 2])
        source: (image_source [30, 4] - [30, 29]))
      (ERROR [30, 30] - [30, 72]
        (attribute_class [30, 31] - [30, 38])
        (attribute_class [30, 38] - [30, 64])
        (reference_type [30, 64] - [30, 68])
        (citation_key [30, 69] - [30, 72]))
      (equals_sign [30, 72] - [30, 73])
      (text [30, 73] - [30, 326])))
  (paragraph [32, 0] - [34, 0]
    content: (inline [32, 0] - [32, 47]
      (text [32, 0] - [32, 4])
      (code_span [32, 4] - [32, 13]
        (code_span_delimiter [32, 4] - [32, 5])
        (code_span_content [32, 5] - [32, 12])
        (code_span_delimiter [32, 12] - [32, 13]))
      (text [32, 13] - [32, 47])))
  (paragraph [34, 0] - [36, 0]
    content: (inline [34, 0] - [34, 221]
      (image [34, 0] - [34, 30]
        alt: (image_alt [34, 2] - [34, 2])
        source: (image_source [34, 4] - [34, 29]))
      (ERROR [34, 30] - [34, 72]
        (attribute_class [34, 31] - [34, 38])
        (attribute_class [34, 38] - [34, 64])
        (reference_type [34, 64] - [34, 68])
        (citation_key [34, 69] - [34, 72]))
      (equals_sign [34, 72] - [34, 73])
      (text [34, 73] - [34, 221])))
  (paragraph [36, 0] - [38, 0]
    content: (inline [36, 0] - [36, 253]
      (text [36, 0] - [36, 128])
      (code_span [36, 128] - [36, 153]
        (code_span_delimiter [36, 128] - [36, 129])
        (code_span_content [36, 129] - [36, 152])
        (code_span_delimiter [36, 152] - [36, 153]))
      (text [36, 153] - [36, 165])
      (code_span [36, 165] - [36, 175]
        (code_span_delimiter [36, 165] - [36, 166])
        (code_span_content [36, 166] - [36, 174])
        (code_span_delimiter [36, 174] - [36, 175]))
      (text [36, 175] - [36, 235])
      (code_span [36, 235] - [36, 244]
        (code_span_delimiter [36, 235] - [36, 236])
        (code_span_content [36, 236] - [36, 243])
        (code_span_delimiter [36, 243] - [36, 244]))
      (text [36, 244] - [36, 253])))
  (paragraph [38, 0] - [39, 0]
    content: (inline [38, 0] - [38, 21]
      (text [38, 0] - [38, 4])
      (ERROR [38, 4] - [38, 16]
        (citation_key [38, 5] - [38, 11])
        (citation_key [38, 12] - [38, 16]))
      (equals_sign [38, 16] - [38, 17])
      (text [38, 17] - [38, 21])))
  (fenced_code_block [39, 0] - [44, 0]
    open: (code_fence_delimiter [39, 0] - [39, 3])
    info: (info_string [39, 3] - [39, 8])
    (code_line [40, 0] - [40, 10])
    (code_line [41, 0] - [41, 33])
    close: (code_fence_delimiter [42, 0] - [42, 3]))
  (paragraph [44, 0] - [45, 0]
    content: (inline [44, 0] - [44, 100]
      (image [44, 0] - [44, 39]
        alt: (image_alt [44, 2] - [44, 2])
        source: (image_source [44, 4] - [44, 38]))
      (ERROR [44, 39] - [44, 47]
        (reference_type [44, 40] - [44, 43])
        (citation_key [44, 44] - [44, 47]))
      (equals_sign [44, 47] - [44, 48])
      (text [44, 48] - [44, 100])))
  (ERROR [45, 0] - [214, 0]
    (fenced_div_delimiter [45, 0] - [45, 3])
    (atx_heading [47, 0] - [49, 0]
      marker: (atx_heading_marker [47, 0] - [47, 3])
      content: (inline [47, 3] - [47, 20]
        (text [47, 3] - [47, 20])))
    (paragraph [49, 0] - [51, 0]
      content: (inline [49, 0] - [49, 301]
        (text [49, 0] - [49, 97])
        (shortcode_inline [49, 97] - [49, 110]
          (shortcode_open [49, 97] - [49, 101])
          name: (shortcode_name [49, 101] - [49, 104])
          arguments: (shortcode_arguments [49, 104] - [49, 107])
          (shortcode_close [49, 107] - [49, 110]))
        (text [49, 110] - [49, 112])
        (shortcode_inline [49, 112] - [49, 125]
          (shortcode_open [49, 112] - [49, 116])
          name: (shortcode_name [49, 116] - [49, 119])
          arguments: (shortcode_arguments [49, 119] - [49, 122])
          (shortcode_close [49, 122] - [49, 125]))
        (text [49, 125] - [49, 129])
        (shortcode_inline [49, 129] - [49, 142]
          (shortcode_open [49, 129] - [49, 133])
          name: (shortcode_name [49, 133] - [49, 136])
          arguments: (shortcode_arguments [49, 136] - [49, 139])
          (shortcode_close [49, 139] - [49, 142]))
        (text [49, 142] - [49, 195])
        (code_span [49, 195] - [49, 214]
          (code_span_delimiter [49, 195] - [49, 196])
          (code_span_content [49, 196] - [49, 213])
          (code_span_delimiter [49, 213] - [49, 214]))
        (text [49, 214] - [49, 270])
        (shortcode_inline [49, 270] - [49, 283]
          (shortcode_open [49, 270] - [49, 274])
          name: (shortcode_name [49, 274] - [49, 277])
          arguments: (shortcode_arguments [49, 277] - [49, 280])
          (shortcode_close [49, 280] - [49, 283]))
        (text [49, 283] - [49, 287])
        (shortcode_inline [49, 287] - [49, 300]
          (shortcode_open [49, 287] - [49, 291])
          name: (shortcode_name [49, 291] - [49, 294])
          arguments: (shortcode_arguments [49, 294] - [49, 297])
          (shortcode_close [49, 297] - [49, 300]))
        (text [49, 300] - [49, 301])))
    (fenced_code_block [51, 0] - [57, 0]
      open: (code_fence_delimiter [51, 0] - [51, 3])
      info: (info_string [51, 3] - [51, 8])
      (code_line [52, 0] - [52, 8])
      (code_line [53, 0] - [53, 9])
      (code_line [54, 0] - [54, 33])
      close: (code_fence_delimiter [55, 0] - [55, 3]))
    (atx_heading [57, 0] - [59, 0]
      marker: (atx_heading_marker [57, 0] - [57, 3])
      content: (inline [57, 3] - [57, 22]
        (text [57, 3] - [57, 22])))
    (paragraph [59, 0] - [61, 0]
      content: (inline [59, 0] - [59, 89]
        (text [59, 0] - [59, 26])
        (code_span [59, 26] - [59, 34]
          (code_span_delimiter [59, 26] - [59, 27])
          (code_span_content [59, 27] - [59, 33])
          (code_span_delimiter [59, 33] - [59, 34]))
        (text [59, 34] - [59, 89])))
    (paragraph [61, 0] - [62, 0]
      content: (inline [61, 0] - [61, 250]
        (text [61, 0] - [61, 250])))
    (paragraph [62, 0] - [63, 0]
      content: (inline [62, 0] - [62, 250]
        (text [62, 0] - [62, 250])))
    (ERROR [63, 0] - [64, 1]
      (list_marker [63, 0] - [63, 1])
      (setext_heading_marker [63, 1] - [63, 21])
      (list_marker [63, 21] - [63, 22])
      (setext_heading_marker [63, 22] - [63, 249])
      (list_marker [63, 249] - [63, 250]))
    (paragraph [64, 1] - [65, 0]
      content: (inline [64, 1] - [64, 250]
        (code_span [64, 1] - [64, 9]
          (code_span_delimiter [64, 1] - [64, 3])
          (code_span_content [64, 3] - [64, 8])
          (code_span_delimiter [64, 8] - [64, 9]))
        (text [64, 9] - [64, 250])))
    (paragraph [65, 0] - [66, 0]
      content: (inline [65, 0] - [65, 250]
        (text [65, 0] - [65, 250])))
    (paragraph [66, 0] - [67, 0]
      content: (inline [66, 0] - [66, 250]
        (text [66, 0] - [66, 2])
        (code_span [66, 2] - [66, 18]
          (code_span_delimiter [66, 2] - [66, 3])
          (code_span_content [66, 3] - [66, 17])
          (code_span_delimiter [66, 17] - [66, 18]))
        (text [66, 18] - [66, 250])))
    (paragraph [67, 0] - [68, 0]
      content: (inline [67, 0] - [67, 250]
        (text [67, 0] - [67, 250])))
    (paragraph [68, 0] - [69, 0]
      content: (inline [68, 0] - [68, 250]
        (text [68, 0] - [68, 24])
        (link [68, 24] - [68, 53]
          destination: (link_destination [68, 27] - [68, 52]))
        (ERROR [68, 53] - [68, 69]
          (attribute_class [68, 54] - [68, 61])
          (reference_type [68, 61] - [68, 65])
          (citation_key [68, 66] - [68, 69]))
        (equals_sign [68, 69] - [68, 70])
        (text [68, 70] - [68, 250])))
    (paragraph [69, 0] - [70, 0]
      content: (inline [69, 0] - [69, 250]
        (text [69, 0] - [69, 250])))
    (paragraph [70, 0] - [71, 0]
      content: (inline [70, 0] - [70, 250]
        (text [70, 0] - [70, 2])
        (code_span [70, 2] - [70, 15]
          (code_span_delimiter [70, 2] - [70, 3])
          (code_span_content [70, 3] - [70, 14])
          (code_span_delimiter [70, 14] - [70, 15]))
        (text [70, 15] - [70, 250])))
    (paragraph [71, 0] - [72, 0]
      content: (inline [71, 0] - [71, 250]
        (text [71, 0] - [71, 250])))
    (paragraph [72, 0] - [73, 0]
      content: (inline [72, 0] - [72, 250]
        (text [72, 0] - [72, 24])
        (link [72, 24] - [72, 50]
          destination: (link_destination [72, 27] - [72, 49]))
        (ERROR [72, 50] - [72, 66]
          (attribute_class [72, 51] - [72, 58])
          (reference_type [72, 58] - [72, 62])
          (citation_key [72, 63] - [72, 66]))
        (equals_sign [72, 66] - [72, 67])
        (text [72, 67] - [72, 250])))
    (paragraph [73, 0] - [74, 0]
      content: (inline [73, 0] - [73, 250]
        (text [73, 0] - [73, 250])))
    (paragraph [74, 0] - [75, 0]
      content: (inline [74, 0] - [74, 250]
        (text [74, 0] - [74, 2])
        (code_span [74, 2] - [74, 21]
          (code_span_delimiter [74, 2] - [74, 3])
          (code_span_content [74, 3] - [74, 20])
          (code_span_delimiter [74, 20] - [74, 21]))
        (text [74, 21] - [74, 103])
        (code_span [74, 103] - [74, 109]
          (code_span_delimiter [74, 103] - [74, 104])
          (code_span_content [74, 104] - [74, 108])
          (code_span_delimiter [74, 108] - [74, 109]))
        (text [74, 109] - [74, 111])
        (code_span [74, 111] - [74, 119]
          (code_span_delimiter [74, 111] - [74, 112])
          (code_span_content [74, 112] - [74, 118])
          (code_span_delimiter [74, 118] - [74, 119]))
        (text [74, 119] - [74, 121])
        (code_span [74, 121] - [74, 127]
          (code_span_delimiter [74, 121] - [74, 122])
          (code_span_content [74, 122] - [74, 126])
          (code_span_delimiter [74, 126] - [74, 127]))
        (text [74, 127] - [74, 150])
        (code_span [74, 150] - [74, 156]
          (code_span_delimiter [74, 150] - [74, 151])
          (code_span_content [74, 151] - [74, 155])
          (code_span_delimiter [74, 155] - [74, 156]))
        (text [74, 156] - [74, 179])
        (code_span [74, 179] - [74, 185]
          (code_span_delimiter [74, 179] - [74, 180])
          (code_span_content [74, 180] - [74, 184])
          (code_span_delimiter [74, 184] - [74, 185]))
        (text [74, 185] - [74, 250])))
    (paragraph [75, 0] - [76, 0]
      content: (inline [75, 0] - [75, 250]
        (text [75, 0] - [75, 250])))
    (paragraph [76, 0] - [77, 0]
      content: (inline [76, 0] - [76, 250]
        (text [76, 0] - [76, 24])
        (link [76, 24] - [76, 58]
          destination: (link_destination [76, 27] - [76, 57]))
        (ERROR [76, 58] - [76, 74]
          (attribute_class [76, 59] - [76, 66])
          (reference_type [76, 66] - [76, 70])
          (citation_key [76, 71] - [76, 74]))
        (equals_sign [76, 74] - [76, 75])
        (text [76, 75] - [76, 162])
        (equals_sign [76, 162] - [76, 163])
        (text [76, 163] - [76, 250])))
    (paragraph [77, 0] - [79, 0]
      content: (inline [77, 0] - [77, 250]
        (text [77, 0] - [77, 250])))
    (atx_heading [79, 0] - [81, 0]
      marker: (atx_heading_marker [79, 0] - [79, 3])
      content: (inline [79, 3] - [79, 16]
        (text [79, 3] - [79, 16])))
    (paragraph [81, 0] - [83, 0]
      content: (inline [81, 0] - [81, 454]
        (text [81, 0] - [81, 186])
        (code_span [81, 186] - [81, 199]
          (code_span_delimiter [81, 186] - [81, 187])
          (code_span_content [81, 187] - [81, 198])
          (code_span_delimiter [81, 198] - [81, 199]))
        (text [81, 199] - [81, 323])
        (link [81, 323] - [81, 439]
          text: (link_text [81, 324] - [81, 349])
          destination: (link_destination [81, 351] - [81, 438]))
        (text [81, 439] - [81, 454])))
    (atx_heading [83, 0] - [85, 0]
      marker: (atx_heading_marker [83, 0] - [83, 4])
      content: (inline [83, 4] - [83, 23]
        (text [83, 4] - [83, 23])))
    (paragraph [85, 0] - [87, 0]
      content: (inline [85, 0] - [85, 350]
        (text [85, 0] - [85, 220])
        (link [85, 220] - [85, 285]
          text: (link_text [85, 221] - [85, 229])
          destination: (link_destination [85, 231] - [85, 284]))
        (text [85, 285] - [85, 350])))
    (paragraph [87, 0] - [88, 0]
      content: (inline [87, 0] - [87, 220]
        (text [87, 0] - [87, 220])))
    (paragraph [88, 0] - [89, 0]
      content: (inline [88, 0] - [88, 220]
        (text [88, 0] - [88, 220])))
    (ERROR [89, 0] - [90, 1]
      (list_marker [89, 0] - [89, 1])
      (setext_heading_marker [89, 1] - [89, 24])
      (list_marker [89, 24] - [89, 25])
      (setext_heading_marker [89, 25] - [89, 219])
      (list_marker [89, 219] - [89, 220]))
    (paragraph [90, 1] - [91, 0]
      content: (inline [90, 1] - [90, 220]
        (code_span [90, 1] - [90, 14]
          (code_span_delimiter [90, 1] - [90, 3])
          (code_span_content [90, 3] - [90, 13])
          (code_span_delimiter [90, 13] - [90, 14]))
        (text [90, 14] - [90, 220])))
    (paragraph [91, 0] - [92, 0]
      content: (inline [91, 0] - [91, 220]
        (text [91, 0] - [91, 220])))
    (paragraph [92, 0] - [93, 0]
      content: (inline [92, 0] - [92, 220]
        (text [92, 0] - [92, 2])
        (code_span [92, 2] - [92, 18]
          (code_span_delimiter [92, 2] - [92, 3])
          (code_span_content [92, 3] - [92, 17])
          (code_span_delimiter [92, 17] - [92, 18]))
        (text [92, 18] - [92, 220])))
    (paragraph [93, 0] - [94, 0]
      content: (inline [93, 0] - [93, 220]
        (text [93, 0] - [93, 220])))
    (paragraph [94, 0] - [95, 0]
      content: (inline [94, 0] - [94, 220]
        (text [94, 0] - [94, 2])
        (code_span [94, 2] - [94, 23]
          (code_span_delimiter [94, 2] - [94, 3])
          (code_span_content [94, 3] - [94, 22])
          (code_span_delimiter [94, 22] - [94, 23]))
        (text [94, 23] - [94, 220])))
    (paragraph [95, 0] - [96, 0]
      content: (inline [95, 0] - [95, 220]
        (text [95, 0] - [95, 220])))
    (paragraph [96, 0] - [97, 0]
      content: (inline [96, 0] - [96, 220]
        (text [96, 0] - [96, 220])))
    (paragraph [97, 0] - [98, 0]
      content: (inline [97, 0] - [97, 220]
        (text [97, 0] - [97, 45])
        (strong_emphasis [97, 45] - [97, 60]
          (strong_emphasis_delimiter [97, 45] - [97, 47])
          (text [97, 47] - [97, 58])
          (strong_emphasis_delimiter [97, 58] - [97, 60]))
        (text [97, 60] - [97, 220])))
    (paragraph [98, 0] - [99, 0]
      content: (inline [98, 0] - [98, 220]
        (text [98, 0] - [98, 220])))
    (paragraph [99, 0] - [100, 0]
      content: (inline [99, 0] - [99, 220]
        (text [99, 0] - [99, 220])))
    (paragraph [100, 0] - [101, 0]
      content: (inline [100, 0] - [100, 220]
        (text [100, 0] - [100, 2])
        (code_span [100, 2] - [100, 13]
          (code_span_delimiter [100, 2] - [100, 3])
          (code_span_content [100, 3] - [100, 12])
          (code_span_delimiter [100, 12] - [100, 13]))
        (text [100, 13] - [100, 220])))
    (paragraph [101, 0] - [103, 0]
      content: (inline [101, 0] - [101, 220]
        (text [101, 0] - [101, 220])))
    (paragraph [103, 0] - [105, 0]
      content: (inline [103, 0] - [103, 12]
        (text [103, 0] - [103, 12])))
    (fenced_code_block [105, 0] - [114, 0]
      open: (code_fence_delimiter [105, 0] - [105, 3])
      info: (info_string [105, 3] - [105, 8])
      (code_line [106, 0] - [106, 8])
      (code_line [107, 0] - [107, 9])
      (code_line [108, 0] - [108, 12])
      (code_line [109, 0] - [109, 33])
      (code_line [110, 0] - [110, 41])
      (code_line [111, 0] - [111, 51])
      close: (code_fence_delimiter [112, 0] - [112, 3]))
    (atx_heading [114, 0] - [116, 0]
      marker: (atx_heading_marker [114, 0] - [114, 4])
      content: (inline [114, 4] - [114, 23]
        (text [114, 4] - [114, 23])))
    (paragraph [116, 0] - [118, 0]
      content: (inline [116, 0] - [116, 181]
        (text [116, 0] - [116, 28])
        (code_span [116, 28] - [116, 41]
          (code_span_delimiter [116, 28] - [116, 29])
          (code_span_content [116, 29] - [116, 40])
          (code_span_delimiter [116, 40] - [116, 41]))
        (text [116, 41] - [116, 181])))
    (paragraph [118, 0] - [120, 0]
      content: (inline [118, 0] - [118, 290]
        (text [118, 0] - [118, 196])
        (code_span [118, 196] - [118, 210]
          (code_span_delimiter [118, 196] - [118, 197])
          (code_span_content [118, 197] - [118, 209])
          (code_span_delimiter [118, 209] - [118, 210]))
        (text [118, 210] - [118, 221])
        (code_span [118, 221] - [118, 230]
          (code_span_delimiter [118, 221] - [118, 222])
          (code_span_content [118, 222] - [118, 229])
          (code_span_delimiter [118, 229] - [118, 230]))
        (text [118, 230] - [118, 290])))
    (paragraph [120, 0] - [121, 0]
      content: (inline [120, 0] - [120, 234]
        (text [120, 0] - [120, 234])))
    (paragraph [121, 0] - [122, 0]
      content: (inline [121, 0] - [121, 234]
        (text [121, 0] - [121, 234])))
    (ERROR [122, 0] - [123, 1]
      (list_marker [122, 0] - [122, 1])
      (setext_heading_marker [122, 1] - [122, 12])
      (list_marker [122, 12] - [122, 13])
      (setext_heading_marker [122, 13] - [122, 233])
      (list_marker [122, 233] - [122, 234]))
    (paragraph [123, 1] - [124, 0]
      content: (inline [123, 1] - [123, 234]
        (code_span [123, 1] - [123, 8]
          (code_span_delimiter [123, 1] - [123, 3])
          (code_span_content [123, 3] - [123, 7])
          (code_span_delimiter [123, 7] - [123, 8]))
        (text [123, 8] - [123, 234])))
    (paragraph [124, 0] - [125, 0]
      content: (inline [124, 0] - [124, 234]
        (text [124, 0] - [124, 234])))
    (paragraph [125, 0] - [126, 0]
      content: (inline [125, 0] - [125, 234]
        (text [125, 0] - [125, 234])))
    (paragraph [126, 0] - [127, 0]
      content: (inline [126, 0] - [126, 234]
        (text [126, 0] - [126, 234])))
    (paragraph [127, 0] - [128, 0]
      content: (inline [127, 0] - [127, 234]
        (text [127, 0] - [127, 2])
        (code_span [127, 2] - [127, 9]
          (code_span_delimiter [127, 2] - [127, 3])
          (code_span_content [127, 3] - [127, 8])
          (code_span_delimiter [127, 8] - [127, 9]))
        (text [127, 9] - [127, 234])))
    (paragraph [128, 0] - [129, 0]
      content: (inline [128, 0] - [128, 234]
        (text [128, 0] - [128, 234])))
    (paragraph [129, 0] - [130, 0]
      content: (inline [129, 0] - [129, 234]
        (text [129, 0] - [129, 234])))
    (paragraph [130, 0] - [131, 0]
      content: (inline [130, 0] - [130, 234]
        (text [130, 0] - [130, 234])))
    (paragraph [131, 0] - [132, 0]
      content: (inline [131, 0] - [131, 234]
        (text [131, 0] - [131, 2])
        (code_span [131, 2] - [131, 8]
          (code_span_delimiter [131, 2] - [131, 3])
          (code_span_content [131, 3] - [131, 7])
          (code_span_delimiter [131, 7] - [131, 8]))
        (text [131, 8] - [131, 234])))
    (paragraph [132, 0] - [133, 0]
      content: (inline [132, 0] - [132, 234]
        (text [132, 0] - [132, 234])))
    (paragraph [133, 0] - [134, 0]
      content: (inline [133, 0] - [133, 234]
        (text [133, 0] - [133, 234])))
    (paragraph [134, 0] - [135, 0]
      content: (inline [134, 0] - [134, 234]
        (text [134, 0] - [134, 234])))
    (paragraph [135, 0] - [136, 0]
      content: (inline [135, 0] - [135, 234]
        (text [135, 0] - [135, 2])
        (code_span [135, 2] - [135, 11]
          (code_span_delimiter [135, 2] - [135, 3])
          (code_span_content [135, 3] - [135, 10])
          (code_span_delimiter [135, 10] - [135, 11]))
        (text [135, 11] - [135, 234])))
    (paragraph [136, 0] - [137, 0]
      content: (inline [136, 0] - [136, 234]
        (text [136, 0] - [136, 234])))
    (paragraph [137, 0] - [138, 0]
      content: (inline [137, 0] - [137, 234]
        (text [137, 0] - [137, 234])))
    (paragraph [138, 0] - [140, 0]
      content: (inline [138, 0] - [138, 234]
        (text [138, 0] - [138, 234])))
    (paragraph [140, 0] - [142, 0]
      content: (inline [140, 0] - [140, 82]
        (text [140, 0] - [140, 82])))
    (fenced_code_block [142, 0] - [155, 0]
      open: (code_fence_delimiter [142, 0] - [142, 3])
      info: (info_string [142, 3] - [142, 8])
      (code_line [143, 0] - [143, 8])
      (code_line [144, 0] - [144, 9])
      (code_line [145, 0] - [145, 12])
      (code_line [146, 0] - [146, 33])
      (code_line [147, 0] - [147, 41])
      (code_line [148, 0] - [148, 51])
      (code_line [149, 0] - [149, 19])
      (code_line [150, 0] - [150, 17])
      (code_line [151, 0] - [151, 20])
      (code_line [152, 0] - [152, 18])
      close: (code_fence_delimiter [153, 0] - [153, 3]))
    (atx_heading [155, 0] - [157, 0]
      marker: (atx_heading_marker [155, 0] - [155, 4])
      content: (inline [155, 4] - [155, 20]
        (text [155, 4] - [155, 20])))
    (paragraph [157, 0] - [159, 0]
      content: (inline [157, 0] - [157, 314]
        (text [157, 0] - [157, 287])
        (code_span [157, 287] - [157, 305]
          (code_span_delimiter [157, 287] - [157, 288])
          (code_span_content [157, 288] - [157, 304])
          (code_span_delimiter [157, 304] - [157, 305]))
        (text [157, 305] - [157, 314])))
    (fenced_code_block [159, 0] - [169, 0]
      open: (code_fence_delimiter [159, 0] - [159, 3])
      info: (info_string [159, 3] - [159, 8])
      (code_line [160, 0] - [160, 8])
      (code_line [161, 0] - [161, 9])
      (code_line [162, 0] - [162, 12])
      (code_line [163, 0] - [163, 33])
      (code_line [164, 0] - [164, 41])
      (code_line [165, 0] - [165, 51])
      (code_line [166, 0] - [166, 28])
      close: (code_fence_delimiter [167, 0] - [167, 3]))
    (paragraph [169, 0] - [171, 0]
      content: (inline [169, 0] - [169, 365]
        (text [169, 0] - [169, 73])
        (link [169, 73] - [169, 130]
          text: (link_text [169, 74] - [169, 88])
          destination: (link_destination [169, 90] - [169, 129]))
        (text [169, 130] - [169, 232])
        (link [169, 232] - [169, 282]
          text: (link_text [169, 233] - [169, 247])
          destination: (link_destination [169, 249] - [169, 281]))
        (text [169, 282] - [169, 365])))
    (atx_heading [171, 0] - [173, 0]
      marker: (atx_heading_marker [171, 0] - [171, 4])
      content: (inline [171, 4] - [171, 26]
        (text [171, 4] - [171, 26])))
    (paragraph [173, 0] - [175, 0]
      content: (inline [173, 0] - [173, 427]
        (text [173, 0] - [173, 223])
        (code_span [173, 223] - [173, 231]
          (code_span_delimiter [173, 223] - [173, 224])
          (code_span_content [173, 224] - [173, 230])
          (code_span_delimiter [173, 230] - [173, 231]))
        (text [173, 231] - [173, 244])
        (code_span [173, 244] - [173, 253]
          (code_span_delimiter [173, 244] - [173, 245])
          (code_span_content [173, 245] - [173, 252])
          (code_span_delimiter [173, 252] - [173, 253]))
        (text [173, 253] - [173, 337])
        (link [173, 337] - [173, 426]
          text: (link_text [173, 338] - [173, 359])
          destination: (link_destination [173, 361] - [173, 425]))
        (text [173, 426] - [173, 427])))
    (paragraph [175, 0] - [177, 0]
      content: (inline [175, 0] - [175, 12]
        (text [175, 0] - [175, 12])))
    (fenced_code_block [177, 0] - [192, 0]
      open: (code_fence_delimiter [177, 0] - [177, 3])
      info: (info_string [177, 3] - [177, 8])
      (code_line [178, 0] - [178, 8])
      (code_line [179, 0] - [179, 9])
      (code_line [180, 0] - [180, 12])
      (code_line [181, 0] - [181, 33])
      (code_line [182, 0] - [182, 41])
      (code_line [183, 0] - [183, 51])
      (code_line [184, 0] - [184, 19])
      (code_line [185, 0] - [185, 17])
      (code_line [186, 0] - [186, 20])
      (code_line [187, 0] - [187, 18])
      (code_line [188, 0] - [188, 13])
      (code_line [189, 0] - [189, 35])
      close: (code_fence_delimiter [190, 0] - [190, 3]))
    (atx_heading [192, 0] - [194, 0]
      marker: (atx_heading_marker [192, 0] - [192, 3])
      content: (inline [192, 3] - [192, 27]
        (text [192, 3] - [192, 27])))
    (paragraph [194, 0] - [196, 0]
      content: (inline [194, 0] - [194, 114]
        (text [194, 0] - [194, 60])
        (code_span [194, 60] - [194, 75]
          (code_span_delimiter [194, 60] - [194, 61])
          (code_span_content [194, 61] - [194, 74])
          (code_span_delimiter [194, 74] - [194, 75]))
        (text [194, 75] - [194, 114])))
    (fenced_code_block [196, 0] - [203, 0]
      open: (code_fence_delimiter [196, 0] - [196, 3])
      info: (info_string [196, 3] - [196, 8])
      (code_line [197, 0] - [197, 3])
      (code_line [198, 0] - [198, 20])
      (code_line [199, 0] - [199, 13])
      (code_line [200, 0] - [200, 3])
      close: (code_fence_delimiter [201, 0] - [201, 3]))
    (paragraph [203, 0] - [205, 0]
      content: (inline [203, 0] - [203, 131]
        (text [203, 0] - [203, 112])
        (code_span [203, 112] - [203, 125]
          (code_span_delimiter [203, 112] - [203, 113])
          (code_span_content [203, 113] - [203, 124])
          (code_span_delimiter [203, 124] - [203, 125]))
        (text [203, 125] - [203, 131])))
    (fenced_code_block [205, 0] - [210, 0]
      open: (code_fence_delimiter [205, 0] - [205, 3])
      info: (info_string [205, 3] - [205, 8])
      (code_line [206, 0] - [206, 8])
      (code_line [207, 0] - [207, 15])
      close: (code_fence_delimiter [208, 0] - [208, 3]))
    (atx_heading [210, 0] - [212, 0]
      marker: (atx_heading_marker [210, 0] - [210, 4])
      content: (inline [210, 4] - [210, 48]
        (text [210, 4] - [210, 48])))
    (paragraph [212, 0] - [213, 0]
      content: (inline [212, 0] - [212, 155]
        (text [212, 0] - [212, 101])
        (code_span [212, 101] - [212, 133]
          (code_span_delimiter [212, 101] - [212, 102])
          (code_span_content [212, 102] - [212, 132])
          (code_span_delimiter [212, 132] - [212, 133]))
        (text [212, 133] - [212, 155])))
    (paragraph [213, 0] - [214, 0]
      content: (inline [213, 0] - [213, 113]
        (text [213, 0] - [213, 113])))))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/websites/website-search.qmd	Parse:    0.76 ms	 25290 bytes/ms	(ERROR [30, 30] - [30, 72])

### File 5: `docs/get-started/hello/index.qmd`

**Error:** Parse failed: (document [0, 0] - [7, 0]
  (ERROR [0, 0] - [1, 0]
    (yaml_front_matter_start [0, 0] - [1, 0]))
  (atx_heading [1, 0] - [2, 0]
    marker: (atx_heading_marker [1, 0] - [1, 2])
    content: (inline [1, 2] - [1, 89]
      (text [1, 2] - [1, 89])))
  (atx_heading [2, 0] - [3, 0]
    marker: (atx_heading_marker [2, 0] - [2, 2])
    content: (inline [2, 2] - [2, 14]
      (text [2, 2] - [2, 14])))
  (paragraph [3, 0] - [4, 0]
    content: (inline [3, 0] - [3, 32]
      (text [3, 0] - [3, 32])))
  (ERROR [4, 0] - [5, 3]
    (text [4, 0] - [4, 22])
    (emphasis_delimiter [4, 22] - [4, 23])
    (text [4, 23] - [4, 36])
    (text [5, 0] - [5, 3]))
  (blank_line [5, 3] - [7, 0]))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/get-started/hello/index.qmd	Parse:    0.07 ms	  2485 bytes/ms	(ERROR [0, 0] - [1, 0])

### File 6: `docs/reference/projects/books.qmd`

**Error:** Parse failed: (document [0, 0] - [15, 0]
  (yaml_front_matter [0, 0] - [7, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [5, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 21]
          (yaml_string [1, 7] - [1, 21]
            (yaml_string_quoted [1, 7] - [1, 21]))))
      (yaml_pair [2, 0] - [3, 0]
        key: (yaml_key [2, 0] - [2, 12])
        value: (yaml_scalar [2, 14] - [2, 18]
          (yaml_string [2, 14] - [2, 18]
            (yaml_string_unquoted [2, 14] - [2, 18]))))
      (yaml_pair [3, 0] - [4, 0]
        key: (yaml_key [3, 0] - [3, 18])
        value: (yaml_scalar [3, 20] - [3, 24]
          (yaml_string [3, 20] - [3, 24]
            (yaml_string_unquoted [3, 20] - [3, 24]))))
      (yaml_pair [4, 0] - [5, 0]
        key: (yaml_key [4, 0] - [4, 18])
        value: (yaml_scalar [4, 20] - [4, 25]
          (yaml_string [4, 20] - [4, 25]
            (yaml_string_unquoted [4, 20] - [4, 25])))))
    close: (yaml_front_matter_delimiter [5, 0] - [5, 3]))
  (paragraph [7, 0] - [9, 0]
    content: (inline [7, 0] - [7, 152]
      (text [7, 0] - [7, 26])
      (code_span [7, 26] - [7, 32]
        (code_span_delimiter [7, 26] - [7, 27])
        (code_span_content [7, 27] - [7, 31])
        (code_span_delimiter [7, 31] - [7, 32]))
      (text [7, 32] - [7, 68])
      (link [7, 68] - [7, 99]
        text: (link_text [7, 69] - [7, 84])
        destination: (link_destination [7, 86] - [7, 98]))
      (text [7, 99] - [7, 152])))
  (shortcode_block [9, 0] - [10, 0]
    (shortcode_open [9, 0] - [9, 4])
    name: (shortcode_name [9, 4] - [9, 11])
    arguments: (shortcode_arguments [9, 11] - [9, 29])
    (shortcode_close [9, 29] - [10, 0]))
  (blank_line [10, 0] - [11, 0])
  (ERROR [11, 0] - [11, 5]
    (text [11, 0] - [11, 4]))
  (atx_heading [11, 5] - [12, 0]
    marker: (atx_heading_marker [11, 5] - [11, 6])
    content: (inline [11, 6] - [11, 17]
      (text [11, 6] - [11, 17])))
  (ERROR [12, 0] - [15, 0]
    (fenced_div_delimiter [12, 0] - [12, 3])
    (shortcode_block [14, 0] - [15, 0]
      (shortcode_open [14, 0] - [14, 4])
      name: (shortcode_name [14, 4] - [14, 11])
      arguments: (shortcode_arguments [14, 11] - [14, 25])
      (shortcode_close [14, 25] - [15, 0]))))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/reference/projects/books.qmd	Parse:    0.09 ms	  3801 bytes/ms	(ERROR [11, 0] - [11, 5])

### File 7: `docs/visual-editor/options.qmd`

**Error:** Contains ERROR nodes

### File 8: `docs/presentations/revealjs/examples/smaller.qmd`

**Error:** Parse failed: (document [0, 0] - [13, 0]
  (yaml_front_matter [0, 0] - [4, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [2, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 6])
        value: (yaml_scalar [1, 8] - [1, 16]
          (yaml_string [1, 8] - [1, 16]
            (yaml_string_unquoted [1, 8] - [1, 16])))))
    close: (yaml_front_matter_delimiter [2, 0] - [2, 3]))
  (atx_heading [4, 0] - [6, 0]
    marker: (atx_heading_marker [4, 0] - [4, 3])
    content: (inline [4, 3] - [4, 35]
      (text [4, 3] - [4, 24])
      (code_span [4, 24] - [4, 34]
        (code_span_delimiter [4, 24] - [4, 25])
        (code_span_content [4, 25] - [4, 33])
        (code_span_delimiter [4, 33] - [4, 34]))
      (text [4, 34] - [4, 35])))
  (paragraph [6, 0] - [9, 0]
    content: (inline [6, 0] - [7, 16]
      (emphasis [6, 0] - [7, 1]
        (emphasis_delimiter [6, 0] - [6, 1])
        (text [6, 1] - [6, 16])
        (emphasis_delimiter [7, 0] - [7, 1]))
      (text [7, 1] - [7, 16])))
  (atx_heading [9, 0] - [11, 0]
    marker: (atx_heading_marker [9, 0] - [9, 3])
    content: (inline [9, 3] - [9, 33]
      (text [9, 3] - [9, 21])
      (code_span [9, 21] - [9, 31]
        (code_span_delimiter [9, 21] - [9, 22])
        (code_span_content [9, 22] - [9, 30])
        (code_span_delimiter [9, 30] - [9, 31]))
      (text [9, 31] - [9, 33]))
    (ERROR [9, 33] - [9, 43]
      (attribute_class [9, 34] - [9, 42])))
  (paragraph [11, 0] - [13, 0]
    content: (inline [11, 0] - [12, 16]
      (emphasis [11, 0] - [12, 1]
        (emphasis_delimiter [11, 0] - [11, 1])
        (text [11, 1] - [11, 16])
        (emphasis_delimiter [12, 0] - [12, 1]))
      (text [12, 1] - [12, 16]))))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/presentations/revealjs/examples/smaller.qmd	Parse:    0.10 ms	  1841 bytes/ms	(ERROR [9, 33] - [9, 43])

### File 9: `docs/manuscripts/authoring/_workflow-ipynb.qmd`

**Error:** Parse failed: (document [0, 0] - [52, 0]
  (ERROR [0, 0] - [52, 0]
    (text [0, 0] - [0, 100])
    (inline_cell_delimiter [0, 100] - [0, 102])
    (ERROR [0, 103] - [0, 104])
    (citation_key [0, 104] - [0, 109])
    (citation_key [0, 109] - [0, 114])
    (attribute_class [0, 114] - [0, 127])
    (block_quote_marker [0, 127] - [0, 129])
    (text [0, 129] - [0, 131])
    (code_span [0, 131] - [4, 1]
      (code_span_delimiter [0, 131] - [0, 132])
      (code_span_content [0, 132] - [4, 0])
      (code_span_delimiter [4, 0] - [4, 1]))
    (ERROR [4, 1] - [4, 2]
      (inline_cell_delimiter [4, 1] - [4, 2]))
    (code_span [4, 2] - [6, 1]
      (code_span_delimiter [4, 2] - [4, 3])
      (code_span_content [4, 3] - [6, 0])
      (code_span_delimiter [6, 0] - [6, 1]))
    (ERROR [6, 1] - [6, 2]
      (inline_cell_delimiter [6, 1] - [6, 2]))
    (code_span [6, 2] - [10, 1]
      (code_span_delimiter [6, 2] - [6, 3])
      (code_span_content [6, 3] - [10, 0])
      (code_span_delimiter [10, 0] - [10, 1]))
    (ERROR [10, 1] - [10, 2]
      (inline_cell_delimiter [10, 1] - [10, 2]))
    (code_span [10, 2] - [18, 1]
      (code_span_delimiter [10, 2] - [10, 3])
      (code_span_content [10, 3] - [18, 0])
      (code_span_delimiter [18, 0] - [18, 1]))
    (ERROR [18, 1] - [18, 2]
      (inline_cell_delimiter [18, 1] - [18, 2]))
    (code_span [18, 2] - [26, 45]
      (code_span_delimiter [18, 2] - [18, 3])
      (code_span_content [18, 3] - [26, 44])
      (code_span_delimiter [26, 44] - [26, 45]))
    (shortcode_inline [26, 45] - [26, 75]
      (shortcode_open [26, 45] - [26, 49])
      name: (shortcode_name [26, 49] - [26, 53])
      arguments: (shortcode_arguments [26, 53] - [26, 72])
      (shortcode_close [26, 72] - [26, 75]))
    (code_span [26, 75] - [28, 124]
      (code_span_delimiter [26, 75] - [26, 76])
      (code_span_content [26, 76] - [28, 123])
      (code_span_delimiter [28, 123] - [28, 124]))
    (text [28, 124] - [28, 135])
    (code_span [28, 135] - [34, 1]
      (code_span_delimiter [28, 135] - [28, 136])
      (code_span_content [28, 136] - [34, 0])
      (code_span_delimiter [34, 0] - [34, 1]))
    (ERROR [34, 1] - [34, 2]
      (inline_cell_delimiter [34, 1] - [34, 2]))
    (code_span [34, 2] - [36, 1]
      (code_span_delimiter [34, 2] - [34, 3])
      (code_span_content [34, 3] - [36, 0])
      (code_span_delimiter [36, 0] - [36, 1]))
    (ERROR [36, 1] - [36, 2]
      (inline_cell_delimiter [36, 1] - [36, 2]))
    (code_span [36, 2] - [40, 1]
      (code_span_delimiter [36, 2] - [36, 3])
      (code_span_content [36, 3] - [40, 0])
      (code_span_delimiter [40, 0] - [40, 1]))
    (ERROR [40, 1] - [40, 2]
      (inline_cell_delimiter [40, 1] - [40, 2]))
    (code_span [40, 2] - [42, 1]
      (code_span_delimiter [40, 2] - [40, 3])
      (code_span_content [40, 3] - [42, 0])
      (code_span_delimiter [42, 0] - [42, 1]))
    (ERROR [42, 1] - [42, 2]
      (inline_cell_delimiter [42, 1] - [42, 2]))
    (code_span [42, 2] - [49, 124]
      (code_span_delimiter [42, 2] - [42, 3])
      (code_span_content [42, 3] - [49, 123])
      (code_span_delimiter [49, 123] - [49, 124]))
    (text [49, 124] - [49, 146])
    (code_span [49, 146] - [49, 256]
      (code_span_delimiter [49, 146] - [49, 147])
      (code_span_content [49, 147] - [49, 255])
      (code_span_delimiter [49, 255] - [49, 256]))
    (text [49, 256] - [49, 270])
    (inline_cell_delimiter [49, 270] - [49, 271])
    (code_span_content [49, 271] - [52, 0])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/manuscripts/authoring/_workflow-ipynb.qmd	Parse:    0.10 ms	 24525 bytes/ms	(ERROR [0, 0] - [52, 0])

### File 10: `docs/reference/globs.qmd`

**Error:** Parse failed: (document [0, 0] - [39, 0]
  (yaml_front_matter [0, 0] - [5, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [3, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 25]
          (yaml_string [1, 7] - [1, 25]
            (yaml_string_unquoted [1, 7] - [1, 25]))))
      (yaml_pair [2, 0] - [3, 0]
        key: (yaml_key [2, 0] - [2, 6])
        value: (yaml_scalar [2, 8] - [2, 12]
          (yaml_boolean [2, 8] - [2, 12]))))
    close: (yaml_front_matter_delimiter [3, 0] - [3, 3]))
  (atx_heading [5, 0] - [7, 0]
    marker: (atx_heading_marker [5, 0] - [5, 3])
    content: (inline [5, 3] - [5, 11]
      (text [5, 3] - [5, 11])))
  (paragraph [7, 0] - [9, 0]
    content: (inline [7, 0] - [7, 236]
      (text [7, 0] - [7, 236])))
  (paragraph [9, 0] - [10, 0]
    content: (inline [9, 0] - [9, 128]
      (text [9, 0] - [9, 59])
      (link [9, 59] - [9, 126]
        text: (link_text [9, 60] - [9, 74])
        destination: (link_destination [9, 76] - [9, 125]))
      (text [9, 126] - [9, 128])))
  (paragraph [10, 0] - [11, 0]
    content: (inline [10, 0] - [10, 120]
      (text [10, 0] - [10, 53])
      (link [10, 53] - [10, 118]
        text: (link_text [10, 54] - [10, 68])
        destination: (link_destination [10, 70] - [10, 117]))
      (text [10, 118] - [10, 120])))
  (paragraph [11, 0] - [12, 0]
    content: (inline [11, 0] - [11, 131]
      (text [11, 0] - [11, 57])
      (link [11, 57] - [11, 129]
        text: (link_text [11, 58] - [11, 74])
        destination: (link_destination [11, 76] - [11, 128]))
      (text [11, 129] - [11, 131])))
  (paragraph [12, 0] - [14, 0]
    content: (inline [12, 0] - [12, 135]
      (text [12, 0] - [12, 61])
      (link [12, 61] - [12, 133]
        text: (link_text [12, 62] - [12, 77])
        destination: (link_destination [12, 79] - [12, 132]))
      (text [12, 133] - [12, 135])))
  (atx_heading [14, 0] - [16, 0]
    marker: (atx_heading_marker [14, 0] - [14, 3])
    content: (inline [14, 3] - [14, 14]
      (text [14, 3] - [14, 14])))
  (paragraph [16, 0] - [18, 0]
    content: (inline [16, 0] - [16, 237]
      (text [16, 0] - [16, 185])
      (code_span [16, 185] - [16, 188]
        (code_span_delimiter [16, 185] - [16, 186])
        (code_span_content [16, 186] - [16, 187])
        (code_span_delimiter [16, 187] - [16, 188]))
      (text [16, 188] - [16, 207])
      (code_span [16, 207] - [16, 215]
        (code_span_delimiter [16, 207] - [16, 208])
        (code_span_content [16, 208] - [16, 214])
        (code_span_delimiter [16, 214] - [16, 215]))
      (text [16, 215] - [16, 228])
      (code_span [16, 228] - [16, 235]
        (code_span_delimiter [16, 228] - [16, 229])
        (code_span_content [16, 229] - [16, 234])
        (code_span_delimiter [16, 234] - [16, 235]))
      (text [16, 235] - [16, 237])))
  (paragraph [18, 0] - [19, 0]
    content: (inline [18, 0] - [18, 29]
      (text [18, 0] - [18, 4])
      (code_span [18, 4] - [18, 7]
        (code_span_delimiter [18, 4] - [18, 5])
        (code_span_content [18, 5] - [18, 6])
        (code_span_delimiter [18, 6] - [18, 7]))
      (text [18, 7] - [18, 29])))
  (paragraph [19, 0] - [20, 0]
    content: (inline [19, 0] - [19, 41]
      (text [19, 0] - [19, 4])
      (inline_code_cell [19, 4] - [19, 15]
        (inline_cell_delimiter [19, 4] - [19, 6])
        language: (language_name [19, 6] - [19, 9])
        (ERROR [19, 9] - [19, 13]
          (ERROR [19, 9] - [19, 10])
          (citation_key [19, 10] - [19, 13]))
        (inline_cell_brace [19, 13] - [19, 14])
        content: (cell_content [19, 14] - [19, 14])
        (inline_cell_delimiter [19, 14] - [19, 15]))
      (text [19, 15] - [19, 26])
      (code_span [19, 26] - [19, 31]
        (code_span_delimiter [19, 26] - [19, 27])
        (code_span_content [19, 27] - [19, 30])
        (code_span_delimiter [19, 30] - [19, 31]))
      (text [19, 31] - [19, 35])
      (code_span [19, 35] - [19, 40]
        (code_span_delimiter [19, 35] - [19, 36])
        (code_span_content [19, 36] - [19, 39])
        (code_span_delimiter [19, 39] - [19, 40]))
      (text [19, 40] - [19, 41])))
  (paragraph [20, 0] - [21, 0]
    content: (inline [20, 0] - [20, 44]
      (text [20, 0] - [20, 4])
      (code_span [20, 4] - [20, 12]
        (code_span_delimiter [20, 4] - [20, 5])
        (code_span_content [20, 5] - [20, 11])
        (code_span_delimiter [20, 11] - [20, 12]))
      (text [20, 12] - [20, 23])
      (code_span [20, 23] - [20, 26]
        (code_span_delimiter [20, 23] - [20, 24])
        (code_span_content [20, 24] - [20, 25])
        (code_span_delimiter [20, 25] - [20, 26]))
      (text [20, 26] - [20, 28])
      (code_span [20, 28] - [20, 31]
        (code_span_delimiter [20, 28] - [20, 29])
        (code_span_content [20, 29] - [20, 30])
        (code_span_delimiter [20, 30] - [20, 31]))
      (text [20, 31] - [20, 33])
      (code_span [20, 33] - [20, 36]
        (code_span_delimiter [20, 33] - [20, 34])
        (code_span_content [20, 34] - [20, 35])
        (code_span_delimiter [20, 35] - [20, 36]))
      (text [20, 36] - [20, 40])
      (code_span [20, 40] - [20, 43]
        (code_span_delimiter [20, 40] - [20, 41])
        (code_span_content [20, 41] - [20, 42])
        (code_span_delimiter [20, 42] - [20, 43]))
      (text [20, 43] - [20, 44])))
  (paragraph [21, 0] - [22, 0]
    content: (inline [21, 0] - [21, 43]
      (text [21, 0] - [21, 4])
      (code_span [21, 4] - [21, 11]
        (code_span_delimiter [21, 4] - [21, 5])
        (code_span_content [21, 5] - [21, 10])
        (code_span_delimiter [21, 10] - [21, 11]))
      (text [21, 11] - [21, 22])
      (code_span [21, 22] - [21, 25]
        (code_span_delimiter [21, 22] - [21, 23])
        (code_span_content [21, 23] - [21, 24])
        (code_span_delimiter [21, 24] - [21, 25]))
      (text [21, 25] - [21, 27])
      (code_span [21, 27] - [21, 30]
        (code_span_delimiter [21, 27] - [21, 28])
        (code_span_content [21, 28] - [21, 29])
        (code_span_delimiter [21, 29] - [21, 30]))
      (text [21, 30] - [21, 32])
      (code_span [21, 32] - [21, 35]
        (code_span_delimiter [21, 32] - [21, 33])
        (code_span_content [21, 33] - [21, 34])
        (code_span_delimiter [21, 34] - [21, 35]))
      (text [21, 35] - [21, 39])
      (code_span [21, 39] - [21, 42]
        (code_span_delimiter [21, 39] - [21, 40])
        (code_span_content [21, 40] - [21, 41])
        (code_span_delimiter [21, 41] - [21, 42]))
      (text [21, 42] - [21, 43])))
  (paragraph [22, 0] - [23, 0]
    content: (inline [22, 0] - [22, 74]
      (text [22, 0] - [22, 4])
      (code_span [22, 4] - [22, 13]
        (code_span_delimiter [22, 4] - [22, 5])
        (code_span_content [22, 5] - [22, 12])
        (code_span_delimiter [22, 12] - [22, 13]))
      (text [22, 13] - [22, 53])
      (code_span [22, 53] - [22, 56]
        (code_span_delimiter [22, 53] - [22, 54])
        (code_span_content [22, 54] - [22, 55])
        (code_span_delimiter [22, 55] - [22, 56]))
      (text [22, 56] - [22, 58])
      (code_span [22, 58] - [22, 61]
        (code_span_delimiter [22, 58] - [22, 59])
        (code_span_content [22, 59] - [22, 60])
        (code_span_delimiter [22, 60] - [22, 61]))
      (text [22, 61] - [22, 63])
      (code_span [22, 63] - [22, 66]
        (code_span_delimiter [22, 63] - [22, 64])
        (code_span_content [22, 64] - [22, 65])
        (code_span_delimiter [22, 65] - [22, 66]))
      (text [22, 66] - [22, 70])
      (code_span [22, 70] - [22, 73]
        (code_span_delimiter [22, 70] - [22, 71])
        (code_span_content [22, 71] - [22, 72])
        (code_span_delimiter [22, 72] - [22, 73]))
      (text [22, 73] - [22, 74])))
  (paragraph [23, 0] - [26, 12]
    content: (inline [23, 0] - [26, 12]
      (text [23, 0] - [23, 4])
      (code_span [23, 4] - [23, 19]
        (code_span_delimiter [23, 4] - [23, 5])
        (code_span_content [23, 5] - [23, 18])
        (code_span_delimiter [23, 18] - [23, 19]))
      (text [23, 19] - [23, 57])
      (code_span [23, 57] - [23, 66]
        (code_span_delimiter [23, 57] - [23, 58])
        (code_span_content [23, 58] - [23, 65])
        (code_span_delimiter [23, 65] - [23, 66]))
      (text [23, 66] - [23, 67])
      (text [23, 67] - [24, 8])
      (code_span [24, 8] - [24, 21]
        (code_span_delimiter [24, 8] - [24, 9])
        (code_span_content [24, 9] - [24, 20])
        (code_span_delimiter [24, 20] - [24, 21]))
      (text [24, 21] - [24, 52])
      (text [24, 52] - [25, 8])
      (code_span [25, 8] - [25, 24]
        (code_span_delimiter [25, 8] - [25, 9])
        (code_span_content [25, 9] - [25, 23])
        (code_span_delimiter [25, 23] - [25, 24]))
      (text [25, 24] - [25, 46])
      (code_span [25, 46] - [25, 49]
        (code_span_delimiter [25, 46] - [25, 47])
        (code_span_content [25, 47] - [25, 48])
        (code_span_delimiter [25, 48] - [25, 49]))
      (text [25, 49] - [25, 51])
      (code_span [25, 51] - [25, 54]
        (code_span_delimiter [25, 51] - [25, 52])
        (code_span_content [25, 52] - [25, 53])
        (code_span_delimiter [25, 53] - [25, 54]))
      (text [25, 54] - [25, 58])
      (code_span [25, 58] - [25, 61]
        (code_span_delimiter [25, 58] - [25, 59])
        (code_span_content [25, 59] - [25, 60])
        (code_span_delimiter [25, 60] - [25, 61]))
      (text [25, 61] - [25, 62])
      (text [25, 62] - [26, 12])))
  (ERROR [26, 12] - [39, 0]
    (html_open_tag [26, 12] - [26, 82])
    (html_block_content [26, 82] - [26, 134])
    (html_block_content [27, 0] - [27, 72])
    (html_block_content [28, 0] - [28, 64])
    (html_block_content [29, 0] - [29, 25])
    (html_block_content [30, 0] - [30, 69])
    (html_block_content [31, 0] - [31, 58])
    (html_block_content [32, 0] - [32, 75])
    (html_block_content [33, 0] - [33, 56])
    (html_block_content [34, 0] - [34, 61])
    (html_block_content [35, 0] - [35, 59])
    (html_block_content [36, 0] - [36, 51])
    (table_delimiter_cell [36, 51] - [37, 8])
    (citation_key [37, 8] - [37, 12])
    (citation_key [37, 12] - [37, 21])
    (citation_key [37, 21] - [37, 25])
    (citation_key [37, 25] - [37, 32])
    (citation_key [37, 32] - [37, 37])
    (citation_key [37, 37] - [37, 45])
    (citation_key [37, 45] - [37, 48])
    (citation_key [37, 48] - [37, 52])
    (citation_key [37, 52] - [37, 61])
    (citation_key [37, 61] - [37, 66])
    (ERROR [37, 66] - [37, 67])
    (citation_key [38, 5] - [38, 11])
    (html_open_tag [38, 11] - [38, 84])
    (html_block_content [38, 84] - [38, 85])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/reference/globs.qmd	Parse:    0.20 ms	 12171 bytes/ms	(ERROR [19, 9] - [19, 13])

### File 11: `docs/output-formats/examples/pandas-temps.qmd`

**Error:** Parse failed: (document [0, 0] - [19, 3]
  (ERROR [0, 0] - [4, 16]
    (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_pair [1, 0] - [2, 0]
      key: (yaml_key [1, 0] - [1, 5])
      value: (yaml_scalar [1, 7] - [1, 26]
        (yaml_string [1, 7] - [1, 26]
          (yaml_string_quoted [1, 7] - [1, 26]))))
    (yaml_pair [2, 0] - [4, 0]
      key: (yaml_key [2, 0] - [2, 6])
      (ERROR [2, 6] - [3, 7]
        (yaml_scalar [3, 2] - [3, 7]
          (yaml_string [3, 2] - [3, 7]
            (yaml_string_unquoted [3, 2] - [3, 7]))))
      value: (yaml_scalar [3, 9] - [3, 16]
        (yaml_string [3, 9] - [3, 16]
          (yaml_string_unquoted [3, 9] - [3, 16]))))
    (yaml_key [4, 0] - [4, 12])
    (reference_label [4, 14] - [4, 16]))
  (atx_heading [4, 16] - [5, 0]
    marker: (atx_heading_marker [4, 16] - [4, 19])
    content: (inline [4, 19] - [4, 51]
      (text [4, 19] - [4, 51])))
  (paragraph [5, 0] - [9, 0]
    content: (inline [5, 0] - [8, 82]
      (text [5, 0] - [5, 11])
      (text [5, 11] - [6, 17])
      (text [6, 17] - [7, 19])
      (text [7, 19] - [8, 82])))
  (thematic_break [9, 0] - [10, 0])
  (ERROR [10, 0] - [19, 3]
    (raw_block_delimiter [10, 0] - [11, 11])
    (raw_block_content [12, 0] - [12, 10])
    (raw_block_content [13, 0] - [13, 17])
    (raw_block_content [14, 0] - [14, 1])
    (raw_block_content [15, 0] - [15, 3])
    (raw_block_content [17, 0] - [17, 11])
    (raw_block_content [18, 0] - [18, 31])
    (chunk_option_value [19, 0] - [19, 3])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/output-formats/examples/pandas-temps.qmd	Parse:    0.07 ms	  4549 bytes/ms	(ERROR [0, 0] - [4, 16])

### File 12: `docs/authoring/_shortcodes.qmd`

**Error:** Parse failed: (document [0, 0] - [28, 0]
  (atx_heading [0, 0] - [2, 0]
    marker: (atx_heading_marker [0, 0] - [0, 3])
    content: (inline [0, 3] - [0, 11]
      (text [0, 3] - [0, 11])))
  (paragraph [2, 0] - [4, 0]
    content: (inline [2, 0] - [2, 271]
      (text [2, 0] - [2, 137])
      (link [2, 137] - [2, 204]
        text: (link_text [2, 138] - [2, 153])
        destination: (link_destination [2, 155] - [2, 203]))
      (text [2, 204] - [2, 209])
      (link [2, 209] - [2, 270]
        text: (link_text [2, 210] - [2, 230])
        destination: (link_destination [2, 232] - [2, 269]))
      (text [2, 270] - [2, 271])))
  (paragraph [4, 0] - [6, 0]
    content: (inline [4, 0] - [4, 79]
      (text [4, 0] - [4, 48])
      (code_span [4, 48] - [4, 55]
        (code_span_delimiter [4, 48] - [4, 49])
        (code_span_content [4, 49] - [4, 54])
        (code_span_delimiter [4, 54] - [4, 55]))
      (text [4, 55] - [4, 79])))
  (ERROR [6, 0] - [6, 25]
    (code_fence_delimiter [6, 0] - [6, 3])
    (info_string [6, 3] - [6, 4])
    (attribute_class [6, 5] - [6, 14])
    (citation_key [6, 14] - [6, 25]))
  (paragraph [6, 25] - [7, 0]
    content: (inline [6, 25] - [6, 34]
      (equals_sign [6, 25] - [6, 26])
      (text [6, 26] - [6, 34])))
  (shortcode_block [7, 0] - [8, 0]
    (shortcode_open [7, 0] - [7, 4])
    name: (shortcode_name [7, 4] - [7, 8])
    arguments: (shortcode_arguments [7, 8] - [7, 15])
    (shortcode_close [7, 15] - [8, 0]))
  (ERROR [8, 0] - [28, 0]
    (code_fence_delimiter [8, 0] - [8, 3])
    (code_line [10, 0] - [10, 22])
    (code_line [12, 0] - [12, 44])
    (code_line [14, 0] - [14, 108])
    (code_line [15, 0] - [15, 108])
    (code_line [16, 0] - [16, 108])
    (code_line [17, 0] - [17, 108])
    (code_line [18, 0] - [18, 108])
    (code_line [19, 0] - [19, 108])
    (code_line [20, 0] - [20, 108])
    (code_line [21, 0] - [21, 108])
    (code_line [22, 0] - [22, 108])
    (code_line [23, 0] - [23, 108])
    (code_line [24, 0] - [24, 108])
    (code_line [25, 0] - [25, 108])
    (code_line [26, 0] - [26, 108])
    (code_line [27, 0] - [27, 108])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/authoring/_shortcodes.qmd	Parse:    0.11 ms	 18875 bytes/ms	(ERROR [6, 0] - [6, 25])

### File 13: `docs/output-formats/docusaurus.qmd`

**Error:** Parse failed: (document [0, 0] - [147, 0]
  (ERROR [0, 0] - [4, 18]
    (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_pair [1, 0] - [2, 0]
      key: (yaml_key [1, 0] - [1, 5])
      value: (yaml_scalar [1, 7] - [1, 17]
        (yaml_string [1, 7] - [1, 17]
          (yaml_string_unquoted [1, 7] - [1, 17]))))
    (yaml_pair [2, 0] - [3, 0]
      key: (yaml_key [2, 0] - [2, 11])
      value: (yaml_scalar [2, 13] - [2, 25]
        (yaml_string [2, 13] - [2, 25]
          (yaml_string_unquoted [2, 13] - [2, 25]))))
    (yaml_pair [3, 0] - [4, 0]
      key: (yaml_key [3, 0] - [3, 8])
      value: (yaml_scalar [3, 10] - [3, 20]
        (yaml_string [3, 10] - [3, 20]
          (yaml_string_unquoted [3, 10] - [3, 20]))))
    (yaml_key [4, 0] - [4, 15]))
  (paragraph [4, 18] - [6, 0]
    content: (inline [4, 18] - [5, 80]
      (text [4, 18] - [5, 2])
      (link [5, 2] - [5, 37]
        text: (link_text [5, 3] - [5, 13])
        destination: (link_destination [5, 15] - [5, 36]))
      (text [5, 37] - [5, 80])))
  (paragraph [6, 0] - [7, 0]
    content: (inline [6, 0] - [6, 29]
      (text [6, 0] - [6, 29])))
  (paragraph [7, 0] - [8, 0]
    content: (inline [7, 0] - [7, 24]
      (text [7, 0] - [7, 24])))
  (thematic_break [8, 0] - [9, 0])
  (blank_line [9, 0] - [10, 0])
  (shortcode_block [10, 0] - [11, 0]
    (shortcode_open [10, 0] - [10, 4])
    name: (shortcode_name [10, 4] - [10, 11])
    arguments: (shortcode_arguments [10, 11] - [10, 27])
    (shortcode_close [10, 27] - [11, 0]))
  (blank_line [11, 0] - [12, 0])
  (shortcode_block [12, 0] - [13, 0]
    (shortcode_open [12, 0] - [12, 4])
    name: (shortcode_name [12, 4] - [12, 11])
    arguments: (shortcode_arguments [12, 11] - [12, 30])
    (shortcode_close [12, 30] - [13, 0]))
  (atx_heading [13, 0] - [16, 0]
    marker: (atx_heading_marker [13, 0] - [14, 3])
    content: (inline [14, 3] - [14, 14]
      (text [14, 3] - [14, 14])))
  (paragraph [16, 0] - [18, 0]
    content: (inline [16, 0] - [16, 291]
      (text [16, 0] - [16, 178])
      (link [16, 178] - [16, 253]
        text: (link_text [16, 179] - [16, 186])
        destination: (link_destination [16, 188] - [16, 252]))
      (text [16, 253] - [16, 291])))
  (paragraph [18, 0] - [20, 0]
    content: (inline [18, 0] - [18, 113]
      (text [18, 0] - [18, 15])
      (code_span [18, 15] - [18, 25]
        (code_span_delimiter [18, 15] - [18, 16])
        (code_span_content [18, 16] - [18, 24])
        (code_span_delimiter [18, 24] - [18, 25]))
      (text [18, 25] - [18, 91])
      (code_span [18, 91] - [18, 98]
        (code_span_delimiter [18, 91] - [18, 92])
        (code_span_content [18, 92] - [18, 97])
        (code_span_delimiter [18, 97] - [18, 98]))
      (text [18, 98] - [18, 113])))
  (fenced_code_block [20, 0] - [24, 0]
    open: (code_fence_delimiter [20, 0] - [20, 4])
    info: (info_string [20, 4] - [20, 13])
    (code_line [21, 0] - [21, 32])
    (code_line [22, 0] - [22, 5])
    close: (code_fence_delimiter [23, 0] - [23, 3]))
  (fenced_code_block [24, 0] - [35, 0]
    open: (code_fence_delimiter [24, 0] - [24, 4])
    (code_line [26, 0] - [26, 37])
    (code_line [28, 0] - [28, 96])
    (code_line [30, 0] - [30, 11])
    (code_line [31, 0] - [31, 13])
    (code_line [32, 0] - [32, 18])
    (code_line [33, 0] - [33, 5])
    close: (code_fence_delimiter [34, 0] - [34, 3]))
  (fenced_code_block [35, 0] - [53, 0]
    open: (code_fence_delimiter [35, 0] - [35, 4])
    (code_line [37, 0] - [37, 48])
    (code_line [39, 0] - [39, 36])
    (code_line [41, 0] - [41, 21])
    (code_line [43, 0] - [43, 326])
    (code_line [45, 0] - [45, 38])
    (code_line [47, 0] - [47, 12])
    (code_line [48, 0] - [48, 24])
    (code_line [49, 0] - [49, 44])
    (code_line [50, 0] - [50, 3])
    close: (code_fence_delimiter [51, 0] - [51, 3]))
  (paragraph [53, 0] - [55, 0]
    content: (inline [53, 0] - [53, 31]
      (text [53, 0] - [53, 31])))
  (paragraph [55, 0] - [57, 0]
    content: (inline [55, 0] - [55, 34]
      (image [55, 0] - [55, 34]
        alt: (image_alt [55, 2] - [55, 2])
        source: (image_source [55, 4] - [55, 33]))))
  (paragraph [57, 0] - [59, 0]
    content: (inline [57, 0] - [57, 24]
      (text [57, 0] - [57, 24])))
  (fenced_code_block [59, 0] - [74, 0]
    open: (code_fence_delimiter [59, 0] - [59, 3])
    info: (info_string [59, 3] - [59, 12])
    (code_line [60, 0] - [60, 34])
    (code_line [62, 0] - [62, 8])
    (code_line [63, 0] - [63, 21])
    (code_line [65, 0] - [65, 9])
    (code_line [66, 0] - [66, 22])
    (code_line [68, 0] - [68, 9])
    (code_line [69, 0] - [69, 21])
    (code_line [71, 0] - [71, 3])
    close: (code_fence_delimiter [72, 0] - [72, 3]))
  (paragraph [74, 0] - [76, 0]
    content: (inline [74, 0] - [74, 31]
      (text [74, 0] - [74, 31])))
  (ERROR [76, 0] - [76, 40]
    (image [76, 0] - [76, 31]
      alt: (image_alt [76, 2] - [76, 2])
      source: (image_source [76, 4] - [76, 30]))
    (attribute_class [76, 32] - [76, 39]))
  (atx_heading [76, 40] - [80, 0]
    marker: (atx_heading_marker [76, 40] - [78, 3])
    content: (inline [78, 3] - [78, 15]
      (text [78, 3] - [78, 15])))
  (paragraph [80, 0] - [82, 0]
    content: (inline [80, 0] - [80, 389]
      (text [80, 0] - [80, 46])
      (link [80, 46] - [80, 71]
        text: (link_text [80, 47] - [80, 50])
        destination: (link_destination [80, 52] - [80, 70]))
      (text [80, 71] - [80, 389])))
  (paragraph [82, 0] - [84, 0]
    content: (inline [82, 0] - [82, 157]
      (text [82, 0] - [82, 157])))
  (atx_heading [84, 0] - [86, 0]
    marker: (atx_heading_marker [84, 0] - [84, 4])
    content: (inline [84, 4] - [84, 15]
      (text [84, 4] - [84, 15])))
  (paragraph [86, 0] - [88, 0]
    content: (inline [86, 0] - [86, 374]
      (text [86, 0] - [86, 234])
      (code_span [86, 234] - [86, 241]
        (code_span_delimiter [86, 234] - [86, 235])
        (code_span_content [86, 235] - [86, 240])
        (code_span_delimiter [86, 240] - [86, 241]))
      (text [86, 241] - [86, 271])
      (code_span [86, 271] - [86, 282]
        (code_span_delimiter [86, 271] - [86, 272])
        (code_span_content [86, 272] - [86, 281])
        (code_span_delimiter [86, 281] - [86, 282]))
      (text [86, 282] - [86, 288])
      (code_span [86, 288] - [86, 295]
        (code_span_delimiter [86, 288] - [86, 289])
        (code_span_content [86, 289] - [86, 294])
        (code_span_delimiter [86, 294] - [86, 295]))
      (text [86, 295] - [86, 374])))
  (ERROR [88, 0] - [88, 97]
    (text [88, 0] - [88, 82])
    (inline_cell_delimiter [88, 82] - [88, 83])
    (code_fence_delimiter [88, 83] - [88, 86])
    (raw_block_delimiter [88, 86] - [88, 97]))
  (fenced_code_block [88, 97] - [94, 0]
    open: (code_fence_delimiter [88, 97] - [88, 102])
    info: (info_string [88, 102] - [88, 127])
    (code_line [90, 0] - [90, 9])
    (code_line [91, 0] - [91, 10])
    (code_line [92, 0] - [92, 38])
    close: (code_fence_delimiter [93, 0] - [93, 3]))
  (fenced_code_block [94, 0] - [122, 0]
    open: (code_fence_delimiter [94, 0] - [94, 4])
    (code_line [96, 0] - [96, 191])
    (code_line [98, 0] - [98, 280])
    (code_line [100, 0] - [100, 14])
    (code_line [102, 0] - [102, 174])
    (code_line [104, 0] - [104, 9])
    (code_line [105, 0] - [105, 9])
    (code_line [106, 0] - [106, 49])
    (code_line [107, 0] - [107, 7])
    (code_line [108, 0] - [108, 12])
    (code_line [109, 0] - [109, 29])
    (code_line [110, 0] - [110, 26])
    (code_line [111, 0] - [111, 20])
    (code_line [112, 0] - [112, 24])
    (code_line [113, 0] - [113, 7])
    (code_line [114, 0] - [114, 14])
    (code_line [115, 0] - [115, 9])
    (code_line [116, 0] - [116, 2])
    (code_line [118, 0] - [118, 132])
    (code_line [120, 0] - [120, 44])
    close: (code_fence_delimiter [121, 0] - [121, 3]))
  (fenced_code_block [122, 0] - [147, 0]
    open: (code_fence_delimiter [122, 0] - [122, 4])
    (code_line [124, 0] - [124, 29])
    (code_line [126, 0] - [126, 39])
    (code_line [128, 0] - [128, 114])
    (code_line [130, 0] - [130, 13])
    (code_line [132, 0] - [132, 205])
    (code_line [134, 0] - [134, 33])
    (code_line [136, 0] - [136, 9])
    (code_line [138, 0] - [138, 215])
    (code_line [140, 0] - [140, 206])
    (code_line [142, 0] - [142, 34])
    (code_line [143, 0] - [143, 7])
    (code_line [144, 0] - [144, 16])
    (code_line [145, 0] - [145, 27])
    close: (code_fence_delimiter [146, 0] - [146, 3])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/output-formats/docusaurus.qmd	Parse:    0.23 ms	 22351 bytes/ms	(ERROR [0, 0] - [4, 18])

### File 14: `docs/presentations/revealjs/examples/index.qmd`

**Error:** Parse failed: (document [0, 0] - [31, 0]
  (ERROR [0, 0] - [6, 0]
    (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_pair [1, 0] - [2, 0]
      key: (yaml_key [1, 0] - [1, 5])
      value: (yaml_scalar [1, 7] - [1, 28]
        (yaml_string [1, 7] - [1, 28]
          (yaml_string_unquoted [1, 7] - [1, 28]))))
    (yaml_pair [2, 0] - [5, 0]
      key: (yaml_key [2, 0] - [2, 6])
      (ERROR [2, 6] - [4, 15]
        (yaml_scalar [3, 2] - [3, 10]
          (yaml_string [3, 2] - [3, 10]
            (yaml_string_unquoted [3, 2] - [3, 10])))
        (citation_key [4, 0] - [4, 9])
        (citation_key [4, 10] - [4, 15]))
      value: (yaml_scalar [4, 17] - [4, 18]
        (yaml_number [4, 17] - [4, 18])))
    (yaml_pair [5, 4] - [6, 0]
      key: (yaml_key [5, 4] - [5, 16])
      value: (yaml_scalar [5, 18] - [5, 21]
        (yaml_string [5, 18] - [5, 21]
          (yaml_string_unquoted [5, 18] - [5, 21])))))
  (atx_heading [6, 0] - [7, 0]
    marker: (atx_heading_marker [6, 0] - [6, 2])
    content: (inline [6, 2] - [6, 18]
      (text [6, 2] - [6, 18])))
  (thematic_break [7, 0] - [8, 0])
  (executable_code_cell [8, 0] - [31, 0]
    open_delimiter: (code_fence_delimiter [8, 0] - [9, 4])
    language: (language_name [9, 5] - [9, 6])
    chunk_options: (chunk_options [10, 0] - [12, 0]
      (chunk_option [10, 0] - [11, 0]
        key: (chunk_option_key [10, 3] - [10, 7])
        value: (chunk_option_value [10, 9] - [10, 14]))
      (chunk_option [11, 0] - [12, 0]
        key: (chunk_option_key [11, 3] - [11, 9])
        value: (chunk_option_value [11, 11] - [11, 15])))
    content: (cell_content [12, 0] - [30, 0]
      (code_line [12, 0] - [12, 63])
      (code_line [13, 0] - [13, 42])
      (code_line [14, 0] - [14, 64])
      (code_line [16, 0] - [16, 16])
      (code_line [17, 0] - [17, 64])
      (code_line [19, 0] - [19, 46])
      (code_line [20, 0] - [20, 34])
      (code_line [21, 0] - [21, 49])
      (code_line [22, 0] - [22, 1])
      (code_line [24, 0] - [24, 26])
      (code_line [25, 0] - [25, 14])
      (code_line [26, 0] - [26, 36])
      (code_line [27, 0] - [27, 2])
      (code_line [28, 0] - [28, 33]))
    close_delimiter: (code_fence_delimiter [30, 0] - [30, 4])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/presentations/revealjs/examples/index.qmd	Parse:    0.09 ms	  7825 bytes/ms	(ERROR [0, 0] - [6, 0])

### File 15: `docs/blog/posts/2024-07-11-1.5-release/index.qmd`

**Error:** Parse failed: (document [0, 0] - [95, 276]
  (ERROR [0, 0] - [3, 8]
    (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_pair [1, 0] - [2, 0]
      key: (yaml_key [1, 0] - [1, 5])
      value: (yaml_scalar [1, 7] - [1, 18]
        (yaml_string [1, 7] - [1, 18]
          (yaml_string_unquoted [1, 7] - [1, 18]))))
    (yaml_key [2, 0] - [2, 11])
    (citation_key [3, 0] - [3, 8]))
  (paragraph [3, 8] - [4, 0]
    content: (inline [3, 8] - [3, 206]
      (text [3, 8] - [3, 206])))
  (paragraph [4, 0] - [7, 0]
    content: (inline [4, 0] - [6, 12]
      (text [4, 0] - [4, 11])
      (text [4, 11] - [5, 14])
      (text [5, 14] - [6, 12])))
  (paragraph [7, 0] - [8, 0]
    content: (inline [7, 0] - [7, 25]
      (text [7, 0] - [7, 25])))
  (paragraph [8, 0] - [9, 0]
    content: (inline [8, 0] - [8, 18]
      (text [8, 0] - [8, 18])))
  (paragraph [9, 0] - [10, 0]
    content: (inline [9, 0] - [9, 29]
      (text [9, 0] - [9, 29])))
  (paragraph [10, 0] - [11, 0]
    content: (inline [10, 0] - [10, 38]
      (text [10, 0] - [10, 38])))
  (thematic_break [11, 0] - [12, 0])
  (blank_line [12, 0] - [13, 0])
  (paragraph [13, 0] - [15, 0]
    content: (inline [13, 0] - [13, 101]
      (text [13, 0] - [13, 59])
      (link [13, 59] - [13, 100]
        text: (link_text [13, 60] - [13, 73])
        destination: (link_destination [13, 75] - [13, 99]))
      (text [13, 100] - [13, 101])))
  (paragraph [15, 0] - [17, 0]
    content: (inline [15, 0] - [15, 285]
      (text [15, 0] - [15, 238])
      (link [15, 238] - [15, 284]
        text: (link_text [15, 239] - [15, 252])
        destination: (link_destination [15, 254] - [15, 283]))
      (text [15, 284] - [15, 285])))
  (atx_heading [17, 0] - [19, 0]
    marker: (atx_heading_marker [17, 0] - [17, 3])
    content: (inline [17, 3] - [17, 12]
      (text [17, 3] - [17, 12])))
  (paragraph [19, 0] - [21, 0]
    content: (inline [19, 0] - [19, 355]
      (text [19, 0] - [19, 70])
      (link [19, 70] - [19, 153]
        text: (link_text [19, 71] - [19, 96])
        destination: (link_destination [19, 98] - [19, 152]))
      (text [19, 153] - [19, 339])
      (code_span [19, 339] - [19, 354]
        (code_span_delimiter [19, 339] - [19, 340])
        (code_span_content [19, 340] - [19, 353])
        (code_span_delimiter [19, 353] - [19, 354]))
      (text [19, 354] - [19, 355])))
  (paragraph [21, 0] - [23, 0]
    content: (inline [21, 0] - [21, 159]
      (text [21, 0] - [21, 159])))
  (fenced_code_block [23, 0] - [27, 0]
    open: (code_fence_delimiter [23, 0] - [23, 3])
    info: (info_string [23, 3] - [23, 12])
    (code_line [24, 0] - [24, 73])
    close: (code_fence_delimiter [25, 0] - [25, 3]))
  (paragraph [27, 0] - [29, 0]
    content: (inline [27, 0] - [27, 114]
      (text [27, 0] - [27, 46])
      (link [27, 46] - [27, 113]
        text: (link_text [27, 47] - [27, 70])
        destination: (link_destination [27, 72] - [27, 112]))
      (text [27, 113] - [27, 114])))
  (atx_heading [29, 0] - [31, 0]
    marker: (atx_heading_marker [29, 0] - [29, 3])
    content: (inline [29, 3] - [29, 33]
      (text [29, 3] - [29, 33])))
  (paragraph [31, 0] - [33, 0]
    content: (inline [31, 0] - [31, 201]
      (image [31, 0] - [31, 77]
        alt: (image_alt [31, 2] - [31, 42])
        source: (image_source [31, 44] - [31, 76]))
      (ERROR [31, 77] - [31, 93]
        (attribute_class [31, 78] - [31, 85])
        (reference_type [31, 85] - [31, 89])
        (citation_key [31, 90] - [31, 93]))
      (equals_sign [31, 93] - [31, 94])
      (text [31, 94] - [31, 201])))
  (paragraph [33, 0] - [35, 0]
    content: (inline [33, 0] - [33, 81]
      (text [33, 0] - [33, 81])))
  (paragraph [35, 0] - [37, 0]
    content: (inline [35, 0] - [35, 153]
      (text [35, 0] - [35, 13])
      (code_span [35, 13] - [35, 21]
        (code_span_delimiter [35, 13] - [35, 14])
        (code_span_content [35, 14] - [35, 20])
        (code_span_delimiter [35, 20] - [35, 21]))
      (text [35, 21] - [35, 36])
      (code_span [35, 36] - [35, 45]
        (code_span_delimiter [35, 36] - [35, 37])
        (code_span_content [35, 37] - [35, 44])
        (code_span_delimiter [35, 44] - [35, 45]))
      (text [35, 45] - [35, 99])
      (code_span [35, 99] - [35, 112]
        (code_span_delimiter [35, 99] - [35, 100])
        (code_span_content [35, 100] - [35, 111])
        (code_span_delimiter [35, 111] - [35, 112]))
      (text [35, 112] - [35, 153])))
  (paragraph [37, 0] - [39, 0]
    content: (inline [37, 0] - [37, 142]
      (text [37, 0] - [37, 19])
      (code_span [37, 19] - [37, 31]
        (code_span_delimiter [37, 19] - [37, 20])
        (code_span_content [37, 20] - [37, 30])
        (code_span_delimiter [37, 30] - [37, 31]))
      (text [37, 31] - [37, 46])
      (code_span [37, 46] - [37, 55]
        (code_span_delimiter [37, 46] - [37, 47])
        (code_span_content [37, 47] - [37, 54])
        (code_span_delimiter [37, 54] - [37, 55]))
      (text [37, 55] - [37, 110])
      (code_span [37, 110] - [37, 116]
        (code_span_delimiter [37, 110] - [37, 111])
        (code_span_content [37, 111] - [37, 115])
        (code_span_delimiter [37, 115] - [37, 116]))
      (text [37, 116] - [37, 118])
      (code_span [37, 118] - [37, 128]
        (code_span_delimiter [37, 118] - [37, 119])
        (code_span_content [37, 119] - [37, 127])
        (code_span_delimiter [37, 127] - [37, 128]))
      (text [37, 128] - [37, 132])
      (code_span [37, 132] - [37, 141]
        (code_span_delimiter [37, 132] - [37, 133])
        (code_span_content [37, 133] - [37, 140])
        (code_span_delimiter [37, 140] - [37, 141]))
      (text [37, 141] - [37, 142])))
  (paragraph [39, 0] - [41, 0]
    content: (inline [39, 0] - [39, 57]
      (text [39, 0] - [39, 57])))
  (paragraph [41, 0] - [43, 0]
    content: (inline [41, 0] - [41, 254]
      (text [41, 0] - [41, 217])
      (code_span [41, 217] - [41, 229]
        (code_span_delimiter [41, 217] - [41, 218])
        (code_span_content [41, 218] - [41, 228])
        (code_span_delimiter [41, 228] - [41, 229]))
      (text [41, 229] - [41, 233])
      (code_span [41, 233] - [41, 239]
        (code_span_delimiter [41, 233] - [41, 234])
        (code_span_content [41, 234] - [41, 238])
        (code_span_delimiter [41, 238] - [41, 239]))
      (text [41, 239] - [41, 243])
      (code_span [41, 243] - [41, 253]
        (code_span_delimiter [41, 243] - [41, 244])
        (code_span_content [41, 244] - [41, 252])
        (code_span_delimiter [41, 252] - [41, 253]))
      (text [41, 253] - [41, 254])))
  (paragraph [43, 0] - [45, 0]
    content: (inline [43, 0] - [43, 245]
      (text [43, 0] - [43, 28])
      (code_span [43, 28] - [43, 44]
        (code_span_delimiter [43, 28] - [43, 29])
        (code_span_content [43, 29] - [43, 43])
        (code_span_delimiter [43, 43] - [43, 44]))
      (text [43, 44] - [43, 72])
      (code_span [43, 72] - [43, 81]
        (code_span_delimiter [43, 72] - [43, 73])
        (code_span_content [43, 73] - [43, 80])
        (code_span_delimiter [43, 80] - [43, 81]))
      (text [43, 81] - [43, 112])
      (code_span [43, 112] - [43, 124]
        (code_span_delimiter [43, 112] - [43, 113])
        (code_span_content [43, 113] - [43, 123])
        (code_span_delimiter [43, 123] - [43, 124]))
      (text [43, 124] - [43, 245])))
  (paragraph [45, 0] - [47, 0]
    content: (inline [45, 0] - [45, 65]
      (text [45, 0] - [45, 13])
      (link [45, 13] - [45, 64]
        text: (link_text [45, 14] - [45, 28])
        destination: (link_destination [45, 30] - [45, 63]))
      (text [45, 64] - [45, 65])))
  (atx_heading [47, 0] - [49, 0]
    marker: (atx_heading_marker [47, 0] - [47, 3])
    content: (inline [47, 3] - [47, 24]
      (text [47, 3] - [47, 24])))
  (paragraph [49, 0] - [51, 0]
    content: (inline [49, 0] - [49, 194]
      (text [49, 0] - [49, 19])
      (code_span [49, 19] - [49, 33]
        (code_span_delimiter [49, 19] - [49, 20])
        (code_span_content [49, 20] - [49, 32])
        (code_span_delimiter [49, 32] - [49, 33]))
      (text [49, 33] - [49, 194])))
  (paragraph [51, 0] - [53, 0]
    content: (inline [51, 0] - [51, 186]
      (image [51, 0] - [51, 63]
        alt: (image_alt [51, 2] - [51, 29])
        source: (image_source [51, 31] - [51, 62]))
      (ERROR [51, 63] - [51, 71]
        (reference_type [51, 64] - [51, 67])
        (citation_key [51, 68] - [51, 71]))
      (equals_sign [51, 71] - [51, 72])
      (text [51, 72] - [51, 186])))
  (paragraph [53, 0] - [55, 0]
    content: (inline [53, 0] - [53, 112]
      (text [53, 0] - [53, 27])
      (link [53, 27] - [53, 111]
        text: (link_text [53, 28] - [53, 59])
        destination: (link_destination [53, 61] - [53, 110]))
      (text [53, 111] - [53, 112])))
  (atx_heading [55, 0] - [57, 0]
    marker: (atx_heading_marker [55, 0] - [55, 3])
    content: (inline [55, 3] - [55, 22]
      (text [55, 3] - [55, 22])))
  (paragraph [57, 0] - [59, 0]
    content: (inline [57, 0] - [57, 117]
      (text [57, 0] - [57, 117])))
  (fenced_code_block [59, 0] - [66, 0]
    open: (code_fence_delimiter [59, 0] - [59, 3])
    info: (info_string [59, 3] - [59, 8])
    (code_line [60, 0] - [60, 3])
    (code_line [61, 0] - [61, 28])
    (code_line [62, 0] - [62, 13])
    (code_line [63, 0] - [63, 3])
    close: (code_fence_delimiter [64, 0] - [64, 3]))
  (paragraph [66, 0] - [68, 0]
    content: (inline [66, 0] - [66, 125]
      (text [66, 0] - [66, 26])
      (link [66, 26] - [66, 124]
        text: (link_text [66, 27] - [66, 37])
        text: (code_span [66, 37] - [66, 44]
          (code_span_delimiter [66, 37] - [66, 38])
          (code_span_content [66, 38] - [66, 43])
          (code_span_delimiter [66, 43] - [66, 44]))
        text: (link_text [66, 44] - [66, 51])
        destination: (link_destination [66, 53] - [66, 123]))
      (text [66, 124] - [66, 125])))
  (paragraph [68, 0] - [70, 0]
    content: (inline [68, 0] - [68, 152]
      (text [68, 0] - [68, 104])
      (ERROR [68, 104] - [68, 106]
        (link_text [68, 105] - [68, 106]))
      (citation [68, 106] - [68, 118]
        key: (citation_key [68, 107] - [68, 118]))
      (text [68, 118] - [68, 152])))
  (atx_heading [70, 0] - [72, 0]
    marker: (atx_heading_marker [70, 0] - [70, 3])
    content: (inline [70, 3] - [70, 25]
      (text [70, 3] - [70, 25])))
  (paragraph [72, 0] - [74, 0]
    content: (inline [72, 0] - [72, 118]
      (text [72, 0] - [72, 70])
      (code_span [72, 70] - [72, 78]
        (code_span_delimiter [72, 70] - [72, 71])
        (code_span_content [72, 71] - [72, 77])
        (code_span_delimiter [72, 77] - [72, 78]))
      (text [72, 78] - [72, 93])
      (code_span [72, 93] - [72, 106]
        (code_span_delimiter [72, 93] - [72, 94])
        (code_span_content [72, 94] - [72, 105])
        (code_span_delimiter [72, 105] - [72, 106]))
      (text [72, 106] - [72, 118])))
  (ERROR [74, 0] - [74, 25]
    (code_fence_delimiter [74, 0] - [74, 3])
    (info_string [74, 3] - [74, 4])
    (attribute_class [74, 5] - [74, 14])
    (citation_key [74, 14] - [74, 25]))
  (paragraph [74, 25] - [75, 0]
    content: (inline [74, 25] - [74, 34]
      (equals_sign [74, 25] - [74, 26])
      (text [74, 26] - [74, 34])))
  (shortcode_block [75, 0] - [76, 0]
    (shortcode_open [75, 0] - [75, 4])
    name: (shortcode_name [75, 4] - [75, 15])
    arguments: (shortcode_arguments [75, 15] - [75, 35])
    (shortcode_close [75, 35] - [76, 0]))
  (shortcode_block [76, 0] - [77, 0]
    (shortcode_open [76, 0] - [76, 4])
    name: (shortcode_name [76, 4] - [76, 10])
    arguments: (shortcode_arguments [76, 10] - [76, 13])
    (shortcode_close [76, 13] - [77, 0]))
  (ERROR [77, 0] - [95, 276]
    (code_fence_delimiter [77, 0] - [77, 3])
    (code_line [79, 0] - [79, 132])
    (code_line [81, 0] - [81, 18])
    (code_line [82, 0] - [82, 38])
    (code_line [84, 0] - [84, 16])
    (code_line [85, 0] - [85, 3])
    (code_line [87, 0] - [87, 138])
    (code_line [89, 0] - [89, 19])
    (code_line [91, 0] - [91, 124])
    (code_line [93, 0] - [93, 28])
    (chunk_option_value [95, 0] - [95, 276])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/blog/posts/2024-07-11-1.5-release/index.qmd	Parse:    0.49 ms	  9930 bytes/ms	(ERROR [0, 0] - [3, 8])

### File 16: `docs/presentations/revealjs/examples/slide-with-speaker-notes.qmd`

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
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/presentations/revealjs/examples/slide-with-speaker-notes.qmd	Parse:    0.08 ms	  1421 bytes/ms	(ERROR [9, 0] - [11, 3])

### File 17: `docs/presentations/powerpoint.qmd`

**Error:** Parse failed: (document [0, 0] - [109, 0]
  (yaml_front_matter [0, 0] - [6, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [4, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 19]
          (yaml_string [1, 7] - [1, 19]
            (yaml_string_quoted [1, 7] - [1, 19]))))
      (yaml_pair [2, 0] - [3, 0]
        key: (yaml_key [2, 0] - [2, 12])
        value: (yaml_scalar [2, 14] - [2, 18]
          (yaml_string [2, 14] - [2, 18]
            (yaml_string_unquoted [2, 14] - [2, 18]))))
      (yaml_pair [3, 0] - [4, 0]
        key: (yaml_key [3, 0] - [3, 7])
        value: (yaml_scalar [3, 9] - [3, 13]
          (yaml_boolean [3, 9] - [3, 13]))))
    close: (yaml_front_matter_delimiter [4, 0] - [4, 3]))
  (atx_heading [6, 0] - [8, 0]
    marker: (atx_heading_marker [6, 0] - [6, 3])
    content: (inline [6, 3] - [6, 11]
      (text [6, 3] - [6, 11])))
  (paragraph [8, 0] - [12, 0]
    content: (inline [8, 0] - [10, 153]
      (text [8, 0] - [8, 15])
      (link [8, 15] - [8, 79]
        text: (link_text [8, 16] - [8, 26])
        destination: (link_destination [8, 28] - [8, 78]))
      (text [8, 79] - [8, 104])
      (code_span [8, 104] - [8, 110]
        (code_span_delimiter [8, 104] - [8, 105])
        (code_span_content [8, 105] - [8, 109])
        (code_span_delimiter [8, 109] - [8, 110]))
      (text [8, 110] - [8, 280])
      (link [8, 280] - [10, 37]
        text: (link_text [8, 281] - [8, 301])
        (ERROR [8, 302] - [10, 18]
          (ERROR [8, 302] - [8, 303])
          (citation_key [10, 0] - [10, 3])
          (citation_key [10, 3] - [10, 7])
          (citation_key [10, 7] - [10, 18]))
        reference: (reference_label [10, 20] - [10, 36]))
      (text [10, 37] - [10, 153])))
  (shortcode_block [12, 0] - [13, 0]
    (shortcode_open [12, 0] - [12, 4])
    name: (shortcode_name [12, 4] - [12, 11])
    arguments: (shortcode_arguments [12, 11] - [12, 32])
    (shortcode_close [12, 32] - [13, 0]))
  (blank_line [13, 0] - [14, 0])
  (shortcode_block [14, 0] - [15, 0]
    (shortcode_open [14, 0] - [14, 4])
    name: (shortcode_name [14, 4] - [14, 11])
    arguments: (shortcode_arguments [14, 11] - [14, 34])
    (shortcode_close [14, 34] - [15, 0]))
  (blank_line [15, 0] - [16, 0])
  (shortcode_block [16, 0] - [17, 0]
    (shortcode_open [16, 0] - [16, 4])
    name: (shortcode_name [16, 4] - [16, 11])
    arguments: (shortcode_arguments [16, 11] - [16, 24])
    (shortcode_close [16, 24] - [17, 0]))
  (blank_line [17, 0] - [18, 0])
  (shortcode_block [18, 0] - [19, 0]
    (shortcode_open [18, 0] - [18, 4])
    name: (shortcode_name [18, 4] - [18, 11])
    arguments: (shortcode_arguments [18, 11] - [18, 30])
    (shortcode_close [18, 30] - [19, 0]))
  (atx_heading [19, 0] - [23, 0]
    marker: (atx_heading_marker [19, 0] - [21, 3])
    content: (inline [21, 3] - [21, 23]
      (text [21, 3] - [21, 23])))
  (paragraph [23, 0] - [25, 0]
    content: (inline [23, 0] - [23, 151]
      (text [23, 0] - [23, 115])
      (code_span [23, 115] - [23, 130]
        (code_span_delimiter [23, 115] - [23, 116])
        (code_span_content [23, 116] - [23, 129])
        (code_span_delimiter [23, 129] - [23, 130]))
      (text [23, 130] - [23, 151])))
  (fenced_code_block [25, 0] - [34, 0]
    open: (code_fence_delimiter [25, 0] - [25, 3])
    info: (info_string [25, 3] - [25, 8])
    (code_line [26, 0] - [26, 3])
    (code_line [27, 0] - [27, 21])
    (code_line [28, 0] - [28, 7])
    (code_line [29, 0] - [29, 7])
    (code_line [30, 0] - [30, 32])
    (code_line [31, 0] - [31, 3])
    close: (code_fence_delimiter [32, 0] - [32, 3]))
  (paragraph [34, 0] - [36, 0]
    content: (inline [34, 0] - [34, 168]
      (text [34, 0] - [34, 78])
      (code_span [34, 78] - [34, 85]
        (code_span_delimiter [34, 78] - [34, 79])
        (code_span_content [34, 79] - [34, 84])
        (code_span_delimiter [34, 84] - [34, 85]))
      (text [34, 85] - [34, 89])
      (code_span [34, 89] - [34, 96]
        (code_span_delimiter [34, 89] - [34, 90])
        (code_span_content [34, 90] - [34, 95])
        (code_span_delimiter [34, 95] - [34, 96]))
      (text [34, 96] - [34, 168])))
  (paragraph [36, 0] - [38, 0]
    content: (inline [36, 0] - [36, 172]
      (text [36, 0] - [36, 131])
      (code_span [36, 131] - [36, 139]
        (code_span_delimiter [36, 131] - [36, 132])
        (code_span_content [36, 132] - [36, 138])
        (code_span_delimiter [36, 138] - [36, 139]))
      (text [36, 139] - [36, 150])
      (code_span [36, 150] - [36, 156]
        (code_span_delimiter [36, 150] - [36, 151])
        (code_span_content [36, 151] - [36, 155])
        (code_span_delimiter [36, 155] - [36, 156]))
      (text [36, 156] - [36, 172])))
  (paragraph [38, 0] - [39, 0]
    content: (inline [38, 0] - [38, 15]
      (text [38, 0] - [38, 15])))
  (paragraph [39, 0] - [40, 0]
    content: (inline [39, 0] - [39, 21]
      (text [39, 0] - [39, 21])))
  (paragraph [40, 0] - [41, 0]
    content: (inline [40, 0] - [40, 18]
      (text [40, 0] - [40, 18])))
  (paragraph [41, 0] - [42, 0]
    content: (inline [41, 0] - [41, 15]
      (text [41, 0] - [41, 15])))
  (paragraph [42, 0] - [43, 0]
    content: (inline [42, 0] - [42, 14]
      (text [42, 0] - [42, 14])))
  (paragraph [43, 0] - [44, 0]
    content: (inline [43, 0] - [43, 24]
      (text [43, 0] - [43, 24])))
  (paragraph [44, 0] - [46, 0]
    content: (inline [44, 0] - [44, 9]
      (text [44, 0] - [44, 9])))
  (paragraph [46, 0] - [48, 0]
    content: (inline [46, 0] - [46, 216]
      (text [46, 0] - [46, 192])
      (code_span [46, 192] - [46, 207]
        (code_span_delimiter [46, 192] - [46, 193])
        (code_span_content [46, 193] - [46, 206])
        (code_span_delimiter [46, 206] - [46, 207]))
      (text [46, 207] - [46, 216])))
  (atx_heading [48, 0] - [50, 0]
    marker: (atx_heading_marker [48, 0] - [48, 4])
    content: (inline [48, 4] - [48, 23]
      (text [48, 4] - [48, 23])))
  (paragraph [50, 0] - [52, 0]
    content: (inline [50, 0] - [50, 89]
      (text [50, 0] - [50, 89])))
  (ERROR [52, 0] - [52, 18]
    (code_fence_delimiter [52, 0] - [52, 3])
    (attribute_class [52, 4] - [52, 9])
    (citation_key [52, 9] - [52, 18]))
  (paragraph [52, 18] - [53, 0]
    content: (inline [52, 18] - [52, 30]
      (equals_sign [52, 18] - [52, 19])
      (text [52, 19] - [52, 30])))
  (paragraph [53, 0] - [54, 0]
    content: (inline [53, 0] - [53, 72]
      (text [53, 0] - [53, 72])))
  (fenced_code_block [54, 0] - [102, 0]
    open: (code_fence_delimiter [54, 0] - [54, 3])
    (code_line [56, 0] - [56, 153])
    (code_line [58, 0] - [58, 16])
    (code_line [60, 0] - [60, 118])
    (code_line [62, 0] - [62, 15])
    (code_line [64, 0] - [64, 153])
    (code_line [66, 0] - [66, 18])
    (code_line [68, 0] - [68, 148])
    (code_line [70, 0] - [70, 15])
    (code_line [72, 0] - [72, 151])
    (code_line [74, 0] - [74, 14])
    (code_line [76, 0] - [76, 167])
    (code_line [78, 0] - [78, 24])
    (code_line [80, 0] - [80, 122])
    (code_line [82, 0] - [82, 9])
    (code_line [84, 0] - [84, 166])
    (code_line [86, 0] - [86, 21])
    (code_line [88, 0] - [88, 90])
    (code_line [90, 0] - [90, 156])
    (code_line [92, 0] - [92, 20])
    (code_line [94, 0] - [94, 244])
    (code_line [96, 0] - [96, 123])
    (code_line [98, 0] - [98, 12])
    (code_line [99, 0] - [99, 50])
    close: (code_fence_delimiter [100, 0] - [100, 3]))
  (paragraph [102, 0] - [104, 0]
    content: (inline [102, 0] - [102, 81]
      (text [102, 0] - [102, 81])))
  (fenced_code_block [104, 0] - [108, 0]
    open: (code_fence_delimiter [104, 0] - [104, 3])
    info: (info_string [104, 3] - [104, 12])
    (code_line [105, 0] - [105, 38])
    close: (code_fence_delimiter [106, 0] - [106, 3]))
  (paragraph [108, 0] - [109, 0]
    content: (inline [108, 0] - [108, 196]
      (text [108, 0] - [108, 196]))))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/presentations/powerpoint.qmd	Parse:    0.17 ms	 25732 bytes/ms	(ERROR [8, 302] - [10, 18])

### File 18: `docs/publishing/rstudio-connect.qmd`

**Error:** Parse failed: (document [0, 0] - [380, 0]
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
        value: (yaml_scalar [2, 8] - [2, 14]
          (yaml_string [2, 8] - [2, 14]
            (yaml_string_unquoted [2, 8] - [2, 14]))))
      (yaml_pair [3, 0] - [4, 0]
        key: (yaml_key [3, 0] - [3, 11])
        value: (yaml_scalar [3, 13] - [3, 16]
          (yaml_string [3, 13] - [3, 16]
            (yaml_string_quoted [3, 13] - [3, 16])))))
    close: (yaml_front_matter_delimiter [4, 0] - [4, 3]))
  (atx_heading [6, 0] - [8, 0]
    marker: (atx_heading_marker [6, 0] - [6, 3])
    content: (inline [6, 3] - [6, 11]
      (text [6, 3] - [6, 11])))
  (paragraph [8, 0] - [10, 0]
    content: (inline [8, 0] - [8, 253]
      (link [8, 0] - [8, 58]
        (ERROR [8, 1] - [8, 14]
          (reference_label [8, 1] - [8, 14]))
        destination: (link_destination [8, 16] - [8, 57]))
      (text [8, 58] - [8, 253])))
  (paragraph [10, 0] - [12, 0]
    content: (inline [10, 0] - [10, 66]
      (text [10, 0] - [10, 66])))
  (paragraph [12, 0] - [14, 0]
    content: (inline [12, 0] - [12, 94]
      (text [12, 0] - [12, 12])
      (code_span [12, 12] - [12, 28]
        (code_span_delimiter [12, 12] - [12, 13])
        (code_span_content [12, 13] - [12, 27])
        (code_span_delimiter [12, 27] - [12, 28]))
      (text [12, 28] - [12, 94])))
  (paragraph [14, 0] - [16, 0]
    content: (inline [14, 0] - [14, 238]
      (text [14, 0] - [14, 12])
      (link [14, 12] - [14, 74]
        text: (link_text [14, 13] - [14, 29])
        destination: (link_destination [14, 31] - [14, 73]))
      (text [14, 74] - [14, 93])
      (link [14, 93] - [14, 141]
        text: (link_text [14, 94] - [14, 100])
        destination: (link_destination [14, 102] - [14, 140]))
      (text [14, 141] - [14, 238])))
  (paragraph [16, 0] - [18, 0]
    content: (inline [16, 0] - [16, 182]
      (text [16, 0] - [16, 30])
      (link [16, 30] - [16, 101]
        text: (link_text [16, 31] - [16, 49])
        destination: (link_destination [16, 51] - [16, 100]))
      (text [16, 101] - [16, 182])))
  (paragraph [18, 0] - [20, 0]
    content: (inline [18, 0] - [18, 217]
      (text [18, 0] - [18, 51])
      (link [18, 51] - [18, 85]
        text: (link_text [18, 52] - [18, 59])
        destination: (link_destination [18, 61] - [18, 84]))
      (text [18, 85] - [18, 87])
      (link [18, 87] - [18, 125]
        text: (link_text [18, 88] - [18, 95])
        destination: (link_destination [18, 97] - [18, 124]))
      (text [18, 125] - [18, 130])
      (link [18, 130] - [18, 182]
        text: (link_text [18, 131] - [18, 145])
        destination: (link_destination [18, 147] - [18, 181]))
      (text [18, 182] - [18, 217])))
  (paragraph [20, 0] - [22, 0]
    content: (inline [20, 0] - [20, 228]
      (text [20, 0] - [20, 131])
      (code_span [20, 131] - [20, 147]
        (code_span_delimiter [20, 131] - [20, 132])
        (code_span_content [20, 132] - [20, 146])
        (code_span_delimiter [20, 146] - [20, 147]))
      (text [20, 147] - [20, 228])))
  (atx_heading [22, 0] - [24, 0]
    marker: (atx_heading_marker [22, 0] - [22, 3])
    content: (inline [22, 3] - [22, 18]
      (text [22, 3] - [22, 18])))
  (paragraph [24, 0] - [26, 0]
    content: (inline [24, 0] - [24, 184]
      (text [24, 0] - [24, 4])
      (code_span [24, 4] - [24, 20]
        (code_span_delimiter [24, 4] - [24, 5])
        (code_span_content [24, 5] - [24, 19])
        (code_span_delimiter [24, 19] - [24, 20]))
      (text [24, 20] - [24, 147])
      (code_span [24, 147] - [24, 163]
        (code_span_delimiter [24, 147] - [24, 148])
        (code_span_content [24, 148] - [24, 162])
        (code_span_delimiter [24, 162] - [24, 163]))
      (text [24, 163] - [24, 184])))
  (ERROR [26, 0] - [26, 18]
    (code_fence_delimiter [26, 0] - [26, 3])
    (attribute_class [26, 4] - [26, 9])
    (citation_key [26, 9] - [26, 18]))
  (paragraph [26, 18] - [27, 0]
    content: (inline [26, 18] - [26, 30]
      (equals_sign [26, 18] - [26, 19])
      (text [26, 19] - [26, 30])))
  (paragraph [27, 0] - [28, 0]
    content: (inline [27, 0] - [27, 22]
      (text [27, 0] - [27, 22])))
  (fenced_code_block [28, 0] - [37, 0]
    open: (code_fence_delimiter [28, 0] - [28, 3])
    (code_line [30, 0] - [30, 93])
    (code_line [32, 0] - [32, 30])
    (code_line [33, 0] - [33, 24])
    (code_line [34, 0] - [34, 19])
    close: (code_fence_delimiter [35, 0] - [35, 3]))
  (paragraph [37, 0] - [39, 0]
    content: (inline [37, 0] - [37, 97]
      (text [37, 0] - [37, 30])
      (link [37, 30] - [37, 96]
        text: (link_text [37, 31] - [37, 46])
        destination: (link_destination [37, 48] - [37, 95]))
      (text [37, 96] - [37, 97])))
  (ERROR [39, 0] - [39, 18]
    (code_fence_delimiter [39, 0] - [39, 3])
    (attribute_class [39, 4] - [39, 9])
    (citation_key [39, 9] - [39, 18]))
  (paragraph [39, 18] - [40, 0]
    content: (inline [39, 18] - [39, 30]
      (equals_sign [39, 18] - [39, 19])
      (text [39, 19] - [39, 30])))
  (paragraph [40, 0] - [265, 0]
    content: (inline [40, 0] - [263, 214]
      (inline_math [40, 0] - [260, 28]
        (math_delimiter [40, 0] - [40, 1])
        (math_content [40, 1] - [260, 27])
        (math_delimiter [260, 27] - [260, 28]))
      (ERROR [260, 28] - [263, 76]
        (citation_key [260, 30] - [260, 38])
        (attribute_class [260, 38] - [260, 54])
        (code_fence_delimiter [261, 0] - [261, 3])
        (citation_key [263, 0] - [263, 4])
        (citation_key [263, 4] - [263, 8])
        (citation_key [263, 9] - [263, 11])
        (citation_key [263, 11] - [263, 18])
        (citation_key [263, 18] - [263, 23])
        (citation_key [263, 23] - [263, 31])
        (citation_key [263, 31] - [263, 42])
        (citation_key [263, 44] - [263, 53])
        (citation_key [263, 53] - [263, 57])
        (citation_key [263, 57] - [263, 65])
        (citation_key [263, 65] - [263, 72])
        (citation_key [263, 72] - [263, 76]))
      (text [263, 76] - [263, 77])
      (code_span [263, 77] - [263, 86]
        (code_span_delimiter [263, 77] - [263, 78])
        (code_span_content [263, 78] - [263, 85])
        (code_span_delimiter [263, 85] - [263, 86]))
      (text [263, 86] - [263, 214])))
  (atx_heading [265, 0] - [267, 0]
    marker: (atx_heading_marker [265, 0] - [265, 5])
    content: (inline [265, 5] - [265, 19]
      (text [265, 5] - [265, 19])))
  (paragraph [267, 0] - [269, 0]
    content: (inline [267, 0] - [267, 267]
      (text [267, 0] - [267, 267])))
  (shortcode_block [269, 0] - [270, 0]
    (shortcode_open [269, 0] - [269, 4])
    name: (shortcode_name [269, 4] - [269, 11])
    arguments: (shortcode_arguments [269, 11] - [269, 40])
    (shortcode_close [269, 40] - [270, 0]))
  (atx_heading [270, 0] - [273, 0]
    marker: (atx_heading_marker [270, 0] - [271, 6])
    content: (inline [271, 6] - [271, 19]
      (text [271, 6] - [271, 19])))
  (paragraph [273, 0] - [275, 0]
    content: (inline [273, 0] - [273, 530]
      (text [273, 0] - [273, 114])
      (link [273, 114] - [273, 235]
        text: (link_text [273, 115] - [273, 119])
        destination: (link_destination [273, 121] - [273, 234]))
      (text [273, 235] - [273, 239])
      (link [273, 239] - [273, 296]
        text: (link_text [273, 240] - [273, 244])
        destination: (link_destination [273, 246] - [273, 295]))
      (text [273, 296] - [273, 440])
      (link [273, 440] - [273, 503]
        text: (link_text [273, 441] - [273, 461])
        destination: (link_destination [273, 463] - [273, 502]))
      (text [273, 503] - [273, 530])))
  (paragraph [275, 0] - [277, 0]
    content: (inline [275, 0] - [275, 446]
      (text [275, 0] - [275, 81])
      (code_span [275, 81] - [275, 95]
        (code_span_delimiter [275, 81] - [275, 82])
        (code_span_content [275, 82] - [275, 94])
        (code_span_delimiter [275, 94] - [275, 95]))
      (text [275, 95] - [275, 122])
      (code_span [275, 122] - [275, 135]
        (code_span_delimiter [275, 122] - [275, 123])
        (code_span_content [275, 123] - [275, 134])
        (code_span_delimiter [275, 134] - [275, 135]))
      (text [275, 135] - [275, 180])
      (code_span [275, 180] - [275, 188]
        (code_span_delimiter [275, 180] - [275, 181])
        (code_span_content [275, 181] - [275, 187])
        (code_span_delimiter [275, 187] - [275, 188]))
      (text [275, 188] - [275, 285])
      (code_span [275, 285] - [275, 300]
        (code_span_delimiter [275, 285] - [275, 286])
        (code_span_content [275, 286] - [275, 299])
        (code_span_delimiter [275, 299] - [275, 300]))
      (text [275, 300] - [275, 413])
      (code_span [275, 413] - [275, 420]
        (code_span_delimiter [275, 413] - [275, 414])
        (code_span_content [275, 414] - [275, 419])
        (code_span_delimiter [275, 419] - [275, 420]))
      (text [275, 420] - [275, 446])))
  (atx_heading [277, 0] - [279, 0]
    marker: (atx_heading_marker [277, 0] - [277, 6])
    content: (inline [277, 6] - [277, 32]
      (text [277, 6] - [277, 32])))
  (paragraph [279, 0] - [281, 0]
    content: (inline [279, 0] - [279, 176]
      (text [279, 0] - [279, 107])
      (code_span [279, 107] - [279, 125]
        (code_span_delimiter [279, 107] - [279, 108])
        (code_span_content [279, 108] - [279, 124])
        (code_span_delimiter [279, 124] - [279, 125]))
      (text [279, 125] - [279, 176])))
  (ERROR [281, 0] - [281, 18]
    (code_fence_delimiter [281, 0] - [281, 3])
    (attribute_class [281, 4] - [281, 9])
    (citation_key [281, 9] - [281, 18]))
  (paragraph [281, 18] - [282, 0]
    content: (inline [281, 18] - [281, 51]
      (equals_sign [281, 18] - [281, 19])
      (text [281, 19] - [281, 51])))
  (ERROR [282, 0] - [352, 57]
    (text [282, 0] - [282, 3])
    (text [282, 3] - [283, 10])
    (emphasis [283, 10] - [311, 18]
      (emphasis_delimiter [283, 10] - [283, 11])
      (text [283, 11] - [283, 20])
      (text [284, 0] - [284, 7])
      (text [285, 0] - [285, 18])
      (text [287, 0] - [287, 20])
      (text [289, 0] - [289, 5])
      (text [290, 0] - [290, 15])
      (text [291, 0] - [291, 26])
      (text [292, 0] - [292, 10])
      (text [293, 0] - [293, 34])
      (text [294, 0] - [294, 30])
      (citation [294, 30] - [294, 33]
        key: (citation_key [294, 31] - [294, 33]))
      (text [294, 33] - [294, 34])
      (text [296, 0] - [296, 27])
      (text [297, 0] - [297, 45])
      (citation [297, 45] - [297, 48]
        key: (citation_key [297, 46] - [297, 48]))
      (text [298, 0] - [298, 8])
      (text [299, 0] - [299, 45])
      (text [300, 0] - [300, 34])
      (citation [300, 34] - [300, 37]
        key: (citation_key [300, 35] - [300, 37]))
      (text [301, 0] - [301, 13])
      (text [302, 0] - [302, 32])
      (text [303, 0] - [303, 22])
      (text [304, 0] - [304, 32])
      (text [305, 0] - [305, 44])
      (text [306, 0] - [306, 6])
      (text [307, 0] - [307, 33])
      (text [308, 0] - [308, 47])
      (citation [308, 47] - [308, 50]
        key: (citation_key [308, 48] - [308, 50]))
      (text [309, 0] - [309, 13])
      (text [310, 0] - [310, 25])
      (text [311, 0] - [311, 17])
      (emphasis_delimiter [311, 17] - [311, 18]))
    (text [311, 18] - [311, 53])
    (text [311, 53] - [312, 17])
    (emphasis [312, 17] - [312, 22]
      (emphasis_delimiter [312, 17] - [312, 18])
      (text [312, 18] - [312, 21])
      (emphasis_delimiter [312, 21] - [312, 22]))
    (text [312, 22] - [312, 27])
    (inline_math [312, 27] - [352, 28]
      (math_delimiter [312, 27] - [312, 28])
      (math_content [312, 28] - [352, 27])
      (math_delimiter [352, 27] - [352, 28]))
    (citation_key [352, 30] - [352, 38])
    (attribute_class [352, 38] - [352, 54]))
  (fenced_code_block [352, 57] - [369, 0]
    open: (code_fence_delimiter [352, 57] - [353, 3])
    (code_line [355, 0] - [355, 23])
    (code_line [357, 0] - [357, 227])
    (code_line [359, 0] - [359, 8])
    (code_line [360, 0] - [360, 26])
    (code_line [361, 0] - [361, 44])
    (code_line [362, 0] - [362, 7])
    (code_line [363, 0] - [363, 19])
    (code_line [364, 0] - [364, 29])
    (code_line [365, 0] - [365, 47])
    (code_line [366, 0] - [366, 51])
    close: (code_fence_delimiter [367, 0] - [367, 3]))
  (paragraph [369, 0] - [371, 0]
    content: (inline [369, 0] - [369, 269]
      (text [369, 0] - [369, 12])
      (code_span [369, 12] - [369, 28]
        (code_span_delimiter [369, 12] - [369, 13])
        (code_span_content [369, 13] - [369, 27])
        (code_span_delimiter [369, 27] - [369, 28]))
      (text [369, 28] - [369, 229])
      (code_span [369, 229] - [369, 244]
        (code_span_delimiter [369, 229] - [369, 230])
        (code_span_content [369, 230] - [369, 243])
        (code_span_delimiter [369, 243] - [369, 244]))
      (text [369, 244] - [369, 252])
      (code_span [369, 252] - [369, 261]
        (code_span_delimiter [369, 252] - [369, 253])
        (code_span_content [369, 253] - [369, 260])
        (code_span_delimiter [369, 260] - [369, 261]))
      (text [369, 261] - [369, 269])))
  (fenced_code_block [371, 0] - [380, 0]
    open: (code_fence_delimiter [371, 0] - [371, 3])
    info: (info_string [371, 3] - [371, 8])
    (code_line [372, 0] - [372, 26])
    (code_line [373, 0] - [373, 44])
    (code_line [374, 0] - [374, 7])
    (code_line [375, 0] - [375, 19])
    (code_line [376, 0] - [376, 17])
    (code_line [377, 0] - [377, 47])
    (code_line [378, 0] - [378, 51])
    close: (code_fence_delimiter [379, 0] - [379, 3])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/publishing/rstudio-connect.qmd	Parse:    0.45 ms	 39718 bytes/ms	(ERROR [8, 1] - [8, 14])

### File 19: `docs/output-formats/html-accessibility.qmd`

**Error:** Parse failed: (document [0, 0] - [116, 192]
  (yaml_front_matter [0, 0] - [6, 0]
    start: (yaml_front_matter_start [0, 0] - [1, 0])
    (yaml_mapping [1, 0] - [4, 0]
      (yaml_pair [1, 0] - [2, 0]
        key: (yaml_key [1, 0] - [1, 5])
        value: (yaml_scalar [1, 7] - [1, 34]
          (yaml_string [1, 7] - [1, 34]
            (yaml_string_quoted [1, 7] - [1, 34]))))
      (yaml_pair [2, 0] - [4, 0]
        key: (yaml_key [2, 0] - [2, 3])
        value: (yaml_scalar [3, 2] - [3, 16]
          (yaml_string [3, 2] - [3, 16]
            (yaml_string_unquoted [3, 2] - [3, 16])))))
    close: (yaml_front_matter_delimiter [4, 0] - [4, 3]))
  (paragraph [6, 0] - [7, 0]
    content: (inline [6, 0] - [6, 16]
      (text [6, 0] - [6, 16])))
  (paragraph [7, 0] - [8, 0]
    content: (inline [7, 0] - [7, 42]
      (text [7, 0] - [7, 42])))
  (ERROR [8, 0] - [116, 192]
    (fenced_div_delimiter [8, 0] - [8, 3])
    (paragraph [10, 0] - [12, 0]
      content: (inline [10, 0] - [10, 192]
        (text [10, 0] - [10, 39])
        (link [10, 39] - [10, 90]
          text: (code_span [10, 40] - [10, 50]
            (code_span_delimiter [10, 40] - [10, 41])
            (code_span_content [10, 41] - [10, 49])
            (code_span_delimiter [10, 49] - [10, 50]))
          destination: (link_destination [10, 52] - [10, 89]))
        (text [10, 90] - [10, 192])))
    (atx_heading [12, 0] - [14, 0]
      marker: (atx_heading_marker [12, 0] - [12, 3])
      content: (inline [12, 3] - [12, 39]
        (text [12, 3] - [12, 29])
        (code_span [12, 29] - [12, 39]
          (code_span_delimiter [12, 29] - [12, 30])
          (code_span_content [12, 30] - [12, 38])
          (code_span_delimiter [12, 38] - [12, 39]))))
    (paragraph [14, 0] - [16, 0]
      content: (inline [14, 0] - [14, 165]
        (text [14, 0] - [14, 75])
        (code_span [14, 75] - [14, 80]
          (code_span_delimiter [14, 75] - [14, 76])
          (code_span_content [14, 76] - [14, 79])
          (code_span_delimiter [14, 79] - [14, 80]))
        (text [14, 80] - [14, 117])
        (code_span [14, 117] - [14, 125]
          (code_span_delimiter [14, 117] - [14, 118])
          (code_span_content [14, 118] - [14, 124])
          (code_span_delimiter [14, 124] - [14, 125]))
        (text [14, 125] - [14, 128])
        (code_span [14, 128] - [14, 134]
          (code_span_delimiter [14, 128] - [14, 129])
          (code_span_content [14, 129] - [14, 133])
          (code_span_delimiter [14, 133] - [14, 134]))
        (text [14, 134] - [14, 136])
        (code_span [14, 136] - [14, 147]
          (code_span_delimiter [14, 136] - [14, 137])
          (code_span_content [14, 137] - [14, 146])
          (code_span_delimiter [14, 146] - [14, 147]))
        (text [14, 147] - [14, 153])
        (code_span [14, 153] - [14, 163]
          (code_span_delimiter [14, 153] - [14, 154])
          (code_span_content [14, 154] - [14, 162])
          (code_span_delimiter [14, 162] - [14, 163]))
        (text [14, 163] - [14, 165])))
    (fenced_code_block [16, 0] - [22, 0]
      open: (code_fence_delimiter [16, 0] - [16, 3])
      info: (info_string [16, 3] - [16, 8])
      (code_line [17, 0] - [17, 7])
      (code_line [18, 0] - [18, 7])
      (code_line [19, 0] - [19, 13])
      close: (code_fence_delimiter [20, 0] - [20, 3]))
    (paragraph [22, 0] - [24, 0]
      content: (inline [22, 0] - [22, 189]
        (text [22, 0] - [22, 69])
        (code_span [22, 69] - [22, 79]
          (code_span_delimiter [22, 69] - [22, 70])
          (code_span_content [22, 70] - [22, 78])
          (code_span_delimiter [22, 78] - [22, 79]))
        (text [22, 79] - [22, 189])))
    (atx_heading [24, 0] - [26, 0]
      marker: (atx_heading_marker [24, 0] - [24, 4])
      content: (inline [24, 4] - [24, 17]
        (text [24, 4] - [24, 17])))
    (paragraph [26, 0] - [28, 0]
      content: (inline [26, 0] - [26, 114]
        (text [26, 0] - [26, 98])
        (code_span [26, 98] - [26, 106]
          (code_span_delimiter [26, 98] - [26, 99])
          (code_span_content [26, 99] - [26, 105])
          (code_span_delimiter [26, 105] - [26, 106]))
        (text [26, 106] - [26, 114])))
    (text [28, 0] - [28, 4])
    (code_span [28, 4] - [28, 14]
      (code_span_delimiter [28, 4] - [28, 5])
      (code_span_content [28, 5] - [28, 13])
      (code_span_delimiter [28, 13] - [28, 14]))
    (text [28, 14] - [28, 32])
    (text [28, 32] - [30, 4])
    (ERROR [30, 4] - [30, 6]
      (inline_cell_delimiter [30, 4] - [30, 5])
      (inline_cell_delimiter [30, 5] - [30, 6]))
    (code_span [30, 6] - [35, 5]
      (code_span_delimiter [30, 6] - [30, 7])
      (code_span_content [30, 7] - [35, 4])
      (code_span_delimiter [35, 4] - [35, 5]))
    (ERROR [35, 5] - [35, 6]
      (inline_cell_delimiter [35, 5] - [35, 6]))
    (code_span [35, 6] - [37, 64]
      (code_span_delimiter [35, 6] - [35, 7])
      (code_span_content [35, 7] - [37, 63])
      (code_span_delimiter [37, 63] - [37, 64]))
    (text [37, 64] - [37, 72])
    (code_span [37, 72] - [41, 5]
      (code_span_delimiter [37, 72] - [37, 73])
      (code_span_content [37, 73] - [41, 4])
      (code_span_delimiter [41, 4] - [41, 5]))
    (text [41, 5] - [41, 9])
    (code_span [41, 9] - [43, 5]
      (code_span_delimiter [41, 9] - [41, 10])
      (code_span_content [41, 10] - [43, 4])
      (code_span_delimiter [43, 4] - [43, 5]))
    (ERROR [43, 5] - [43, 6]
      (inline_cell_delimiter [43, 5] - [43, 6]))
    (code_span [43, 6] - [48, 5]
      (code_span_delimiter [43, 6] - [43, 7])
      (code_span_content [43, 7] - [48, 4])
      (code_span_delimiter [48, 4] - [48, 5]))
    (ERROR [48, 5] - [48, 6]
      (inline_cell_delimiter [48, 5] - [48, 6]))
    (code_span [48, 6] - [52, 69]
      (code_span_delimiter [48, 6] - [48, 7])
      (code_span_content [48, 7] - [52, 68])
      (code_span_delimiter [52, 68] - [52, 69]))
    (text [52, 69] - [52, 77])
    (code_span [52, 77] - [52, 82]
      (code_span_delimiter [52, 77] - [52, 78])
      (code_span_content [52, 78] - [52, 81])
      (code_span_delimiter [52, 81] - [52, 82]))
    (text [52, 82] - [52, 85])
    (code_span [52, 85] - [52, 123]
      (code_span_delimiter [52, 85] - [52, 86])
      (code_span_content [52, 86] - [52, 122])
      (code_span_delimiter [52, 122] - [52, 123]))
    (text [52, 123] - [52, 131])
    (code_span [52, 131] - [54, 5]
      (code_span_delimiter [52, 131] - [52, 132])
      (code_span_content [52, 132] - [54, 4])
      (code_span_delimiter [54, 4] - [54, 5]))
    (text [54, 5] - [54, 12])
    (code_span [54, 12] - [56, 5]
      (code_span_delimiter [54, 12] - [54, 13])
      (code_span_content [54, 13] - [56, 4])
      (code_span_delimiter [56, 4] - [56, 5]))
    (ERROR [56, 5] - [56, 6]
      (inline_cell_delimiter [56, 5] - [56, 6]))
    (code_span [56, 6] - [61, 5]
      (code_span_delimiter [56, 6] - [56, 7])
      (code_span_content [56, 7] - [61, 4])
      (code_span_delimiter [61, 4] - [61, 5]))
    (ERROR [61, 5] - [61, 6]
      (inline_cell_delimiter [61, 5] - [61, 6]))
    (code_span [61, 6] - [63, 34]
      (code_span_delimiter [61, 6] - [61, 7])
      (code_span_content [61, 7] - [63, 33])
      (code_span_delimiter [63, 33] - [63, 34]))
    (text [63, 34] - [63, 43])
    (code_span [63, 43] - [71, 1]
      (code_span_delimiter [63, 43] - [63, 44])
      (code_span_content [63, 44] - [71, 0])
      (code_span_delimiter [71, 0] - [71, 1]))
    (ERROR [71, 1] - [71, 2]
      (inline_cell_delimiter [71, 1] - [71, 2]))
    (code_span [71, 2] - [81, 1]
      (code_span_delimiter [71, 2] - [71, 3])
      (code_span_content [71, 3] - [81, 0])
      (code_span_delimiter [81, 0] - [81, 1]))
    (ERROR [81, 1] - [81, 2]
      (inline_cell_delimiter [81, 1] - [81, 2]))
    (code_span [81, 2] - [87, 1]
      (code_span_delimiter [81, 2] - [81, 3])
      (code_span_content [81, 3] - [87, 0])
      (code_span_delimiter [87, 0] - [87, 1]))
    (ERROR [87, 1] - [87, 2]
      (inline_cell_delimiter [87, 1] - [87, 2]))
    (code_span [87, 2] - [97, 1]
      (code_span_delimiter [87, 2] - [87, 3])
      (code_span_content [87, 3] - [97, 0])
      (code_span_delimiter [97, 0] - [97, 1]))
    (ERROR [97, 1] - [97, 2]
      (inline_cell_delimiter [97, 1] - [97, 2]))
    (code_span [97, 2] - [114, 155]
      (code_span_delimiter [97, 2] - [97, 3])
      (code_span_content [97, 3] - [114, 154])
      (code_span_delimiter [114, 154] - [114, 155]))
    (text [114, 155] - [114, 163])
    (code_span [114, 163] - [116, 95]
      (code_span_delimiter [114, 163] - [114, 164])
      (code_span_content [114, 164] - [116, 94])
      (code_span_delimiter [116, 94] - [116, 95]))
    (text [116, 95] - [116, 108])
    (code_span [116, 108] - [116, 114]
      (code_span_delimiter [116, 108] - [116, 109])
      (code_span_content [116, 109] - [116, 113])
      (code_span_delimiter [116, 113] - [116, 114]))
    (text [116, 114] - [116, 128])
    (inline_cell_delimiter [116, 128] - [116, 129])
    (code_span_content [116, 129] - [116, 192])))
/var/folders/3d/zshzjtns18973ycph5dzclnh0000gp/T//quarto-web-corpus/docs/output-formats/html-accessibility.qmd	Parse:    0.26 ms	 13296 bytes/ms	(ERROR [8, 0] - [116, 192])

