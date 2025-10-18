#!/bin/bash
set -euo pipefail

# validate-corpus.sh - Validate tree-sitter-quarto on real-world Quarto documents
#
# Clones the quarto-web repository and attempts to parse all .qmd files,
# reporting success/failure statistics.

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CORPUS_REPO="https://github.com/quarto-dev/quarto-web.git"
CORPUS_DIR="${TMPDIR:-/tmp}/quarto-web-corpus"
OUTPUT_DIR="benchmarks/validation"
REPORT_FILE="$OUTPUT_DIR/validation-report.md"
RESULTS_FILE="$OUTPUT_DIR/results.json"
MAX_SAMPLE=${MAX_SAMPLE:-0}  # 0 = parse all files

echo -e "${BLUE}=== tree-sitter-quarto Corpus Validation ===${NC}\n"

# Check if tree-sitter CLI is available
if ! command -v tree-sitter &> /dev/null; then
    echo -e "${RED}Error: tree-sitter CLI not found${NC}"
    echo "Install with: npm install"
    exit 1
fi

# Check if parser is built
if [ ! -f "src/parser.c" ]; then
    echo -e "${RED}Error: Parser not generated${NC}"
    echo "Run: npx tree-sitter generate"
    exit 1
fi

# Clone or update corpus repository
echo -e "${YELLOW}Step 1: Fetching quarto-web corpus...${NC}"
if [ -d "$CORPUS_DIR" ]; then
    echo "Corpus directory exists, updating..."
    cd "$CORPUS_DIR"
    git pull --quiet
    cd - > /dev/null
else
    echo "Cloning quarto-web repository..."
    git clone --depth 1 --filter=blob:none "$CORPUS_REPO" "$CORPUS_DIR" --quiet
fi

# Find all .qmd files
echo -e "\n${YELLOW}Step 2: Finding .qmd files...${NC}"
QMD_FILES=$(find "$CORPUS_DIR" -name "*.qmd" -type f | sort)
TOTAL_FILES=$(echo "$QMD_FILES" | wc -l | tr -d ' ')
echo "Found $TOTAL_FILES .qmd files"

# Apply sampling if requested
if [ "$MAX_SAMPLE" -gt 0 ] && [ "$TOTAL_FILES" -gt "$MAX_SAMPLE" ]; then
    echo "Sampling $MAX_SAMPLE files for validation..."
    QMD_FILES=$(echo "$QMD_FILES" | shuf -n "$MAX_SAMPLE")
    TOTAL_FILES=$MAX_SAMPLE
fi

# Parse all files and collect results
echo -e "\n${YELLOW}Step 3: Parsing files...${NC}"
SUCCESSFUL=0
FAILED=0
declare -a FAILED_FILES
declare -a ERROR_MESSAGES

mkdir -p "$OUTPUT_DIR"

# Progress tracking
CURRENT=0
LAST_PERCENT=-1

while IFS= read -r file; do
    CURRENT=$((CURRENT + 1))
    PERCENT=$((CURRENT * 100 / TOTAL_FILES))

    # Update progress every 5%
    if [ $((PERCENT / 5)) -gt $((LAST_PERCENT / 5)) ]; then
        echo -ne "Progress: ${PERCENT}% (${CURRENT}/${TOTAL_FILES})\r"
        LAST_PERCENT=$PERCENT
    fi

    # Parse file and capture output
    if OUTPUT=$(npx tree-sitter parse "$file" 2>&1); then
        # Check for ERROR nodes in output
        if echo "$OUTPUT" | grep -q "ERROR"; then
            FAILED=$((FAILED + 1))
            FAILED_FILES+=("$file")
            ERROR_MESSAGES+=("Contains ERROR nodes")
        else
            SUCCESSFUL=$((SUCCESSFUL + 1))
        fi
    else
        FAILED=$((FAILED + 1))
        FAILED_FILES+=("$file")
        ERROR_MESSAGES+=("Parse failed: $OUTPUT")
    fi
done <<< "$QMD_FILES"

echo -e "\n"

# Calculate statistics
SUCCESS_RATE=$(awk "BEGIN {printf \"%.1f\", ($SUCCESSFUL / $TOTAL_FILES) * 100}")

# Display summary
echo -e "${BLUE}=== Validation Results ===${NC}"
echo -e "Total files:     ${TOTAL_FILES}"
echo -e "Successful:      ${GREEN}${SUCCESSFUL}${NC} (${SUCCESS_RATE}%)"
echo -e "Failed:          ${RED}${FAILED}${NC}"

