// @ts-check

const base = require('../../../.shared/node/config/jest')

/**
 * @type {import('ts-jest/dist/types').InitialOptionsTsJest}
 */
const config = {
  ...base.config,
  testEnvironment: 'jsdom'
}

base.writeJestConfig(config)
