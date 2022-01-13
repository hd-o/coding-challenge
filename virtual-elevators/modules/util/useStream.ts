import { useContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { UseObservableEagerStateCtx } from '../pkg/observable-hooks/useObservableEagerState'

export function useStream <V> (stream: BehaviorSubject<V>): V {
  return useContext(UseObservableEagerStateCtx)(stream)
}
