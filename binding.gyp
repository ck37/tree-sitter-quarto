{
  "targets": [
    {
      "target_name": "tree_sitter_quarto_binding",
      "dependencies": [
        "<!(node -p \"require('node-addon-api').targets\"):node_addon_api_except"
      ],
      "include_dirs": [
        "grammars/block/src",
        "grammars/inline/src"
      ],
      "sources": [
        "bindings/node/binding.cc",
        "grammars/block/src/parser.c",
        "grammars/block/src/scanner.c",
        "grammars/inline/src/parser.c",
        "grammars/inline/src/scanner.c"
      ],
      "conditions": [
        ["OS!='win'", {
          "cflags_c": [
            "-std=c11"
          ]
        }],
        ["OS=='mac'", {
          "xcode_settings": {
            "MACOSX_DEPLOYMENT_TARGET": "10.7"
          }
        }]
      ]
    }
  ]
}
