import { DateFnsSubMonthsCtx } from '/src/pkg/date-fns/subMonths'
import { JotaiUseAtomCtx } from '/src/pkg/jotai/useAtom'
import { createContext, useContext } from 'react'
import { CalendarMonthAtomCtx } from '../atom'

function useHandlePreviousMonth (): () => void {
  const subMonths = useContext(DateFnsSubMonthsCtx)
  const useAtom = useContext(JotaiUseAtomCtx)
  const [calendarMonth, setCalendarMonth] = useAtom(useContext(CalendarMonthAtomCtx)())

  return () => setCalendarMonth(subMonths(calendarMonth, 1))
}

export const HandlePreviousMonthCtx = createContext(useHandlePreviousMonth)
