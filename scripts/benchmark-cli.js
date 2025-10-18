#!/usr/bin/env node

/**
 * benchmark-cli.js - Performance benchmarking using tree-sitter CLI
 * 
 * Uses the tree-sitter CLI command instead of Node.js bindings to work around
 * the tree-sitter 0.25.0 ABI incompatibility issue.
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');
const { execSync, spawn } = require('child_process');

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
 * Check if tree-sitter CLI is available
 */
function checkTreeSitterCLI() {
  try {
    execSync('npx tree-sitter --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error(colorize('Error: tree-sitter CLI not found', 'red'));
    console.error('Install with: npm install');
    process.exit(1);
  }
}

/**
 * Measure parse time using tree-sitter CLI
 */
function measureParseTime(filePath, iterations = ITERATIONS) {
  const times = [];
  
  // Warm-up run
  try {
    execSync(`npx tree-sitter parse "${filePath}"`, { stdio: 'pipe' });
  } catch (error) {
    // Ignore parse errors for now
  }
  
  // Measure iterations
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    
    try {
      execSync(`npx tree-sitter parse "${filePath}"`, { stdio: 'pipe' });
    } catch (error) {
      // CLI returns non-zero on ERROR nodes, but still parses
    }
    
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
function hasParseErrors(filePath) {
  try {
    const output = execSync(`npx tree-sitter parse "${filePath}"`, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    return output.includes('ERROR');
  } catch (error) {
    // CLI exits with error code if ERROR nodes present
    return true;
  }
}

/**
 * Load and benchmark a document
 */
function benchmarkDocument(filePath) {
  const fileName = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const sizeBytes = Buffer.byteLength(content, 'utf8');
  const lines = content.split('\n').length;

  console.log(`\n${colorize(`📄 ${fileName}`, 'bright')} (${lines} lines, ${sizeBytes} bytes)`);

  // Check for parse errors
  const hasErrors = hasParseErrors(filePath);
  
  // Benchmark parsing
  const parseResults = measureParseTime(filePath);
  const throughput = sizeBytes / parseResults.avgTime;

  // Estimate memory (CLI doesn't provide this, use heuristic)
  const estimatedMemory = sizeBytes / 1024 / 1024 * 0.5; // Rough estimate

  // Display results
  console.log(`  Parse time:  ${parseResults.avgTime.toFixed(2)}ms (σ=${parseResults.stdDev.toFixed(2)}ms)`);
  console.log(`  Throughput:  ${throughput.toFixed(0)} bytes/ms`);
  console.log(`  Memory:      ~${estimatedMemory.toFixed(2)}MB (estimated)`);
  console.log(`  Parse status: ${hasErrors ? colorize('Contains ERROR nodes', 'yellow') : colorize('Clean parse', 'green')}`);

  // Check against targets
  const warnings = [];
  if (parseResults.avgTime > 100 && lines > 400) {
    warnings.push(`⚠️  Parse time >100ms for ${lines}-line document`);
  }
  if (throughput < 5000) {
    warnings.push(`⚠️  Throughput <5000 bytes/ms (${throughput.toFixed(0)} bytes/ms)`);
  }
  if (hasErrors) {
    warnings.push(`⚠️  Document contains ERROR nodes`);
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
function main() {
  const args = process.argv.slice(2);
  const saveBaseline = args.includes('--save-baseline');
  const compareBaseline = args.includes('--compare') || !saveBaseline;

  console.log(colorize('=== tree-sitter-quarto Performance Benchmark (CLI) ===', 'bright'));
  console.log(colorize('Note: Using tree-sitter CLI to work around Node.js bindings ABI issue\n', 'blue'));

  // Check tree-sitter CLI
  checkTreeSitterCLI();

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
    method: 'tree-sitter-cli',
    documents: documents.map(doc => benchmarkDocument(doc)),
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

module.exports = { benchmarkDocument, measureParseTime };
