import { ethers } from 'hardhat'
import { Use } from '../../resolve'

export type Ethers = typeof ethers

export const useHardhatEthers: Use<Ethers> = () => ethers
