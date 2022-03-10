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
    'next.config.js'
  ]
}

base.writeEslintrc(eslintrc)
