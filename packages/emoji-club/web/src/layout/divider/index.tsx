import { MuiDividerCtx } from '/src/pkg/mui/Divider'
import { createContext, FC, useContext } from 'react'

const LayoutDivider: FC = () => {
  const Divider = useContext(MuiDividerCtx)

  return <Divider sx={{ background: theme => theme.background.divider }} />
}

export const LayoutDividerCtx = createContext(LayoutDivider)
