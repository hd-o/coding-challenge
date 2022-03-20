import { createTheme, Theme } from '@mui/material'
import { grey } from '@mui/material/colors'

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
    default: '#444',
    paper: '#222',
  },
}

export const dark = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'inherit',
          // backgroundColor: '#222',
          border: 'none',
          '&:hover': {
            // backgroundColor: 'rgba(10, 10, 10, 0.7)',
            border: 'none',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          zIndex: 1,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#222',
          paddingTop: '8px',
          paddingBottom: '8px',
          '&:hover': {
            backgroundColor: 'rgba(144, 202, 249, 0.3)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(10, 10, 10, 0.6)',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(144, 202, 249, 0.3)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: 'none',
        },
        root: {
          backgroundColor: '#222',
          '&:hover': {
            backgroundColor: '#1a1a1a',
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
          backgroundColor: '#111',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& th': {
            background: '#222',
            borderBottom: 'none',
          },
          '& .MuiTableRow-hover:hover': {

          },
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
})
