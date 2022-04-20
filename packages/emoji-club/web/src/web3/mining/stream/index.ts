import { useRxFrom } from '/src/pkg/rxjs/from'
import { useRxMerge } from '/src/pkg/rxjs/merge'
import { useRxOf } from '/src/pkg/rxjs/of'
import { useRxShareReplay } from '/src/pkg/rxjs/shareReplay'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { useRxSwitchMap } from '/src/pkg/rxjs/switchMap'
import { useRxWithLatestFrom } from '/src/pkg/rxjs/withLatestFrom'
import { Use } from '/src/util/function-context/context'
import { Web3Error, web3Errors } from '/src/web3/errors'
import { useWeb3MiningRequest$ } from '/src/web3/mining/request/stream'
import { utils } from 'ethers'
import { Observable } from 'rxjs'
import { useWeb3Contract } from '../../contract'
import { useWeb3Provider$ } from '../../provider'

interface Web3MiningState {
  error?: Web3Error
  mining?: boolean
}

const initialState: Web3MiningState = {}

type Web3MiningState$ = Observable<Web3MiningState>

export const useWeb3Mining: Use<Web3MiningState$> = (resolve) => {
  const from = resolve(useRxFrom)
  const merge = resolve(useRxMerge)
  const of = resolve(useRxOf)
  const shareReplay = resolve(useRxShareReplay)
  const startWith = resolve(useRxStartWith)
  const switchMap = resolve(useRxSwitchMap)
  const web3Contract$ = resolve(useWeb3Contract)
  const web3MiningRequest$ = resolve(useWeb3MiningRequest$)
  const web3Provider$ = resolve(useWeb3Provider$)
  const withLatestFrom = resolve(useRxWithLatestFrom)

  return web3MiningRequest$.pipe(
    withLatestFrom(web3Provider$, web3Contract$),
    switchMap(([, { provider }, { contract }]) => {
      if (contract === undefined) return of(initialState)
      if (provider === undefined) return of(initialState)
      const signer = provider.getSigner()
      const connection = contract.connect(signer)
      const mintPromise = contract
        .mint(connection.address, { value: utils.parseEther('1') })
        .then(() => initialState)
        .catch(() => web3Errors.failedMining())
      return merge(
        of({ mining: true }),
        from(mintPromise),
      )
    }),
    shareReplay(1),
    startWith(initialState)
  )
}
