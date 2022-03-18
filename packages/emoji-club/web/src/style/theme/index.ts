import { createTheme, Theme } from '@mui/material/styles'

type Color = string

interface AppTheme {
  background: {
    divider: Color
    layout: Color
    layoutBox: Color
  }
  text: {
    primary: Color
  }
}

declare module '@mui/material/styles' {
  interface Theme extends AppTheme {}
  interface ThemeOptions extends AppTheme {}
}

const dark = createTheme({
  background: {
    divider: '#333',
    layout: '#555',
    layoutBox: '#222',
  },
  text: {
    primary: '#fff',
  },
})

const light = createTheme({
  background: {
    divider: '#eee',
    layout: '#eee',
    layoutBox: '#fff',
  },
  text: {
    primary: '#111',
  },
})

export const themeTypes = ['dark', 'light'] as const

export type ThemeType = (typeof themeTypes)[number]

export const themes: Record<ThemeType, Theme> = { dark, light }
