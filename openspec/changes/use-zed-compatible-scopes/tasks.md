# Implementation Tasks

## 1. Preserve Original Scopes
- [ ] 1.1 Create `queries/nvim/` directory
- [ ] 1.2 Copy current `queries/highlights.scm` to `queries/nvim/highlights.scm`
- [ ] 1.3 Add header comment documenting this is for nvim-treesitter users
- [ ] 1.4 Git add `queries/nvim/highlights.scm`

## 2. Replace Default with Zed Scopes
- [ ] 2.1 Copy `queries/zed/highlights.scm` to `queries/highlights.scm` (overwrite)
- [ ] 2.2 Update header comment to indicate these are now default scopes
- [ ] 2.3 Git add modified `queries/highlights.scm`

## 3. Clean Up Redundant Files
- [ ] 3.1 Remove `queries/zed/` directory (no longer needed)
- [ ] 3.2 Git rm -r `queries/zed/`

## 4. Update Documentation
- [ ] 4.1 Update `openspec/project.md` scope naming philosophy section
- [ ] 4.2 Document Zed architectural limitation as reason for change
- [ ] 4.3 Note nvim users can use `queries/nvim/highlights.scm`
- [ ] 4.4 Update `queries/README.md` explaining query file structure

## 5. Testing & Validation
- [ ] 5.1 Verify grammar tests still pass (no regression)
- [ ] 5.2 Commit and push changes
- [ ] 5.3 Zed testing delegated to zed-quarto-extension project
- [ ] 5.4 Extension team will verify all Quarto features highlight correctly in Zed
- [ ] 5.5 Extension team will test executable cells, chunk options, cross-references

## 6. Documentation & Communication
- [ ] 6.1 Update issue #5 with implementation details and new commit hash
- [ ] 6.2 Notify zed-quarto-extension project of update
- [ ] 6.3 Close issue #5 after zed-quarto-extension confirms it works
