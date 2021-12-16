import { InitialOptionsTsJest } from 'ts-jest'

const config: InitialOptionsTsJest = {
  globals: {
    'ts-jest': {
      tsconfig: './tests/tsconfig.json'
    }
  },
  setupFilesAfterEnv: ['./tests/setup.ts'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/modules/$1',
    '@/(.*)': '<rootDir>/$1'
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/'
  ]
}

export default config
