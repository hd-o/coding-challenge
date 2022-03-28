import { BehaviorSubject, ObservedValueOf } from 'rxjs'
import {
  useObservableHooksUseObservableEagerState
} from '../pkg/observable-hooks/useObservableEagerState'
import { Use } from './function-context/context'
import { useResolved } from './use-resolved'

/** @see UseEagerStream */
type Use$ = Use<BehaviorSubject<any>>

/** @see useResolvedStream */
type UseEagerStream = <U extends Use$> (useFn: U) => ObservedValueOf<ReturnType<U>>

/**
 * Returns observed value from observable returned by resolved `use$`
 */
export const useResolvedStream: UseEagerStream = (use$) => {
  const useObservable = useResolved(useObservableHooksUseObservableEagerState)
  const $ = useResolved(use$)
  return useObservable($)
}
