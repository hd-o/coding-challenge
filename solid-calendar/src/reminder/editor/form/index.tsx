import { SelectDateRemindersAtomCtx } from '/src/date/atom/reminders'
import { DateSetTimeToNowCtx } from '/src/date/setTimeToNow'
import { DateToISOStringCtx } from '/src/date/toISOString'
import { ModalBoxCtx } from '/src/modal/box'
import { DateFnsParseISOCtx } from '/src/pkg/date-fns/parseISO'
import { JotaiUseAtomCtx } from '/src/pkg/jotai/useAtom'
import { MuiButtonCtx } from '/src/pkg/mui/Button'
import { MuiGridCtx } from '/src/pkg/mui/Grid'
import { MuiTextFieldCtx } from '/src/pkg/mui/TextField'
import { ReactIntlUseIntlCtx } from '/src/pkg/react-intl/useIntl'
import { ValueHandlerCtx } from '/src/util/valueHandler'
import { createContext, Suspense, useContext, useState } from 'react'
import { ReminderEditorHandleCloseCtx } from '../handleClose'
import { ReminderEditorHandleSaveCtx } from '../handleSave'
import { LocationSearchCtx } from './location/search'
import { ReminderEditorFormLocationWeatherCtx } from './location/weather'

interface Props {
  date: Date
  reminderId?: string
}

export function ReminderEditorForm (props: Props): JSX.Element {
  const Button = useContext(MuiButtonCtx)
  const Grid = useContext(MuiGridCtx)
  const LocationSearch = useContext(LocationSearchCtx)
  const LocationWeather = useContext(ReminderEditorFormLocationWeatherCtx)
  const ModalBox = useContext(ModalBoxCtx)
  const TextField = useContext(MuiTextFieldCtx)

  const intl = useContext(ReactIntlUseIntlCtx)()
  const toISOString = useContext(DateToISOStringCtx)()
  const parseISO = useContext(DateFnsParseISOCtx)
  const handleClose = useContext(ReminderEditorHandleCloseCtx)()
  const useValueHandler = useContext(ValueHandlerCtx)
  const useHandleSave = useContext(ReminderEditorHandleSaveCtx)
  const setTimeToNow = useContext(DateSetTimeToNowCtx)()
  const selectDateRemindersAtom = useContext(SelectDateRemindersAtomCtx)()
  const useAtom = useContext(JotaiUseAtomCtx)

  const dateReminders = useAtom(selectDateRemindersAtom(props.date))[0]
  const reminder = dateReminders.get(props.reminderId ?? '')

  const [title, setTitle] = useState(reminder?.title ?? '')
  const [location, setLocation] = useState(reminder?.location)

  const isoDate = toISOString(reminder?.date ?? setTimeToNow(props.date))
  const [date, setDate] = useState(isoDate)

  const handleSave = useHandleSave({
    date: props.date,
    reminderState: {
      date: parseISO(date),
      id: props.reminderId,
      title,
      location
    }
  })

  return (
    <ModalBox component="form" data-testid='reminder-editor'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            inputProps={{
              'data-testid': 'reminder-editor-title'
            }}
            label={intl.formatMessage({ id: 'reminder-title' })}
            variant="standard"
            value={title}
            onChange={useValueHandler(setTitle)}
          />
        </Grid>
        <Grid item xs={6}>
        <TextField
          inputProps={{
            'data-testid': 'reminder-editor-date'
          }}
          label={intl.formatMessage({ id: 'reminder-date' })}
          type="datetime-local"
          value={date}
          onChange={useValueHandler(setDate)}
          variant="standard"
        />
        </Grid>
        <Grid item xs={6}>
          <LocationSearch setLocation={setLocation} />
        </Grid>
        {
          location !== undefined &&
            <Suspense fallback={null}>
              <LocationWeather
                date={parseISO(date)}
                location={location}
              />
            </Suspense>
        }
        <Grid item xs={6} >
          <Button
            disabled={title.length === 0}
            color='primary'
            onClick={handleSave}
            variant="contained"
          >
            { intl.formatMessage({ id: 'save-reminder' }) }
          </Button>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='flex-end'>
          <Button
            color='warning'
            onClick={handleClose}
            variant="contained"
          >
            { intl.formatMessage({ id: 'cancel' }) }
          </Button>
        </Grid>
      </Grid>
    </ModalBox>
  )
}

export const ReminderEditorFormCtx = createContext(ReminderEditorForm)
