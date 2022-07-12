import { Theme } from '@mui/material/styles'
import { dark } from './dark'
import { light } from './light'

type Color = string

interface AppTheme {
  app: {
    layoutSectionPaper: Color
    layoutSectionPaperHover: Color
    textListItem: Color
  }
}

declare module '@mui/material/styles' {
  interface Theme extends AppTheme { }
  interface ThemeOptions extends AppTheme { }
}

export type ThemeType = Theme['palette']['mode']

export const themeTypes: readonly ThemeType[] = ['dark', 'light']

export const themes: Record<ThemeType, Theme> = { dark, light }
