#include <napi.h>

typedef struct TSLanguage TSLanguage;

extern "C" TSLanguage *tree_sitter_quarto_block();
extern "C" TSLanguage *tree_sitter_quarto_inline();

// Type tag for the language object (required for tree-sitter 0.25+)
// Standard tag used by all tree-sitter language bindings
const napi_type_tag LANGUAGE_TYPE_TAG = {
  0x8AF2E5212AD58ABF, 0xD5006CAD83ABBA16
};

namespace {

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  // Dual-grammar export structure:
  // - exports.language: block grammar (main parsing language for .qmd files)
  // - exports.inline.language: inline grammar (injected via language injection queries)
  // This matches tree-sitter-pandoc-markdown's dual-grammar architecture where
  // the block parser handles document structure and delegates inline content
  // parsing to the inline grammar through injection queries.

  exports["name"] = Napi::String::New(env, "quarto");
  auto block_language = Napi::External<TSLanguage>::New(env, tree_sitter_quarto_block());
  block_language.TypeTag(&LANGUAGE_TYPE_TAG);
  exports["language"] = block_language;

  auto inline_obj = Napi::Object::New(env);
  inline_obj["name"] = Napi::String::New(env, "quarto_inline");
  auto inline_language = Napi::External<TSLanguage>::New(env, tree_sitter_quarto_inline());
  inline_language.TypeTag(&LANGUAGE_TYPE_TAG);
  inline_obj["language"] = inline_language;
  exports["inline"] = inline_obj;

  return exports;
}

NODE_API_MODULE(tree_sitter_quarto_binding, Init)

}  // namespace
