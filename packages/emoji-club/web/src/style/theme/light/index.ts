import { createTheme, Theme } from '@mui/material'

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
    paper: '#eee',
  },
  text: {
    disabled: '#777',
    primary: '#222',
    secondary: '#444',
  },
}

export const light = createTheme({
  name: 'light',
  components: {
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
    MuiTable: {
      styleOverrides: {
        root: {
          '& th': {
            borderBottom: 'none',
          },
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
  palette: lightPalette,
})
