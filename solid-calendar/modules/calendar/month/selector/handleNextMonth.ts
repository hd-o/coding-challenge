import { createContext, useContext } from 'react'
import { DateFnsAddMonthsCtx } from '~/pkg/date-fns/addMonths'
import { JotaiUseAtomCtx } from '~/pkg/jotai/useAtom'
import { CalendarMonthAtomCtx } from '../atom'

function useHandleNextMonth (): () => void {
  const addMonths = useContext(DateFnsAddMonthsCtx)
  const useAtom = useContext(JotaiUseAtomCtx)
  const [calendarMonth, setCalendarMonth] = useAtom(useContext(CalendarMonthAtomCtx)())

  return () => setCalendarMonth(addMonths(calendarMonth, 1))
}

export const HandleNextMonthCtx = createContext(useHandleNextMonth)
