import { CalendarListItemButtonCtx } from '/src/calendar/list/item/button'
import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { MuiDividerCtx } from '/src/pkg/mui/Divider'
import { MuiGridCtx } from '/src/pkg/mui/Grid'
import { MuiIconDeleteCtx } from '/src/pkg/mui/icon/Delete'
import { MuiIconButtonCtx } from '/src/pkg/mui/IconButton'
import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { ReactIntlUseIntlCtx } from '/src/pkg/react-intl/useIntl'
import { createContext, useContext } from 'react'
import { ReminderListHandleDeleteCtx } from './handleDelete'
import { ReminderListHandleEditCtx } from './handleEdit'
import { ReminderListItemProps } from './props'
import { ReminderListItemWeatherCtx } from './weather'

function ReminderListItem (props: ReminderListItemProps): JSX.Element {
  const Box = useContext(MuiBoxCtx)
  const CalendarListItemButton = useContext(CalendarListItemButtonCtx)
  const DeleteIcon = useContext(MuiIconDeleteCtx)
  const Divider = useContext(MuiDividerCtx)
  const Grid = useContext(MuiGridCtx)
  const IconButton = useContext(MuiIconButtonCtx)
  const ReminderListItemWeather = useContext(ReminderListItemWeatherCtx)
  const Typography = useContext(MuiTypographyCtx)

  const intl = useContext(ReactIntlUseIntlCtx)()
  const handleEdit = useContext(ReminderListHandleEditCtx)(props)
  const handleDelete = useContext(ReminderListHandleDeleteCtx)(props)
  const { reminder } = props

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      title={intl.formatMessage({ id: 'edit-reminder' })}
    >
      <Grid item xs={11}>
        <CalendarListItemButton
          data-testid='reminder-list-item'
          onClick={handleEdit}
        >
          <Box>
            <Typography variant="h6">
              {reminder.title}
            </Typography>
            <Typography color="text.secondary">
              {reminder.date.toString()}
            </Typography>
            {
              reminder.location !== undefined &&
                <ReminderListItemWeather
                  date={reminder.date}
                  location={reminder.location}
                />
            }
          </Box>
        </CalendarListItemButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton
          title={intl.formatMessage({ id: 'delete-reminder' })}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Divider/>
    </Grid>
  )
}

export const ReminderListItemCtx = createContext(ReminderListItem)
