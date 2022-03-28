import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { createContext, FC, useContext } from 'react'
import { ColorsCtx } from '../../styles/colors'

const borderRadius = '16px'

const LayoutBackground: FC = () => {
  const Box = useContext(MuiBoxCtx)
  const colors = useContext(ColorsCtx)

  return <Box
    sx={{
      backgroundColor: theme => colors[theme.background.layoutTop],
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      height: '30vh',
      left: 0,
      minHeight: 300,
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 0,
    }}
  />
}

export const LayoutBackgroundCtx = createContext(LayoutBackground)
