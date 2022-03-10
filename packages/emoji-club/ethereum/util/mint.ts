import { ContractTransaction } from 'ethers'
import { ethers } from 'hardhat'
import { useEmojiClub } from './emojiClub'
import { Use } from './resolve'

export type Mint = (toAddress: string) => Promise<ContractTransaction>

export const useMint: Use<Mint> = (resolve) => {
  const emojiClub = resolve(useEmojiClub)

  const mint: Mint = (toAddress) => {
    return emojiClub.mint(toAddress, {
      value: ethers.utils.parseEther('1')
    })
  }

  return mint
}
