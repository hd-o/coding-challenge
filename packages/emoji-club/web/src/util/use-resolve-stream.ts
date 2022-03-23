import { Observable, ObservedValueOf } from 'rxjs'
import {
  useObservableHooksUseObservableEagerState
} from '../pkg/observable-hooks/useObservableEagerState'
import { Use } from './function-context/context'
import { useResolve } from './use-resolve'

type Use$ = Use<Observable<any>>

type ValueOf<U extends Use$> = ObservedValueOf<ReturnType<U>>

type UseResolve$ = <U extends Use$> (use$: U) => ValueOf<typeof use$>

export const useResolve$: UseResolve$ = (use$) => {
  const useObservableEagerState = useResolve(useObservableHooksUseObservableEagerState)
  return useObservableEagerState(useResolve(use$))
}
