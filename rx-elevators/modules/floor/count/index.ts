import { BehaviorSubject } from 'rxjs'
import { FnC } from '../../function/container'
import { useRxBehaviorSubject } from '../../pkg/rxjs/BehaviorSubject'

export const useFloorCount$ = (container: FnC): BehaviorSubject<number> => {
  const BehaviorSubject = container.resolve(useRxBehaviorSubject)
  return new BehaviorSubject(5)
}
