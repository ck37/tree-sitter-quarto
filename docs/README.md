# Documentation

## Current Documentation

The files in this directory represent current, authoritative documentation for the tree-sitter-quarto parser. These documents are actively maintained and referenced by README.md, CLAUDE.md, and project specifications.

**Essential Reference Documents:**

- **plan.md** - Comprehensive implementation plan and architecture decisions
- **todo.md** - Implementation checklist and task tracking
- **reference-documentation.md** - Quick reference for tree-sitter, Quarto, and Zed
- **editor-integration.md** - Guide for editor extension developers (Zed, Neovim, Helix)
- **comparison.md** - Parser ecosystem comparison and positioning
- **visual-comparison.md** - AST output examples comparing parsers
- **validation.md** - Real-world corpus validation methodology and results
- **benchmarks.md** - Performance characteristics and benchmarking infrastructure

**Known Limitations:**

- **generic-fenced-div-limitation.md** - Technical explanation of accepted architectural constraint
- **inline-attributes-known-issues.md** - Known cosmetic ERROR node issue
- **zed-compatibility-resolution.md** - Tree-sitter CLI version management and troubleshooting

## Historical Documentation

The `archive/` directory contains point-in-time snapshots, completed investigations, and superseded planning documents. These files preserve development history and research but are not actively maintained.

**Archive Organization:**

- **sessions/** - Development session records and notes
- **validation/** - Historical corpus validation results
- **performance/** - Performance investigation snapshots
- **features/** - Completed feature research and implementation notes
- **releases/** - Historical release planning documents
- **comparisons/** - Parser comparison research
- **design-notes/** - Design decisions and lessons learned
- **wasm/** - WASM build setup and test results (now in CLAUDE.md)

Historical documents remain accessible for research and context but should not be considered authoritative for current implementation status.
