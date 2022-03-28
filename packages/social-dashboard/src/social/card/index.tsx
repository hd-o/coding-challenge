import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { MuiCardCtx } from '/src/pkg/mui/Card'
import { MuiCardContentCtx } from '/src/pkg/mui/CardContent'
import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { NextImageCtx } from '/src/pkg/next/Image'
import { ColorsCtx } from '/src/styles/colors'
import { useGetCountChange } from '/src/util/count-change'
import { intlIds } from '/src/util/intl-messages'
import { useResolved } from '/src/util/use-resolved'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useSocialNetworkColors } from '../network/colors'
import { SocialFollowerStats } from '../stats'

interface Props {
  id: string
  stats: SocialFollowerStats
}

const SocialCard: FC<Props> = (props) => {
  const Box = useContext(MuiBoxCtx)
  const Card = useContext(MuiCardCtx)
  const CardContent = useContext(MuiCardContentCtx)
  const colors = useContext(ColorsCtx)
  const getCountChange = useResolved(useGetCountChange)
  const Image = useContext(NextImageCtx)
  const socialNetworkColors = useResolved(useSocialNetworkColors)
  const Typography = useContext(MuiTypographyCtx)

  const intl = useIntl()

  const countChange = getCountChange(props.stats.dayCountChange)

  const usernameInfo = (
    <Box
      sx={{
        alignItems: 'middle',
        display: 'flex',
        justifyContent: 'center',
        margin: '15px 0',
      }}
    >
      <Image
        alt={`${props.stats.network} icon`}
        height={20}
        src={`/icons/icon-${props.stats.network}.svg`}
        width={20}
      />
      <Typography
        sx={{
          color: theme => colors[theme.text.secondary],
          fontWeight: 'bold',
          marginLeft: '10px',
        }}
        variant="caption"
      >
        {props.stats.username}
      </Typography>
    </Box>
  )

  const followerCount = (
    <>
      <Typography
        sx={{
          color: theme => colors[theme.text.primary],
          fontWeight: 'bold',
        }}
        title={intl.formatMessage(
          { id: intlIds.followersCount },
          { count: props.stats.followerCount }
        )}
        variant="h2"
      >
        {
          intl.formatMessage(
            { id: intlIds.count },
            { count: props.stats.followerCount }
          )
        }
      </Typography>
      <Typography
        sx={{
          color: theme => colors[theme.text.secondary],
          letterSpacing: '5px',
          marginBottom: '20px',
        }}
        variant="subtitle2"
      >
        {intl
          .formatMessage({ id: intlIds.followers })
          .toUpperCase()
        }
      </Typography>
    </>
  )

  const countChangeInfo = (
    <Typography
      sx={{
        color: theme => colors[
          theme.changeColor[countChange.type] ??
          theme.text.primary
        ],
        fontWeight: 'bold',
      }}
      title={intl.formatNumber(props.stats.dayCountChange)}
      variant="caption"
    >
      {countChange.icon}
      {' '}
      {intl.formatMessage(
        { id: intlIds.countToday },
        { count: props.stats.dayCountChange }
      )}
    </Typography>
  )

  return (
    <Box data-testid={`social-card-${props.id}`}>
      <Card
        sx={{
          cursor: 'pointer',
          backgroundColor: theme => colors[theme.background.socialCard],
          paddingBottom: '10px',
        }}
      >
        <hr
          style={{
            background: socialNetworkColors[props.stats.network],
            border: 'none',
            borderRadius: '10px 10px 0px 0px',
            height: '5px',
            margin: 0,
            outline: 'none',
          }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          {usernameInfo}
          {followerCount}
          {countChangeInfo}
        </CardContent>
      </Card>
    </Box>
  )
}

export const SocialCardCtx = createContext(SocialCard)
