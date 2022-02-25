import { DateFnsAddMonthsCtx } from '/src/pkg/date-fns/addMonths'
import { JotaiUseAtomCtx } from '/src/pkg/jotai/useAtom'
import { createContext, useContext } from 'react'
import { CalendarMonthAtomCtx } from '../atom'

function useHandleNextMonth (): () => void {
  const addMonths = useContext(DateFnsAddMonthsCtx)
  const useAtom = useContext(JotaiUseAtomCtx)
  const [calendarMonth, setCalendarMonth] = useAtom(useContext(CalendarMonthAtomCtx)())

  return () => setCalendarMonth(addMonths(calendarMonth, 1))
}

export const HandleNextMonthCtx = createContext(useHandleNextMonth)
