import { createTheme, Theme } from '@mui/material'

const darkPalette: {
  background: Theme['palette']['background']
  text: Theme['palette']['text']
} = {
  text: {
    primary: '#eee',
    secondary: '#ccc',
    disabled: '#aaa',
  },
  background: {
    default: '#444',
    paper: '#222',
  },
}

export const dark = createTheme({
  name: 'dark',
  components: {
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
          backgroundColor: '#111',
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
  },
  palette: {
    ...darkPalette,
    info: {
      contrastText: darkPalette.text.secondary,
      dark: darkPalette.background.default,
      main: darkPalette.text.secondary,
      light: darkPalette.text.secondary,
    },
  },
})
