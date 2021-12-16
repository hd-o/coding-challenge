import { createContext, useContext } from 'react'
import { CalendarAddReminderButtonCtx } from '~/calendar/add/reminder/button'
import { SelectDateRemindersAtomCtx } from '~/date/atom/reminders'
import { ModalBoxCtx } from '~/modal/box'
import { DateFnsFormatCtx } from '~/pkg/date-fns/format'
import { JotaiUseAtomCtx } from '~/pkg/jotai/useAtom'
import { MuiBoxCtx } from '~/pkg/mui/Box'
import { MuiListCtx } from '~/pkg/mui/List'
import { MuiTypographyCtx } from '~/pkg/mui/Typography'
import { ReminderListHandleCloseCtx } from '../handleClose'
import { ReminderListItemCtx } from '../item'

interface Props {
  date: Date
}

function ReminderListContent (props: Props): JSX.Element {
  const AddReminderButton = useContext(CalendarAddReminderButtonCtx)
  const Box = useContext(MuiBoxCtx)
  const List = useContext(MuiListCtx)
  const ModalBox = useContext(ModalBoxCtx)
  const ReminderListItem = useContext(ReminderListItemCtx)
  const Typography = useContext(MuiTypographyCtx)

  const handleClose = useContext(ReminderListHandleCloseCtx)()
  const format = useContext(DateFnsFormatCtx)
  const selectDateRemindersAtom = useContext(SelectDateRemindersAtomCtx)()
  const useAtom = useContext(JotaiUseAtomCtx)

  const dateReminders = useAtom(selectDateRemindersAtom(props.date))[0]
  const reminders = Array.from(dateReminders.values())

  return (
    <ModalBox
      withCloseButton
      onClose={handleClose}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {format(props.date, 'MMMM dd, yyyy')}
      </Typography>
      <List>
        {
          reminders.map(reminder => (
            <ReminderListItem key={reminder.id} reminder={reminder} />
          ))
        }
        <Box paddingTop={1}>
          <AddReminderButton
            visible
            testid='reminder-list-add-reminder'
            date={props.date}
          />
        </Box>
      </List>
    </ModalBox>
  )
}

export const ReminderListContentCtx = createContext(ReminderListContent)
