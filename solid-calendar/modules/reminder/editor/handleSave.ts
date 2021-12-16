import { useUpdateAtom } from 'jotai/utils'
import { createContext, useContext } from 'react'
import { SelectDateRemindersAtomCtx } from '~/date/atom/reminders'
import { DateToYearMonthDayCtx } from '~/date/toYearMonthDay'
import { LodashUniqueIdCtx } from '~/pkg/lodash/uniqueId'
import { WriterAtomCtx } from '~/util/writerAtom'
import { Reminder } from '../model'
import { ReminderEditorHandleCloseCtx } from './handleClose'

interface ReminderState extends Omit<Reminder, 'id'> {
  id?: Reminder['id']
}

interface Props {
  date: Date
  reminderState: ReminderState
}

function useReminderEditorHandleSave (props: Props): () => void {
  const dateToYearMonthDay = useContext(DateToYearMonthDayCtx)()
  const handleClose = useContext(ReminderEditorHandleCloseCtx)()
  const selectDateRemindersAtom = useContext(SelectDateRemindersAtomCtx)()
  const write = useUpdateAtom(useContext(WriterAtomCtx)())
  const uniqueId = useContext(LodashUniqueIdCtx)

  return () => {
    write((get, set) => {
      const dateRemindersAtom = selectDateRemindersAtom(props.date)
      const dateReminders = get(dateRemindersAtom)
      const reminderId = props.reminderState.id ?? uniqueId()
      // If reminder date changed to different day
      if (dateToYearMonthDay(props.date) !== dateToYearMonthDay(props.reminderState.date)) {
        dateReminders.delete(reminderId)
        const nextDateRemindersAtom = selectDateRemindersAtom(props.reminderState.date)
        const nextDateReminders = get(nextDateRemindersAtom)
        nextDateReminders.set(reminderId, { ...props.reminderState, id: reminderId })
        set(nextDateRemindersAtom, new Map(nextDateReminders))
      } else {
        dateReminders.set(reminderId, { ...props.reminderState, id: reminderId })
      }
      set(dateRemindersAtom, new Map(dateReminders))
    })
    handleClose()
  }
}

export const ReminderEditorHandleSaveCtx = createContext(useReminderEditorHandleSave)
