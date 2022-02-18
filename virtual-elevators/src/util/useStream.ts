import { useContext } from 'react'
import { Observable, ObservedValueOf } from 'rxjs'
import { UseObservableEagerStateCtx } from '../pkg/observable-hooks/useObservableEagerState'

export function useStream <B extends Observable<any>> (stream: B): ObservedValueOf<typeof stream> {
  return useContext(UseObservableEagerStateCtx)(stream)
}
