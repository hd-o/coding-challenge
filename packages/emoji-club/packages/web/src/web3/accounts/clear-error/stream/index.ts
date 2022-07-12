import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Use } from '/src/util/function-context/context'
import { Subject } from 'rxjs'

export const useWeb3AccountsClearError$: Use<Subject<void>> = (resolve) => {
  const Subject = resolve(useRxSubject)
  return new Subject<void>()
}
