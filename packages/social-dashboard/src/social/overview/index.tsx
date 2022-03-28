import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { ColorsCtx } from '/src/styles/colors'
import { intlIds } from '/src/util/intl-messages'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { SocialOverviewGridCtx } from './grid'

const SocialOverview: FC = () => {
  const colors = useContext(ColorsCtx)
  const SocialOverviewGrid = useContext(SocialOverviewGridCtx)
  const Typography = useContext(MuiTypographyCtx)

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

export const SocialOverviewCtx = createContext(SocialOverview)
