# Tree-sitter Query Files

This directory contains tree-sitter query files for syntax highlighting and other editor features.

## Structure

### Default Queries (`queries/`)

- **highlights.scm** - Uses Zed-compatible legacy scope conventions (`@text.*`, `@emphasis.strong`)
  - **Default for broad editor compatibility**, especially Zed editor
  - Pragmatic choice due to Zed's architectural limitation (cannot override queries in extensions)
  - Works with Zed, Helix, VSCode, and older editors
  - See issue #5 for architectural reasoning

- **injections.scm** - Language injection queries for embedded code blocks
- **folds.scm** - Code folding patterns
- **indents.scm** - Smart indentation rules
- **locals.scm** - Variable scoping for code intelligence

### Neovim-Specific Queries (`queries/nvim/`)

- **highlights.scm** - Uses modern nvim-treesitter scope conventions (`@markup.*`)
  - For Neovim users who prefer standard tree-sitter community conventions
  - Neovim users can configure nvim-treesitter to use this file
  - Future-proof as more editors adopt nvim-treesitter standards

### Why Legacy Scopes as Default?

Zed editor's architecture prevents extensions from overriding grammar queries when grammars are loaded via repository reference. This means:
1. Zed clones the grammar and loads `queries/highlights.scm` directly
2. Extensions cannot provide alternative query files
3. No scope remapping is possible at the extension level

Since Zed support is critical for the zed-quarto-extension project, we make Zed-compatible scopes the default. Modern scopes are preserved in `queries/nvim/` for users who prefer them.

## Scope Naming Conventions

### Legacy (Zed-compatible) - DEFAULT

Used in `queries/highlights.scm`:

| Construct | Legacy Scope | Modern Equivalent |
|-----------|-------------|-------------------|
| Headings | `@text.title` | `@markup.heading` |
| Italic | `@text.emphasis` | `@markup.italic` |
| Bold | `@emphasis.strong` | `@markup.bold` |
| Code (any) | `@text.literal` | `@markup.raw.inline` / `@markup.raw.block` |
| Link text | `@text.reference` | `@markup.link.label` |
| Link URL | `@text.uri` | `@markup.link.url` |
| Block quotes | `@comment` | `@markup.quote` |
| List markers | `@punctuation.special` | `@markup.list.marker` |
| Math (any) | `@string` | `@markup.math.inline` / `@markup.math.block` |

### Modern (nvim-treesitter)

Used in `queries/nvim/highlights.scm` - see table above for mapping.

## References

- [nvim-treesitter scope naming](https://github.com/nvim-treesitter/nvim-treesitter/blob/master/CONTRIBUTING.md#parser-configurations)
- [Zed architectural limitation (issue #5)](https://github.com/ck37/tree-sitter-quarto/issues/5)
- [tree-sitter query syntax](https://tree-sitter.github.io/tree-sitter/syntax-highlighting#queries)

## Maintenance

When updating syntax highlighting:

1. Update `queries/highlights.scm` with legacy scopes (Zed-compatible)
2. Update `queries/nvim/highlights.scm` with corresponding modern scopes
3. Keep both files structurally identical except for scope names
4. Run `npx tree-sitter test` to verify queries are valid

## Future Migration Path

If Zed adds support for extension-level query overrides OR adopts nvim-treesitter scope conventions:
1. We can revert to modern scopes as default in `queries/highlights.scm`
2. Provide legacy scopes in `queries/zed/highlights.scm` for backward compatibility
3. Eventually deprecate legacy scopes once Zed fully supports modern conventions
