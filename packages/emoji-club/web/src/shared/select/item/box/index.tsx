import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { createContext, FC, useContext } from 'react'

const SharedSelectItemBox: FC = (props) => {
  const Box = useContext(MuiBoxCtx)
  return <Box
    {...props}
    sx={{
      width: '100%',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'middle',
    }}
  />
}

export const SharedSelectItemBoxCtx = createContext(SharedSelectItemBox)
