import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('EmojiClub', function () {
  test('Contract compiles', async function () {
    const EmojiClub = await ethers.getContractFactory('EmojiClub')
    const emojiClub = await EmojiClub.deploy('EmojiClub deploy')
    await emojiClub.deployed()
    expect(1).to.equal(1)
  })
})
