import { createContext, useContext } from 'react'
import { JotaiUseAtomCtx } from '~/pkg/jotai/useAtom'
import { MuiModalCtx } from '~/pkg/mui/Modal'
import { ReminderListDateAtomCtx } from './atom/date'
import { ReminderListContentCtx } from './content'

function ReminderList (): JSX.Element {
  const Modal = useContext(MuiModalCtx)
  const ReminderListContent = useContext(ReminderListContentCtx)

  const useAtom = useContext(JotaiUseAtomCtx)
  const date = useAtom(useContext(ReminderListDateAtomCtx)())[0]

  return (
    <Modal open={date !== null}>
      <>
        {date !== null && <ReminderListContent date={date} />}
      </>
    </Modal>
  )
}

export const ReminderListCtx = createContext(ReminderList)
