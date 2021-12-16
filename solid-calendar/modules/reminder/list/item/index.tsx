import { createContext, useContext } from 'react'
import { CalendarListItemButtonCtx } from '~/calendar/list/item/button'
import { MuiBoxCtx } from '~/pkg/mui/Box'
import { MuiDividerCtx } from '~/pkg/mui/Divider'
import { MuiGridCtx } from '~/pkg/mui/Grid'
import { MuiIconDeleteCtx } from '~/pkg/mui/icon/Delete'
import { MuiIconButtonCtx } from '~/pkg/mui/IconButton'
import { MuiTypographyCtx } from '~/pkg/mui/Typography'
import { ReactIntlUseIntlCtx } from '~/pkg/react-intl/useIntl'
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
