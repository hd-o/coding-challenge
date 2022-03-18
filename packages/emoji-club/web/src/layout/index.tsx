import { createContext, FC, useContext } from 'react'
import { MuiBoxCtx } from '../pkg/mui/Box'
import { MuiTypographyCtx } from '../pkg/mui/Typography'
import { ViewSelectCtx } from '../view/select'
import { LayoutDividerCtx } from './divider'

const Layout: FC = (props) => {
  const Box = useContext(MuiBoxCtx)
  const LayoutDivider = useContext(LayoutDividerCtx)
  const Typography = useContext(MuiTypographyCtx)
  const ViewSelect = useContext(ViewSelectCtx)

  return (
    <Box
      sx={{
        color: theme => theme.text.primary,
        width: '100vw',
        height: '100vh',
        backgroundColor: theme => theme.background.layout,
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          margin: {
            sm: '20px auto',
          },
          maxWidth: {
            sm: '500px',
          },
          minWidth: '360px',
          background: theme => theme.background.layoutBox,
          padding: '10px 10px 20px 10px',
          borderRadius: {
            sm: '5px',
          },
        }}
      >
        <Typography variant='h4'>
          😜 Emoji Club
        </Typography>
        <LayoutDivider />
        <ViewSelect />
        {props.children}
      </Box>
    </Box>
  )
}

export const LayoutCtx = createContext(Layout)
