// @ts-check

const { writeFileSync } = require('node:fs')
const { resolve } = require('node:path')

/**
 * @type {(c: object, p: string) => void}
 */
const writeConfig = (config, path) => {
  writeFileSync(resolve(path), JSON.stringify(config, null, 2))
}

module.exports = { writeConfig }
