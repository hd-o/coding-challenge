import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Use } from '/src/util/function-context/context'
import { Subject } from 'rxjs'
import { Web3Accounts } from '../stream'

type Web3AccountsProxy = Subject<Web3Accounts>

export const useWeb3AccountsProxy: Use<Web3AccountsProxy> = (resolve) => {
  const Subject = resolve(useRxSubject)
  return new Subject<Web3Accounts>()
}
