# Fix Fenced Code Block Injection

## Why

Standard Markdown fenced code blocks (e.g., ` ```python`) are not receiving syntax highlighting in editors because the injection queries in `queries/injections.scm` set the injection language but don't capture the code content to highlight.

The current patterns only tell tree-sitter "this is Python" but don't tell it **what content** to apply Python highlighting to. This breaks a core feature that affects basic Markdown code block highlighting across all languages and all editors using this grammar.

## What Changes

- Add `(code_line) @injection.content` capture to all fenced_code_block injection patterns in `queries/injections.scm`
- Add `(#set! injection.combined)` directive to treat multiple code_line nodes as one document
- Update approximately 15 language patterns: Python, R, Julia, JavaScript, TypeScript, Bash, SQL, JSON, YAML, TOML, HTML, CSS, Markdown

**Pattern transformation:**
```scheme
# Before (broken)
((fenced_code_block
  info: (info_string) @_lang
  (#eq? @_lang "python"))
 (#set! injection.language "python"))

# After (working)
((fenced_code_block
  info: (info_string) @_lang
  (#eq? @_lang "python")
  (code_line) @injection.content)
 (#set! injection.language "python")
 (#set! injection.combined))
```

## Impact

- **Affected specs:** language-injection
- **Affected files:** queries/injections.scm (lines 147-237)
- **Fixes:** GitHub issue #7
- **Breaking:** No - purely additive fix that restores expected behavior
- **Editor impact:** Enables syntax highlighting in all editors (Zed, Neovim, Helix, etc.)
