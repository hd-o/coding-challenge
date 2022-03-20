import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { createContext, FC, useContext } from 'react'

const LayoutBackground: FC = (props) => {
  const Box = useContext(MuiBoxCtx)
  return (
    <Box
      color='text.primary'
      sx={{
        backgroundColor: theme => theme.palette.background.default,
        height: '100vh',
        left: 0,
        overflow: 'auto',
        position: 'fixed',
        top: 0,
        width: '100vw',
      }}
    >
      {props.children}
    </Box>
  )
}

export const LayoutBackgroundCtx = createContext(LayoutBackground)
