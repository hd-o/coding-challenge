import { mergeDeepRight } from 'ramda'
import { createTheme, Theme, ThemeOptions } from '@mui/material'
import { grey } from '@mui/material/colors'
import { sharedTheme } from '../shared'

const darkPalette: {
  background: Theme['palette']['background']
  text: Theme['palette']['text']
} = {
  text: {
    primary: grey[50],
    secondary: grey[200],
    disabled: grey[400],
  },
  background: {
    default: '#111',
    paper: '#222',
  },
}

const darkAppOptions: Theme['app'] = {
  layoutSectionPaper: '#181818',
  layoutSectionPaperHover: '#111',
  textListItem: '#111',
}

const darkThemeOptions: ThemeOptions = {
  app: darkAppOptions,
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#222',
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
          backgroundColor: darkAppOptions.layoutSectionPaper,
          '&:hover': {
            backgroundColor: darkAppOptions.layoutSectionPaperHover,
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          background: '#333',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          fill: darkPalette.text.secondary,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: darkPalette.background.default,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.MuiTableRow-hover:hover': {
            backgroundColor: 'rgba(30, 30, 30, 0.5)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${darkPalette.background.paper}`,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: '#111',
        },
        actions: {
          '& .MuiIconButton-root': {
            color: darkPalette.text.secondary,
          },
          '& .MuiIconButton-root.Mui-disabled': {
            opacity: 0.3,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: darkPalette.text.primary,
        },
      },
    },
  },
  palette: {
    ...darkPalette,
    mode: 'dark',
    info: {
      contrastText: darkPalette.text.secondary,
      dark: darkPalette.background.default,
      main: darkPalette.text.secondary,
      light: darkPalette.text.secondary,
    },
    primary: {
      contrastText: darkPalette.text.secondary,
      dark: '#1d4175',
      main: '#2b538f',
      light: darkPalette.text.secondary,
    },
    secondary: {
      contrastText: darkPalette.text.secondary,
      dark: '#232323',
      main: '#2a2a2a',
      light: darkPalette.text.secondary,
    },
  },
}

const darkTheme = mergeDeepRight(sharedTheme, darkThemeOptions)

export const dark = createTheme(darkTheme as ThemeOptions)
