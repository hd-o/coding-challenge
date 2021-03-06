import { ReminderEditorStateAtomCtx } from '/src/reminder/editor/atom/state'
import { useUpdateAtom } from 'jotai/utils'
import { createContext, useContext } from 'react'
import { ReminderListItemProps } from './props'

function useReminderListHandleEdit (props: ReminderListItemProps): () => void {
  const setReminderEditorState = useUpdateAtom(useContext(ReminderEditorStateAtomCtx)())
  return () => setReminderEditorState({
    date: props.reminder.date,
    reminderId: props.reminder.id,
  })
}

export const ReminderListHandleEditCtx = createContext(useReminderListHandleEdit)
