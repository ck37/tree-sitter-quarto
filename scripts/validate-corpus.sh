#!/bin/bash

# Quarto Corpus Validation Script
# Tests tree-sitter-quarto parser against real-world Quarto documents
# Usage: ./scripts/validate-corpus.sh <corpus-directory> [output-file]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CORPUS_DIR="${1:-.}"
OUTPUT_FILE="${2:-validation-results.txt}"
TEMP_OUTPUT="/tmp/tree-sitter-parse-output.txt"

# Counters
TOTAL_FILES=0
SUCCESS_FILES=0
ERROR_FILES=0
TOTAL_ERRORS=0

# Arrays for tracking
declare -a ERROR_FILE_LIST
declare -a ERROR_COUNT_LIST

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}Quarto Corpus Validation${NC}"
echo -e "${BLUE}================================================${NC}"
echo -e "Corpus directory: ${CORPUS_DIR}"
echo -e "Output file: ${OUTPUT_FILE}"
echo -e ""

# Check if directory exists
if [ ! -d "$CORPUS_DIR" ]; then
    echo -e "${RED}Error: Directory $CORPUS_DIR not found${NC}"
    exit 1
fi

# Find all .qmd files
echo -e "${YELLOW}Finding .qmd files...${NC}"
QMD_FILES=$(find "$CORPUS_DIR" -name "*.qmd" -type f)
TOTAL_FILES=$(echo "$QMD_FILES" | wc -l | tr -d ' ')

if [ "$TOTAL_FILES" -eq 0 ]; then
    echo -e "${RED}Error: No .qmd files found in $CORPUS_DIR${NC}"
    exit 1
fi

echo -e "${GREEN}Found $TOTAL_FILES .qmd files${NC}"
echo -e ""

# Initialize output file
cat > "$OUTPUT_FILE" <<EOF
Quarto Corpus Validation Results
=================================
Date: $(date '+%Y-%m-%d %H:%M:%S')
Corpus: $CORPUS_DIR
Total files: $TOTAL_FILES

EOF

# Parse each file
echo -e "${YELLOW}Parsing files...${NC}"
echo ""

FILE_NUM=0
for FILE in $QMD_FILES; do
    FILE_NUM=$((FILE_NUM + 1))

    # Show progress every 10 files
    if [ $((FILE_NUM % 10)) -eq 0 ]; then
        echo -e "${BLUE}Progress: $FILE_NUM/$TOTAL_FILES files processed${NC}"
    fi

    # Parse the file
    npx tree-sitter parse "$FILE" > "$TEMP_OUTPUT" 2>&1 || true

    # Count ERROR nodes
    ERROR_COUNT=$(grep -o "ERROR" "$TEMP_OUTPUT" | wc -l | tr -d ' ')

    if [ "$ERROR_COUNT" -eq 0 ]; then
        SUCCESS_FILES=$((SUCCESS_FILES + 1))
    else
        ERROR_FILES=$((ERROR_FILES + 1))
        TOTAL_ERRORS=$((TOTAL_ERRORS + ERROR_COUNT))

        # Store for later sorting
        ERROR_FILE_LIST+=("$FILE")
        ERROR_COUNT_LIST+=("$ERROR_COUNT")
    fi
done

echo -e ""
echo -e "${GREEN}Parsing complete!${NC}"
echo -e ""

# Calculate statistics
if [ "$ERROR_FILES" -gt 0 ]; then
    AVG_ERRORS=$(awk "BEGIN {printf \"%.1f\", $TOTAL_ERRORS / $ERROR_FILES}")
else
    AVG_ERRORS="0"
fi

SUCCESS_RATE=$(awk "BEGIN {printf \"%.1f\", ($SUCCESS_FILES / $TOTAL_FILES) * 100}")
ERROR_RATE=$(awk "BEGIN {printf \"%.1f\", ($ERROR_FILES / $TOTAL_FILES) * 100}")

