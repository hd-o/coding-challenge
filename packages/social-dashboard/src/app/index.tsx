import { AppProps } from 'next/app'
import { Cookies, CookiesProvider } from 'react-cookie'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { DndProvider } from 'react-dnd'
import { FC } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { IntlProvider } from 'react-intl'
import { themes } from '/src/styles/theme'
import { useAppThemeState } from '../styles/theme/state'
import Head from 'next/head'

export interface IntlMessages {
  [id: string]: string
}

export interface AppContainerProps {
  Component: AppProps['Component']
  cookie: string
  intl: {
    locale: string
    messages: IntlMessages
  }
  pageProps: any
}

const AppProviders: FC<AppContainerProps> = (props) => {
  const [theme] = useAppThemeState()
  return (
    <DndProvider backend={HTML5Backend}>
      <IntlProvider messages={props.intl.messages} locale={props.intl.locale}>
        <ThemeProvider theme={themes[theme]}>
          {props.children}
        </ThemeProvider>
      </IntlProvider>
    </DndProvider>
  )
}

export const AppContainer: FC<AppContainerProps> = (props) => {
  const { Component, pageProps } = props
  return (
    <CookiesProvider cookies={new Cookies(props.cookie)} >
      <AppProviders {...props}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
      </AppProviders>
    </CookiesProvider>
  )
}
