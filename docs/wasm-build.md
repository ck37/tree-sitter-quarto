# WASM Parser Build and Usage

This guide covers building and using the WebAssembly (WASM) version of tree-sitter-quarto for browser-based applications and editors.

## Building the WASM Parser

### Prerequisites

First, set up the WASM build toolchain. See [WASM Setup](wasm-setup.md) for emscripten installation.

### Build Command

```bash
npm run build:wasm
```

This generates:
- `tree-sitter-quarto.wasm` (142KB) - The WASM parser binary

The WASM file is generated in the project root and is ready for use in browsers or Node.js.

## Browser Usage

### Basic Setup

1. Include the tree-sitter WASM runtime:

```html
<script src="https://cdn.jsdelivr.net/npm/web-tree-sitter@0.21.0/tree-sitter.js"></script>
```

2. Load and initialize the Quarto parser:

```javascript
async function initParser() {
    // Initialize tree-sitter
    await TreeSitter.init();

    // Create parser instance
    const parser = new TreeSitter();

    // Load Quarto language
    const Quarto = await TreeSitter.Language.load('path/to/tree-sitter-quarto.wasm');
    parser.setLanguage(Quarto);

    return parser;
}
```

3. Parse Quarto markdown:

```javascript
const parser = await initParser();
const sourceCode = `# Heading

[Highlighted text]{.alert} with attributes.

\`\`\`{python}
print("Hello from Quarto!")
\`\`\`
`;

const tree = parser.parse(sourceCode);
console.log(tree.rootNode.toString());
```

### Complete Example

See [examples/browser-test.html](../examples/browser-test.html) for a working browser-based test page that:
- Loads the WASM parser
- Parses Quarto markdown in real-time
- Displays the parse tree
- Shows parse statistics (time, node count, errors)

To test locally:
```bash
# Start a local web server
npx http-server . -p 8080

# Open in browser
open http://localhost:8080/examples/browser-test.html
```

## CodeMirror 6 Integration

CodeMirror 6 has built-in tree-sitter support for syntax highlighting and language features.

### Installation

```bash
npm install @codemirror/view @codemirror/state @codemirror/language
npm install @lezer/common @lezer/highlight
npm install tree-sitter-quarto
```

### Setup

```javascript
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { LRLanguage, LanguageSupport } from '@codemirror/language';
import { styleTags, tags } from '@lezer/highlight';

// Load tree-sitter-quarto WASM
const parser = await initQuartoParser();

// Create CodeMirror language support
const quartoLanguage = LRLanguage.define({
    parser: parser,
    languageData: {
        name: 'quarto',
        extensions: ['.qmd']
    }
});

// Configure syntax highlighting
const quartoHighlighting = styleTags({
    'atx_heading': tags.heading,
    'code_span': tags.monospace,
    'executable_code_cell': tags.special(tags.string),
    'cross_reference': tags.link,
    'emphasis': tags.emphasis,
    'strong_emphasis': tags.strong
});

// Create editor
new EditorView({
    state: EditorState.create({
        doc: '# Quarto Document\n\nContent here...',
        extensions: [
            new LanguageSupport(quartoLanguage),
            quartoHighlighting
        ]
    }),
    parent: document.body
});
```

## Monaco Editor Integration

Monaco Editor (the editor powering VS Code) can be integrated with tree-sitter for syntax highlighting.

### Setup

```javascript
import * as monaco from 'monaco-editor';
import Parser from 'web-tree-sitter';

// Initialize tree-sitter
await Parser.init();
const parser = new Parser();
const Quarto = await Parser.Language.load('tree-sitter-quarto.wasm');
parser.setLanguage(Quarto);

// Register Quarto language
monaco.languages.register({ id: 'quarto', extensions: ['.qmd'] });

