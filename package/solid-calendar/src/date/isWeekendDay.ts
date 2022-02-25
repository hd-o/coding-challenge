import { LodashMemoizeCtx } from '/src/pkg/lodash/memoize'
import { CacheCtx } from '/src/util/cache'
import { createContext, useContext } from 'react'

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
