import { WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'
import { JotaiAtomCtx } from '~/pkg/jotai/atom'
import { NativeDateCtx } from '~/pkg/native/date'

let calendarMonthAtom: WritableAtom<Date, Date>

function useCalendaMonthAtom (): typeof calendarMonthAtom {
  const atom = useContext(JotaiAtomCtx)
  const Date = useContext(NativeDateCtx)
  return calendarMonthAtom ?? (calendarMonthAtom = atom(new Date()))
}

export const CalendarMonthAtomCtx = createContext(useCalendaMonthAtom)
