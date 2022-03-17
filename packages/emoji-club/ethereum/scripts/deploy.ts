import { ethers } from 'hardhat'
import { updateWebEnv } from './updateWebEnv'

async function main () {
  const EmojiClub = await ethers.getContractFactory('EmojiClub')
  const emojiClub = await EmojiClub.deploy()
  await emojiClub.deployed()
  updateWebEnv(emojiClub)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
