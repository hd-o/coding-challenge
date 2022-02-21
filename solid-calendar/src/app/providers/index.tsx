import { MuiAdapterDateFnsCtx } from '/src/pkg/mui/AdapterDateFns'
import { MuiLocalizationProviderCtx } from '/src/pkg/mui/LocalizationProvider'
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
  const AdapterDateFns = useContext(MuiAdapterDateFnsCtx)
  const LocalizationProvider = useContext(MuiLocalizationProviderCtx)
  const QueryClient = useContext(ReactQueryQueryClientCtx)
  const QueryClientProvider = useContext(ReactQueryQueryClientProviderCtx)
  const IntlProvider = useContext(ReactIntlIntlProviderCtx)
  const queryClient = useMemo(() => new QueryClient(), [QueryClient])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>
        <IntlProvider {...props.intl}>
          {props.children}
        </IntlProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  )
}

export const AppProvidersCtx = createContext(AppProviders)
