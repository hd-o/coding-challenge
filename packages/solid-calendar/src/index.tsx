import en from '/src/lang/en.json'
import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { render } from 'react-dom'
import { App } from './app'
import { AppProvidersCtx } from './app/providers'
import { WeatherServerCtx } from './weather/server'

const Index: FC = () => {
  const AppProviders = useContext(AppProvidersCtx)
  const useWeatherServer = useContext(WeatherServerCtx)

  const [intlValue, setIntl] = useState<typeof en | undefined>()

  useMemo(() => useWeatherServer(), [useWeatherServer])

  useEffect(() => {
    // Can be substituted by:
    // https://nextjs.org/docs/advanced-features/i18n-routing
    void import('/src/lang/en.json').then((en) => {
      setIntl(en)
    })
  })

  if (intlValue === undefined) return <div>Loading...</div>

  return (
    <AppProviders intl={intlValue}>
      <App />
    </AppProviders>
  )
}

render(<Index />, document.getElementById('root'))
