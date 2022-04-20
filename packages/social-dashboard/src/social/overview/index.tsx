import { colors } from '/src/styles/colors'
import { intlIds } from '/src/util/intl-messages'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { Typography } from '@mui/material'
import { SocialOverviewGrid } from './grid'

export const SocialOverview: FC = () => {
  const intl = useIntl()

  return (
    <>
      <Typography
        sx={{
          color: theme => colors[theme.text.primary],
          fontWeight: 'bold',
          marginTop: '50px',
        }}
        variant='h5'
      >
        {intl.formatMessage({ id: intlIds.overviewToday })}
      </Typography>
      <SocialOverviewGrid />
    </>
  )
}
