// @ts-check

const base = require('../../../.shared/node/config/typescript')

/**
 * @type {typeof base['tsconfig']}
 */
const tsconfig = {
  ...base.tsconfig,
  compilerOptions: {
    ...base.tsconfig.compilerOptions,
    jsx: 'preserve',
  },
  include: [
    ...[].concat(base.tsconfig.include ?? []),
    'next-env.d.ts',
    '**/*.ts',
    '**/*.tsx'
  ],
}

base.writeTsConfig(tsconfig)

/**
 * @type {typeof base['tsconfig']}
 */
const specTsconfig = {
  ...tsconfig,
  compilerOptions: {
    ...tsconfig.compilerOptions,
    jsx: 'react-jsx',
  },
}

base.writeTsConfig(specTsconfig, './tsconfig.spec.json')
