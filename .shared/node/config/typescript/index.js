// @ts-check

const { writeConfig } = require('../write')

/**
 * @type {import('../../type/tsconfig').TsConfig}
 */
const tsconfig = {
  compilerOptions: {
    allowJs: true,
    baseUrl: '.',
    downlevelIteration: true,
    emitDecoratorMetadata: true,
    esModuleInterop: true,
    experimentalDecorators: true,
    forceConsistentCasingInFileNames: true,
    incremental: true,
    isolatedModules: true,
    jsx: 'react-jsx',
    lib: [
      'ES6',
      'DOM',
      'DOM.Iterable'
    ],
    module: 'CommonJS',
    moduleResolution: 'Node',
    noEmit: true,
    paths: {
      '/*': [
        '*',
      ],
    },
    resolveJsonModule: true,
    skipLibCheck: true,
    sourceMap: true,
    strict: true,
    target: 'ES2020',
  },
  exclude: [
    '.cache',
    'dist',
    'node_modules',
  ],
}

const writeTsConfig =
  (config = tsconfig, path = './tsconfig.json') => writeConfig(config, path)

module.exports = { tsconfig, writeTsConfig }