# Display results
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}Results Summary${NC}"
echo -e "${BLUE}================================================${NC}"
echo -e "Total .qmd files:        ${TOTAL_FILES}"
echo -e "${GREEN}Files without errors:    ${SUCCESS_FILES} (${SUCCESS_RATE}%)${NC}"
echo -e "${RED}Files with errors:       ${ERROR_FILES} (${ERROR_RATE}%)${NC}"
echo -e "Total ERROR nodes:       ${TOTAL_ERRORS}"
echo -e "Avg errors per fail:     ${AVG_ERRORS}"
echo -e ""

# Write summary to output file
cat >> "$OUTPUT_FILE" <<EOF

Statistics
----------
Total .qmd files:        $TOTAL_FILES
Files without errors:    $SUCCESS_FILES ($SUCCESS_RATE%)
Files with errors:       $ERROR_FILES ($ERROR_RATE%)
Total ERROR nodes:       $TOTAL_ERRORS
Avg errors per fail:     $AVG_ERRORS

EOF

# Find top 20 files with most errors
if [ "$ERROR_FILES" -gt 0 ]; then
    echo -e "${YELLOW}Top files with most errors:${NC}"
    echo -e ""

    # Create temporary file for sorting
    TEMP_LIST="/tmp/error-list.txt"
    > "$TEMP_LIST"

    for i in "${!ERROR_FILE_LIST[@]}"; do
        echo "${ERROR_COUNT_LIST[$i]} ${ERROR_FILE_LIST[$i]}" >> "$TEMP_LIST"
    done

    # Sort and display top 20
    echo "Top 20 Files with Most Errors" >> "$OUTPUT_FILE"
    echo "-------------------------------" >> "$OUTPUT_FILE"

    sort -rn "$TEMP_LIST" | head -20 | while read COUNT FILE; do
        REL_PATH=$(echo "$FILE" | sed "s|^$CORPUS_DIR/||")
        echo -e "${RED}$COUNT${NC} errors: $REL_PATH"
        echo "$COUNT errors: $REL_PATH" >> "$OUTPUT_FILE"
    done

    rm "$TEMP_LIST"
    echo -e ""
fi

# List some successful files
if [ "$SUCCESS_FILES" -gt 0 ]; then
    echo -e "${GREEN}Sample of successful files (no parse errors):${NC}"
    echo -e ""

    echo "" >> "$OUTPUT_FILE"
    echo "Sample Successful Files" >> "$OUTPUT_FILE"
    echo "------------------------" >> "$OUTPUT_FILE"

    SUCCESS_COUNT=0
    for FILE in $QMD_FILES; do
        npx tree-sitter parse "$FILE" > "$TEMP_OUTPUT" 2>&1 || true
        ERROR_COUNT=$(grep -o "ERROR" "$TEMP_OUTPUT" | wc -l | tr -d ' ')

        if [ "$ERROR_COUNT" -eq 0 ]; then
            REL_PATH=$(echo "$FILE" | sed "s|^$CORPUS_DIR/||")
            echo -e "  ✓ $REL_PATH"
            echo "  $REL_PATH" >> "$OUTPUT_FILE"

            SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
            if [ "$SUCCESS_COUNT" -ge 10 ]; then
                break
            fi
        fi
    done

    if [ "$SUCCESS_FILES" -gt 10 ]; then
        echo -e "  ... and $((SUCCESS_FILES - 10)) more"
        echo "  ... and $((SUCCESS_FILES - 10)) more" >> "$OUTPUT_FILE"
    fi
fi

echo -e ""
echo -e "${BLUE}================================================${NC}"
echo -e "${GREEN}Validation complete!${NC}"
echo -e "Results written to: ${OUTPUT_FILE}"
echo -e "${BLUE}================================================${NC}"

# Cleanup
rm -f "$TEMP_OUTPUT"

# Exit with success rate as code (0 if >90%, 1 otherwise)
if [ "$SUCCESS_RATE" -gt 90 ]; then
    exit 0
else
    exit 1
fi
