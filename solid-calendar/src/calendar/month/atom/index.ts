import { JotaiAtomCtx } from '/src/pkg/jotai/atom'
import { NativeDateCtx } from '/src/pkg/native/date'
import { CacheCtx } from '/src/util/cache'
import { WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'

function useCalendarMonthAtom (): WritableAtom<Date, Date> {
  const Date = useContext(NativeDateCtx)
  const atom = useContext(JotaiAtomCtx)
  return useContext(CacheCtx)(
    'calendarMonthAtom', [atom, Date], () => atom(new Date()))
}

export const CalendarMonthAtomCtx = createContext(useCalendarMonthAtom)
