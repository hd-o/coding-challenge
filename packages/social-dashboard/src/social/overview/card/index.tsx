import { colors } from '/src/styles/colors'
import { useGetCountChange } from '/src/util/count-change'
import { intlIds } from '/src/util/intl-messages'
import { useResolved } from '/src/util/use-resolved'
import Image from 'next/image'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { SocialOverviewStats } from '../../stats'

interface Props {
  id: string
  stats: SocialOverviewStats
}

export const SocialOverviewCard: FC<Props> = (props) => {
  const getCountChange = useResolved(useGetCountChange)

  const intl = useIntl()

  const countChange = getCountChange(props.stats.dayCountChange)

  const title = (
    <Box
      sx={{
        alignItems: 'middle',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        sx={{
          color: theme => colors[theme.text.secondary],
          fontWeight: 'bold',
        }}
        variant="body2"
      >
        {intl.formatMessage({ id: props.stats.statTitle })}
      </Typography>
      <Box height={20} width={20}>
        <Image
          alt={`${props.stats.network} icon`}
          height={20}
          src={`/icons/icon-${props.stats.network}.svg`}
          title={intl.formatMessage({ id: props.stats.network })}
          width={20}
        />
      </Box>
    </Box>
  )

  const description = (
    <Box
      sx={{
        alignItems: 'end',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '15px 0 0 0',
      }}
    >
      <Typography
        sx={{
          color: theme => colors[theme.text.primary],
          fontWeight: 'bold',
        }}
        title={intl.formatNumber(props.stats.statCount)}
        variant="h5"
      >
        {intl.formatMessage(
          { id: intlIds.count },
          { count: props.stats.statCount }
        )}
      </Typography>
      <Typography
        sx={{
          color: theme => colors[
            theme.changeColor[countChange.type] ??
            theme.text.primary
          ],
          fontWeight: 'bold',
        }}
        variant="caption"
      >
        {countChange.icon}
        {' '}
        {intl.formatMessage(
          { id: intlIds.countPercent },
          { count: props.stats.dayCountChange / 100 }
        )}
      </Typography>
    </Box>
  )

  return (
    <Box data-testid={`social-overview-card-${props.id}`}>
      <Card
        sx={{
          backgroundColor: theme => colors[theme.background.socialCard],
          padding: '8px 5px',
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Stack spacing={2}>
            {title}
            {description}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
