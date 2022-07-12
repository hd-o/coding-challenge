import { mergeDeepRight } from 'ramda'
import { createTheme, Theme, ThemeOptions } from '@mui/material'
import { sharedTheme } from '../shared'

type Palette = Theme['palette']

const lightPalette: {
  background: Palette['background']
  common: Palette['common']
  text: Palette['text']
} = {
  common: {
    black: '#111',
    white: '#fafafa',
  },
  background: {
    default: '#fafafa',
    paper: '#e5e5e5',
  },
  text: {
    disabled: '#777',
    primary: '#333',
    secondary: '#555',
  },
}

const lightAppOptions: Theme['app'] = {
  layoutSectionPaper: '#f8f8f8',
  layoutSectionPaperHover: '#fff',
  textListItem: '#e5e5e5',
}

const lightThemeOptions: ThemeOptions = {
  app: lightAppOptions,
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#eee',
          '&:hover': {
            backgroundColor: 'rgba(144, 202, 249, 0.3)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(144, 202, 249, 0.1)',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(144, 202, 249, 0.3)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: lightAppOptions.layoutSectionPaper,
          '&:hover': {
            backgroundColor: lightAppOptions.layoutSectionPaperHover,
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          background: lightPalette.background.paper,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          fill: lightPalette.text.secondary,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: lightPalette.background.default,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${lightPalette.background.paper}`,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: lightPalette.background.default,
        },
        actions: {
          '& .MuiIconButton-root': {
            color: lightPalette.text.secondary,
          },
          '& .MuiIconButton-root.Mui-disabled': {
            opacity: 0.3,
          },
        },
      },
    },
  },
  palette: {
    ...lightPalette,
    mode: 'light',
    info: {
      contrastText: lightPalette.text.secondary,
      dark: lightPalette.background.default,
      main: lightPalette.text.secondary,
      light: lightPalette.text.secondary,
    },
    primary: {
      contrastText: '#fff',
      dark: '#3b72c2',
      main: '#427acd',
      light: '#eee',
    },
    secondary: {
      contrastText: lightPalette.text.secondary,
      dark: '#d7d7d7',
      main: '#e5e5e5',
      light: lightPalette.text.secondary,
    },
  },
}

const lightTheme = mergeDeepRight(sharedTheme, lightThemeOptions)

export const light = createTheme(lightTheme as ThemeOptions)
