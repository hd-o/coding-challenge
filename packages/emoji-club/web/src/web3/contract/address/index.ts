import { Use } from '/src/util/function-context/context'

const contractAddress = process.env.NEXT_PUBLIC_HARDHAT_CONTRACT_ADDRESS as string

export const useWeb3ContractAddress: Use<string> = () => contractAddress
