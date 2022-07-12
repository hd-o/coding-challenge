// @ts-check
const { verifyContractAddress } = require('./scripts/verify-contract-info')

module.exports = async () => {
  await verifyContractAddress()

  /** @type {import('next').NextConfig} */
  const config = {
    reactStrictMode: true,
  }

  return config
}
