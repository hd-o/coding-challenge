import { EmojiClub } from '../typechain'
import { useEthers } from './pkg/hardhat/ethers'
import { Use } from './resolve'

export type NewContract = () => Promise<EmojiClub>

export const useNewContract: Use<NewContract> = (resolve) => {
  const ethers = resolve(useEthers)

  const newContract: NewContract = async () => {
    const EmojiClub = await ethers.getContractFactory('EmojiClub')
    const emojiClub = await EmojiClub.deploy()
    await emojiClub.deployed()
    return emojiClub
  }

  return newContract
}
