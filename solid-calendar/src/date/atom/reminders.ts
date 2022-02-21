import { AtomFamily } from '/src/model/AtomFamily'
import { JotaiAtomCtx } from '/src/pkg/jotai/atom'
import { JotaiAtomFamilyCtx } from '/src/pkg/jotai/atomFamily'
import { NativeMapCtx } from '/src/pkg/native/map'
import { Reminder } from '/src/reminder/model'
import { CacheCtx } from '/src/util/cache'
import { WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'
import { DateMatchYearMonthDateCtx } from '../matchYearMonthDate'

type DateRemindersMap = Map<Reminder['id'], Reminder>
type DateRemindersMapAtom = WritableAtom<DateRemindersMap, DateRemindersMap>

function useSelectDateRemindersAtom (): AtomFamily<Date, DateRemindersMapAtom> {
  const Map = useContext(NativeMapCtx)
  const atom = useContext(JotaiAtomCtx)
  const atomFamily = useContext(JotaiAtomFamilyCtx)
  const matchYearMonthDate = useContext(DateMatchYearMonthDateCtx)
  return useContext(CacheCtx)(
    'selectDateRemindersAtom',
    [atomFamily, atom, Map, matchYearMonthDate],
    () => atomFamily(() => atom(new Map()), matchYearMonthDate))
}

export const SelectDateRemindersAtomCtx = createContext(useSelectDateRemindersAtom)
