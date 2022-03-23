import { Use } from '/src/util/function-context/context'
import { providers } from 'ethers'

// SSR
declare let globalThis: any

export const useEthereum: Use<providers.ExternalProvider> = () => globalThis.ethereum
