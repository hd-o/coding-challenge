import { Theme } from '@mui/material/styles'
import { dark } from './dark'
import { light } from './light'

export type ThemeType = Theme['palette']['mode']

export const themeTypes: readonly ThemeType[] = ['dark', 'light']

export const themes: Record<ThemeType, Theme> = { dark, light }
