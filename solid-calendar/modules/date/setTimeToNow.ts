import { createContext, useContext } from 'react'
import { DateFnsGetDateCtx } from '~/pkg/date-fns/getDate'
import { DateFnsGetMonthCtx } from '~/pkg/date-fns/getMonth'
import { DateFnsGetYearCtx } from '~/pkg/date-fns/getYear'
import { DateFnsSetDateCtx } from '~/pkg/date-fns/setDate'
import { DateFnsSetMonthCtx } from '~/pkg/date-fns/setMonth'
import { DateFnsSetYearCtx } from '~/pkg/date-fns/setYear'
import { NativeDateCtx } from '~/pkg/native/date'

let setTimeToNow: (date: Date) => Date

function useSetTimeToNow (): typeof setTimeToNow {
  const Date = useContext(NativeDateCtx)
  const getDate = useContext(DateFnsGetDateCtx)
  const getMonth = useContext(DateFnsGetMonthCtx)
  const getYear = useContext(DateFnsGetYearCtx)
  const setDate = useContext(DateFnsSetDateCtx)
  const setMonth = useContext(DateFnsSetMonthCtx)
  const setYear = useContext(DateFnsSetYearCtx)

  return setTimeToNow ?? (setTimeToNow =
    (date: Date) => setDate(
      setMonth(
        setYear(new Date(), getYear(date)),
        getMonth(date)),
      getDate(date))
  )
}

export const DateSetTimeToNowCtx = createContext(useSetTimeToNow)
