import { createContext, PropsWithChildren, useContext } from 'react'
import { ReactIntlIntlProviderCtx } from '~/pkg/react-intl/IntlProvider'

interface Props {
  locale: string
  messages: Record<string, string>
}

function LangProvider (props: PropsWithChildren<Props>): JSX.Element {
  const IntlProvider = useContext(ReactIntlIntlProviderCtx)
  return (
    <IntlProvider messages={props.messages} locale={props.locale}>
      {props.children}
    </IntlProvider>
  )
}

export const LangProviderCtx = createContext(LangProvider)