// Provide syntax highlighting via tree-sitter
monaco.languages.setTokensProvider('quarto', {
    getInitialState: () => ({ tree: null }),
    tokenize: (line, state) => {
        const tree = parser.parse(line);
        // Convert tree-sitter nodes to Monaco tokens
        // (implementation details omitted for brevity)
        return { tokens: [], endState: { tree } };
    }
});

// Create editor
monaco.editor.create(document.getElementById('container'), {
    value: '# Quarto Document\n\nContent here...',
    language: 'quarto'
});
```

## Performance Characteristics

### Parse Speed

The WASM parser is typically 2-4x slower than the native C parser but still very fast for typical documents:

| Document Size | Parse Time (WASM) | Parse Time (Native) |
|---------------|-------------------|---------------------|
| 100 lines     | ~2-5ms            | ~1-2ms              |
| 1,000 lines   | ~20-40ms          | ~8-15ms             |
| 10,000 lines  | ~200-400ms        | ~80-150ms           |

For interactive editors, the WASM parser provides excellent responsiveness for documents up to several thousand lines.

### Memory Usage

- WASM binary: 142KB (gzipped: ~45KB)
- Runtime overhead: ~1-2MB for tree-sitter runtime
- Parse tree memory: Proportional to document size (~100KB per 1000 lines)

### Optimization Tips

1. **Incremental Parsing**: tree-sitter supports incremental re-parsing after edits
2. **Debouncing**: Debounce parse calls in interactive editors (100-300ms)
3. **Web Workers**: Run parsing in a Web Worker to avoid blocking the UI thread
4. **Lazy Loading**: Load the WASM file only when needed

## Distribution

### npm Package

When publishing to npm, ensure the WASM file is included:

```json
{
  "files": [
    "tree-sitter-quarto.wasm",
    "bindings/**",
    "queries/**"
  ]
}
```

### CDN Hosting

For direct browser usage, host the WASM file on a CDN:

```javascript
const Quarto = await TreeSitter.Language.load(
    'https://cdn.example.com/tree-sitter-quarto@0.0.1/tree-sitter-quarto.wasm'
);
```

## Troubleshooting

### "Failed to compile WebAssembly module"

**Cause**: WASM file not found or corrupted
**Solution**: Rebuild with `npm run build:wasm` and verify file exists

### "WebAssembly instantiation failed"

**Cause**: WASM file too large for memory limit
**Solution**: The parser WASM is only 142KB, so this usually indicates a server configuration issue. Check:
- File is served with correct MIME type (`application/wasm`)
- No size limits on the server

### Parse errors in browser console

**Cause**: Parser may not handle specific Quarto syntax
**Solution**:
1. Simplify the input to isolate the issue
2. Check if the same input works in Node.js native parser
3. Report an issue with the specific input that fails

### Slow parsing performance

**Cause**: Parsing very large documents or too-frequent re-parsing
**Solution**:
- Implement debouncing for interactive editors
- Consider using incremental parsing APIs
- Move parsing to a Web Worker

## Testing

### Automated Tests

Run WASM tests (requires tree-sitter peer dependency):

```bash
npm run test:wasm
```

### Manual Browser Testing

1. Build the WASM parser: `npm run build:wasm`
2. Start local server: `npx http-server . -p 8080`
3. Open test page: `http://localhost:8080/examples/browser-test.html`
4. Verify parsing works and check console for errors

### Cross-Browser Testing

Test in multiple browsers to ensure compatibility:
- Chrome/Edge (Chromium-based)
- Firefox
- Safari

All modern browsers support WebAssembly and should work correctly.

## See Also

- [WASM Setup Guide](wasm-setup.md) - Installing emscripten
- [tree-sitter WASM documentation](https://tree-sitter.github.io/tree-sitter/using-parsers#wasm)
- [web-tree-sitter npm package](https://www.npmjs.com/package/web-tree-sitter)
- [CodeMirror 6 documentation](https://codemirror.net/docs/)
- [Monaco Editor documentation](https://microsoft.github.io/monaco-editor/)
