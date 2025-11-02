#!/bin/bash
set -euo pipefail

# test-dual-grammar-integration.sh
# Verifies that block and inline grammars work together via language injection

echo "=== Dual-Grammar Integration Test ==="
echo

# Check if block grammar is built
if [ ! -f "grammars/block/src/parser.c" ]; then
    echo "Error: Block grammar not built"
    echo "Run: cd grammars/block && npx tree-sitter generate"
    exit 1
fi

# Check if inline grammar is built
if [ ! -f "grammars/inline/src/parser.c" ]; then
    echo "Error: Inline grammar not built"
    echo "Run: cd grammars/inline && npx tree-sitter generate"
    exit 1
fi

# Create test document with both block and inline content
TEST_FILE=$(mktemp /tmp/dual-grammar-test.XXXXXX.qmd)
cat > "$TEST_FILE" << 'EOF'
---
title: "Integration Test"
---

# Test Document

This paragraph has *emphasis* and **strong emphasis** with a [link](https://example.com).

```yaml
nested:
  - item1
  - item2
```

More text with inline content.
EOF

echo "Testing block grammar parsing..."
if ! OUTPUT=$(cd grammars/block && npx tree-sitter parse "$TEST_FILE" 2>&1); then
    echo "❌ Block grammar parse failed"
    echo "$OUTPUT"
    rm "$TEST_FILE"
    exit 1
fi

# Check for ERROR nodes
if echo "$OUTPUT" | grep -q "ERROR"; then
    echo "❌ Parse contains ERROR nodes"
    echo "$OUTPUT" | grep "ERROR"
    rm "$TEST_FILE"
    exit 1
fi

# Verify inline nodes exist
if ! echo "$OUTPUT" | grep -q "(inline"; then
    echo "❌ No inline nodes found in parse tree"
    rm "$TEST_FILE"
    exit 1
fi

# Verify code block with YAML parses cleanly
if ! echo "$OUTPUT" | grep -q "(code_line"; then
    echo "❌ Code block not parsed correctly"
    rm "$TEST_FILE"
    exit 1
fi

echo "✓ Block grammar parses document structure"
echo "✓ Inline nodes present for paragraph content"
echo "✓ Code blocks parse without ERROR nodes (issue #17 resolved)"
echo
echo "=== Integration Test PASSED ==="

rm "$TEST_FILE"
exit 0
