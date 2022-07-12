import { Theme } from '@mui/material'

interface Shared {
  components: Theme['components']
}

export const sharedTheme: Shared = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: 'none',
          boxShadow: 'none',
          transition: 'none',
          '&:hover': {
            border: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          zIndex: 1,
          '&.Mui-focused': {
            color: 'inherit',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'inherit',
          textDecoration: 'none',
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
          paddingTop: '8px',
          paddingBottom: '8px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
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
  },
}
