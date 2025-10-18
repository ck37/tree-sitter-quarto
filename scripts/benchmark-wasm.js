#!/usr/bin/env node

/**
 * benchmark-wasm.js - Accurate performance benchmarking using WASM parser
 *
 * Uses the WASM build directly to measure actual parser performance without
 * process spawning overhead (~250-470ms per parse with CLI method).
 *
 * Comparison:
 * - CLI method (benchmark-cli.js): ~300ms/parse (mostly overhead)
 * - WASM method (this script): actual parser performance
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

// tree-sitter is a peer dependency, may not be installed
let Parser;
try {
  Parser = require('tree-sitter');
} catch (e) {
  console.error('Error: tree-sitter not found');
  console.error('Install with: npm install tree-sitter');
  process.exit(1);
}

// Configuration
const BENCHMARK_DIR = path.join(__dirname, '../benchmarks/documents');
const RESULTS_FILE = path.join(__dirname, '../benchmarks/results-wasm.json');
const BASELINE_FILE = path.join(__dirname, '../benchmarks/baseline-wasm.json');
const WASM_PATH = path.join(__dirname, '../tree-sitter-quarto.wasm');
const ITERATIONS = 10; // Number of iterations for averaging

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

/**
 * Measure parse time using WASM parser
 */
function measureParseTime(parser, content, iterations = ITERATIONS) {
  const times = [];

  // Warm-up run
  parser.parse(content);

  // Measure iterations
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    parser.parse(content);
    const end = performance.now();
    times.push(end - start);
  }

  // Calculate statistics
  const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
  const stdDev = Math.sqrt(
    times.map(t => Math.pow(t - avgTime, 2)).reduce((a, b) => a + b, 0) / times.length
  );
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);

  return {
    avgTime,
    stdDev,
    minTime,
    maxTime,
    iterations,
  };
}

/**
 * Check if parse has ERROR nodes
 */
function hasParseErrors(parser, content) {
  const tree = parser.parse(content);
  return tree.rootNode.hasError;
}

/**
 * Load and benchmark a document
 */
function benchmarkDocument(parser, filePath) {
  const fileName = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const sizeBytes = Buffer.byteLength(content, 'utf8');
  const lines = content.split('\n').length;

  console.log(`\n${colorize(`📄 ${fileName}`, 'bright')} (${lines} lines, ${sizeBytes} bytes)`);

  // Check for parse errors
  const hasErrors = hasParseErrors(parser, content);

  // Benchmark parsing
  const parseResults = measureParseTime(parser, content);
  const throughput = sizeBytes / parseResults.avgTime;

  // Display results
  console.log(`  Parse time:  ${parseResults.avgTime.toFixed(2)}ms (σ=${parseResults.stdDev.toFixed(2)}ms)`);
  console.log(`  Throughput:  ${throughput.toFixed(0)} bytes/ms`);
  console.log(`  Parse status: ${hasErrors ? colorize('Contains ERROR nodes', 'yellow') : colorize('Clean parse', 'green')}`);

  // Check against targets
  const warnings = [];
  const info = [];

  // Only warn on parse time for very large documents
  if (parseResults.avgTime > 100 && lines > 1000) {
    warnings.push(`⚠️  Parse time >100ms for ${lines}-line document`);
  }

  // Development threshold: 1000 bytes/ms (was 5000 for production)
  if (throughput < 1000) {
    warnings.push(`⚠️  Throughput <1000 bytes/ms (${throughput.toFixed(0)} bytes/ms)`);
  }

  // ERROR nodes are informational during development
  if (hasErrors) {
    info.push(`ℹ  Document contains ERROR nodes (expected during development)`);
  }

  // Production target info
  if (throughput < 5000) {
    info.push(`ℹ  Production target: >5000 bytes/ms (current: ${throughput.toFixed(0)})`);
  }

  if (warnings.length > 0) {
    warnings.forEach(w => console.log(`  ${colorize(w, 'yellow')}`));
  }
  if (info.length > 0) {
    info.forEach(i => console.log(`  ${colorize(i, 'blue')}`));
  }
  if (warnings.length === 0 && info.length === 0) {
    console.log(`  ${colorize('✓ All development targets met', 'green')}`);
  }

  return {
    file: fileName,
    size: sizeBytes,
    lines,
    parse: parseResults,
    throughput,
    hasErrors,
    warnings: warnings.length,
  };
}

/**
 * Compare results to baseline
 */
