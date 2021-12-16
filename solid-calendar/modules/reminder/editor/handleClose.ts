import { createContext, useContext } from 'react'
import { JotaiUseAtomCtx } from '~/pkg/jotai/useAtom'
import { ReminderEditorStateAtomCtx } from './atom/state'

function useReminderEditorHandleClose (): () => void {
  const useAtom = useContext(JotaiUseAtomCtx)
  const setReminderId = useAtom(useContext(ReminderEditorStateAtomCtx)())[1]
  return () => setReminderId(null)
}

export const ReminderEditorHandleCloseCtx = createContext(useReminderEditorHandleClose)
