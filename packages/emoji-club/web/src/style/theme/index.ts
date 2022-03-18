import { Theme } from '@mui/material/styles'
import { dark } from './dark'
import { light } from './light'

interface AppTheme {
  name: string
}

declare module '@mui/material/styles' {
  interface Theme extends AppTheme { }
  interface ThemeOptions extends AppTheme { }
}

export const themeTypes = ['dark', 'light'] as const

export type ThemeType = (typeof themeTypes)[number]

export const themes: Record<ThemeType, Theme> = { dark, light }
