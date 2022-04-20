import Image from 'next/image'
import { FC } from 'react'
import { IconProps } from '../'

export const EtherscanIcon: FC<IconProps> = (props) =>
  <Image {...props} alt='Etherscan logo' src='/image/etherscan.svg' />

export const EtherscanIconLight: FC<IconProps> = (props) =>
  <Image {...props} alt='Etherscan logo' src='/image/etherscan-light.svg' />
