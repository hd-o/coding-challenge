// @ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
  env: {
    "browser": true,
    "es6": true,
    "jest": true
  },
  extends: [
    "standard-with-typescript",
    "plugin:jest/recommended",
    "plugin:react-hooks/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": "./tsconfig.json"
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "jest",
    "unused-imports"
  ],
  rules: {
    "comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "ignore",
        "exports": "always-multiline",
        "functions": "ignore"
    }],
    "@typescript-eslint/promise-function-async": 0,
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "args": "after-used",
        "argsIgnorePattern": "^_",
        "vars": "all",
        "varsIgnorePattern": "^_"
      }
    ]
  },
  ignorePatterns: [".eslintrc.js"]
}

module.exports = config
