import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '../public/global.css'
import NextApp, { AppContext, AppProps } from 'next/app'
import { useContext } from 'react'
import { AppProvidersCtx } from '~/app/providers'
import { AppProvidersProps } from '~/app/providers/props'
import { NextHeadCtx } from '~/pkg/next/Head'

interface Props extends AppProvidersProps {}

function App (props: AppProps & Props): JSX.Element {
  const { Component, intl } = props
  const AppProviders = useContext(AppProvidersCtx)
  const Head = useContext(NextHeadCtx)
  return (
    <AppProviders intl={intl}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <Component {...props.pageProps}/>
    </AppProviders>
  )
}

App.getInitialProps = async (app: AppContext): Promise<Props> => ({
  intl: await import(`../public/lang/${app.ctx.locale ?? 'en'}.json`),
  ...(await NextApp.getInitialProps(app))
})

export default App
