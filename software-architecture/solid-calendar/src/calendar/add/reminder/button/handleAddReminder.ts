import { ReminderEditorStateAtomCtx } from '/src/reminder/editor/atom/state'
import { useUpdateAtom } from 'jotai/utils'
import { createContext, useContext } from 'react'

interface Props {
  date: Date
}

function useHandleAddReminder (props: Props): () => void {
  const setReminderEditorState = useUpdateAtom(useContext(ReminderEditorStateAtomCtx)())
  return () => setReminderEditorState({ date: props.date })
}

export const HandleAddReminderCtx = createContext(useHandleAddReminder)
