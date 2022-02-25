import { ReactIntlIntlProviderCtx } from '/src/pkg/react-intl/IntlProvider'
import { createContext, PropsWithChildren, useContext } from 'react'

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
