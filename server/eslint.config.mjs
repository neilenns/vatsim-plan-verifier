import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginN from "eslint-plugin-n";
import pluginPromise from "eslint-plugin-promise";
import security from "eslint-plugin-security";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    files: ["**/*.mts"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      pluginN.configs["flat/recommended"],
      pluginPromise.configs["flat/recommended"],
      security.configs.recommended,
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      // TypeScript resolves sub-path imports differently than Node; disable
      // to avoid false positives on e.g. geodesy/latlon-ellipsoidal-vincenty.js
      // and express-serve-static-core.
      "n/no-missing-import": "off",
      // process.exit() is intentional in Bree job scripts.
      "n/no-process-exit": "off",
      // Some packages (mongoose, winston, mongodb, body-parser) are imported
      // directly but come in as transitive deps of listed direct deps; the rule
      // incorrectly flags them as extraneous.
      "n/no-extraneous-import": "off",
      // Allow _-prefixed names to mark intentionally unused parameters
      // (e.g. required positional params that must be present for the
      // function signature but are not used in the body).
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);
