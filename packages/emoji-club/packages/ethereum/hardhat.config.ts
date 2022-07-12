import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import * as dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'
import accounts from './hardhat-accounts.json'

dotenv.config()

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  paths: {
    artifacts: './artifacts',
  },
  networks: {
    hardhat: {
      accounts: Object.values(accounts),
    },
  },
}

export default config
