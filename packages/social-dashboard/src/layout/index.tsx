import { createContext, FC, useContext } from 'react'
import { MuiBoxCtx } from '../pkg/mui/Box'
import { ColorsCtx } from '../styles/colors'
import { LayoutBackgroundCtx } from './background'

const Layout: FC = (props) => {
  const Box = useContext(MuiBoxCtx)
  const colors = useContext(ColorsCtx)
  const LayoutBackground = useContext(LayoutBackgroundCtx)

  return (
    <Box
      sx={{
        backgroundColor: theme => colors[theme.background.layout],
        minHeight: '100vh',
        minWidth: 320,
        paddingBottom: '40px',
        width: '100%',
      }}
    >
      <LayoutBackground />
      <Box
        sx={{
          left: 0,
          position: 'relative',
          top: 0,
          width: '100%',
          zIndex: 1,
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export const LayoutCtx = createContext(Layout)
