#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASELINE_FILE = path.join(__dirname, '..', '.build-baseline.json');

function measureTime(label, command) {
  console.log(`\n${label}...`);
  const start = Date.now();

  try {
    execSync(command, { stdio: 'inherit' });
    const duration = Date.now() - start;
    console.log(`✓ ${label} completed in ${(duration / 1000).toFixed(2)}s`);
    return duration;
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`✗ ${label} failed after ${(duration / 1000).toFixed(2)}s`);
    throw error;
  }
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

function compareToBaseline(current, baseline) {
  if (!baseline) {
    console.log('\nℹ No baseline found. Run with --update-baseline to create one.');
    return;
  }

  console.log('\n=== Performance Comparison ===');

  const phases = ['parserGeneration', 'nodeGyp', 'wasm', 'total'];
  let hasRegression = false;

  for (const phase of phases) {
    const currentTime = current[phase] / 1000;
    const baselineTime = baseline[phase] / 1000;
    const diff = currentTime - baselineTime;
    const percentChange = ((diff / baselineTime) * 100).toFixed(1);

    const icon = diff > 0 ? '📈' : '📉';
    const status = Math.abs(parseFloat(percentChange)) > 20 ? '⚠️ ' : '';

    console.log(
      `${status}${icon} ${phase.padEnd(20)}: ${currentTime.toFixed(2)}s (baseline: ${baselineTime.toFixed(2)}s, ${percentChange > 0 ? '+' : ''}${percentChange}%)`
    );

    if (parseFloat(percentChange) > 20) {
      hasRegression = true;
    }
  }

  if (hasRegression) {
    console.log('\n⚠️  WARNING: Performance regression detected (>20% slower)');
    console.log('   Run with --update-baseline to accept these times');
    if (process.env.CI && !process.argv.includes('--allow-regression')) {
      process.exit(1);
    }
  } else {
    console.log('\n✓ No significant performance regressions detected');
  }
}

async function main() {
  const updateBaseline = process.argv.includes('--update-baseline');
  const skipWasm = process.argv.includes('--skip-wasm');

  console.log('=== Build Performance Measurement ===');
  console.log(`Platform: ${process.platform}`);
  console.log(`Node: ${process.version}`);
  console.log(`Date: ${new Date().toISOString()}`);

  const metrics = {
    timestamp: new Date().toISOString(),
    platform: process.platform,
    nodeVersion: process.version,
    parserGeneration: 0,
    nodeGyp: 0,
    wasm: 0,
    total: 0
  };

  const totalStart = Date.now();

  try {
    // Measure parser generation
    metrics.parserGeneration = measureTime(
      'Parser generation',
      'npx tree-sitter generate'
    );

    // Measure node-gyp build
    metrics.nodeGyp = measureTime(
      'Node.js binding compilation',
      'npx node-gyp rebuild'
    );

    // Measure WASM build (optional)
    if (!skipWasm) {
      metrics.wasm = measureTime(
        'WASM build',
        'npx tree-sitter build --wasm'
      );
    }

    metrics.total = Date.now() - totalStart;

    console.log(`\n=== Total Build Time: ${(metrics.total / 1000).toFixed(2)}s ===`);

    // Compare to baseline
    const baseline = loadBaseline();
    if (!updateBaseline) {
      compareToBaseline(metrics, baseline);
    }

    // Update baseline if requested
    if (updateBaseline) {
      saveBaseline(metrics);
    }

  } catch (error) {
    console.error('\n✗ Build failed');
    process.exit(1);
  }
}

main().catch(console.error);
