import { WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'
import { JotaiAtomCtx } from '~/pkg/jotai/atom'
import { CacheCtx } from '~/util/cache'

type AtomType = Date | null

function useReminderListDateAtom (): WritableAtom<AtomType, AtomType> {
  const atom = useContext(JotaiAtomCtx)
  return useContext(CacheCtx)(
    'reminderListDateAtom', [atom], () => atom<AtomType>(null))
}

export const ReminderListDateAtomCtx = createContext(useReminderListDateAtom)
