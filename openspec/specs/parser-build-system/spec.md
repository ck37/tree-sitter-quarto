# parser-build-system Specification

## Purpose
Documents the parser build system infrastructure, including parser generation, build configuration, version management, and build targets. Establishes requirements for maintaining parser.c, managing tree-sitter CLI versions, and configuring build tools (node-gyp, tree-sitter.json).

**Related Specifications:**
- **grammar-foundation** - Grammar definition and external scanner that get compiled by this build system
## Requirements
### Requirement: Parser Generation Process
The project SHALL use tree-sitter CLI to generate parser.c from grammar.js and MUST NOT manually edit generated code.

#### Scenario: Generate parser from grammar
- **WHEN** grammar.js or src/scanner.c is modified
- **THEN** developer runs `npx tree-sitter generate`
- **AND** parser.c is regenerated from grammar definition
- **AND** src/tree_sitter/ headers are updated
- **AND** all changes are committed together

#### Scenario: Never manually edit parser.c
- **WHEN** parser.c has type mismatches or bugs
- **THEN** developer MUST fix grammar.js or scanner.c
- **AND** regenerate parser.c with tree-sitter CLI
- **AND** MUST NOT manually edit parser.c directly
- **AND** manual edits will break internal dependencies

#### Scenario: Commit parser and headers together
- **WHEN** committing parser regeneration
- **THEN** git commit MUST include src/parser.c
- **AND** MUST include src/tree_sitter/parser.h
- **AND** MUST include src/tree_sitter/alloc.h
- **AND** MUST include src/tree_sitter/array.h
- **AND** all headers/parser from same generation

### Requirement: tree-sitter CLI Version Management
The project SHALL use tree-sitter CLI 0.25.10 and maintain version consistency across all generated artifacts.

#### Scenario: CLI version in package.json
- **WHEN** package.json is read
- **THEN** devDependencies MUST specify "tree-sitter-cli": "^0.25.10"
- **AND** this version generates TSMapSlice type
- **AND** this version generates .abi_version field
- **AND** this version requires tree-sitter.json

#### Scenario: Headers match CLI version
- **WHEN** parser is regenerated
- **THEN** src/tree_sitter/parser.h MUST contain TSMapSlice
- **AND** MUST contain abi_version field in TSLanguage
- **AND** MUST contain TSLexerMode type
- **AND** header types MUST match parser.c types

#### Scenario: Upgrading CLI version
- **WHEN** upgrading tree-sitter-cli version
- **THEN** update package.json devDependencies
- **AND** run `npm install`
- **AND** run `npx tree-sitter generate`
- **AND** verify `npx tree-sitter test` passes
- **AND** commit parser.c and headers together

### Requirement: tree-sitter.json Configuration
The project SHALL provide tree-sitter.json at project root for CLI 0.25+ WASM builds.

#### Scenario: tree-sitter.json exists at root
- **WHEN** tree-sitter CLI 0.25.10 is used
- **THEN** tree-sitter.json MUST exist at project root
- **AND** file is required for `tree-sitter build --wasm`
- **AND** file is required for WASM playground

#### Scenario: tree-sitter.json structure
- **WHEN** tree-sitter.json is parsed
- **THEN** grammars array MUST contain quarto grammar definition
- **AND** metadata MUST be at root level (not in grammars)
- **AND** highlights/injections/locals MUST be strings (not arrays)
- **AND** metadata MUST include version field

#### Scenario: Grammar definition in tree-sitter.json
- **WHEN** grammars array is processed
- **THEN** name MUST be "quarto"
- **AND** camelcase MUST be "Quarto"
- **AND** scope MUST be "source.quarto"
- **AND** file-types MUST include ["qmd"]
- **AND** path MUST be "." (current directory)

#### Scenario: Query file references
- **WHEN** tree-sitter.json specifies query files
- **THEN** highlights MUST be "queries/highlights.scm"
- **AND** injections MUST be "queries/injections.scm"
- **AND** locals MUST be "queries/locals.scm"
- **AND** all query files MUST exist

### Requirement: Node.js Binding Build Configuration
The project SHALL use node-gyp via binding.gyp to compile C parser for Node.js.

#### Scenario: binding.gyp configuration
- **WHEN** binding.gyp is read
- **THEN** target_name MUST be "tree_sitter_quarto_binding"
- **AND** sources MUST include bindings/node/binding.cc
- **AND** sources MUST include src/parser.c
- **AND** sources MUST include src/scanner.c
- **AND** include_dirs MUST include "src"

#### Scenario: C compiler flags
- **WHEN** building on non-Windows platforms
- **THEN** cflags_c MUST include "-std=c11"
- **AND** C11 standard is required for scanner.c

#### Scenario: macOS deployment target
- **WHEN** building on macOS
- **THEN** MACOSX_DEPLOYMENT_TARGET MUST be "10.7" or higher
- **AND** ensures broad macOS compatibility

