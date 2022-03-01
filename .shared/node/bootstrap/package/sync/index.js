const fs = require('node:fs')
const base = require('../package.json')
const packages = fs.readdirSync('./packages')

for (const package of packages) {
  const packagejsonPath = `./packages/${package}/package.json`
  const packagejson = fs.readFileSync(packagejsonPath).toString()
  const currentConfig = JSON.parse(packagejson)
  const config = {
    ...currentConfig,
    scripts: {
      ...currentConfig.scripts,
      ...base.scripts
    }
  }
  fs.writeFileSync(packagejsonPath, JSON.stringify(config, null, 2))
}
