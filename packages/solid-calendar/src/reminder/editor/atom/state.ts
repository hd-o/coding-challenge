import { JotaiAtomCtx } from '/src/pkg/jotai/atom'
import { CacheCtx } from '/src/util/cache'
import { WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'

type State = null | {
  date: Date
  reminderId?: string
}

const useReminderEditorStateAtom = (): WritableAtom<State, State> => {
  const atom = useContext(JotaiAtomCtx)
  return useContext(CacheCtx)(
    'reminderEditorStateAtom', [atom], () => atom<State>(null))
}

export const ReminderEditorStateAtomCtx = createContext(useReminderEditorStateAtom)
