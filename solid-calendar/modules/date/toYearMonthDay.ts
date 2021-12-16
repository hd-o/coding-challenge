import { format } from 'date-fns'
import { createContext, useContext } from 'react'
import { LodashMemoizeCtx } from '~/pkg/lodash/memoize'
import { YearMonthDay, YearMonthDayFormatCtx } from './format/yearMonthDay'

let dateToYearMonthDay: (date: Date) => YearMonthDay

function useDateToYearMonthDay (): typeof dateToYearMonthDay {
  const memoize = useContext(LodashMemoizeCtx)
  const yearMonthDayFormat = useContext(YearMonthDayFormatCtx)

  return dateToYearMonthDay ?? (dateToYearMonthDay = memoize(
    (date: Date) => format(date, yearMonthDayFormat) as YearMonthDay
  ))
}

export const DateToYearMonthDayCtx = createContext(useDateToYearMonthDay)
