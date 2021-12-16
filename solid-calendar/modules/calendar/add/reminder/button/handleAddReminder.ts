import { useUpdateAtom } from 'jotai/utils'
import { createContext, useContext } from 'react'
import { ReminderEditorStateAtomCtx } from '~/reminder/editor/atom/state'

interface Props {
  date: Date
}

function useHandleAddReminder (props: Props): () => void {
  const setReminderEditorState = useUpdateAtom(useContext(ReminderEditorStateAtomCtx)())
  return () => setReminderEditorState({ date: props.date })
}

export const HandleAddReminderCtx = createContext(useHandleAddReminder)
