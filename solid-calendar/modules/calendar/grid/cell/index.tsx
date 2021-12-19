import { createContext, useContext } from 'react'
import { CalendarAddReminderButtonCtx } from '~/calendar/add/reminder/button'
import { CalendarListItemButtonCtx } from '~/calendar/list/item/button'
import { SelectDateRemindersAtomCtx } from '~/date/atom/reminders'
import { JotaiUseAtomCtx } from '~/pkg/jotai/useAtom'
import { MuiListItemTextCtx } from '~/pkg/mui/ListItemText'
import { MuiTypographyCtx } from '~/pkg/mui/Typography'
import { ReactIntlUseIntlCtx } from '~/pkg/react-intl/useIntl'
import { HandleOpenRemindersCtx } from './handleOpenReminders'
import { DateGridCellListCtx } from './list'

interface Props {
  date: Date
}

function CalendarGridCell (props: Props): JSX.Element {
  const AddReminderButton = useContext(CalendarAddReminderButtonCtx)
  const CalendarListItemButton = useContext(CalendarListItemButtonCtx)
  const DateGridCellList = useContext(DateGridCellListCtx)
  const ListItemText = useContext(MuiListItemTextCtx)
  const Typography = useContext(MuiTypographyCtx)

  const intl = useContext(ReactIntlUseIntlCtx)()
  const handleOpenReminders = useContext(HandleOpenRemindersCtx)(props)
  const selectDateRemindersAtom = useContext(SelectDateRemindersAtomCtx)()
  const useAtom = useContext(JotaiUseAtomCtx)
  const reminders = useAtom(selectDateRemindersAtom(props.date))[0]

  return (
    <div>
      <Typography variant='body2'>
        {props.date.getDate()}
      </Typography>
      <DateGridCellList dense>
        {
          reminders.size === 0
            ? <AddReminderButton date={props.date} />
            : (
                <CalendarListItemButton
                  data-testid='calendar-cell-reminder-count'
                  title={intl.formatMessage({ id: 'open-reminder-list' })}
                  onClick={handleOpenReminders}
                >
                  <ListItemText primary={
                    <>
                      ⚪&nbsp;
                      {
                        intl.formatMessage(
                          { id: 'reminder' },
                          { count: reminders.size })
                      }
                    </>
                  }/>
                </CalendarListItemButton>
              )
        }
      </DateGridCellList>
    </div>
  )
}

export const CalendarGridCellCtx = createContext(CalendarGridCell)
