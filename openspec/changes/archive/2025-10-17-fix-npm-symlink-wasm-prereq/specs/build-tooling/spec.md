# Build Tooling Specification

## ADDED Requirements

### Requirement: WASM Build Toolchain Setup
The project SHALL provide clear instructions for setting up the WASM build toolchain including emscripten.

#### Scenario: Developer sets up WASM toolchain on macOS
- **WHEN** developer installs build dependencies on macOS
- **THEN** documentation SHALL provide step-by-step instructions
- **AND** SHALL address known conflicts (npm symlink)
- **AND** SHALL verify successful installation

#### Scenario: npm symlink conflict resolution
- **GIVEN** npm symlink conflict during emscripten installation
- **WHEN** developer follows documented resolution steps
- **THEN** conflict SHALL be resolved with `brew link --overwrite node`
- **AND** emscripten installation SHALL complete successfully

### Requirement: Build Dependency Verification
The project SHALL provide verification steps to confirm WASM toolchain is correctly installed.

#### Scenario: Verify emscripten installation
- **WHEN** developer completes emscripten setup
- **THEN** SHALL verify with `emcc --version`
- **AND** version SHALL be 4.0.16 or compatible
- **AND** all required tools SHALL be available (emcc, em++, emrun)

#### Scenario: Toolchain readiness check
- **WHEN** preparing for WASM build
- **THEN** SHALL confirm emscripten is in PATH
- **AND** SHALL confirm tree-sitter WASM target is available
- **AND** SHALL document expected output of verification commands

### Requirement: Setup Documentation
Build tooling setup SHALL be documented in developer documentation.

#### Scenario: Documentation includes prerequisite steps
- **GIVEN** CONTRIBUTING.md or setup documentation
- **WHEN** developer reads build setup section
- **THEN** SHALL find emscripten installation instructions
- **AND** SHALL find npm conflict resolution steps
- **AND** SHALL find verification commands
- **AND** SHALL find troubleshooting guidance
