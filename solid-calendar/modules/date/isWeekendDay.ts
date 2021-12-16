import { createContext, useContext } from 'react'
import { LodashMemoizeCtx } from '~/pkg/lodash/memoize'

let dateIsWeekendDay: (index: number) => boolean

function useDateIsWeekendDay (): typeof dateIsWeekendDay {
  const memoize = useContext(LodashMemoizeCtx)
  return dateIsWeekendDay ?? (dateIsWeekendDay = (
    memoize((index: number) => (index - 6) % 7 === 0 || index % 7 === 0)
  ))
}

export const DateIsWeekendDayCtx = createContext(useDateIsWeekendDay)
