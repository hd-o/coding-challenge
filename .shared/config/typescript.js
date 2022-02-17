// @ts-check

const { writeConfig } = require('./writeConfig')

/**
 * @type {import('../type/tsconfig').TsConfig}
 */
const tsconfig = {
  compilerOptions: {
    allowJs: true,
    baseUrl: './',
    downlevelIteration: true,
    emitDecoratorMetadata: true,
    esModuleInterop: true,
    experimentalDecorators: true,
    forceConsistentCasingInFileNames: true,
    incremental: true,
    isolatedModules: true,
    jsx: 'react-jsx',
    module: 'ESNext',
    moduleResolution: 'Node',
    noEmit: true,
    paths: {
      '/*': [
        './src/*',
      ],
    },
    resolveJsonModule: true,
    skipLibCheck: true,
    strict: true,
    target: 'ES2020',
  },
  exclude: [
    '.cache',
    'dist',
    'node_modules',
  ],
  include: [
    '/**/*.ts',
    '/**/*.tsx',
  ],
}

const writeTsConfig = () => writeConfig(tsconfig, './tsconfig.json')

module.exports = { tsconfig, writeTsConfig }