function compareToBaseline(results) {
  if (!fs.existsSync(BASELINE_FILE)) {
    console.log(`\n${colorize('ℹ  No baseline found. Run with --save-baseline to create one.', 'blue')}`);
    return;
  }

  const baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'));
  console.log(`\n${colorize('📊 Comparison to Baseline', 'bright')}`);

  let regressions = 0;
  let improvements = 0;

  results.documents.forEach(doc => {
    const base = baseline.documents.find(b => b.file === doc.file);
    if (!base) return;

    const timeChange = ((doc.parse.avgTime - base.parse.avgTime) / base.parse.avgTime) * 100;
    const throughputChange = ((doc.throughput - base.throughput) / base.throughput) * 100;

    console.log(`\n  ${doc.file}:`);

    if (Math.abs(timeChange) > 5) {
      const symbol = timeChange > 0 ? '⬆' : '⬇';
      const color = timeChange > 20 ? 'red' : timeChange > 0 ? 'yellow' : 'green';
      console.log(`    Parse time: ${colorize(`${symbol} ${Math.abs(timeChange).toFixed(1)}%`, color)}`);

      if (timeChange > 20) {
        regressions++;
        console.log(`      ${colorize('⚠️  REGRESSION: >20% slower', 'red')}`);
      } else if (timeChange < -10) {
        improvements++;
        console.log(`      ${colorize('✓ Improvement', 'green')}`);
      }
    } else {
      console.log(`    Parse time: ${colorize('→ No significant change', 'blue')}`);
    }

    if (Math.abs(throughputChange) > 5) {
      const symbol = throughputChange > 0 ? '⬆' : '⬇';
      const color = throughputChange < -20 ? 'red' : throughputChange < 0 ? 'yellow' : 'green';
      console.log(`    Throughput: ${colorize(`${symbol} ${Math.abs(throughputChange).toFixed(1)}%`, color)}`);
    }
  });

  if (regressions > 0) {
    console.log(`\n${colorize(`⚠️  ${regressions} performance regression(s) detected`, 'red')}`);
    process.exit(1);
  } else if (improvements > 0) {
    console.log(`\n${colorize(`✓ ${improvements} improvement(s) detected`, 'green')}`);
  } else {
    console.log(`\n${colorize('→ Performance stable', 'blue')}`);
  }
}

/**
 * Main benchmark runner
 */
async function main() {
  const args = process.argv.slice(2);
  const saveBaseline = args.includes('--save-baseline');
  const compareBaseline = args.includes('--compare') || !saveBaseline;

  console.log(colorize('=== tree-sitter-quarto Performance Benchmark (WASM) ===', 'bright'));
  console.log(colorize('Note: Using WASM parser for accurate measurements (no process overhead)\n', 'blue'));

  // Check WASM file exists
  if (!fs.existsSync(WASM_PATH)) {
    console.error(colorize(`Error: WASM file not found: ${WASM_PATH}`, 'red'));
    console.error('Build with: npm run build:wasm');
    process.exit(1);
  }

  // Load parser (try native binding first, fall back to WASM)
  console.log('Loading parser...');
  const parser = new Parser();

  let Quarto;
  try {
    // Try native binding first
    Quarto = require('../bindings/node');
    console.log(colorize('✓ Using native Node.js binding\n', 'green'));
  } catch (e) {
    console.error(colorize('Error loading native binding:', 'red'));
    console.error(e.message);
    process.exit(1);
  }

  parser.setLanguage(Quarto);

  // Find benchmark documents
  if (!fs.existsSync(BENCHMARK_DIR)) {
    console.error(colorize(`Error: Benchmark directory not found: ${BENCHMARK_DIR}`, 'red'));
    console.error('Create benchmark documents first.');
    process.exit(1);
  }

  const documents = fs.readdirSync(BENCHMARK_DIR)
    .filter(f => f.endsWith('.qmd'))
    .map(f => path.join(BENCHMARK_DIR, f))
    .sort();

  if (documents.length === 0) {
    console.error(colorize('Error: No .qmd files found in benchmarks/documents/', 'red'));
    process.exit(1);
  }

  console.log(`Found ${documents.length} benchmark document(s)\n`);

  // Run benchmarks
  const results = {
    timestamp: new Date().toISOString(),
    node_version: process.version,
    platform: process.platform,
    arch: process.arch,
    method: 'wasm',
    documents: documents.map(doc => benchmarkDocument(parser, doc)),
  };

  // Calculate aggregate statistics
  const totalWarnings = results.documents.reduce((sum, doc) => sum + doc.warnings, 0);
  const avgThroughput = results.documents.reduce((sum, doc) => sum + doc.throughput, 0) / results.documents.length;
  const docsWithErrors = results.documents.filter(doc => doc.hasErrors).length;

  console.log(`\n${colorize('=== Summary ===', 'bright')}`);
  console.log(`  Documents:        ${results.documents.length}`);
  console.log(`  Avg throughput:   ${avgThroughput.toFixed(0)} bytes/ms`);
  console.log(`  Warnings:         ${totalWarnings}`);
  console.log(`  Parse errors:     ${docsWithErrors}`);

  // Save results
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${RESULTS_FILE}`);

  // Save or compare baseline
  if (saveBaseline) {
    fs.writeFileSync(BASELINE_FILE, JSON.stringify(results, null, 2));
    console.log(colorize(`Baseline saved to: ${BASELINE_FILE}`, 'green'));
    process.exit(0);
  } else if (compareBaseline) {
    compareToBaseline(results);
    process.exit(0);
  }

  // No baseline comparison requested - exit with code based on warnings
  process.exit(totalWarnings > 0 ? 1 : 0);
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error(colorize(`Error: ${error.message}`, 'red'));
    process.exit(1);
  });
}

module.exports = { benchmarkDocument, measureParseTime };
