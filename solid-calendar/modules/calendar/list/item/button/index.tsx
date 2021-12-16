import { createContext, useContext } from 'react'
import { MuiListItemButtonCtx } from '~/pkg/mui/ListItemButton'
import { ListItemButtonProps } from '@mui/material'
import { useTheme } from '@mui/system'

function CalendarListItemButton (props: ListItemButtonProps): JSX.Element {
  const ListItemButton = useContext(MuiListItemButtonCtx)
  const theme = useTheme()

  return <ListItemButton
    {...props}
    sx={{
      color: '#222',
      padding: theme.spacing(0.4, 0.4),
      '& .MuiTouchRipple-root': {
        margin: 0
      },
      ...props.sx
    }}
  />
}

export const CalendarListItemButtonCtx = createContext(CalendarListItemButton)
