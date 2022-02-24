// @ts-check

const base = require('../../../.shared/node/config/jest')

base.writeJestConfig({
  ...base.config,
  setupFilesAfterEnv: [
    './spec/setup.ts'
  ],
  testEnvironment: 'jsdom',
})
