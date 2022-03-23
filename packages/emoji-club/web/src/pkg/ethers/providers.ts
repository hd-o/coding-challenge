import { Use } from '/src/util/function-context/context'
import { providers } from 'ethers'

export const useEthersProviders: Use<typeof providers> = () => providers
