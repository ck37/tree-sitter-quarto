# Real-World Validation Specification

## ADDED Requirements

### Requirement: Gallery Corpus Testing
The parser SHALL be validated against real-world Quarto documents from the Quarto Gallery.

#### Scenario: Collect gallery corpus
- **WHEN** preparing for validation
- **THEN** SHALL collect .qmd files from Quarto Gallery examples
- **AND** SHALL organize by document type (papers, presentations, websites)
- **AND** corpus SHALL contain at least 50 diverse documents
- **AND** SHALL document corpus sources and characteristics

#### Scenario: Parse gallery documents
- **WHEN** running validation against gallery corpus
- **THEN** SHALL attempt to parse all .qmd files
- **AND** SHALL record success/failure for each file
- **AND** SHALL count ERROR nodes in parse trees
- **AND** SHALL complete validation in reasonable time (<10 minutes)

### Requirement: Success Rate Measurement
Validation SHALL calculate and report success rates for real-world documents.

#### Scenario: Calculate overall success rate
- **WHEN** validation completes
- **THEN** SHALL report percentage of files without errors
- **AND** SHALL compare to quarto-web baseline (16.5%)
- **AND** success rate SHALL be higher than quarto-web
- **AND** SHALL aim for 60%+ success rate on gallery corpus

#### Scenario: Success by document type
- **WHEN** analyzing results by document type
- **THEN** SHALL report success rates separately:
  - **AND** Scientific papers/reports
  - **AND** Presentations
  - **AND** Websites/blogs
  - **AND** Books/manuscripts
- **AND** SHALL identify which types parse best

### Requirement: Error Pattern Identification
Validation SHALL identify and categorize common error patterns.

#### Scenario: Categorize parsing errors
- **WHEN** analyzing failed parses
- **THEN** SHALL categorize errors by type
- **AND** SHALL count frequency of each category
- **AND** SHALL rank categories by impact
- **AND** categories SHALL include:
  - Pipe table issues
  - Nested constructs
  - YAML complexity
  - Unknown patterns

#### Scenario: Identify top failure cases
- **WHEN** reviewing error results
- **THEN** SHALL identify top 10 files with most errors
- **AND** SHALL manually review these files
- **AND** SHALL document root causes
- **AND** SHALL determine if fixable or edge cases

### Requirement: Validation Reporting
Validation results SHALL be documented in a comprehensive report.

#### Scenario: Create validation report
- **WHEN** validation completes
- **THEN** SHALL create docs/quarto-gallery-validation.md
- **AND** report SHALL include methodology
- **AND** report SHALL include statistics tables
- **AND** report SHALL include error analysis
- **AND** report SHALL include recommendations

#### Scenario: Report includes interpretation
- **GIVEN** validation report
- **WHEN** reviewing results
- **THEN** SHALL interpret what results mean for users
- **AND** SHALL compare to quarto-web (documentation vs real-world)
- **AND** SHALL assess production readiness
- **AND** SHALL provide actionable next steps

### Requirement: Continuous Validation
Validation process SHALL be repeatable for tracking improvements over time.

#### Scenario: Automated validation script
- **WHEN** running validation
- **THEN** SHALL use automated script
- **AND** script SHALL be reusable
- **AND** script SHALL generate consistent reports
- **AND** script SHALL support re-running after improvements

#### Scenario: Track validation over time
- **WHEN** parser is improved
- **THEN** validation SHALL be re-run
- **AND** SHALL track improvement in success rate
- **AND** SHALL update documentation with new results
- **AND** SHALL show progress toward better real-world support

### Requirement: Issue Prioritization
Validation SHALL guide issue prioritization based on real-world usage.

#### Scenario: Create issues for common failures
- **WHEN** validation identifies common error patterns
- **THEN** SHALL create GitHub issues for fixable patterns
- **AND** SHALL prioritize by frequency in real documents
- **AND** SHALL link to gallery examples demonstrating issue
- **AND** SHALL tag with appropriate priority

#### Scenario: Distinguish real issues from edge cases
- **WHEN** analyzing failures
- **THEN** SHALL identify whether errors represent:
  - Common real-world constructs (high priority)
  - Documentation-only patterns (low priority)
  - Rare edge cases (accept limitation)
- **AND** SHALL guide improvement roadmap accordingly
