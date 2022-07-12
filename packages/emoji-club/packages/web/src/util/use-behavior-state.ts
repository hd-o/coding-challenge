import { BehaviorSubject } from 'rxjs'
import {
  useObservableHooksUseObservableEagerState
} from '../pkg/observable-hooks/useObservableEagerState'
import { useResolve } from './use-resolve'

export type BehaviorState<V> = [V, BehaviorSubject<V>['next']]

type UseBehaviorState = <V> (subject: BehaviorSubject<V>) => BehaviorState<V>

export const useBehaviorState: UseBehaviorState = (subject) => {
  const useObservableEagerState = useResolve(useObservableHooksUseObservableEagerState)
  const value = useObservableEagerState(subject)
  return [value, subject.next.bind(subject)]
}
