#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { gzipSync } = require('zlib');

const WASM_FILE = path.join(__dirname, '..', 'tree-sitter-quarto.wasm');
const BASELINE_FILE = path.join(__dirname, '..', '.wasm-baseline.json');

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(2)} KB (${bytes.toLocaleString()} bytes)`;
}

function loadBaseline() {
  if (fs.existsSync(BASELINE_FILE)) {
    return JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'));
  }
  return null;
}

function saveBaseline(metrics) {
  fs.writeFileSync(BASELINE_FILE, JSON.stringify(metrics, null, 2));
  console.log(`\n✓ Baseline saved to ${BASELINE_FILE}`);
}

function measureWasmSize() {
  if (!fs.existsSync(WASM_FILE)) {
    console.error(`✗ WASM file not found: ${WASM_FILE}`);
    console.log('  Run: npm run build:wasm');
    process.exit(1);
  }

  const wasmBuffer = fs.readFileSync(WASM_FILE);
  const uncompressed = wasmBuffer.length;
  const gzipped = gzipSync(wasmBuffer).length;

  return {
    timestamp: new Date().toISOString(),
    uncompressed,
    gzipped,
    compressionRatio: (gzipped / uncompressed * 100).toFixed(1)
  };
}

function compareToBaseline(current, baseline) {
  if (!baseline) {
    console.log('\nℹ No baseline found. Run with --update-baseline to create one.');
    return;
  }

  console.log('\n=== Size Comparison ===');

  const uncompressedDiff = current.uncompressed - baseline.uncompressed;
  const uncompressedPercent = ((uncompressedDiff / baseline.uncompressed) * 100).toFixed(1);

  const gzippedDiff = current.gzipped - baseline.gzipped;
  const gzippedPercent = ((gzippedDiff / baseline.gzipped) * 100).toFixed(1);

  console.log(`Uncompressed: ${formatBytes(current.uncompressed)}`);
  console.log(`  Baseline:   ${formatBytes(baseline.uncompressed)}`);
  console.log(`  Change:     ${uncompressedDiff > 0 ? '+' : ''}${formatBytes(uncompressedDiff)} (${uncompressedPercent > 0 ? '+' : ''}${uncompressedPercent}%)`);

  console.log(`\nGzipped:      ${formatBytes(current.gzipped)}`);
  console.log(`  Baseline:   ${formatBytes(baseline.gzipped)}`);
  console.log(`  Change:     ${gzippedDiff > 0 ? '+' : ''}${formatBytes(gzippedDiff)} (${gzippedPercent > 0 ? '+' : ''}${gzippedPercent}%)`);

  // Check for size regressions
  const hasRegression = parseFloat(uncompressedPercent) > 10 || parseFloat(gzippedPercent) > 10;

  if (hasRegression) {
    console.log('\n⚠️  WARNING: WASM size regression detected (>10% larger)');
    console.log('   Run with --update-baseline to accept this size');
    if (process.env.CI && !process.argv.includes('--allow-regression')) {
      process.exit(1);
    }
  } else if (uncompressedDiff < 0) {
    console.log('\n✓ WASM size improved! 🎉');
  } else {
    console.log('\n✓ No significant size regression');
  }
}

function main() {
  const updateBaseline = process.argv.includes('--update-baseline');

  console.log('=== WASM Bundle Size Analysis ===');
  console.log(`File: ${WASM_FILE}\n`);

  const metrics = measureWasmSize();

  console.log('Current WASM Size:');
  console.log(`  Uncompressed: ${formatBytes(metrics.uncompressed)}`);
  console.log(`  Gzipped:      ${formatBytes(metrics.gzipped)}`);
  console.log(`  Compression:  ${metrics.compressionRatio}%`);

  // Check size limits
  const MAX_UNCOMPRESSED = 500 * 1024; // 500KB
  if (metrics.uncompressed > MAX_UNCOMPRESSED) {
    console.log(`\n⚠️  WARNING: Uncompressed size exceeds target of ${formatBytes(MAX_UNCOMPRESSED)}`);
  }

  const baseline = loadBaseline();
  if (!updateBaseline) {
    compareToBaseline(metrics, baseline);
  }

  if (updateBaseline) {
    saveBaseline(metrics);
  }
}

main();
