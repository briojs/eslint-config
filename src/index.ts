// // @ts-ignore
// import eslintPluginUnicorn from "eslint-plugin-unicorn";
// import { config, parser, plugin } from "typescript-eslint";
//
// export interface Options {
//   rules?: Rules;
//   ignores?: string[];
// }
//
// export default function eslintConfig(opts: Options) {
//   return config(eslintPluginUnicorn.configs["flat/recommended"], {
//     files: ["**/*.ts"],
//     ignores: ["dist", "node_modules", "coverage", ...(opts.ignores || [])],
//     plugins: {
//       "@stylistic": stylistic,
//       "@typescript-eslint": plugin,
//     },
//     languageOptions: {
//       parser,
//       sourceType: "module",
//     },
//     // @ts-ignore
//     rules: {

//       "@typescript-eslint/no-non-null-assertion": 0,
//       "@typescript-eslint/no-unused-vars": [
//         "warn",
//         { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
//       ],
//       "@typescript-eslint/no-explicit-any": "off",
//       "@typescript-eslint/no-empty-function": "off",
//       "@typescript-eslint/ban-ts-comment": 2,
//       "no-array-constructor": "off",
//       "@typescript-eslint/no-array-constructor": 2,
//       "@typescript-eslint/no-duplicate-enum-values": 2,
//       "@typescript-eslint/no-extra-non-null-assertion": 2,
//       "no-loss-of-precision": "off",
//       "@typescript-eslint/no-loss-of-precision": 2,
//       "@typescript-eslint/no-misused-new": 2,
//       "@typescript-eslint/no-namespace": 2,
//       "@typescript-eslint/no-non-null-asserted-optional-chain": 2,
//       "@typescript-eslint/no-this-alias": 2,
//       "@typescript-eslint/no-unnecessary-type-constraint": 2,
//       "@typescript-eslint/no-unsafe-declaration-merging": 2,
//       "no-unused-vars": "off",
//       "@typescript-eslint/no-var-requires": 2,
//       "@typescript-eslint/prefer-as-const": 2,
//       "@typescript-eslint/triple-slash-reference": 2,
//       "@typescript-eslint/ban-types": "off",

//       ...opts.rules,
//     } as Rules,
//   });
// }

import eslint from "@eslint/js";
import type { Linter } from "eslint";
// @ts-ignore
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

type RuleOptions = Record<
  string,
  Linter.RuleLevel | Linter.RuleLevelAndOptions
>;

export interface MainConfig {
  rules?: RuleOptions;
  ignores?: string[];
}

export interface TypedFlatConfig extends Omit<Linter.FlatConfig, "rules"> {
  rules?: RuleOptions;
}

export default function eslintConfig(
  config: MainConfig = {},
  ...userConfigs: TypedFlatConfig[]
): Linter.FlatConfig[] {
  const rules: RuleOptions = {
    "unicorn/number-literal-case": 0,
    "unicorn/template-indent": 0,
    "unicorn/prevent-abbreviations": 0,
    "unicorn/no-await-expression-member": 0,
    "unicorn/no-useless-undefined": 0,
    "unicorn/no-array-push-push": 0,
    "unicorn/no-nested-ternary": 0,
    "unicorn/import-style": 0,
    "unicorn/no-static-only-class": 0,
    "unicorn/prefer-spread": 0,
    "unicorn/no-null": 0,
    "unicorn/no-process-exit": 0,
    "unicorn/consistent-destructuring": 0,
    "unicorn/no-array-reduce": 0,
    "require-await": 0,
    "multiline-ternary": 0,
    "@stylistic/no-multiple-empty-lines": 2,
    "@stylistic/no-floating-decimal": 2,
    "@stylistic/no-extra-semi": 2,
    "@stylistic/spaced-comment": 2,
    "@stylistic/quotes": [
      2,
      "single",
      {
        avoidEscape: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
    "unicorn/prefer-string-replace-all": 0,
    "unicorn/no-abusive-eslint-disable": 0,
    "unicorn/prefer-module": 0,
    "unicorn/consistent-function-scoping": 0,
    ...config.rules,
  };

  return [
    eslint.configs.recommended,
    ...(tseslint.configs.recommended as Linter.FlatConfig[]),
    eslintPluginUnicorn.configs["flat/recommended"] as Linter.FlatConfig,

    // Preset overrides
    { rules: rules as Linter.RulesRecord },
    {
      languageOptions: {
        globals: Object.fromEntries(
          Object.keys(globals).flatMap((group) =>
            Object.keys(globals[group as keyof typeof globals]).map((k) => [
              k,
              true,
            ]),
          ),
        ),
      },
    },
    { ignores: ["dist", "coverage", ...(config.ignores || [])] },

    ...(userConfigs as Linter.FlatConfig[]),
  ].filter(Boolean) as Linter.FlatConfig[];
}
