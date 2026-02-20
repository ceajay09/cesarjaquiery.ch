// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";

const reactBlock = {
  plugins: {
    import: importPlugin,
    react: reactPlugin,
    "react-hooks": reactHooks,
    "jsx-a11y": jsxA11y,
  },
  settings: { react: { version: "detect" } },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "import/no-unresolved": "off",
    "import/order": ["warn", { "newlines-between": "always" }],
  },
};

export default [
  { ignores: ["dist/**", "build/**", "node_modules/**", "coverage/**"] },

  // JS/JSX
  {
    files: ["**/*.{js,jsx}"],
    ...js.configs.recommended,
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    ...reactBlock,
    rules: {
      ...reactBlock.rules,

      // wenn du React-Imports drinlassen willst:
      "no-unused-vars": ["error", {
        varsIgnorePattern: "^(React|_)$",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      }],
    },
  },

  // TS/TSX (typescript-eslint nur hier!)
  ...tseslint.configs.recommended.map((c) => ({
    ...c,
    files: ["**/*.{ts,tsx}"],
  })),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
    },
    ...reactBlock,
    rules: {
      ...reactBlock.rules,

      // keine doppelten unused-vars:
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        varsIgnorePattern: "^(React|_)$",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      }],

      // optional weniger streng, wenn du nicht alles typisieren willst:
      // "@typescript-eslint/no-explicit-any": "off",
    },
  },
];