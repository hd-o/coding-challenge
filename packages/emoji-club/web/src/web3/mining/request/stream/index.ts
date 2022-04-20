import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Use } from '/src/util/function-context/context'
import { Subject } from 'rxjs'

type Web3MiningRequest$ = Subject<void>

export const useWeb3MiningRequest$: Use<Web3MiningRequest$> = (resolve) => {
  const Subject = resolve(useRxSubject)
  return new Subject<void>()
}
