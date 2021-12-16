import { createContext, useContext } from 'react'
import { YearMonthFormatCtx } from '~/date/format/yearMonth'
import { ReferenceDateCtx } from '~/date/referenceDate'
import { DateFnsParseCtx } from '~/pkg/date-fns/parse'
import { JotaiUseAtomCtx } from '~/pkg/jotai/useAtom'
import { CalendarMonthAtomCtx } from '../atom'

function useHandleDateChange (): (value: string) => void {
  const parse = useContext(DateFnsParseCtx)
  const referenceDate = useContext(ReferenceDateCtx)()
  const yearMonthFormat = useContext(YearMonthFormatCtx)
  const useAtom = useContext(JotaiUseAtomCtx)
  const setCalendarMonth = useAtom(useContext(CalendarMonthAtomCtx)())[1]

  return (value: string) => {
    setCalendarMonth(parse(value, yearMonthFormat, referenceDate))
  }
}

export const HandleDateChangeCtx = createContext(useHandleDateChange)
