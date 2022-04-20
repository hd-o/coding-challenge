// @ts-check

const { writeConfig } = require('../write')

/**
 * @type {import('eslint').Linter.Config}
 */
const eslintrc = {
  env: {
    "browser": true,
    "es6": true,
    "jest": true,
  },
  extends: [
    "standard-with-typescript",
    "plugin:jest/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": "./tsconfig.json",
  },
  plugins: [
    "@typescript-eslint",
    "jest",
    "unused-imports",
  ],
  rules: {
    "@typescript-eslint/member-ordering": [
      "error",
      {
        "default": {
          "memberTypes": ["signature", "constructor", "field", "method"],
          "order": "alphabetically"
        }
      }
    ],
    "@typescript-eslint/promise-function-async": 0,
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "ignore",
      "exports": "always-multiline",
      "functions": "ignore",
    }],
    "jest/expect-expect": 0,
    "import/no-absolute-path": 0,
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "args": "after-used",
        "argsIgnorePattern": "^_",
        "vars": "all",
        "varsIgnorePattern": "^_",
      },
    ],
  },
  ignorePatterns: [
    '.vscode/',
    '.cache/',
    'dist/',
  ],
}

const writeEslintrc = () => writeConfig(eslintrc, './.eslintrc')

module.exports = { eslintrc, writeEslintrc }
