const { writeConfig } = require('../write')

/**
 * @type {import('ts-jest/dist/types').InitialOptionsTsJest}
 */
const config = {
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    '^/(.*)$': '<rootDir>/$1'
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
}

const writeJestConfig = () => writeConfig(config, './jest.config.json')

module.exports = { config, writeJestConfig }
