import { Observable, ObservedValueOf } from 'rxjs'
import {
  useObservableHooksUseObservableEagerState
} from '../pkg/observable-hooks/useObservableEagerState'
import { useResolve } from './useResolve'

type UseStream = <S extends Observable<any>> ($: S) => ObservedValueOf<typeof $>

export const useStream: UseStream = ($) => {
  const useObservableEagerState = useResolve(useObservableHooksUseObservableEagerState)
  return useObservableEagerState($)
}
