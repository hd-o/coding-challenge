import { ethers } from 'hardhat'
import { Use } from '../../resolve'

export const useEthers: Use<typeof ethers> = () => ethers
