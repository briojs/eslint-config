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
    "unicorn/no-object-as-default-parameter": 0,
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
