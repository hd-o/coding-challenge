import { WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'
import { AtomFamily } from '~/model/AtomFamily'
import { JotaiAtomCtx } from '~/pkg/jotai/atom'
import { JotaiAtomFamilyCtx } from '~/pkg/jotai/atomFamily'
import { NativeMapCtx } from '~/pkg/native/map'
import { Reminder } from '~/reminder/model'
import { CacheCtx } from '~/util/cache'
import { DateMatchYearMonthDate } from '../isEqualYearMonthDay'

type DateRemindersMap = Map<Reminder['id'], Reminder>
type DateRemindersMapAtom = WritableAtom<DateRemindersMap, DateRemindersMap>

function useSelectDateRemindersAtom (): AtomFamily<Date, DateRemindersMapAtom> {
  const Map = useContext(NativeMapCtx)
  const atom = useContext(JotaiAtomCtx)
  const atomFamily = useContext(JotaiAtomFamilyCtx)
  const matchYearMonthDate = useContext(DateMatchYearMonthDate)
  return useContext(CacheCtx)(
    'selectDateRemindersAtom',
    [atomFamily, atom, Map, matchYearMonthDate],
    () => atomFamily(() => atom(new Map()), matchYearMonthDate))
}

export const SelectDateRemindersAtomCtx = createContext(useSelectDateRemindersAtom)
