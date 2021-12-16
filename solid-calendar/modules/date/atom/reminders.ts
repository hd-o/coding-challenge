import { WritableAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { createContext, useContext } from 'react'
import { AtomFamily } from '~/model/AtomFamily'
import { JotaiAtomCtx } from '~/pkg/jotai/atom'
import { Reminder } from '~/reminder/model'
import { YearMonthDay } from '../format/yearMonthDay'
import { DateToYearMonthDayCtx } from '../toYearMonthDay'

type DateRemindersMap = Map<string, Reminder>
type DateRemindersMapAtom = WritableAtom<DateRemindersMap, DateRemindersMap>

let map: AtomFamily<YearMonthDay, DateRemindersMapAtom>
let getter: (date: Date) => DateRemindersMapAtom

function useDateRemindersAtomMap (): typeof getter {
  const atom = useContext(JotaiAtomCtx)
  const dateToYearMonthDay = useContext(DateToYearMonthDayCtx)()

  if (map === undefined) map = atomFamily(() => atom(new Map<string, Reminder>()))

  return getter ?? (getter =
    (date: Date) => map(dateToYearMonthDay(date))
  )
}

export const SelectDateRemindersAtomCtx = createContext(useDateRemindersAtomMap)
