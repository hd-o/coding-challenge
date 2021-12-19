import { WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'
import { JotaiAtomCtx } from '~/pkg/jotai/atom'
import { CacheCtx } from '~/util/cache'

type State = null | {
  date: Date
  reminderId?: string
}

function useRemindereEditorStateAtom (): WritableAtom<State, State> {
  const atom = useContext(JotaiAtomCtx)
  return useContext(CacheCtx)(
    'reminderEditorStateAtom', [atom], () => atom<State>(null))
}

export const ReminderEditorStateAtomCtx = createContext(useRemindereEditorStateAtom)
