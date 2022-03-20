import { createContext, FC, useContext } from 'react'
import { MuiDividerCtx } from '../../pkg/mui/Divider'

const LayoutDivider: FC = () => {
  const Divider = useContext(MuiDividerCtx)

  return <Divider
    sx={{
      // background: theme => theme.background.divider,
      marginBottom: '5px',
    }}
  />
}

export const LayoutDividerCtx = createContext(LayoutDivider)
