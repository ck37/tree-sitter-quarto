# Design: Editor Compatibility Strategy

## Context

Tree-sitter grammars provide syntax highlighting through query files that use scope names (like `@markup.heading`, `@text.title`). Different editors support different scope naming conventions:

- **nvim-treesitter**: Modern scopes (`@markup.*`, `@punctuation.delimiter`)
- **Zed**: Legacy scopes (`@text.*`, `@emphasis.strong`)
- **Helix**: Supports both modern and legacy
- **VSCode**: Varies by theme

The original project philosophy assumed:
1. Grammars use modern scopes as the "standard"
2. Editor extensions remap scopes for their specific needs
3. One canonical `queries/highlights.scm` for all editors

## Problem

Zed's architecture **prevents scope remapping** at the extension level when grammars are loaded via repository reference:

```toml
[grammars.quarto]
repository = "https://github.com/ck37/tree-sitter-quarto"
rev = "c9f444e..."
```

When configured this way, Zed:
1. Clones the grammar repository
2. Loads `queries/highlights.scm` directly from the grammar
3. **Ignores** any query files provided by the extension
4. **Does not** remap scope names

The extension **cannot** override or supplement the grammar's queries. This is a fundamental architectural limitation in Zed v0.160.7.

## Alternatives Considered

### Alternative 1: Keep Modern Scopes (Status Quo)
**Approach:** Maintain current nvim-treesitter scopes in `queries/highlights.scm`

**Pros:**
- Aligns with tree-sitter community conventions
- Works great for Neovim users
- Theoretically "editor-agnostic"

**Cons:**
- ❌ **Completely breaks Zed** - no syntax highlighting at all
- ❌ Blocks zed-quarto-extension from being usable
- ❌ "Editor-agnostic" is theoretical, not practical

**Verdict:** Rejected. Zed support is a blocker, not a nice-to-have.

### Alternative 2: Bundle Compiled Parser in Zed Extension
**Approach:** Compile parser and include queries in extension, don't reference grammar repo

**Pros:**
- Extension has full control over queries
- Can use modern scopes with custom remapping

**Cons:**
- ❌ Massive extension size (~1MB+ for compiled parser)
- ❌ Duplicates grammar code
- ❌ Requires rebuilding extension on every grammar update
- ❌ Breaks Zed's grammar distribution model

**Verdict:** Rejected. Violates Zed's architecture and creates maintenance burden.

### Alternative 3: Use Zed-Compatible Scopes as Default ✅
**Approach:** Make `queries/highlights.scm` use legacy scopes, preserve modern scopes in `queries/nvim/`

**Pros:**
- ✅ Zed works out of the box
- ✅ Preserves modern scopes for nvim users
- ✅ Minimal disruption (legacy scopes widely supported)
- ✅ Pragmatic solution to architectural constraint

**Cons:**
- Conflicts with original "editor-agnostic" philosophy
- Neovim users may need to configure custom query path (minor)
- Reverses community trend toward modern scopes

**Verdict:** **Accepted**. Pragmatism over purity.

## Decision

**Use Zed-compatible legacy scopes in the default `queries/highlights.scm`.**

### Rationale

1. **Zed support is a blocker** - Without this change, tree-sitter-quarto cannot be used in Zed at all
2. **Zed's limitation is architectural** - Not a temporary bug, but a design choice we must accommodate
3. **Legacy scopes are widely supported** - Helix, VSCode, and older editors handle them fine
4. **Preservation for nvim users** - Modern scopes preserved in `queries/nvim/highlights.scm`
5. **Tree-sitter allows editor-specific dirs** - `queries/zed/`, `queries/nvim/`, `queries/helix/` are standard practice

### Implementation Strategy

**Phase 1: Preserve Original**
```bash
mkdir -p queries/nvim
cp queries/highlights.scm queries/nvim/highlights.scm
git add queries/nvim/highlights.scm
```

**Phase 2: Replace Default**
```bash
cp queries/zed/highlights.scm queries/highlights.scm
git add queries/highlights.scm
```

**Phase 3: Update Documentation**
- Revise `openspec/project.md` scope naming philosophy
- Document Neovim users can use `queries/nvim/highlights.scm`
- Add note about Zed architectural limitation

**Phase 4: Clean Up (Optional)**
```bash
rm -rf queries/zed/
# No longer needed since Zed scopes are now default
```

## Risks & Mitigations

### Risk: Breaking Neovim Users
**Mitigation:**
- Test nvim-treesitter behavior with legacy scopes
- If nvim-treesitter handles legacy scopes gracefully, no action needed
- If not, document configuration to use `queries/nvim/highlights.scm`
- Consider creating nvim-treesitter PR to support legacy scope fallback

### Risk: Reverting Community Trend
**Mitigation:**
- Document this as a pragmatic exception, not a precedent
- If Zed adds scope remapping support in future, we can revert
- Other grammars may face same issue and follow suit

### Risk: Confusing for Contributors
**Mitigation:**
- Clear documentation in `queries/highlights.scm` header
- OpenSpec spec documenting the decision
- README.md explaining query file structure

## Open Questions

1. **Does nvim-treesitter gracefully handle legacy scopes?**
   - Test: Load grammar in Neovim with legacy scopes
   - If yes: No additional config needed
   - If no: Document custom query path setup

2. **Will Zed add scope remapping in future?**
   - Monitor: https://github.com/zed-industries/zed/issues
   - If yes: Plan migration path back to modern scopes

3. **Should we keep `queries/zed/` directory?**
   - After migration: Redundant (default is now Zed-compatible)
   - Decision: Remove to avoid confusion

## Success Criteria

- [ ] Grammar test suite passes (no regression)
- [ ] Modern scopes preserved in `queries/nvim/highlights.scm`
- [ ] Default `queries/highlights.scm` uses Zed-compatible legacy scopes
- [ ] Documentation clearly explains scope naming decision
- [ ] zed-quarto-extension project confirms proper highlighting in Zed (delegated to extension team)
