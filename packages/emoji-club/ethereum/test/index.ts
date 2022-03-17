import { expect } from 'chai'
import { Container } from 'inversify'
import { EmojiClub } from '../typechain'
import { useEmojiClub } from '../util/emojiClub'
import { Mint, useMint } from '../util/mint'
import { useNewContract } from '../util/newContract'
import { Ethers, useHardhatEthers } from '../util/pkg/hardhat/ethers'
import { Resolve, resolve as resolver } from '../util/resolve'
import { ToNumbers, useToNumbers } from '../util/toNumbers'

let container: Container
let emojiClub: EmojiClub
let ethers: Ethers
let mint: Mint
let resolve: ReturnType<Resolve>
let toNumbers: ToNumbers

beforeEach(async () => {
  container = new Container()
  resolve = resolver(container)
  emojiClub = await resolve(useNewContract)()
  container.bind(useEmojiClub).toConstantValue(emojiClub)
  ethers = resolve(useHardhatEthers)
  toNumbers = resolve(useToNumbers)
  mint = resolve(useMint)
})

describe('EmojiClub', () => {
  it('compiles', async () => {
    const [owner] = await ethers.getSigners()
    const ownerBalance = await emojiClub.balanceOf(owner.address)
    expect(ownerBalance).to.equal(0)
  })
  it('mints tokens', async () => {
    const [user1, user2] = await ethers.getSigners()
    await mint(user1.address)
    await mint(user2.address)
    expect(await emojiClub.balanceOf(user1.address)).to.equal(1)
    expect(await emojiClub.balanceOf(user2.address)).to.equal(1)
  })
  it('returns user tokens', async () => {
    const [user1, user2] = await ethers.getSigners()
    // Mint two tokens for each user, in turn
    await mint(user1.address)
    await mint(user2.address)
    await mint(user1.address)
    await mint(user2.address)
    // Assert each user has two tokens
    const user1Tokens = await emojiClub.getTokens(user1.address).then(toNumbers)
    const user2Tokens = await emojiClub.getTokens(user2.address).then(toNumbers)
    expect(user1Tokens).to.deep.equal([0, 2])
    expect(user2Tokens).to.deep.equal([1, 3])
  })
  it('returns its total supply', async () => {
    const [, user] = await ethers.getSigners()
    await mint(user.address)
    await mint(user.address)
    await mint(user.address)
    expect(await emojiClub.totalSupply()).to.equal(3)
  })
  it('transfers tokens', async () => {
    const [user1, user2] = await ethers.getSigners()
    // Mint two tokens
    await mint(user1.address)
    await mint(user1.address)
    // Assert user2 has no tokens
    const user2Tokens = await emojiClub.getTokens(user2.address).then(toNumbers)
    expect(user2Tokens).to.deep.equal([])
    // Transfer second minted token
    const user1Conn = await emojiClub.connect(user1)
    await user1Conn['safeTransferFrom(address,address,uint256)'](user1.address, user2.address, 1)
    // Assert user2 has received the transferred token
    const updatedUser2Tokens = await emojiClub.getTokens(user2.address).then(toNumbers)
    expect(updatedUser2Tokens).to.deep.equal([1])
  })
})