# Determine overall result
if [ "$SUCCESS_RATE" = "100.0" ]; then
    echo -e "\nStatus: ${GREEN}✓ EXCELLENT - All files parsed successfully!${NC}"
    EXIT_CODE=0
elif awk "BEGIN {exit !($SUCCESS_RATE >= 90)}"; then
    echo -e "\nStatus: ${GREEN}✓ PASS - Success rate ≥90%${NC}"
    EXIT_CODE=0
else
    echo -e "\nStatus: ${RED}✗ FAIL - Success rate <90%${NC}"
    EXIT_CODE=1
fi

# Generate detailed report
echo -e "\n${YELLOW}Step 4: Generating report...${NC}"

cat > "$REPORT_FILE" << EOF
# Corpus Validation Report

**Date:** $(date -u +"%Y-%m-%d %H:%M:%S UTC")
**Corpus:** quarto-web (${CORPUS_REPO})
**Parser:** tree-sitter-quarto

## Summary

| Metric | Value |
|--------|-------|
| Total files | ${TOTAL_FILES} |
| Successful parses | ${SUCCESSFUL} |
| Failed parses | ${FAILED} |
| Success rate | ${SUCCESS_RATE}% |

## Result

EOF

if [ "$EXIT_CODE" -eq 0 ]; then
    if [ "$SUCCESS_RATE" = "100.0" ]; then
        echo "**Status:** ✓ EXCELLENT - All files parsed successfully!" >> "$REPORT_FILE"
    else
        echo "**Status:** ✓ PASS - Success rate ≥90%" >> "$REPORT_FILE"
    fi
else
    echo "**Status:** ✗ FAIL - Success rate <90%" >> "$REPORT_FILE"
fi

# Add failed files section if any
if [ ${#FAILED_FILES[@]} -gt 0 ]; then
    cat >> "$REPORT_FILE" << EOF

## Failed Files

The following files failed to parse:

EOF

    for i in "${!FAILED_FILES[@]}"; do
        RELATIVE_PATH=$(echo "${FAILED_FILES[$i]}" | sed "s|$CORPUS_DIR/||")
        echo "### File $((i + 1)): \`$RELATIVE_PATH\`" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
        echo "**Error:** ${ERROR_MESSAGES[$i]}" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    done
else
    cat >> "$REPORT_FILE" << EOF

## Analysis

All files in the corpus parsed successfully! The parser handles the full range of Quarto document structures found in real-world usage.

EOF
fi

# Generate JSON results
cat > "$RESULTS_FILE" << EOF
{
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "corpus": {
    "name": "quarto-web",
    "url": "${CORPUS_REPO}",
    "commit": "$(cd "$CORPUS_DIR" && git rev-parse HEAD)"
  },
  "results": {
    "total_files": ${TOTAL_FILES},
    "successful": ${SUCCESSFUL},
    "failed": ${FAILED},
    "success_rate": ${SUCCESS_RATE}
  },
  "failed_files": [
EOF

# Add failed files to JSON
if [ ${#FAILED_FILES[@]} -gt 0 ]; then
    for i in "${!FAILED_FILES[@]}"; do
        RELATIVE_PATH=$(echo "${FAILED_FILES[$i]}" | sed "s|$CORPUS_DIR/||")
        if [ $i -gt 0 ]; then echo "," >> "$RESULTS_FILE"; fi
        cat >> "$RESULTS_FILE" << EOF
    {
      "file": "$RELATIVE_PATH",
      "error": "${ERROR_MESSAGES[$i]}"
    }
EOF
    done
fi

cat >> "$RESULTS_FILE" << EOF

  ]
}
EOF

echo "Report written to: $REPORT_FILE"
echo "JSON results written to: $RESULTS_FILE"

# Display first few failures if any
if [ ${#FAILED_FILES[@]} -gt 0 ] && [ ${#FAILED_FILES[@]} -le 5 ]; then
    echo -e "\n${YELLOW}Failed files:${NC}"
    for file in "${FAILED_FILES[@]}"; do
        echo "  - $(echo "$file" | sed "s|$CORPUS_DIR/||")"
    done
elif [ ${#FAILED_FILES[@]} -gt 5 ]; then
    echo -e "\n${YELLOW}Failed files (showing first 5 of ${#FAILED_FILES[@]}):${NC}"
    for i in {0..4}; do
        echo "  - $(echo "${FAILED_FILES[$i]}" | sed "s|$CORPUS_DIR/||")"
    done
    echo "  ... and $((${#FAILED_FILES[@]} - 5)) more"
fi

echo -e "\n${BLUE}=== Validation Complete ===${NC}"

exit $EXIT_CODE
