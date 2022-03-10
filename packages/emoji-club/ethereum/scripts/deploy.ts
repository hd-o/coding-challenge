import { ethers } from 'hardhat'

async function main () {
  const EmojiClub = await ethers.getContractFactory('EmojiClub')
  const emojiClub = await EmojiClub.deploy('EmojiClub deploy')
  await emojiClub.deployed()
  console.log('EmojiClub deployed to:', emojiClub.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
