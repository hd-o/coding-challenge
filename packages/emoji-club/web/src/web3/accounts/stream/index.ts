import { useRxExhaustMap } from '/src/pkg/rxjs/exhaustMap'
import { useRxFrom } from '/src/pkg/rxjs/from'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxMerge } from '/src/pkg/rxjs/merge'
import { useRxOf } from '/src/pkg/rxjs/of'
import { useRxShareReplay } from '/src/pkg/rxjs/shareReplay'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { useRxSwitchMap } from '/src/pkg/rxjs/switchMap'
import { useRxTake } from '/src/pkg/rxjs/take'
import { useRxWithLatestFrom } from '/src/pkg/rxjs/withLatestFrom'
import { Use } from '/src/util/function-context/context'
import { useWeb3AccountsRequest$ } from '/src/web3/accounts/request/stream'
import { useWeb3Provider$ } from '/src/web3/provider'
import { Observable } from 'rxjs'
import { useWeb3AccountsClearError$ } from '../clear-error/stream'

export type Web3Accounts = string[]

type Web3AccountsValue =
  // Default, no value
  | {}
  // Post request, account data
  | { accounts: Web3Accounts }
  // During request, fetching data
  | { requesting: true }
  // Post request, error data
  | { error: string }

// Default/Initial values
const initialValue = {} as Web3AccountsValue
const requestingValue = { requesting: true }

type Web3Accounts$ = Observable<Web3AccountsValue>

export const useWeb3Accounts$: Use<Web3Accounts$> = (resolve) => {
  const accountsRequest$ = resolve(useWeb3AccountsRequest$)
  const clearError$ = resolve(useWeb3AccountsClearError$)
  const exhaustMap = resolve(useRxExhaustMap)
  const from = resolve(useRxFrom)
  const map = resolve(useRxMap)
  const merge = resolve(useRxMerge)
  const of = resolve(useRxOf)
  const provider$ = resolve(useWeb3Provider$)
  const shareReplay = resolve(useRxShareReplay)
  const startWith = resolve(useRxStartWith)
  const switchMap = resolve(useRxSwitchMap)
  const take = resolve(useRxTake)
  const withLatestFrom = resolve(useRxWithLatestFrom)

  return accountsRequest$.pipe(
    withLatestFrom(provider$),
    // Debounce requests while request promise is being resolved
    exhaustMap(([, providerValue]) => {
      if (!('provider' in providerValue)) return of(initialValue)
      const { provider } = providerValue
      // Wrap request with `Promise` to enable resolving caught error
      const requestPromise = new Promise<Web3AccountsValue>(resolve => {
        provider
          .send('eth_requestAccounts', [])
          .then((accounts: Web3Accounts) => resolve({ accounts }))
          .catch(error => resolve({ error: error.message }))
      })
      // First emit `requestingValue`,
      // then emit result of request promise
      const request$ = merge(
        of(requestingValue),
        from(requestPromise),
      )
      /**
       * Complete after request promise resolves.
       * First emits `requestingValue`,
       * finally emits resolved request promise value,
       * then `exhaustMap` allows further requests
       */
      return request$.pipe(take(2))
    }),
    switchMap(v => {
      // TODO: Error handling
      console.log('switchMap(v): ', v)
      if (!('error' in v)) return of(v)
      const resetAccountsValue$ = clearError$.pipe(map(() => initialValue))
      return merge(of(v), resetAccountsValue$)
    }),
    shareReplay(1),
    startWith(initialValue),
  )
}
