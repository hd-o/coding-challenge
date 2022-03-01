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
  maxWorkers: 4,
  moduleNameMapper: {
    '^/(.*)$': '<rootDir>/$1'
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "**/spec/**/*.test.t(s|sx)",
  ],
}

const writeJestConfig = (c = config) => writeConfig(c, './jest.config.json')

module.exports = { config, writeJestConfig }
