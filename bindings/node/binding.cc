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
