// `shiki/core` entry does not include any themes or languages or the wasm binary.
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

// Create a singleton highlighter instance
let highlighterPromise = null;

export const initHighlighter = async () => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [import("shiki/themes/tokyo-night.mjs")],
      langs: [
        import("shiki/langs/javascript.mjs"),
        import("shiki/langs/python.mjs"),
        import("shiki/langs/typescript.mjs"),
        import("shiki/langs/shell.mjs"),
      ],
      // `shiki/wasm` contains the wasm binary inlined as base64 string.
      engine: createOnigurumaEngine(import("shiki/wasm")),
    });
  }
  return highlighterPromise;
};
