import { ReminderListDateAtomCtx } from '/src/reminder/list/atom/date'
import { useUpdateAtom } from 'jotai/utils'
import { createContext, useContext } from 'react'

interface Props {
  date: Date
}

function useHandleOpenReminders (props: Props): () => void {
  const setReminderListDate = useUpdateAtom(useContext(ReminderListDateAtomCtx)())
  return () => setReminderListDate(props.date)
}

export const HandleOpenRemindersCtx = createContext(useHandleOpenReminders)