#### Scenario: Node.js binding build
- **WHEN** `npm install` is run
- **THEN** package.json "install" script runs node-gyp-build
- **AND** node-gyp-build checks for prebuilt binaries
- **AND** falls back to compilation if no prebuilt found
- **AND** compiled binding is placed in build/Release/

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

### Requirement: Build Dependencies
The project SHALL specify correct build dependencies in package.json.

#### Scenario: Runtime dependencies
- **WHEN** package.json dependencies are read
- **THEN** MUST include "node-addon-api" (^8.0.0)
- **AND** MUST include "node-gyp-build" (^4.8.0)
- **AND** these enable Node.js binding compilation

#### Scenario: Development dependencies
- **WHEN** package.json devDependencies are read
- **THEN** MUST include "tree-sitter" (^0.25.0)
- **AND** MUST include "tree-sitter-cli" (^0.25.10)
- **AND** MUST include "prebuildify" (^6.0.0)

#### Scenario: Peer dependencies
- **WHEN** package.json peerDependenciesMeta is read
- **THEN** tree-sitter MUST be marked optional
- **AND** allows parser to work without tree-sitter runtime

### Requirement: Build Artifacts
The project SHALL generate and manage build artifacts appropriately.

#### Scenario: Generated parser files
- **WHEN** `tree-sitter generate` completes
- **THEN** src/parser.c is created/updated (936KB+)
- **AND** src/grammar.json is created
- **AND** src/node-types.json is created
- **AND** src/tree_sitter/ headers are created/updated

#### Scenario: Compiled bindings
- **WHEN** node-gyp build completes
- **THEN** build/Release/tree_sitter_quarto_binding.node exists
- **AND** binding is loadable via require()
- **AND** binding exposes language() function

#### Scenario: WASM output
- **WHEN** WASM build completes
- **THEN** tree-sitter-quarto.wasm exists at project root
- **AND** WASM file is ~200KB-500KB
- **AND** WASM is loadable in tree-sitter playground
- **AND** WASM file should be committed to git

#### Scenario: Distributable files
- **WHEN** package.json "files" field is read
- **THEN** MUST include grammar.js
- **AND** MUST include binding.gyp
- **AND** MUST include prebuilds/** (if available)
- **AND** MUST include bindings/**
- **AND** MUST include queries/**
- **AND** MUST include src/**
- **AND** MUST include tree-sitter-quarto.wasm

### Requirement: Build System Documentation
The project SHALL maintain clear documentation of build processes.

#### Scenario: CLAUDE.md build guidance
- **WHEN** CLAUDE.md is read
- **THEN** MUST document "never manually edit parser.c"
- **AND** MUST document CLI version requirements
- **AND** MUST document regeneration workflow
- **AND** MUST document commit parser+headers together

#### Scenario: Build troubleshooting
- **WHEN** build fails
- **THEN** docs/zed-compatibility-resolution.md provides troubleshooting
- **AND** documents CLI version mismatch symptoms
- **AND** documents solution: upgrade CLI and regenerate
- **AND** documents tree-sitter.json requirements

#### Scenario: Version compatibility reference
- **WHEN** version compatibility issues arise
- **THEN** documentation MUST specify CLI 0.25.10
- **AND** MUST specify headers match CLI version
- **AND** MUST warn against manual type patching
- **AND** MUST recommend regeneration over manual fixes

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

### Requirement: Build Performance
The project SHALL maintain reasonable build times for development workflow.

#### Scenario: Parser generation time
- **WHEN** `tree-sitter generate` is run
- **THEN** completes in <5 seconds
- **AND** generates ~900KB parser.c file
- **AND** enables fast iteration on grammar

#### Scenario: Node.js binding compilation
- **WHEN** node-gyp builds from source
- **THEN** completes in <30 seconds on modern hardware
- **AND** produces working binding
- **AND** acceptable for development workflow

#### Scenario: WASM build time
- **WHEN** `tree-sitter build --wasm` runs
- **THEN** completes in <10 seconds
- **AND** produces tree-sitter-quarto.wasm
- **AND** enables rapid WASM iteration

### Requirement: Build Reproducibility
The project SHALL ensure builds are reproducible across environments.

#### Scenario: Same grammar produces same parser
- **WHEN** grammar.js is unchanged
- **AND** same CLI version is used
- **THEN** parser.c is bit-identical across machines
- **AND** no platform-specific differences
- **AND** enables deterministic builds

#### Scenario: Version pinning
- **WHEN** package.json specifies versions
- **THEN** tree-sitter-cli uses caret ranges (^0.25.10)
- **AND** allows patch updates
- **AND** prevents breaking minor/major updates
- **AND** package-lock.json pins exact versions

#### Scenario: Build environment consistency
- **WHEN** CI builds
- **THEN** uses same Node.js versions as local dev
- **AND** uses same npm versions
- **AND** uses same C compiler flags
- **AND** produces consistent artifacts

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

