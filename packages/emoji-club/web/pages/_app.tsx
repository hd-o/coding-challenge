import '/src/style/index.css'
import { App, Intl, IntlMessages } from '/src/app'
import { NextPage } from 'next'
import NextApp, { AppContext, AppProps } from 'next/app'

interface Props extends AppProps {
  intl: Intl
}

const EmojiClubApp: NextPage<Props> = (props) => {
  const { Component, pageProps } = props

  return (
    <App
      Component={() => <Component {...pageProps} />}
      intl={props.intl}
    />
  )
}

EmojiClubApp.getInitialProps = async (ctx): Promise<any> => {
  const appCtx = ctx as unknown as AppContext
  const appProps = await NextApp.getInitialProps(appCtx)

  const { locale = 'en-US' } = appCtx.router
  const messages: IntlMessages = await import(`/lang/${locale}.json`)

  return {
    ...appProps,
    intl: { locale, messages },
  }
}

export default EmojiClubApp
