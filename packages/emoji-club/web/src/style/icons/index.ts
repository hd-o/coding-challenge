import { ImageProps } from 'next/image'

export type IconProps = Omit<ImageProps, 'src' | 'alt'>
