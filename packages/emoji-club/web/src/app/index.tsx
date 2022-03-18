import { FC, useContext } from 'react'
import { IntlProvider, useIntl } from 'react-intl'
import { NextHeadCtx } from '../pkg/next/Head'
import { intlIds } from '../util/intl-messages'

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
  const { Component } = props
  const Head = useContext(NextHeadCtx)

  const intl = useIntl()

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
  return (
    <IntlProvider messages={props.intl.messages} locale={props.intl.locale}>
      <Content {...props} />
    </IntlProvider>
  )
}
