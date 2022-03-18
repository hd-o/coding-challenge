import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { MuiBoxCtx } from '../pkg/mui/Box'
import { MuiTypographyCtx } from '../pkg/mui/Typography'
import { ThemeSwitchCtx } from '../style/theme/switch'
import { intlIds } from '../util/intl-messages'
import { ViewSelectCtx } from '../view/select'
import { LayoutDividerCtx } from './divider'

const Layout: FC = (props) => {
  const Box = useContext(MuiBoxCtx)
  const LayoutDivider = useContext(LayoutDividerCtx)
  const ThemeSwitch = useContext(ThemeSwitchCtx)
  const Typography = useContext(MuiTypographyCtx)
  const ViewSelect = useContext(ViewSelectCtx)

  const intl = useIntl()

  return (
    <Box
      color='text.primary'
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: theme => theme.palette.background.default,
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
          backgroundColor: 'background.paper',
          padding: '10px 10px 20px 10px',
          borderRadius: {
            sm: '5px',
          },
        }}
      >
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box>
            <Typography
              color='text.primary'
              variant='h4'
              sx={{
                paddingBottom: '5px',
              }}
            >
              😎 {intl.formatMessage({ id: intlIds.title })}
            </Typography>
          </Box>
          <ThemeSwitch />
        </Box>
        <LayoutDivider />
        <ViewSelect />
        {props.children}
      </Box>
    </Box>
  )
}

export const LayoutCtx = createContext(Layout)
