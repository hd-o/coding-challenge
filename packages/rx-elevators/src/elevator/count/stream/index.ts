import { useRxBehaviorSubject } from '/src/pkg/rxjs/BehaviorSubject'
import { Use } from '/src/util/resolve'
import { BehaviorSubject } from 'rxjs'

type ElevatorCount$ = BehaviorSubject<number>

export const useElevatorCount$: Use<ElevatorCount$> = (resolve) => {
  const BehaviorSubject = resolve(useRxBehaviorSubject)
  return new BehaviorSubject(3)
}
