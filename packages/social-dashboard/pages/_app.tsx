import '/src/styles/index.css'
import { AppContainer, AppContainerProps, IntlMessages } from '/src/app'
import { newEmotionCache } from '/src/util/emotion-cache'
import { NextPage } from 'next'
import App, { AppContext, AppProps } from 'next/app'
import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

interface Props extends AppProps, AppContainerProps {
  emotionCache?: EmotionCache
}

// See './_document.tsx'
// Set-up emotion cache for MUI server-side rendering
const clientSideEmotionCache = newEmotionCache()

// Using NextPage for getInitialProps.
// Using NextPage instead of App, to not declare a class,
// using App requires CustomApp to be a class type
const CustomApp: NextPage<Props> = (props) => {
  const { emotionCache = clientSideEmotionCache } = props

  return (
    <CacheProvider value={emotionCache}>
      <AppContainer {...props} />
    </CacheProvider>
  )
}

// Access cookies for correct theme SSR
CustomApp.getInitialProps = async (ctx): Promise<any> => {
  const appCtx = ctx as unknown as AppContext
  const appProps = await App.getInitialProps(appCtx)

  const { locale = 'en-US' } = appCtx.router
  const messages: IntlMessages = await import(`/lang/${locale}.json`)

  return {
    ...appProps,
    intl: { locale, messages },
    cookie: appCtx.ctx.req?.headers.cookie ?? '',
  }
}

export default CustomApp
