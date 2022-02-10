import { InitialOptionsTsJest } from 'ts-jest'
import unitConfig from '../unit/jest.config'

const config: InitialOptionsTsJest = {
  ...unitConfig,
  globals: {
    ...unitConfig.globals,
    'ts-jest': {
      ...unitConfig.globals?.['ts-jest'],
      tsconfig: '<rootDir>/tests/feature/tsconfig.json'
    }
  },
  testMatch: [
    '<rootDir>/tests/feature/**/*.test.ts'
  ]
}

export default config
