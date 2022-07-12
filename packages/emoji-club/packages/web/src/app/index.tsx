import { themes } from '/src/style/theme'
import Head from 'next/head'
import { FC, useEffect, useState } from 'react'
import { IntlProvider, useIntl } from 'react-intl'
import { ThemeProvider } from '@mui/material'
import { useThemeTypeSubject } from '../style/theme/type/subject'
import { intlIds } from '../util/intl-messages'
import { useResolveBehaviorState } from '../util/use-resolve-behavior-state'

export interface IntlMessages {
  [id: string]: string
}

export interface Intl {
  locale: string
  messages: IntlMessages
}

interface Props {
  Component: FC
  intl: Intl
}

const Content: FC<Props> = (props) => {
  const intl = useIntl()

  // Disable Content SSR
  // Prevent React hydration mismatch because of app
  // using values from localStorage for initial render
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [setIsClient])
  const Component = isClient ? props.Component : () => null

  return (
    <>
      <Head>
        <title>
          {intl.formatMessage({ id: intlIds.title })}
        </title>
        <meta
          name='description'
          content={intl.formatMessage({ id: intlIds.description })}
        />
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>
      <Component />
    </>
  )
}

export const App: FC<Props> = (props) => {
  const [themeType] = useResolveBehaviorState(useThemeTypeSubject)

  return (
    <IntlProvider messages={props.intl.messages} locale={props.intl.locale}>
      <ThemeProvider theme={themes[themeType]}>
        <Content {...props} />
      </ThemeProvider>
    </IntlProvider>
  )
}
