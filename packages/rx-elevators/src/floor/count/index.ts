import { useRxBehaviorSubject } from '/src/pkg/rxjs/BehaviorSubject'
import { resolve, Use } from '/src/util/resolve'
import { BehaviorSubject } from 'rxjs'

type FloorCount$ = BehaviorSubject<number>

export const useFloorCount$: Use<FloorCount$> = (container) => {
  const BehaviorSubject = resolve(container)(useRxBehaviorSubject)
  return new BehaviorSubject(5)
}
