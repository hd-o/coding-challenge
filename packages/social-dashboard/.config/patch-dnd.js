// Temporary monkey patch
// Remove invariant check from dnd-core
// Prevent https://github.com/react-dnd/react-dnd/issues/763

const fs = require('fs')
const path = require('path')

const dndCorePath = 'node_modules/.pnpm/dnd-core@15.1.1/'
const hoverFilePath = 'node_modules/dnd-core/dist/esm/actions/dragDrop/hover.mjs'
const filePath = path.resolve(process.cwd(), `${dndCorePath}${hoverFilePath}`)

if (!fs.existsSync(filePath)) {
  console.error('DnD file not found')
  process.exit(1)
}

const content = fs.readFileSync(filePath).toString()
const invariantLineContent = `invariant(target, 'Expected targetIds to be registered.');`
const updatedContent = content.replace(invariantLineContent, '')

fs.writeFileSync(filePath, updatedContent)

console.log('Patched DnD \n')
