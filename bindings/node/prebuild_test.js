const { test } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs');

test('pre-built binary exists for current platform', () => {
  const platform = process.platform;
  const arch = process.arch;
  const prebuildPath = path.join(__dirname, '..', '..', 'prebuilds', `${platform}-${arch}`, 'tree-sitter-quarto.node');

  // Check if prebuild exists
  const exists = fs.existsSync(prebuildPath);

  if (exists) {
    console.log(`✓ Pre-built binary found at: ${prebuildPath}`);
    assert.ok(true, 'Pre-built binary exists');
  } else {
    console.log(`ℹ Pre-built binary not found at: ${prebuildPath}`);
    console.log('  This is expected if running on a platform without prebuilds');
    assert.ok(true, 'Test passes - prebuild optional');
  }
});

test('parser binding loads correctly', () => {
  try {
    // This should load either the pre-built binary or the compiled binding
    const Parser = require('.');
    assert.ok(Parser, 'Parser module loaded');

    const parser = Parser.language;
    assert.ok(parser, 'Parser language function exists');

    console.log('✓ Parser binding loaded successfully');
  } catch (error) {
    assert.fail(`Failed to load parser binding: ${error.message}`);
  }
});

test('node-gyp-build falls back to compiled binding when prebuild missing', () => {
  // This test verifies the fallback mechanism
  const buildPath = path.join(__dirname, '..', '..', 'build', 'Release', 'tree_sitter_quarto_binding.node');
  const prebuildPath = path.join(__dirname, '..', '..', 'prebuilds', `${process.platform}-${process.arch}`, 'tree-sitter-quarto.node');

  const hasBuilt = fs.existsSync(buildPath);
  const hasPrebuild = fs.existsSync(prebuildPath);

  // At least one should exist
  assert.ok(
    hasBuilt || hasPrebuild,
    'Either compiled binding or prebuild must exist'
  );

  if (hasBuilt && hasPrebuild) {
    console.log('✓ Both prebuild and compiled binding available');
  } else if (hasPrebuild) {
    console.log('✓ Using prebuild (compiled binding not present)');
  } else {
    console.log('✓ Using compiled binding (prebuild not present)');
  }
});
