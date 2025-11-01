---
name: l-docs-organize-historical-docs
branch: feature/docs-organize-historical-docs
status: pending
created: 2025-11-01
---

# Organize Historical Documentation

## Problem/Goal

The `docs/` directory contains 36 files, mixing essential evergreen reference documentation with historical point-in-time documents (session notes, validation results, performance investigations, and completed research). This makes it difficult to:

- Find current, authoritative documentation
- Understand which documents are still relevant
- Navigate the docs directory efficiently
- Distinguish between reference material and historical records

**Goal**: Reorganize documentation to separate evergreen reference docs (keep in `docs/`) from historical/point-in-time documents (move to `docs/archive/` with logical subdirectories).

## Success Criteria
- [ ] Archive structure created with subdirectories (sessions/, validation/, performance/, features/, releases/, comparisons/, design-notes/, planning/, wasm/)
- [ ] 23 historical documents moved to appropriate archive locations
- [ ] 11 essential reference documents remain in `docs/` root
- [ ] Cross-references updated in any docs that reference moved files
- [ ] README or CLAUDE.md updated if they reference moved files
- [ ] Git commit created documenting the reorganization

## Context Manifest

### How the Documentation Directory Currently Works

The `docs/` directory contains 35 markdown files (totaling ~275KB) that have accumulated during the project's development from October 13-21, 2025. The directory mixes essential evergreen reference documentation with point-in-time historical documents, making navigation difficult and obscuring which documents represent current authoritative information.

**Current Structure - No Organization:**

All 35 files sit in the flat `docs/` root with no subdirectories. Files range from 3.2KB to 23KB. The naming conventions reveal their nature:
- Dated files: `*-2025-10-17.md`, `*-2025-10-18.md` clearly indicate point-in-time snapshots
- Session files: `session-summary-*.md`, `*-session-notes.md` are development session records
- Status files: `implementation-status.md`, `v0.1.0-release-readiness.md` represent historical planning
- Feature-specific investigation files: `block-attributes-*.md`, `inline-attributes-*.md` are completed research

**Essential Evergreen Documents (11 files - KEEP in docs/ root):**

These documents are actively referenced by README.md, CLAUDE.md, and represent current authoritative information:

1. **plan.md** (23KB) - Comprehensive implementation plan, architecture decisions, currently referenced status
   - Referenced by: README.md badge, CLAUDE.md line 165, CONTRIBUTING.md
   - Last updated: 2025-10-17
   - Why keep: Single source of truth for project architecture and roadmap

2. **todo.md** (11KB) - Implementation checklist with 145/145 tests passing status
   - Referenced by: CLAUDE.md line 174
   - Last updated: 2025-10-17
   - Why keep: Active task tracking for remaining work

3. **reference-documentation.md** (9KB) - Tree-sitter, Quarto, Zed documentation excerpts
   - Referenced by: Development workflows
   - Why keep: Quick reference for grammar development

4. **editor-integration.md** (8.6KB) - Guide for editor extension developers
   - Referenced by: README.md line 113
   - Why keep: Active integration guidance for Zed/Neovim/Helix

5. **comparison.md** (21KB) - Parser ecosystem comparison (tree-sitter-quarto vs alternatives)
   - Referenced by: README.md line 55, CONTRIBUTING.md
   - Why keep: Helps users understand positioning vs official Quarto grammars

6. **visual-comparison.md** (8.4KB) - AST output examples comparing parsers
   - Referenced by: CLAUDE.md line 176
   - Why keep: Visual demonstration of parser capabilities

7. **generic-fenced-div-limitation.md** (6.6KB) - Technical explanation of known limitation
   - Referenced by: README.md line 46
   - Why keep: Documents accepted architectural constraint

8. **inline-attributes-known-issues.md** (5.3KB) - Known cosmetic ERROR node issue
   - Referenced by: README.md line 47
   - Why keep: Documents known limitation for users

