import { createContext, useContext } from 'react'
import { MuiListCtx } from '~/pkg/mui/List'
import { ListProps } from '@mui/material'
import { useTheme } from '@mui/system'

function DateGridCellList (props: ListProps): JSX.Element {
  const List = useContext(MuiListCtx)
  const theme = useTheme()
  return <List
    {...props}
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      padding: theme.spacing(3.6, 0.4, 0.4, 0.4),
      display: 'flex',
      flexDirection: 'column',
      ...props.sx
    }}
  />
}

export const DateGridCellListCtx = createContext(DateGridCellList)
