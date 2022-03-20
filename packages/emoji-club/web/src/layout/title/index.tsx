import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { intlIds } from '/src/util/intl-messages'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'

const LayoutTitle: FC = () => {
  const Box = useContext(MuiBoxCtx)
  const Typography = useContext(MuiTypographyCtx)

  const intl = useIntl()

  return (
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
  )
}

export const LayoutTitleCtx = createContext(LayoutTitle)
