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
The project SHALL provide npm scripts for all build operations.

#### Scenario: Standard build script
- **WHEN** `npm run build` is executed
- **THEN** runs `tree-sitter generate`
- **AND** runs `node-gyp-build` to compile bindings
- **AND** parser.c is regenerated before compilation

#### Scenario: WASM build script
- **WHEN** `npm run build:wasm` is executed
- **THEN** runs `tree-sitter build --wasm`
- **AND** requires tree-sitter.json configuration
- **AND** generates tree-sitter-quarto.wasm file
- **AND** WASM file is suitable for web playground

#### Scenario: Install script
- **WHEN** `npm install` is executed
- **THEN** install script runs node-gyp-build
- **AND** attempts to load prebuilt binary
- **AND** compiles from source if no prebuilt available

#### Scenario: Test scripts
- **WHEN** test scripts are available
- **THEN** `npm test` runs corpus and binding tests
- **AND** `test:corpus` runs `tree-sitter test`
- **AND** `test:bindings` tests Node.js binding loads
- **AND** `test:wasm` tests WASM build

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
The project SHALL verify builds in CI/CD pipeline.

#### Scenario: Grammar validation
- **WHEN** CI runs
- **THEN** workflow validates grammar.js is parseable
- **AND** verifies no syntax errors in grammar
- **AND** verifies grammar generates without errors

#### Scenario: Parser regeneration check
- **WHEN** CI runs
- **THEN** workflow verifies parser.c matches grammar.js
- **AND** detects if parser.c is out of sync
- **AND** fails if manual parser.c edits detected

#### Scenario: Node.js binding build
- **WHEN** CI runs on multiple platforms
- **THEN** builds bindings on Ubuntu
- **AND** builds bindings on macOS
- **AND** verifies bindings load correctly
- **AND** tests against Node.js 18.x and 20.x

#### Scenario: WASM build verification
- **WHEN** CI runs
- **THEN** builds WASM with tree-sitter CLI
- **AND** verifies tree-sitter.json exists
- **AND** verifies WASM file is generated
- **AND** verifies WASM file size is reasonable

#### Scenario: Zed editor compatibility
- **WHEN** CI runs Zed compatibility check
- **THEN** verifies TSMapSlice exists in parser.h
- **AND** verifies abi_version field exists
- **AND** verifies TSLexerMode type exists
- **AND** fails if headers don't match CLI 0.25.10

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
