# Use Zed-Compatible Scopes in Default Highlights

## Why

**Issue:** https://github.com/ck37/tree-sitter-quarto/issues/5

The current `queries/highlights.scm` uses modern nvim-treesitter scope naming conventions (`@markup.*`, `@punctuation.delimiter`, etc.), which are **not supported by Zed editor**. Zed's themes only recognize legacy scope names:
- `@text.title` (not `@markup.heading`)
- `@emphasis.strong` (not `@markup.bold`)
- `@text.literal` (not `@markup.raw.inline`)
- `@text.emphasis` (not `@markup.italic`)

While we have `queries/zed/highlights.scm` with Zed-compatible scopes, **Zed extensions cannot override the grammar's default queries**. When an extension references a grammar via `repository` + `rev` in `extension.toml`, Zed clones the grammar and loads `queries/highlights.scm` directly, ignoring any extension-provided query files.

This architectural limitation in Zed makes tree-sitter-quarto unusable in Zed until the default queries use Zed-compatible scopes.

## Conflict with Current Philosophy

This change **conflicts** with the current project philosophy stated in `openspec/project.md`:

> **Scope Naming Philosophy:**
> - Use **standard tree-sitter scopes** (`@markup.*`, `@function`, `@property`)
> - Remain editor-agnostic - same grammar works in Neovim, Helix, VSCode, Zed
> - Editor extensions handle scope remapping
> - Single source of truth: one `queries/highlights.scm` for all editors

**The reality:** Zed's architecture does not support scope remapping in extensions when grammars are loaded via repository reference. The "editor-agnostic" ideal is not achievable given Zed's current limitations.

## What Changes

Replace `queries/highlights.scm` with Zed-compatible legacy scopes while preserving nvim-treesitter scopes for Neovim users:

1. **Copy Zed scopes to default**: `cp queries/zed/highlights.scm queries/highlights.scm`
2. **Preserve nvim scopes**: `mv queries/highlights.scm queries/nvim/highlights.scm` (before replacement)
3. **Update documentation**: Revise scope naming philosophy in `openspec/project.md`

### Scope Mappings

Legacy (Zed) → Modern (nvim-treesitter):
- `@text.title` → `@markup.heading`
- `@text.emphasis` → `@markup.italic`
- `@emphasis.strong` → `@markup.bold`
- `@text.literal` → `@markup.raw.inline` / `@markup.raw.block`
- `@text.reference` → `@markup.link.label`
- `@text.uri` → `@markup.link.url`
- `@comment` (block quotes) → `@markup.quote`
- `@punctuation.special` (lists) → `@markup.list.marker`
- `@string` (math) → `@markup.math.inline` / `@markup.math.block`

## Impact

### Affected Files
- `queries/highlights.scm` - **BREAKING**: Replaced with Zed-compatible scopes
- `queries/nvim/highlights.scm` - **NEW**: Preserved original nvim-treesitter scopes
- `openspec/project.md` - Updated scope naming philosophy

### Affected Specs
- **NEW**: `syntax-highlighting` - Documents query file requirements and editor compatibility

### Editor Compatibility

**After this change:**
- ✅ **Zed**: Works out of the box with proper highlighting
- ✅ **Neovim**: Users can reference `queries/nvim/highlights.scm` if they prefer modern scopes
- ✅ **Helix**: Should work with legacy scopes (supports both)
- ✅ **VSCode**: Should work with legacy scopes

**Trade-off:** Prioritize Zed compatibility (blocking issue) over theoretical editor-agnostic purity (not achievable in practice).

### Breaking Changes

**Potential impact on Neovim users:**
- If nvim-treesitter loads the default `queries/highlights.scm`, they'll see legacy scopes
- Mitigation: Neovim users can configure their setup to use `queries/nvim/highlights.scm`
- Alternative: nvim-treesitter may already handle legacy scopes gracefully

### Non-Breaking
- Grammar remains unchanged
- AST structure unchanged
- All tests continue to pass
- Only query file scopes affected
