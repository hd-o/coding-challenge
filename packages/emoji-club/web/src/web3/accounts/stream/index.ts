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
import { useWeb3AccountsClearError$ } from '/src/web3/accounts/clear-error/stream'
import { useWeb3AccountsRequest$ } from '/src/web3/accounts/request/stream'
import { isWeb3Error, Web3Error, web3Errors } from '/src/web3/errors'
import { useWeb3Provider$ } from '/src/web3/provider'
import { Observable } from 'rxjs'

export type Web3Accounts = string[]

const web3AccountsState = {
  // Post request, account data
  accounts: [] as Web3Accounts,
  // During request, fetching data
  requesting: false,
  // Post request, error data
  errors: [] as Web3Error[],
}

type Web3AccountsValue = typeof web3AccountsState

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
      if (!('provider' in providerValue)) return of(web3AccountsState)
      const { provider } = providerValue
      // Wrap request with `Promise` to enable resolving caught error
      const requestPromise = new Promise<Web3AccountsValue>(resolve => {
        provider
          .send('eth_requestAccounts', [])
          .then((accounts: Web3Accounts) => resolve({ ...web3AccountsState, accounts }))
          .catch(error => resolve({ ...web3AccountsState, errors: [error] }))
      })
      // First emit `requestingValue`,
      // then emit result of request promise
      const request$ = merge(
        of({ ...web3AccountsState, requesting: true }),
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
      if (v.errors[0] === undefined) return of(v)
      // Show loading status if error is of `requestPending`
      const isError = isWeb3Error(web3Errors.requestPending, v.errors[0])
      if (isError) return of({ ...web3AccountsState, requesting: true })
      // Otherwise, emit error (which can be cleared by clearError$)
      const resetValue$ = clearError$.pipe(map(() => web3AccountsState))
      return merge(of(v), resetValue$)
    }),
    shareReplay(1),
    startWith(web3AccountsState),
  )
}
