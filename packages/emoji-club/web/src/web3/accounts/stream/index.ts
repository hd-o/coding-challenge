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

interface Web3AccountsState {
  // Post request, account data
  accounts?: Web3Accounts
  // Post request, error data
  errors?: Web3Error[]
  // During request, fetching data
  requesting?: true
}

const initialState = {} as Web3AccountsState
const requestingState = { requesting: true } as Web3AccountsState

type Web3Accounts$ = Observable<Web3AccountsState>

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

  const request$ = accountsRequest$.pipe(
    withLatestFrom(provider$),
    // Debounce requests while request promise is being resolved
    exhaustMap(([, { provider }]) => {
      if (provider === undefined) return of(initialState)
      // Wrap request with `Promise` to enable resolving caught error
      const requestPromise = new Promise<Web3AccountsState>(resolve => {
        provider
          .send('eth_requestAccounts', [])
          .then((accounts: Web3Accounts) => resolve({ accounts }))
          .catch(error => resolve({ errors: [error] }))
      })
      // First emit `requestingValue`,
      // then emit result of request promise
      const request$ = merge(
        of(requestingState),
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
      if (v.errors === undefined) return of(v)
      // Show loading status if error is of `requestPending`
      const isError = isWeb3Error(web3Errors.requestPending, v.errors[0])
      if (isError) return of(requestingState)
      // Otherwise, emit error (which can be cleared by clearError$)
      const resetValue$ = clearError$.pipe(map(() => initialState))
      return merge(of(v), resetValue$)
    }),
  )

  const listAccounts$ = provider$.pipe(
    switchMap(({ provider }) => {
      if (provider === undefined) return of([])
      return from(provider.listAccounts().catch(() => []))
    }),
    map(accounts => ({ accounts }) as Web3AccountsState),
  )

  return merge(listAccounts$, request$).pipe(
    shareReplay(1),
    startWith(initialState),
  )
}
