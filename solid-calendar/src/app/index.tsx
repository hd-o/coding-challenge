import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import 'regenerator-runtime/runtime'
import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { CalendarCtx } from '../calendar'
import { ContainerBoxCtx } from '../container/box'
import { IntroStartCtx } from '../intro/start'
import { MuiTypographyCtx } from '../pkg/mui/Typography'
import { ReactIntlUseIntlCtx } from '../pkg/react-intl/useIntl'

export const App: FC = () => {
  const Calendar = useContext(CalendarCtx)
  const ContainerBox = useContext(ContainerBoxCtx)
  const intl = useContext(ReactIntlUseIntlCtx)()
  const introStart = useContext(IntroStartCtx)()
  const Typography = useContext(MuiTypographyCtx)
  
  useEffect(introStart)

  return (
    <>
      <Helmet>
        <title>
          { intl.formatMessage({ id: 'page-title' }) }
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Helmet>
      <ContainerBox sx={{ maxWidth: 'calc(100vh + 50px)' }}>
        <Typography variant='h5' component='h4'>
          📅 { intl.formatMessage({ id: 'calendar' }) }
        </Typography>
        <Calendar />
      </ContainerBox>
    </>
  )
}
