import { useContext } from 'react'
import { Observable, ObservedValueOf } from 'rxjs'
import { FnContainerCtx } from '../function/container'
import {
  useObservableHooksUseObservableEagerState
} from '../pkg/observable-hooks/useObservableEagerState'

type UseStream = <S extends Observable<any>> ($: S) => ObservedValueOf<typeof $>

export const useStream: UseStream = ($) => {
  const container = useContext(FnContainerCtx)
  const useObservableEagerState = container.resolve(useObservableHooksUseObservableEagerState)
  return useObservableEagerState($)
}
