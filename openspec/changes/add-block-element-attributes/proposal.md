# Proposal: Add Block Element Attributes

**STATUS:** DEFERRED TO v0.2.0
**REASON:** Requires external C/C++ scanner implementation
**BLOCKED BY:** Parser ambiguity in optional trailing syntax (see `docs/block-attributes-research-conclusion.md`)

---

## Why

Real-world Quarto documents frequently use Pandoc's attribute syntax on headings and code blocks, but the parser currently does not support this, causing ERROR nodes and a 67% validation failure rate on the quarto-web corpus.

Common failing patterns:
- Headings with Reveal.js attributes: `## Slide {auto-animate=true auto-animate-easing="..."}`
- Code blocks with display attributes: `` ```{.bash filename="Terminal"} ``
- Code blocks with raw format: `` ```{=html} ``

These are standard Pandoc Markdown features that Quarto relies on.

## What Changes

1. **Add attribute support to ATX headings** - Parse `# Heading {attributes}` syntax
2. **Add attribute support to fenced code blocks** - Parse `` ```language {attributes} `` syntax
3. **Reuse existing `attribute_list` grammar** - Already supports `#id`, `.class`, and `key=value`

**BREAKING**: None - this is purely additive, extending existing block elements.

## Impact

- **Affected specs:**
  - `grammar-foundation` - ATX heading grammar modification
  - New spec: `block-attributes` - Attribute syntax for headings and code blocks

- **Affected code:**
  - `grammar.js` - `atx_heading` and `fenced_code_block` rules
  - `test/corpus/headings.txt` - Add heading attribute tests
  - `test/corpus/code-blocks.txt` - Add code block attribute tests
  - `queries/highlights.scm` - Highlight attributes on headings/code blocks

- **Expected validation improvement:** From 5% to 60%+ success rate on quarto-web corpus (fixes 67% of failures)
