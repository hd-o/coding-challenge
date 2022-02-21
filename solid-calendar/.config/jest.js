// @ts-check

const base = require('../../.shared/node/config/jest')

/**
 * @type {import('ts-jest/dist/types').InitialOptionsTsJest}
 */
const config = {
  ...base.config,
  globals: {
    ...base.config.globals,
    'ts-jest': {
      ...base.config.globals['ts-jest'],
      tsconfig: './spec/tsconfig.json',
    },
  },
  setupFilesAfterEnv: ['./spec/setup.ts'],
  testEnvironment: 'jsdom',
}

base.writeJestConfig(config)
