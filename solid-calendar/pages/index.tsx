import { useContext, useEffect } from 'react'
import { CalendarCtx } from '~/calendar'
import { ContainerBoxCtx } from '~/container/box'
import { IntroStartCtx } from '~/intro/start'
import { MuiTypographyCtx } from '~/pkg/mui/Typography'
import { NextHeadCtx } from '~/pkg/next/Head'
import { ReactIntlUseIntlCtx } from '~/pkg/react-intl/useIntl'

export default function IndexPage (): JSX.Element {
  const Calendar = useContext(CalendarCtx)
  const ContainerBox = useContext(ContainerBoxCtx)
  const Head = useContext(NextHeadCtx)
  const Typography = useContext(MuiTypographyCtx)

  const intl = useContext(ReactIntlUseIntlCtx)()
  const introStart = useContext(IntroStartCtx)()

  useEffect(introStart, [introStart])

  return (
    <div>
      <Head>
        {/* icon by https://www.freepik.com/ */}
        <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='64x64' href='/icons/favicon-64x64.png' />
        <title>
          { intl.formatMessage({ id: 'page-title' }) }
        </title>
      </Head>
      <ContainerBox sx={{ maxWidth: 'calc(100vh + 50px)' }}>
        <Typography variant='h5' component='h4'>
          📅 { intl.formatMessage({ id: 'calendar' }) }
        </Typography>
        <Calendar />
      </ContainerBox>
    </div>
  )
}
