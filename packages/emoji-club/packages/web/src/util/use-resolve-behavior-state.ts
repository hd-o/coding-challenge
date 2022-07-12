import { BehaviorSubject, ObservedValueOf } from 'rxjs'
import { Use } from './function-context/context'
import { BehaviorState, useBehaviorState } from './use-behavior-state'
import { useResolve } from './use-resolve'

type Use$ = Use<BehaviorSubject<any>>

type ValueOf<U extends Use$> = ObservedValueOf<ReturnType<U>>

type UseResolvedBehaviorState = <U extends Use$>
  (use$: U) => BehaviorState<ValueOf<typeof use$>>

export const useResolveBehaviorState: UseResolvedBehaviorState = (use$) => {
  return useBehaviorState(useResolve(use$))
}
