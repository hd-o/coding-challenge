import { JotaiAtomCtx } from '/src/pkg/jotai/atom'
import { CacheCtx } from '/src/util/cache'
import { WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'

type AtomType = Date | null

function useReminderListDateAtom (): WritableAtom<AtomType, AtomType> {
  const atom = useContext(JotaiAtomCtx)
  return useContext(CacheCtx)(
    'reminderListDateAtom', [atom], () => atom<AtomType>(null))
}

export const ReminderListDateAtomCtx = createContext(useReminderListDateAtom)
