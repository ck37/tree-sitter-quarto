# Implementation Tasks

## 1. Corpus Collection

- [ ] 1.1 Identify Quarto Gallery example sources
  - [ ] Official Gallery: https://quarto.org/docs/gallery/
  - [ ] GitHub repos linked from Gallery
  - [ ] Quarto Awesome list examples
- [ ] 1.2 Clone/download example repositories
- [ ] 1.3 Organize into test corpus directory structure
- [ ] 1.4 Document corpus organization and contents
- [ ] 1.5 Add corpus location to .gitignore (don't commit external code)

## 2. Test Script Development

- [ ] 2.1 Create automated test script (bash or Node.js)
- [ ] 2.2 Script finds all .qmd files in corpus
- [ ] 2.3 Script parses each file with tree-sitter
- [ ] 2.4 Script counts ERROR nodes
- [ ] 2.5 Script categorizes documents by type (if possible)
- [ ] 2.6 Script generates statistics and report

## 3. Initial Validation Run

- [ ] 3.1 Run test script against full corpus
- [ ] 3.2 Collect overall statistics:
  - [ ] Total .qmd files tested
  - [ ] Files without parse errors
  - [ ] Files with errors
  - [ ] Total ERROR nodes
  - [ ] Average errors per failing file
- [ ] 3.3 Compare to quarto-web baseline (16.5%)
- [ ] 3.4 Calculate success rate by document type

## 4. Error Analysis

- [ ] 4.1 Identify top 10 files with most errors
- [ ] 4.2 Manually review error patterns
- [ ] 4.3 Categorize errors by type:
  - [ ] Pipe table issues
  - [ ] Nested constructs
  - [ ] YAML front matter
  - [ ] Unknown patterns
- [ ] 4.4 Calculate error frequency by category
- [ ] 4.5 Identify actionable issues vs edge cases

## 5. Detailed Reporting

- [ ] 5.1 Create docs/quarto-gallery-validation.md
- [ ] 5.2 Document methodology
- [ ] 5.3 Present statistics with tables
- [ ] 5.4 Include error pattern analysis
- [ ] 5.5 Compare gallery results to quarto-web
- [ ] 5.6 Provide interpretation and recommendations
- [ ] 5.7 List example files that parse successfully

## 6. Issue Tracking

- [ ] 6.1 Create GitHub issues for high-priority failures
- [ ] 6.2 Link issues to specific gallery examples
- [ ] 6.3 Tag issues with priority based on frequency
- [ ] 6.4 Add to project roadmap

## 7. Documentation Updates

- [ ] 7.1 Update openspec/project.md with gallery validation results
- [ ] 7.2 Update README with realistic success metrics
- [ ] 7.3 Add validation status badge (if applicable)
- [ ] 7.4 Document validation process for future re-runs

## 8. Follow-up Validation (Optional)

- [ ] 8.1 Re-run validation after parser improvements
- [ ] 8.2 Track improvement in success rate over time
- [ ] 8.3 Update report with new results
