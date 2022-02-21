import { ReactIntlIntlProviderCtx } from '/src/pkg/react-intl/IntlProvider'
import { ReactQueryQueryClientCtx } from '/src/pkg/react-query/QueryClient'
import { ReactQueryQueryClientProviderCtx } from '/src/pkg/react-query/QueryClientProvider'
import { createContext, FC, PropsWithChildren, useContext, useMemo } from 'react'

interface Props {
  intl: {
    locale: string
    messages: Record<string, string>
  }
}

const AppProviders: FC<Props> = (props) => {
  const QueryClient = useContext(ReactQueryQueryClientCtx)
  const QueryClientProvider = useContext(ReactQueryQueryClientProviderCtx)
  const IntlProvider = useContext(ReactIntlIntlProviderCtx)
  const queryClient = useMemo(() => new QueryClient(), [QueryClient])

  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider {...props.intl}>
        {props.children}
      </IntlProvider>
    </QueryClientProvider>
  )
}

export const AppProvidersCtx = createContext(AppProviders)
