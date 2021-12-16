import { createContext, useContext } from 'react'
import { CalendarListItemButtonCtx } from '~/calendar/list/item/button'
import { MuiListItemTextCtx } from '~/pkg/mui/ListItemText'
import { ReactIntlUseIntlCtx } from '~/pkg/react-intl/useIntl'
import { HandleAddReminderCtx } from './handleAddReminder'

interface Props {
  date: Date
  testid?: string
  visible?: true
}

function CalendarAddReminderButton (props: Props): JSX.Element {
  const DateGridListItemButton = useContext(CalendarListItemButtonCtx)
  const ListItemText = useContext(MuiListItemTextCtx)
  const handleAddReminder = useContext(HandleAddReminderCtx)(props)
  const intl = useContext(ReactIntlUseIntlCtx)()

  return (
    <DateGridListItemButton
      data-testid={
        props.testid ?? 'calendar-add-reminder-button'
      }
      onClick={
        handleAddReminder
      }
      title={
        intl.formatMessage({ id: 'add-reminder' })
      }
      sx={{
        flexGrow: 1,
        textAlign: 'center',
        opacity: props.visible === true ? 0.5 : 0,
        '&:hover': {
          opacity: 1
        }
      }}
    >
      <ListItemText primary="➕" />
    </DateGridListItemButton>
  )
}

export const CalendarAddReminderButtonCtx = createContext(CalendarAddReminderButton)
