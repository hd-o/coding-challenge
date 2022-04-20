import { FC } from 'react'
import { Switch } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAppThemeState } from '../state'
import { useToggleTheme } from '../toggle'

const track = {
  borderRadius: 26 / 2,
  background: 'linear-gradient(90deg, hsl(210, 78%, 56%) 0%, hsl(146, 68%, 55%) 100%)',
  opacity: 1,
}

const BaseSwitch: FC = (props) => {
  const [theme] = useAppThemeState()
  const toggleTheme = useToggleTheme()

  return <Switch
    {...props}
    checked={theme === 'light'}
    disableRipple
    onClick={() => toggleTheme()}
    sx={{ m: 1 }}
  />
}

export const ThemeSwitch = styled(BaseSwitch)(({ theme }) => ({
  width: 42,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    '&.Mui-checked': {
      transform: 'translateX(21px)',
      '& .MuiSwitch-thumb': {
        color: '#fff',
      },
      '& + .MuiSwitch-track': track,
    },
  },
  '& .MuiSwitch-thumb': {
    color: '#393b56',
    height: 16,
    width: 16,
    transition: theme.transitions.create(['color']),
  },
  '& .MuiSwitch-track': track,
}))
