# parser-build-system Spec Delta

## ADDED Requirements

### Requirement: Pre-built Binary Distribution
The project SHALL provide pre-built binaries for common platforms to enable fast installation without compilation.

#### Scenario: Pre-built binary generation
- **WHEN** `npm run prebuild` is executed
- **THEN** prebuildify generates binaries for target platforms
- **AND** binaries are placed in prebuilds/ directory
- **AND** binaries include platform/architecture metadata
- **AND** binaries are committed to git or uploaded to releases

#### Scenario: Target platforms coverage
- **WHEN** pre-built binaries are generated
- **THEN** MUST include macOS x64 (darwin-x64)
- **AND** MUST include macOS arm64 (darwin-arm64)
- **AND** MUST include Linux x64 (linux-x64)
- **AND** MUST include Linux arm64 (linux-arm64)
- **AND** MUST include Windows x64 (win32-x64)

#### Scenario: Installation with pre-built binary
- **WHEN** user runs `npm install tree-sitter-quarto`
- **AND** pre-built binary exists for their platform
- **THEN** node-gyp-build loads pre-built binary
- **AND** installation completes in <1 second
- **AND** no compilation occurs
- **AND** binding is immediately usable

#### Scenario: Fallback to compilation
- **WHEN** user runs `npm install` on unsupported platform
- **AND** no pre-built binary exists
- **THEN** node-gyp-build falls back to compilation
- **AND** builds from source using binding.gyp
- **AND** installation succeeds with compilation time ~15-20s

#### Scenario: Binary distribution in package
- **WHEN** package.json "files" field is read
- **THEN** MUST include "prebuilds/**"
- **AND** pre-built binaries are distributed via npm
- **AND** binaries are platform-specific .node files

### Requirement: CI/CD Build Caching
The project SHALL use caching in CI/CD to reduce build times and resource usage.

#### Scenario: Node modules caching
- **WHEN** CI workflow runs
- **THEN** node_modules is cached using package-lock.json hash
- **AND** cache is restored on subsequent runs
- **AND** npm install only runs when dependencies change
- **AND** reduces CI time by 30-60 seconds

#### Scenario: Build artifacts caching
- **WHEN** CI builds Node.js bindings
- **THEN** build/Release/ directory is cached
- **AND** cache key includes src/parser.c hash
- **AND** cache key includes src/scanner.c hash
- **AND** cache key includes binding.gyp hash
- **AND** binding rebuild only occurs when sources change

#### Scenario: WASM build caching
- **WHEN** CI builds WASM
- **THEN** tree-sitter-quarto.wasm is cached
- **AND** cache key includes grammar.js hash
- **AND** cache key includes src/scanner.c hash
- **AND** WASM rebuild only occurs when grammar changes

#### Scenario: Cache invalidation
- **WHEN** source files change
- **THEN** relevant caches are invalidated
- **AND** affected targets are rebuilt
- **AND** unaffected caches remain valid
- **AND** prevents stale build issues

### Requirement: Build Performance Monitoring
The project SHALL track and report build performance metrics to detect regressions.

#### Scenario: Build time tracking
- **WHEN** builds complete in CI
- **THEN** parser generation time is recorded
- **AND** node-gyp compilation time is recorded
- **AND** WASM build time is recorded
- **AND** total build time is recorded

#### Scenario: Build time reporting
- **WHEN** build metrics are collected
- **THEN** times are logged to CI output
- **AND** metrics include platform information
- **AND** metrics include Node.js version
- **AND** metrics are comparable across runs

#### Scenario: Performance regression detection
- **WHEN** build time increases >20% from baseline
- **THEN** CI workflow warns about regression
- **AND** regression is visible in PR checks
- **AND** baseline is established from main branch
- **AND** enables investigation before merge

#### Scenario: Baseline management
- **WHEN** intentional build changes occur
- **THEN** baseline can be updated manually
- **AND** baseline is stored in repository
- **AND** baseline includes acceptable variance thresholds
- **AND** prevents false regression alerts

