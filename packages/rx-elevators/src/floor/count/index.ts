import { useRxBehaviorSubject } from '/src/pkg/rxjs/BehaviorSubject'
import { Use } from '/src/util/resolve'
import { BehaviorSubject } from 'rxjs'

type FloorCount$ = BehaviorSubject<number>

export const useFloorCount$: Use<FloorCount$> = (resolve) => {
  const BehaviorSubject = resolve(useRxBehaviorSubject)
  return new BehaviorSubject(5)
}
