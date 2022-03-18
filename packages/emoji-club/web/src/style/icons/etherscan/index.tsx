import Image from 'next/image'
import { createContext } from 'react'
import { IconProps } from '../'

export const EtherscanIconCtx = createContext(
  (props: IconProps) => <Image {...props} alt='Etherscan logo' src='/image/etherscan.svg' />
)

export const EtherscanIconLightCtx = createContext(
  (props: IconProps) => <Image {...props} alt='Etherscan logo' src='/image/etherscan-light.svg' />
)
