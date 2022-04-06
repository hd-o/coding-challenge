import { Use } from '/src/util/function-context/context'
import { BigNumber } from 'ethers'

export const useEthersBigNumber: Use<typeof BigNumber> = () => BigNumber
