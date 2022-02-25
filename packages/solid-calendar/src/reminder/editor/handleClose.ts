import { JotaiUseAtomCtx } from '/src/pkg/jotai/useAtom'
import { createContext, useContext } from 'react'
import { ReminderEditorStateAtomCtx } from './atom/state'

function useReminderEditorHandleClose (): () => void {
  const useAtom = useContext(JotaiUseAtomCtx)
  const setReminderId = useAtom(useContext(ReminderEditorStateAtomCtx)())[1]
  return () => setReminderId(null)
}

export const ReminderEditorHandleCloseCtx = createContext(useReminderEditorHandleClose)
