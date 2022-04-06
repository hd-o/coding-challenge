import { useEthersProviders } from '/src/pkg/ethers/providers'
import { useRxBindCallback } from '/src/pkg/rxjs/bindCallback'
import { useRxCombineLatest } from '/src/pkg/rxjs/combineLatest'
import { useRxOf } from '/src/pkg/rxjs/of'
import { useRxScan } from '/src/pkg/rxjs/scan'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { useRxSwitchMap } from '/src/pkg/rxjs/switchMap'
import { Use } from '/src/util/function-context/context'
import { providers } from 'ethers'
import { Observable } from 'rxjs'
import { useWeb3AccountsProxy } from '../accounts/proxy'
import { Web3Accounts } from '../accounts/stream'
import { useEthereum } from '../ethereum'

interface ProviderState {
  needsPageReload?: true
  provider?: providers.Web3Provider
}

type ChainId = string | undefined

interface ProviderScanProps {
  // Accounts received from web3 provider
  accounts?: Web3Accounts
  // Event emitted by web3 provider
  accountsChanged?: Web3Accounts
  // Event emitted by web3 provider
  chainChanged?: ChainId
  // The one and only
  provider: providers.Web3Provider
}

type ProviderScan =
  (value: ProviderState, props: ProviderScanProps) => ProviderState

type Provider$ = Observable<ProviderState>

export const useWeb3Provider$: Use<Provider$> = (resolve) => {
  const accountsProxy = resolve(useWeb3AccountsProxy)
  const ethereum = resolve(useEthereum)
  const providers = resolve(useEthersProviders)
  const bindCallback = resolve(useRxBindCallback)
  const combineLatest = resolve(useRxCombineLatest)
  const of = resolve(useRxOf)
  const scan = resolve(useRxScan)
  const startWith = resolve(useRxStartWith)
  const switchMap = resolve(useRxSwitchMap)

  /** @see {provider$} */
  const providerScan: ProviderScan = (value, props) => {
    const { accounts, accountsChanged, chainChanged } = props
    /**
     * Page reload is only needed when a change event
     * is emitted by the Web3Provider and there were
     * accounts loaded. If accounts were not already
     * loaded, then change events can be ignored.
     * @see {ProviderState}
     */
    const needsPageReload = accounts !== undefined &&
      (chainChanged !== undefined || accountsChanged !== undefined)
    return needsPageReload ? { needsPageReload: true } : value
  }

  const provider$ = of(new providers.Web3Provider(ethereum)).pipe(
    switchMap((provider) => {
      const providerOn = bindCallback(provider.on.bind(provider))
      return combineLatest({
        provider: of(provider),
        /**
         * @see ${providerScan} for why `accounts` and
         * change events are combined with `provider`
         */
        accounts: accountsProxy
          .pipe(startWith(undefined)),
        chainChanged: providerOn('chainChanged')
          .pipe(startWith(undefined)) as Observable<ChainId>,
        accountsChanged: providerOn('accountsChanged')
          .pipe(startWith(undefined)),
      }).pipe(
        scan(providerScan, { provider })
      )
    }),
  )

  return provider$
}
