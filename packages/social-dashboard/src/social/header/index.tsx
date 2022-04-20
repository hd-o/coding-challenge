import { intlIds } from '/src/util/intl-messages'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import { colors } from '../../styles/colors'

export const SocialHeader: FC = () => {
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
