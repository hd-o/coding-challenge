import Image from 'next/image'
import { FC } from 'react'
import { IconProps } from '../'

export const OpenSeaIcon: FC<IconProps> = (props) =>
  <Image {...props} alt='OpenSea logo' src='/image/opensea.svg' />
