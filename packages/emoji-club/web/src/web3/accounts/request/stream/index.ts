import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Use } from '/src/util/function-context/context'
import { Subject } from 'rxjs'

type Web3AccountsRequest$ = Subject<void>

export const useWeb3AccountsRequest$: Use<Web3AccountsRequest$> = (resolve) => {
  const Subject = resolve(useRxSubject)
  return new Subject<void>()
}
