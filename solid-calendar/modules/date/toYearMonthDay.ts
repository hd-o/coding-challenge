import { createContext, useContext } from 'react'
import { DateFnsFormatCtx } from '~/pkg/date-fns/format'
import { LodashMemoizeCtx } from '~/pkg/lodash/memoize'
import { CacheCtx } from '~/util/cache'
import { YearMonthDay, YearMonthDayFormatCtx } from './format/yearMonthDay'

function useDateToYearMonthDay (): (date: Date) => YearMonthDay {
  const format = useContext(DateFnsFormatCtx)
  const memoize = useContext(LodashMemoizeCtx)
  const yearMonthDayFormat = useContext(YearMonthDayFormatCtx)

  return useContext(CacheCtx)(
    'dateToYearMonthDay',
    [memoize, format, yearMonthDayFormat],
    () => memoize(function dateToYearMonthDay (date: Date) {
      return format(date, yearMonthDayFormat) as YearMonthDay
    }))
}

export const DateToYearMonthDayCtx = createContext(useDateToYearMonthDay)
