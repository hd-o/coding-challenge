// @ts-check
/** @typedef {import('../../ethereum/package.json')['scripts']['deploy']} deploy */

const dotenv = require('dotenv')

const contractAddressUndefined = 'contract_address_undefined'

/** @type {(msTime: number) => Promise<any>} */
const wait = (msTime) => new Promise(resolve => setTimeout(resolve, msTime))

/** @type {(v: string) => void} */
const log = (v) => console.log(`verifyContractInfo: ${v}`)

/**
 * Verify environment variable set by hardhat.
 * These values are needed for web app runtime
 * @see {deploy}
 */
const verifyContractInfo = async () => {
  log('verifying contract info')

  const verify = async (attempt = 1) => {
    if (attempt === 4) {
      log(`error:${contractAddressUndefined}\n`)
      throw new Error(contractAddressUndefined)
    }

    /** @type {(msg: string) => Promise<any>} */
    const retry = async (msg) => {
      log(`${msg}, retrying (${attempt})`)
      return wait(3000).then(() => verify(attempt+1))
    }

    dotenv.config()
    const contractAddress = process.env.HARDHAT_CONTRACT_ADDRESS

    if (contractAddress === undefined) {
      return retry('contract address undefined')
    }
  }

  return verify()
}

module.exports = {
  verifyContractAddress: verifyContractInfo
}
