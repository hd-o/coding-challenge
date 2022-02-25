import { JotaiUseAtomCtx } from '/src/pkg/jotai/useAtom'
import { createContext, useContext } from 'react'
import { Modal } from '@mui/material'
import { ReminderEditorStateAtomCtx } from './atom/state'
import { ReminderEditorFormCtx } from './form'

function ReminderEditor (): JSX.Element {
  const ReminderEditorForm = useContext(ReminderEditorFormCtx)

  const useAtom = useContext(JotaiUseAtomCtx)
  const state = useAtom(useContext(ReminderEditorStateAtomCtx)())[0]

  return (
    <Modal open={state !== null}>
      <>
        {state !== null && <ReminderEditorForm {...state} />}
      </>
    </Modal>
  )
}

export const ReminderEditorCtx = createContext(ReminderEditor)
