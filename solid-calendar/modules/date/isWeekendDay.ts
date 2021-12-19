import { createContext, useContext } from 'react'
import { LodashMemoizeCtx } from '~/pkg/lodash/memoize'
import { CacheCtx } from '~/util/cache'

function useDateIsWeekendDay (): (index: number) => boolean {
  const memoize = useContext(LodashMemoizeCtx)
  return useContext(CacheCtx)(
    'dateIsWeekendDay',
    [memoize],
    () => memoize(function dateIsWeekendDay (index: number) {
      return ((index - 6) % 7) === 0 || (index % 7) === 0
    }))
}

export const DateIsWeekendDayCtx = createContext(useDateIsWeekendDay)