9. **zed-compatibility-resolution.md** (5.2KB) - Tree-sitter CLI version management
   - Referenced by: CLAUDE.md line 93, OpenSpec specs
   - Why keep: Critical troubleshooting guide for build issues

10. **validation.md** (7.4KB) - Real-world corpus validation methodology and results
    - Referenced by: OpenSpec performance spec
    - Why keep: Current validation status and methodology

11. **benchmarks.md** (6.7KB) - Performance characteristics and benchmarking infrastructure
    - Referenced by: OpenSpec performance spec
    - Why keep: Performance documentation for optimization work

**Historical Documents to Archive (23 files - MOVE to docs/archive/):**

These represent point-in-time snapshots, completed investigations, or superseded planning documents:

**Session Notes (3 files) → archive/sessions/**
- `session-summary-2025-10-17.md` (11KB) - Development session record
- `binding-fix-session-notes.md` (5.4KB) - Specific bug fix session
- Block attributes investigation (dated 2025-10-18, research complete)

**Validation Results (4 files) → archive/validation/**
- `validation-findings-2025-10-17.md` (10KB) - Snapshot of corpus testing
- `quarto-gallery-validation.md` (10KB) - Gallery corpus validation
- `quarto-web-test-results.md` (9.1KB) - Quarto-web corpus results
- Note: These are historical; current validation is in `validation.md`

**Performance Investigations (3 files) → archive/performance/**
- `performance-test-analysis-2025-10-18.md` (4.3KB) - Point-in-time analysis
- `throughput-investigation-2025-10-18.md` (4.5KB) - Specific investigation
- `benchmarking-implementation-status.md` (7KB) - Implementation progress snapshot

**Feature Research (6 files) → archive/features/**
- `block-attributes-findings-2025-10-18.md` (10KB) - Research findings
- `block-attributes-research-conclusion.md` (8.6KB) - Final conclusion
- `block-attributes-resume.md` (12KB) - Session resume document
- `inline-attributes-implementation-challenges.md` (12KB) - Implementation notes
- `missing-features-analysis.md` (10KB) - Feature gap analysis (snapshot)
- All represent completed research or superseded by current implementation

**Release Planning (2 files) → archive/releases/**
- `v0.1.0-release-readiness.md` (10KB) - Pre-release checklist (historical)
- `implementation-status.md` (5.8KB) - Superseded by current status in plan.md

**Parser Comparisons (2 files) → archive/comparisons/**
- `relationship-to-quarto-markdown.md` (5.4KB) - Historical relationship doc (now in comparison.md)
- `comparison-with-zed-extension-plan.md` (8.8KB) - Zed extension planning comparison

**Design Notes (2 files) → archive/design-notes/**
- `grammar-language-choice.md` (6.3KB) - Historical design decision
- `lessons-from-pandoc-markdown.md` (9.5KB) - Lessons learned during development

**Planning Documents (1 file) → archive/planning/**
- Note: `plan.md` and `todo.md` stay in root as they're living documents

**WASM Build (3 files) → archive/wasm/**
- `wasm-build.md` (7.5KB) - Build instructions (now in CLAUDE.md build system section)
- `wasm-setup.md` (3.2KB) - Setup instructions (now documented in CONTRIBUTING.md)
- `wasm-parser-test-results.md` (3.4KB) - Historical test results

**Recent Comparisons (1 file) → archive/comparisons/**
- `yaml-comparison.md` (8.6KB) - YAML parser comparison (completed Oct 21, 2025)

### Cross-Reference Mapping

**External References TO docs/ (files that link INTO the docs directory):**

From **README.md**:
- Line 8: `./docs/plan.md` (status badge)
- Line 46: `./docs/generic-fenced-div-limitation.md` (known limitation)
- Line 47: `./docs/inline-attributes-known-issues.md` (known limitation)
- Line 49: `./docs/plan.md` (complete limitations list)
- Line 55: `./docs/comparison.md` (architecture comparison)
- Line 113: `./docs/editor-integration.md` (integration guide)

From **CLAUDE.md**:
- Line 93: `docs/zed-compatibility-resolution.md` (CLI troubleshooting)
- Line 165: `docs/plan.md` (implementation roadmap)
- Line 173: `docs/plan.md` (architecture)
- Line 174: `docs/todo.md` (task checklist)
- Line 176: `docs/visual-comparison.md` (parser comparison)

From **CONTRIBUTING.md**:
- Line 173: `./docs/plan.md` (architecture details)
- Line 255: `docs/plan.md` (architecture changes)
- Line 257: `docs/editor-integration.md` (integration changes)
- Line 262: `docs/plan.md` (implementation history)
- Line 263: `docs/editor-integration.md` (editor integration guide)
- Line 264: `docs/comparison.md` (parser comparisons)

From **OpenSpec specifications**:
- Multiple specs reference `docs/validation.md`
- Multiple specs reference `docs/benchmarks.md`
- Parser build system spec references `docs/zed-compatibility-resolution.md`

**Internal Cross-References WITHIN docs/ (docs linking to other docs):**

Very few internal cross-references exist:
- `block-attributes-research-conclusion.md` → `docs/block-attributes-resume.md`
- `block-attributes-findings-2025-10-18.md` → `docs/block-attributes-resume.md`
- `grammar-language-choice.md` → `./comparison.md`
- Most files are self-contained

**Critical Finding:** Only **11 files** are referenced by external documentation. The other **24 files** are not linked from anywhere outside the docs/ directory, confirming they are historical/archival material.

### Archive Directory Structure to Create

```
docs/
├── plan.md                              [KEEP - living architecture doc]
├── todo.md                              [KEEP - living task list]
├── reference-documentation.md           [KEEP - quick reference]
├── editor-integration.md                [KEEP - active integration guide]
├── comparison.md                        [KEEP - parser positioning]
├── visual-comparison.md                 [KEEP - AST examples]
├── generic-fenced-div-limitation.md     [KEEP - documented limitation]
├── inline-attributes-known-issues.md    [KEEP - documented limitation]
├── zed-compatibility-resolution.md      [KEEP - build troubleshooting]
├── validation.md                        [KEEP - current validation]
├── benchmarks.md                        [KEEP - current performance]
└── archive/
    ├── sessions/
    │   ├── session-summary-2025-10-17.md
    │   └── binding-fix-session-notes.md
    ├── validation/
    │   ├── validation-findings-2025-10-17.md
    │   ├── quarto-gallery-validation.md
    │   └── quarto-web-test-results.md
    ├── performance/
    │   ├── performance-test-analysis-2025-10-18.md
    │   ├── throughput-investigation-2025-10-18.md
    │   └── benchmarking-implementation-status.md
    ├── features/
    │   ├── block-attributes-findings-2025-10-18.md
    │   ├── block-attributes-research-conclusion.md
    │   ├── block-attributes-resume.md
    │   ├── inline-attributes-implementation-challenges.md
    │   └── missing-features-analysis.md
    ├── releases/
    │   ├── v0.1.0-release-readiness.md
    │   └── implementation-status.md
    ├── comparisons/
    │   ├── relationship-to-quarto-markdown.md
    │   ├── comparison-with-zed-extension-plan.md
    │   └── yaml-comparison.md
    ├── design-notes/
    │   ├── grammar-language-choice.md
    │   └── lessons-from-pandoc-markdown.md
    └── wasm/
        ├── wasm-build.md
        ├── wasm-setup.md
        └── wasm-parser-test-results.md
```

### Files to Move with Destinations

**23 files to move:**

1. `session-summary-2025-10-17.md` → `archive/sessions/`
2. `binding-fix-session-notes.md` → `archive/sessions/`
3. `validation-findings-2025-10-17.md` → `archive/validation/`
4. `quarto-gallery-validation.md` → `archive/validation/`
5. `quarto-web-test-results.md` → `archive/validation/`
6. `performance-test-analysis-2025-10-18.md` → `archive/performance/`
7. `throughput-investigation-2025-10-18.md` → `archive/performance/`
8. `benchmarking-implementation-status.md` → `archive/performance/`
9. `block-attributes-findings-2025-10-18.md` → `archive/features/`
10. `block-attributes-research-conclusion.md` → `archive/features/`
11. `block-attributes-resume.md` → `archive/features/`
12. `inline-attributes-implementation-challenges.md` → `archive/features/`
13. `missing-features-analysis.md` → `archive/features/`
14. `v0.1.0-release-readiness.md` → `archive/releases/`
15. `implementation-status.md` → `archive/releases/`
16. `relationship-to-quarto-markdown.md` → `archive/comparisons/`
17. `comparison-with-zed-extension-plan.md` → `archive/comparisons/`
18. `yaml-comparison.md` → `archive/comparisons/`
19. `grammar-language-choice.md` → `archive/design-notes/`
20. `lessons-from-pandoc-markdown.md` → `archive/design-notes/`
21. `wasm-build.md` → `archive/wasm/`
22. `wasm-setup.md` → `archive/wasm/`
23. `wasm-parser-test-results.md` → `archive/wasm/`

### Implementation Considerations

**No External Reference Updates Needed:**

Critical finding: The 23 files being moved are **not referenced by any files outside docs/**. All external references (from README.md, CLAUDE.md, CONTRIBUTING.md, OpenSpec) point to the 11 files staying in docs/ root. This means:
- No updates needed to README.md
- No updates needed to CLAUDE.md
- No updates needed to CONTRIBUTING.md
- No updates needed to OpenSpec specifications

**Internal Cross-Reference Updates Needed:**

Minimal updates needed within moved files:
- `block-attributes-findings-2025-10-18.md` references `docs/block-attributes-resume.md` (line 4, 165, 267, 315, 327)
  - Update to: `archive/features/block-attributes-resume.md`
- `block-attributes-research-conclusion.md` references `docs/block-attributes-resume.md` (line 284)
  - Update to: `archive/features/block-attributes-resume.md`

**Archive Directory Benefits:**

1. **Discoverability**: Essential docs are immediately visible in docs/ root (11 files vs 35)
2. **Context preservation**: Historical docs remain accessible with organizational context
3. **Historical research**: Archive preserves development history for future reference
4. **Clean navigation**: Users find authoritative docs without wading through historical snapshots

**Git History Preservation:**

Using `git mv` will preserve file history, making it easy to trace the evolution of archived documents.

**README Addition:**

Add a note to docs/README.md (if it doesn't exist, create it):
```markdown
# Documentation

## Current Documentation
- See files in this directory for current, authoritative documentation
- Referenced by README.md, CLAUDE.md, and project specifications

## Historical Documentation
- See `archive/` subdirectories for point-in-time snapshots
- Organized by category: sessions, validation, performance, features, releases, comparisons, design-notes, wasm
- Preserved for historical reference and research
```

### Potential Issues and Mitigations

**Issue 1: Internal documentation links breaking**
- **Mitigation**: Only 2 files have internal cross-references, both easily updated

**Issue 2: Developer muscle memory**
- **Mitigation**: Archive organization is intuitive (sessions/, validation/, etc.)

**Issue 3: Lost context for new contributors**
- **Mitigation**: Archive preserves history; README.md explains organization

**Issue 4: Git blame history**
- **Mitigation**: Using `git mv` preserves full history

**Issue 5: OpenSpec archived changes referencing docs/**
- **Impact**: Low - archived OpenSpec changes already reference historical docs
- **Mitigation**: No action needed; archived specs can reference archived docs

**Issue 6: Accidentally archiving active documentation**
- **Mitigation**: Double-checked against external references; only unreferenced files moved

## User Notes
<!-- Any specific notes or requirements from the developer -->

## Work Log
<!-- Updated as work progresses -->
- [YYYY-MM-DD] Started task, initial research
