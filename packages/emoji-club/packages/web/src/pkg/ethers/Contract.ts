import { Use } from '/src/util/function-context/context'
import { Contract } from 'ethers'

export const useEthersContract: Use<typeof Contract> = () => Contract
