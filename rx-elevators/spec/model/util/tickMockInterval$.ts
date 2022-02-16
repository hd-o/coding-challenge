import { FnCtor } from '/src/function/container'
import { useLodashDefer } from '/src/pkg/lodash/defer'
import { useRxTap } from '/src/pkg/rxjs/tap'
import { tap } from 'rxjs'
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
