import { useRxBehaviorSubject } from '/src/pkg/rxjs/BehaviorSubject'
import { resolve, Use } from '/src/util/resolve'
import { BehaviorSubject } from 'rxjs'

type ElevatorCount$ = BehaviorSubject<number>

export const useElevatorCount$: Use<ElevatorCount$> = (container) => {
  const BehaviorSubject = resolve(container)(useRxBehaviorSubject)
  return new BehaviorSubject(3)
}
