import { WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'
import { JotaiAtomCtx } from '~/pkg/jotai/atom'

type AtomValue = Date | null

let reminderListDateAtom: WritableAtom<AtomValue, AtomValue>

function useReminderListDateAtom (): typeof reminderListDateAtom {
  const atom = useContext(JotaiAtomCtx)
  return reminderListDateAtom ?? (reminderListDateAtom = atom<AtomValue>(null))
}

export const ReminderListDateAtomCtx = createContext(useReminderListDateAtom)
