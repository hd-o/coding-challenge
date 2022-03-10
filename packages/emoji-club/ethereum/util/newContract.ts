import { EmojiClub } from '../typechain'
import { useHardhatEthers } from './pkg/hardhat/ethers'
import { Use } from './resolve'

export type NewContract = () => Promise<EmojiClub>

export const useNewContract: Use<NewContract> = (resolve) => {
  const ethers = resolve(useHardhatEthers)

  const newContract: NewContract = async () => {
    const EmojiClub = await ethers.getContractFactory('EmojiClub')
    const emojiClub = await EmojiClub.deploy()
    await emojiClub.deployed()
    return emojiClub
  }

  return newContract
}
