#!/usr/bin/env node

/**
 * benchmark.js - Performance benchmarking for tree-sitter-quarto
 * 
 * Measures parse time, throughput, memory usage, and incremental parsing efficiency.
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

// Try to load the parser
let Parser, Quarto;
try {
  Parser = require('tree-sitter');
  const module = require('../bindings/node');
  Quarto = module.language || module;
} catch (error) {
  console.error('Error: Failed to load tree-sitter or parser bindings');
  console.error('Make sure to run: npm install && npx tree-sitter generate');
  process.exit(1);
}

// Configuration
const BENCHMARK_DIR = path.join(__dirname, '../benchmarks/documents');
const RESULTS_FILE = path.join(__dirname, '../benchmarks/results.json');
const BASELINE_FILE = path.join(__dirname, '../benchmarks/baseline.json');
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
 * Measure parse time and memory for a document
 */
function benchmarkParse(parser, content, iterations = ITERATIONS) {
  const times = [];
  const memoryUsage = [];

  // Warm-up run
  parser.parse(content);

  // Measure iterations
  for (let i = 0; i < iterations; i++) {
    const memBefore = process.memoryUsage();
    const start = performance.now();
    
    const tree = parser.parse(content);
    
    const end = performance.now();
    const memAfter = process.memoryUsage();

    times.push(end - start);
    memoryUsage.push({
      heapUsed: (memAfter.heapUsed - memBefore.heapUsed) / 1024 / 1024,
      rss: (memAfter.rss - memBefore.rss) / 1024 / 1024,
    });

    tree.delete();
  }

  // Calculate statistics
  const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
  const stdDev = Math.sqrt(
    times.map(t => Math.pow(t - avgTime, 2)).reduce((a, b) => a + b, 0) / times.length
  );
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  const avgHeap = memoryUsage.reduce((a, b) => a + b.heapUsed, 0) / memoryUsage.length;
  const maxHeap = Math.max(...memoryUsage.map(m => m.heapUsed));

  return {
    avgTime,
    stdDev,
    minTime,
    maxTime,
    avgHeap,
    maxHeap,
    iterations,
  };
}

/**
 * Measure incremental parsing efficiency
 */
function benchmarkIncremental(parser, content) {
  // Full parse
  const fullStart = performance.now();
  const tree = parser.parse(content);
  const fullTime = performance.now() - fullStart;

  // Small edit: insert a line in the middle
  const lines = content.split('\n');
  const insertPoint = Math.floor(lines.length / 2);
  const editedContent = [
    ...lines.slice(0, insertPoint),
    '# Inserted line for incremental test',
    ...lines.slice(insertPoint),
  ].join('\n');

  // Edit the tree
  const startIndex = lines.slice(0, insertPoint).join('\n').length + 1;
  const newEndIndex = startIndex + '# Inserted line for incremental test\n'.length;
  
  tree.edit({
    startIndex,
    oldEndIndex: startIndex,
    newEndIndex,
    startPosition: { row: insertPoint, column: 0 },
    oldEndPosition: { row: insertPoint, column: 0 },
    newEndPosition: { row: insertPoint + 1, column: 0 },
  });

  // Incremental parse
  const incStart = performance.now();
  const newTree = parser.parse(editedContent, tree);
  const incTime = performance.now() - incStart;

  // Calculate efficiency
  const efficiency = (incTime / fullTime) * 100;

  tree.delete();
  newTree.delete();

  return {
    fullTime,
    incTime,
    efficiency,
  };
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

  // Benchmark parsing
  const parseResults = benchmarkParse(parser, content);
  const throughput = sizeBytes / parseResults.avgTime;

  // Benchmark incremental parsing
  const incResults = benchmarkIncremental(parser, content);

  // Display results
  console.log(`  Parse time:  ${parseResults.avgTime.toFixed(2)}ms (σ=${parseResults.stdDev.toFixed(2)}ms)`);
  console.log(`  Throughput:  ${throughput.toFixed(0)} bytes/ms`);
  console.log(`  Memory:      ${parseResults.avgHeap.toFixed(2)}MB heap (max ${parseResults.maxHeap.toFixed(2)}MB)`);
  console.log(`  Incremental: ${incResults.efficiency.toFixed(1)}% of full parse`);

  // Check against targets
  const warnings = [];
  if (parseResults.avgTime > 100 && lines > 400) {
    warnings.push(`⚠️  Parse time >100ms for ${lines}-line document`);
  }
  if (throughput < 5000) {
    warnings.push(`⚠️  Throughput <5000 bytes/ms (${throughput.toFixed(0)} bytes/ms)`);
  }
  if (parseResults.maxHeap > 50 && lines > 1500) {
    warnings.push(`⚠️  Memory usage >50MB (${parseResults.maxHeap.toFixed(2)}MB)`);
  }
  if (incResults.efficiency > 30) {
    warnings.push(`⚠️  Incremental efficiency >30% (${incResults.efficiency.toFixed(1)}%)`);
  }

  if (warnings.length > 0) {
    warnings.forEach(w => console.log(`  ${colorize(w, 'yellow')}`));
  } else {
    console.log(`  ${colorize('✓ All targets met', 'green')}`);
  }

  return {
    file: fileName,
    size: sizeBytes,
    lines,
    parse: parseResults,
    throughput,
    incremental: incResults,
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
function main() {
  const args = process.argv.slice(2);
  const saveBaseline = args.includes('--save-baseline');
  const compareBaseline = args.includes('--compare') || !saveBaseline;

  console.log(colorize('=== tree-sitter-quarto Performance Benchmark ===', 'bright'));

  // Initialize parser
  const parser = new Parser();
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
    documents: documents.map(doc => benchmarkDocument(parser, doc)),
  };

  // Calculate aggregate statistics
  const totalWarnings = results.documents.reduce((sum, doc) => sum + doc.warnings, 0);
  const avgThroughput = results.documents.reduce((sum, doc) => sum + doc.throughput, 0) / results.documents.length;

  console.log(`\n${colorize('=== Summary ===', 'bright')}`);
  console.log(`  Documents:        ${results.documents.length}`);
  console.log(`  Avg throughput:   ${avgThroughput.toFixed(0)} bytes/ms`);
  console.log(`  Warnings:         ${totalWarnings}`);

  // Save results
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${RESULTS_FILE}`);

  // Save or compare baseline
  if (saveBaseline) {
    fs.writeFileSync(BASELINE_FILE, JSON.stringify(results, null, 2));
    console.log(colorize(`Baseline saved to: ${BASELINE_FILE}`, 'green'));
  } else if (compareBaseline) {
    compareToBaseline(results);
  }

  // Exit with appropriate code
  process.exit(totalWarnings > 0 ? 1 : 0);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { benchmarkParse, benchmarkIncremental };
