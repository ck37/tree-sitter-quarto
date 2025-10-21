# enhance-build-system

**Status:** IMPLEMENTED
**Created:** 2025-10-18
**Implemented:** 2025-10-18
**Spec:** parser-build-system

## Summary

Enhance the existing build system with performance optimizations, pre-built binaries for common platforms, build monitoring, and WASM size optimization to improve developer experience and reduce installation/build times.

## Motivation

The current build system is fully functional and production-ready, but there are opportunities to improve:

1. **Installation Speed** - Users currently compile from source during `npm install`, which takes 15-20 seconds. Pre-built binaries would enable instant installation on common platforms.

2. **CI Performance** - GitHub Actions rebuilds bindings on every run. Build caching could reduce CI time and costs.

3. **Build Transparency** - No visibility into build time trends or performance regressions over time.

4. **WASM Bundle Size** - Current WASM file (200KB-500KB) could potentially be optimized for web deployment.

## Goals

1. **Reduce installation time** from 15-20s to <1s on common platforms via pre-built binaries
2. **Reduce CI build time** by 30-50% through intelligent caching
3. **Enable build monitoring** to detect performance regressions
4. **Optimize WASM size** for faster web playground loading

## Non-Goals

- Changing the core build workflow (tree-sitter generate + node-gyp)
- Replacing existing build tools
- Supporting every possible platform (focus on common ones: macOS x64/arm64, Linux x64/arm64, Windows x64)

## Scope

### In Scope
- Pre-built binary generation for 5 common platforms
- npm scripts for prebuildify workflow
- CI/CD caching for node_modules and build artifacts
- Build time tracking and reporting
- WASM bundle size analysis and optimization
- Documentation updates for new workflows

### Out of Scope
- Custom build system implementation
- Platform-specific optimizations beyond pre-built binaries
- Real-time build monitoring dashboards

## Affected Specifications

**MODIFIED:**
- `parser-build-system` - Add requirements for pre-built binaries, caching, monitoring, and WASM optimization

## Dependencies

None - this is a pure enhancement to existing infrastructure.

## Risks

1. **Platform Matrix Complexity** - Pre-built binaries require testing on 5+ platforms
   - *Mitigation:* Use GitHub Actions matrix builds, which we already have

2. **Cache Invalidation** - Incorrect caching could cause stale build issues
   - *Mitigation:* Use conservative cache keys based on package-lock.json and source file hashes

3. **Maintenance Overhead** - More build targets = more maintenance
   - *Mitigation:* Automate everything via CI, minimal manual intervention required

## Open Questions

None - all enhancements are well-understood and have existing tool support.

## Related Work

- Existing prebuildify documentation: https://github.com/prebuild/prebuildify
- GitHub Actions cache documentation: https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows
- tree-sitter WASM optimization patterns from other parsers
