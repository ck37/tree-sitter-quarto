/// <reference types="node" />

const assert = require("node:assert");
const { test } = require("node:test");

// tree-sitter is a peer dependency, may not be installed
let Parser;
try {
  Parser = require("tree-sitter");
} catch (e) {
  console.log("⚠️  tree-sitter not found - binding tests skipped");
  console.log("   To run binding tests: npm install tree-sitter");
  process.exit(0);
}

// FIXED: Added NAPI type tag to binding.cc for tree-sitter 0.25.0+ compatibility
// See: https://github.com/tree-sitter/tree-sitter/issues/4234
test("can load grammar", () => {
  const parser = new Parser();
  assert.doesNotThrow(() => parser.setLanguage(require(".")));
});
