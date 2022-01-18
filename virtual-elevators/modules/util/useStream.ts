import { useContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { UseObservableEagerStateCtx } from '../pkg/observable-hooks/useObservableEagerState'

export function useStream <B extends BehaviorSubject<any>> (stream: B): B['value'] {
  return useContext(UseObservableEagerStateCtx)(stream)
}
