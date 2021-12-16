import { atom, WritableAtom } from 'jotai'
import { createContext } from 'react'

export interface ReminderEditorState {
  date: Date
  reminderId?: string
}

let reminderEditorStateAtom: WritableAtom<ReminderEditorState|null, ReminderEditorState|null>

function useRemindereEditorStateAtom (): typeof reminderEditorStateAtom {
  return reminderEditorStateAtom ?? (reminderEditorStateAtom = (
    atom<ReminderEditorState|null>(null)
  ))
}

export const ReminderEditorStateAtomCtx = createContext(useRemindereEditorStateAtom)
