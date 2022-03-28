// @ts-check

const base = require('../../../.shared/node/config/jest')

/**
 * @type {typeof base['config']}
 */
const config = {
  ...base.config,
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  testEnvironment: 'jsdom'
}

base.writeJestConfig(config)
