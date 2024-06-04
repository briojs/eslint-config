import { config } from "typescript-eslint";
import stylistic, { Rules } from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";
// @ts-ignore
import eslintPluginUnicorn from "eslint-plugin-unicorn";

export interface Options {
  rules?: Rules;
}

export default function eslintConfig(opts: Options) {
  return config(
    {
      files: ["**/*.ts"],
      ignores: ["dist/", "node_modules/**/*", "coverage/**/*"],
      plugins: {
        "@stylistic": stylistic,
      },
      // @ts-ignore
      rules: {
        "@stylistic/no-multiple-empty-lines": "error",
        "@stylistic/no-floating-decimal": "error",
        "@stylistic/no-extra-semi": "error",
        "@stylistic/spaced-comment": "error",
        "@stylistic/quotes": [
          "error",
          "single",
          {
            avoidEscape: true,
          },
        ],
        "unicorn/no-null": "off",
        "unicorn/no-process-exit": "off",
        "unicorn/consistent-destructuring": "off",
        "unicorn/no-array-reduce": "off",
        "require-await": "off",
        "multiline-ternary": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-function": "off",
        ...opts.rules,
      } as Rules,
    },
    ...tseslint.configs.recommended,
    eslintPluginUnicorn.configs["flat/recommended"],
  );
}
