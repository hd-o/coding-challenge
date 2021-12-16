import { createContext, useContext } from 'react'
import { JotaiUseAtomCtx } from '~/pkg/jotai/useAtom'
import { ReminderListDateAtomCtx } from './atom/date'

function useReminderListHandleClose (): () => void {
  const useAtom = useContext(JotaiUseAtomCtx)
  const setDate = useAtom(useContext(ReminderListDateAtomCtx)())[1]

  return () => setDate(null)
}

export const ReminderListHandleCloseCtx = createContext(useReminderListHandleClose)
