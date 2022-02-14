import { RefSubject, useRefSubject } from '../../class/ref/subject'
import { FnCtor } from '../../function/container'
import { useRxAnimationFrames } from '../../pkg/rxjs/animationFrames'

type Interval$ = RefSubject<any>

/**
 * Used to dynamically set the interval stream.
 * Used in tests for manual interval control
 */
export const useInterval$: FnCtor<Interval$> = (container) => {
  const animationFrames = container.resolve(useRxAnimationFrames)
  const RefSubject = container.resolve(useRefSubject)
  return new RefSubject(animationFrames())
}
