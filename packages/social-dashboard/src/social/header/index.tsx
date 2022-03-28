import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { intlIds } from '/src/util/intl-messages'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { ColorsCtx } from '../../styles/colors'

const SocialHeader: FC = () => {
  const Box = useContext(MuiBoxCtx)
  const colors = useContext(ColorsCtx)
  const Typography = useContext(MuiTypographyCtx)

  const intl = useIntl()
  const pageTitle = intl.formatMessage({ id: intlIds.socialDashboardTitle })

  return (
    <Box
      sx={{
        marginBottom: {
          sm: 0,
          xs: 2,
        },
        paddingBottom: {
          sm: 0,
          xs: 2,
        },
        borderBottom: theme => ({
          sm: 'none',
          xs: `1px solid ${colors[theme.background.separatorLine]}`,
        }),
      }}
    >
      <Typography
        variant='h5'
        sx={{
          color: theme => colors[theme.text.primary],
          fontWeight: 'bold',
        }}
      >
        {pageTitle}
      </Typography>
      <Typography
        variant='caption'
        sx={{
          color: theme => colors[theme.text.secondary],
          fontWeight: 'bold',
        }}
      >
        {
          intl.formatMessage(
            { id: intlIds.totalFollowers },
            { count: 23004 }
          )
        }
      </Typography>
    </Box>
  )
}

export const SocialHeaderCtx = createContext(SocialHeader)
