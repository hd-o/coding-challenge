// @ts-check

const base = require('../')
const { writeConfig } = require('../../write')

/**
 * @type {import('eslint').Linter.Config}
 */
const eslintrc = {
  ...base.eslintrc,
  extends: [
    ...base.eslintrc.extends,
    "plugin:react-hooks/recommended",
  ],
  plugins: [
    ...base.eslintrc.plugins,
    "react",
  ],
}

const writeEslintrc = (config = eslintrc) => writeConfig(config, './.eslintrc')

module.exports = { eslintrc, writeEslintrc }
