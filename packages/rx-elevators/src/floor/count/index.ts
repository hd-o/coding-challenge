import { FnC } from '/src/function/container'
import { useRxBehaviorSubject } from '/src/pkg/rxjs/BehaviorSubject'
import { BehaviorSubject } from 'rxjs'

export const useFloorCount$ = (container: FnC): BehaviorSubject<number> => {
  const BehaviorSubject = container.resolve(useRxBehaviorSubject)
  return new BehaviorSubject(5)
}
