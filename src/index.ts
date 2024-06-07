import { config, parser, plugin } from "typescript-eslint";
import stylistic, { Rules } from "@stylistic/eslint-plugin";
// @ts-ignore
import eslintPluginUnicorn from "eslint-plugin-unicorn";

export interface Options {
  rules?: Rules;
}

export default function eslintConfig(opts: Options) {
  return config(eslintPluginUnicorn.configs["flat/recommended"], {
    files: ["**/*.ts"],
    ignores: ["dist/", "node_modules/**/*", "coverage/**/*"],
    plugins: {
      "@stylistic": stylistic,
      "@typescript-eslint": plugin,
    },
    languageOptions: {
      parser,
      sourceType: "module",
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
      "unicorn/prevent-abbreviations": "off",
      "require-await": "off",
      "multiline-ternary": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/ban-types": "error",
      "no-array-constructor": "off",
      "@typescript-eslint/no-array-constructor": "error",
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "no-loss-of-precision": "off",
      "@typescript-eslint/no-loss-of-precision": "error",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
      "@typescript-eslint/no-this-alias": "error",
      "@typescript-eslint/no-unnecessary-type-constraint": "error",
      "@typescript-eslint/no-unsafe-declaration-merging": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/triple-slash-reference": "error",
      ...opts.rules,
    } as Rules,
  });
}
