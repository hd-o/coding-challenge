// @ts-check

const base = require('../../../../.shared/node/config/eslint/react')

/**
 * @type {import('eslint').Linter.Config}
 */
const eslintrc = {
  ...base.eslintrc,
  extends: [
    ...base.eslintrc.extends,
    "next/core-web-vitals"
  ],
  ignorePatterns: [
    ...base.eslintrc.ignorePatterns,
    'next-env.d.ts',
    '**/*.js'
  ],
  rules: {
    ...base.eslintrc.rules,
    '@typescript-eslint/consistent-type-assertions': 0,
  },
}

base.writeEslintrc(eslintrc)
