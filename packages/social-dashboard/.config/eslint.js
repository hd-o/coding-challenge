// @ts-check

const base = require('../../../.shared/node/config/eslint/react')

/**
 * @type {typeof base['eslintrc']}
 */
const eslintrc = {
  ...base.eslintrc,
  ignorePatterns: [
    ...base.eslintrc.ignorePatterns,
    'next-env*',
    'next.config*'
  ]
}

base.writeEslintrc(eslintrc)
