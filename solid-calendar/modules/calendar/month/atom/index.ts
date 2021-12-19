import { WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'
import { JotaiAtomCtx } from '~/pkg/jotai/atom'
import { NativeDateCtx } from '~/pkg/native/date'
import { CacheCtx } from '~/util/cache'

function useCalendarMonthAtom (): WritableAtom<Date, Date> {
  const Date = useContext(NativeDateCtx)
  const atom = useContext(JotaiAtomCtx)
  return useContext(CacheCtx)(
    'calendarMonthAtom', [atom, Date], () => atom(new Date()))
}

export const CalendarMonthAtomCtx = createContext(useCalendarMonthAtom)
