import { JotaiUseAtomCtx } from '/src/pkg/jotai/useAtom'
import { createContext, useContext } from 'react'
import { CalendarMonthAtomCtx } from '../atom'

function useHandleDateChange (): (date: Date) => void {
  const useAtom = useContext(JotaiUseAtomCtx)
  const setCalendarMonth = useAtom(useContext(CalendarMonthAtomCtx)())[1]

  return setCalendarMonth
}

export const HandleDateChangeCtx = createContext(useHandleDateChange)
