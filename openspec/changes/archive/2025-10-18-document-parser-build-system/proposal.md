# Proposal: Document Parser Build System

**STATUS:** DRAFT

---

## Why

The parser build system is critical infrastructure but lacks formal documentation and specification. Key build processes—parser generation, version management, and build configuration—exist only in scattered documentation (CLAUDE.md, docs/zed-compatibility-resolution.md) and are not captured in the OpenSpec framework.

**Current gaps:**
- No specification for parser generation workflow
- tree-sitter CLI version requirements undocumented in spec format
- Build system configuration (binding.gyp, tree-sitter.json) lacks formal requirements
- Critical constraints ("never manually edit parser.c") exist only in prose documentation
- WASM build process not spec'd despite being production-ready
- Node.js binding build process implicit in package.json but not spec'd

**Real-world impact:**
- Contributors must read multiple markdown files to understand build system
- Risk of breaking parser.c through manual edits (happened during Zed compatibility fix)
- CLI version mismatches cause subtle breakage
- No single source of truth for build requirements
- Editor integration teams lack clear build system documentation

## What Changes

1. **Create new spec: `parser-build-system`**
   - Parser generation process and workflow
   - tree-sitter CLI version management
   - Build configuration requirements
   - Build targets (Node.js, WASM)
   - Version compatibility constraints

**BREAKING**: None - this is documentation-only, codifying existing practices.

## Impact

- **New spec created:**
  - `parser-build-system` - Complete build system documentation

- **No code changes** - This proposal documents existing implementation

- **Documentation consolidation:**
  - Formal spec replaces scattered build guidance
  - Single source of truth for build requirements
  - Clear constraints on parser.c modification

- **Benefits:**
  - Contributors understand build system through spec
  - Prevents common mistakes (manual parser.c edits)
  - Editor integration teams have clear build docs
  - CI/CD configuration has spec to reference
