import { InitialOptionsTsJest } from 'ts-jest'

const config: InitialOptionsTsJest = {
  globals: {
    'ts-jest': {
      babelConfig: '<rootDir>/.babelrc',
      tsconfig: '<rootDir>/tsconfig.json'
    }
  },
  moduleDirectories: [
    '<rootDir>/node_modules'
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1',
    '~/(.*)': '<rootDir>/modules/$1'
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.ts'
  ],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/modules/**/*.test.ts'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/'
  ],
  rootDir: '../../'
}

export default config
