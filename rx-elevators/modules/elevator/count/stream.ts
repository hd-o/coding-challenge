import { RefSubject, useRefSubject } from '../../class/ref/subject'
import { FnC } from '../../function/container'

export const useElevatorCount$ = (container: FnC): RefSubject<number> => {
  const RefSubject = container.resolve(useRefSubject)
  return new RefSubject(3)
}
