import Image from 'next/image'
import { createContext } from 'react'
import { IconProps } from '../'

export const OpenSeaIconCtx = createContext(
  (props: IconProps) => <Image {...props} alt='OpenSea logo' src='/image/opensea.svg' />
)
