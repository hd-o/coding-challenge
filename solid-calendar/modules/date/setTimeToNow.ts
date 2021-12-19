import { createContext, useContext } from 'react'
import { DateFnsGetDateCtx } from '~/pkg/date-fns/getDate'
import { DateFnsGetMonthCtx } from '~/pkg/date-fns/getMonth'
import { DateFnsGetYearCtx } from '~/pkg/date-fns/getYear'
import { DateFnsSetCtx } from '~/pkg/date-fns/set'
import { NativeDateCtx } from '~/pkg/native/date'
import { CacheCtx } from '~/util/cache'

function useSetTimeToNow (): (date: Date) => Date {
  const Date = useContext(NativeDateCtx)
  const getDate = useContext(DateFnsGetDateCtx)
  const getMonth = useContext(DateFnsGetMonthCtx)
  const getYear = useContext(DateFnsGetYearCtx)
  const set = useContext(DateFnsSetCtx)
  return useContext(CacheCtx)('setTimeToNow',
    [set, getDate, getMonth, getYear],
    () => function setTimeToNow (date: Date): Date {
      return set(new Date(), {
        date: getDate(date),
        month: getMonth(date),
        year: getYear(date)
      })
    })
}

export const DateSetTimeToNowCtx = createContext(useSetTimeToNow)
