import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { ThemeSwitchCtx } from '/src/style/theme/switch'
import { createContext, FC, useContext } from 'react'
import { LayoutTitleCtx } from '../title'

const LayoutHeader: FC = () => {
  const Box = useContext(MuiBoxCtx)
  const LayoutTitle = useContext(LayoutTitleCtx)
  const ThemeSwitch = useContext(ThemeSwitchCtx)

  return (
    <Box
      alignItems='center'
      display='flex'
      justifyContent='space-between'
      marginBottom='5px'
    >
      <LayoutTitle />
      <ThemeSwitch />
    </Box>
  )
}

export const LayoutHeaderCtx = createContext(LayoutHeader)
