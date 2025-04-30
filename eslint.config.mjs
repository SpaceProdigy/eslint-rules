import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import { rules as customRules } from "./dist/custom-rules/index.js"; // Указываем путь к скомпилированным JS файлам

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      js,
      "custom-rules": {
        rules: customRules,
      },
    },
    extends: ["js/recommended"],

    rules: {
      "custom-rules/no-let": "error", // 👈 включаем правило
    },
  },

  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },

  tseslint.configs.recommended,
]);
