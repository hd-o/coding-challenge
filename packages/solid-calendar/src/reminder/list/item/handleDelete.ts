import { SelectDateRemindersAtomCtx } from '/src/date/atom/reminders'
import { WriterAtomCtx } from '/src/util/writerAtom'
import { useUpdateAtom } from 'jotai/utils'
import { createContext, useContext } from 'react'
import { ReminderListItemProps } from './props'

function useReminderListHandleDelete (props: ReminderListItemProps): () => void {
  const selectDateRemindersAtom = useContext(SelectDateRemindersAtomCtx)()
  const write = useUpdateAtom(useContext(WriterAtomCtx)())
  return () => write((get, set) => {
    const dateRemindersAtom = selectDateRemindersAtom(props.reminder.date)
    const dateReminders = get(dateRemindersAtom)
    dateReminders.delete(props.reminder.id)
    set(dateRemindersAtom, new Map(dateReminders))
  })
}

export const ReminderListHandleDeleteCtx = createContext(useReminderListHandleDelete)
