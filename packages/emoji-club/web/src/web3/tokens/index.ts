import { EmojiClub } from '/../ethereum/typechain/EmojiClub'
import { Use } from '/src/util/function-context/context'
import { from, Observable, of, shareReplay, startWith, switchMap, withLatestFrom } from 'rxjs'
import { useWeb3Contract } from '../contract'
import { Web3Error, web3Errors } from '../errors'
import { useWeb3Provider$ } from '../provider'

type Web3TokensPromise = ReturnType<EmojiClub['getTokens']>
type Web3Tokens = Awaited<Web3TokensPromise>

export type Web3Token = Web3Tokens[number]

interface Web3TokensState {
  error?: Web3Error
  tokens?: Web3Tokens
}

const initialState: Web3TokensState = {}

type Web3TokensState$ = Observable<Web3TokensState>

export const useWeb3Tokens: Use<Web3TokensState$> = (resolve) => {
  const contract$ = resolve(useWeb3Contract)
  const provider$ = resolve(useWeb3Provider$)

  return contract$.pipe(
    withLatestFrom(provider$),
    switchMap(([{ contract }, { provider }]) => {
      if (provider === undefined) return of(initialState)
      if (contract === undefined) return of(initialState)
      const addressPromise = provider.getSigner().getAddress()
      const tokensPromise: Promise<Web3TokensState> = addressPromise
        .then(address => contract.getTokens(address))
        .then(tokens => ({ tokens }))
        .catch(web3Errors.failedLoadingTokens)
      return from(tokensPromise)
    }),
    shareReplay(1),
    startWith(initialState),
  )
}