### Requirement: WASM Bundle Size Optimization
The project SHALL optimize WASM bundle size for faster web loading and better user experience.

#### Scenario: WASM size measurement
- **WHEN** WASM build completes
- **THEN** tree-sitter-quarto.wasm size is measured
- **AND** size is logged to CI output
- **AND** size is compared to previous baseline
- **AND** size increase >10% triggers warning

#### Scenario: WASM optimization flags
- **WHEN** tree-sitter build --wasm runs
- **THEN** optimization flags are applied
- **AND** dead code elimination is enabled
- **AND** aggressive minification is used
- **AND** debug symbols are stripped in production builds

#### Scenario: WASM size baseline
- **WHEN** WASM size baseline is established
- **THEN** current size is <500KB (uncompressed)
- **AND** gzip compressed size is tracked
- **AND** baseline is updated when intentional changes occur
- **AND** prevents unintentional size bloat

#### Scenario: WASM loading performance
- **WHEN** WASM is loaded in web playground
- **THEN** load time is measured
- **AND** load time is <1 second on typical connection
- **AND** parser initialization is <100ms
- **AND** provides good user experience

## MODIFIED Requirements

### Requirement: Build Scripts
The project SHALL provide npm scripts for all build operations **including pre-built binary generation and performance monitoring**.

#### Scenario: Prebuild script
- **WHEN** `npm run prebuild` is executed
- **THEN** runs prebuildify for all target platforms
- **AND** generates binaries in prebuilds/ directory
- **AND** verifies each binary is loadable
- **AND** reports any platform build failures

#### Scenario: Prebuild CI script
- **WHEN** `npm run prebuild:ci` is executed in CI
- **THEN** builds pre-built binary for current platform only
- **AND** uses platform-specific GitHub Actions runners
- **AND** uploads binary as artifact
- **AND** enables parallel platform builds

#### Scenario: Build monitoring script
- **WHEN** `npm run build:monitor` is executed
- **THEN** runs build with time measurements
- **AND** logs timing for each build phase
- **AND** compares against baseline times
- **AND** exits with error if regression detected

### Requirement: CI/CD Build Verification
The project SHALL verify builds in CI/CD pipeline **with caching and performance monitoring enabled**.

#### Scenario: Cached dependency installation
- **WHEN** CI runs
- **THEN** attempts to restore node_modules cache
- **AND** cache hit reduces npm install time to <5s
- **AND** cache miss triggers full npm install
- **AND** new cache is saved for future runs

#### Scenario: Pre-built binary matrix build
- **WHEN** CI runs on release workflow
- **THEN** builds binaries on macOS x64 runner
- **AND** builds binaries on macOS arm64 runner
- **AND** builds binaries on Ubuntu x64 runner
- **AND** builds binaries on Ubuntu arm64 runner
- **AND** builds binaries on Windows x64 runner
- **AND** collects all binaries as artifacts

#### Scenario: Build performance tracking
- **WHEN** CI completes builds
- **THEN** build times are logged for all platforms
- **AND** times are compared to baselines
- **AND** regressions are reported in PR comments
- **AND** helps maintain build performance

## Rationale

These enhancements address the "Future Enhancements" identified in the parser-build-system verification document (openspec/specs/parser-build-system/verification.md):

1. **Pre-built binaries** - Most impactful improvement for user experience. Users get instant installation instead of 15-20s compilation.

2. **Build caching** - Reduces CI costs and speeds up development feedback loops. GitHub Actions provides excellent caching primitives.

3. **Build monitoring** - Prevents gradual performance degradation. Catches regressions before they impact users.

4. **WASM optimization** - Improves web playground experience. Smaller bundles = faster loading, especially on slower connections.

All enhancements use battle-tested tools (prebuildify, GitHub Actions cache) and follow patterns established in other tree-sitter parsers.
