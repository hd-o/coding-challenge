import { createTheme, Theme } from '@mui/material/styles'
import { Color } from '../colors'

interface AppTheme {
  background: {
    layout: Color
    layoutTop: Color
    separatorLine: Color
    socialCard: Color
  }
  changeColor: {
    down?: Color
    none?: Color
    up?: Color
  }
  maxWidth: {
    layoutContainer: string
  }
  text: {
    primary: Color
    secondary: Color
  }
}

declare module '@mui/material/styles' {
  interface Theme extends AppTheme { }
  interface ThemeOptions extends AppTheme { }
}

const sharedText: AppTheme['text'] = {
  primary: 'White',
  secondary: 'Desaturated Blue',
}

const sharedChangeColor: AppTheme['changeColor'] = {
  down: 'Bright Red',
  up: 'Lime Green',
}

const sharedValues = {
  maxWidth: {
    layoutContainer: '1440px',
  },
}

const dark = createTheme({
  ...sharedValues,
  background: {
    layout: 'Very Dark Blue Primary',
    layoutTop: 'Very Dark Blue Secondary',
    separatorLine: 'Very Dark Greyish Blue',
    socialCard: 'Dark Desaturated Blue',
  },
  changeColor: sharedChangeColor,
  text: {
    ...sharedText,
    primary: 'White',
    secondary: 'Desaturated Blue',
  },
})

const light = createTheme({
  ...sharedValues,
  background: {
    layout: 'White',
    layoutTop: 'Very Pale Blue',
    separatorLine: 'Desaturated Blue',
    socialCard: 'Light Grayish Blue',
  },
  changeColor: sharedChangeColor,
  text: {
    ...sharedText,
    primary: 'Very Dark Blue Primary',
    secondary: 'Dark Grayish Blue',
  },
})

export const themeTypes = ['dark', 'light'] as const

export type ThemeType = (typeof themeTypes)[number]

export const themes: Record<ThemeType, Theme> = { dark, light }
