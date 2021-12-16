import { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { NextHeadCtx } from '~/pkg/next/Head'
import { ReactIntlIntlProviderCtx } from '~/pkg/react-intl/IntlProvider'
import { ReactQueryQueryClientCtx } from '~/pkg/react-query/QueryClient'
import { ReactQueryQueryClientProviderCtx } from '~/pkg/react-query/QueryClientProvider'
import { AppProvidersProps } from './props'

interface Props extends AppProvidersProps {}

function AppProviders (props: PropsWithChildren<Props>): JSX.Element {
  const Head = useContext(NextHeadCtx)
  const QueryClient = useContext(ReactQueryQueryClientCtx)
  const QueryClientProvider = useContext(ReactQueryQueryClientProviderCtx)
  const IntlProvider = useContext(ReactIntlIntlProviderCtx)
  const queryClient = useMemo(() => new QueryClient(), [QueryClient])

  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider {...props.intl}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
        </Head>
        {props.children}
      </IntlProvider>
    </QueryClientProvider>
  )
}

export const AppProvidersCtx = createContext(AppProviders)
