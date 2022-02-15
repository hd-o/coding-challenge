import { tap } from 'rxjs'
import { FnCtor } from '../../function/container'
import { useLodashDefer } from '../../pkg/lodash/defer'
import { useRxTap } from '../../pkg/rxjs/tap'
import { useMockInterval$ } from './interval$'

type TickMockInterval$ = typeof tap

export const useTickMockInterval$: FnCtor<TickMockInterval$> = (container) => {
  const defer = container.resolve(useLodashDefer)
  const mockInterval$ = container.resolve(useMockInterval$)
  const tap = container.resolve(useRxTap)

  const tickMockInterval$: TickMockInterval$ =
    () => tap(() => defer(() => mockInterval$.next({})))

  return tickMockInterval$
}
