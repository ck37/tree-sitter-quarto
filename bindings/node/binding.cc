#include <napi.h>

typedef struct TSLanguage TSLanguage;

extern "C" TSLanguage *tree_sitter_quarto();

// Type tag for the language object (required for tree-sitter 0.25+)
// Standard tag used by all tree-sitter language bindings
const napi_type_tag LANGUAGE_TYPE_TAG = {
  0x8AF2E5212AD58ABF, 0xD5006CAD83ABBA16
};

namespace {

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports["name"] = Napi::String::New(env, "quarto");
  auto language = Napi::External<TSLanguage>::New(env, tree_sitter_quarto());
  language.TypeTag(&LANGUAGE_TYPE_TAG);
  exports["language"] = language;
  return exports;
}

NODE_API_MODULE(tree_sitter_quarto_binding, Init)

}  // namespace
