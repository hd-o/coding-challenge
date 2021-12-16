import { useUpdateAtom } from 'jotai/utils'
import { createContext, useContext } from 'react'
import { ReminderListDateAtomCtx } from '~/reminder/list/atom/date'

interface Props {
  date: Date
}

function useHandleOpenReminders (props: Props): () => void {
  const setReminderListDate = useUpdateAtom(useContext(ReminderListDateAtomCtx)())
  return () => setReminderListDate(props.date)
}

export const HandleOpenRemindersCtx = createContext(useHandleOpenReminders)
