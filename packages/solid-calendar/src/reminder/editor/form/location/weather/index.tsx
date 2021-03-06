import { MuiGridCtx } from '/src/pkg/mui/Grid'
import { ReminderListItemWeatherCtx } from '/src/reminder/list/item/weather'
import { WeatherLocationDatePair } from '/src/weather/location/day'
import { createContext, PropsWithChildren, useContext } from 'react'
import { GridProps } from '@mui/system'

interface Props extends WeatherLocationDatePair {}

/**
 * @see props of {@link ReminderListItemWeatherCtx}
 */
function Container (props: PropsWithChildren<GridProps>): JSX.Element {
  const Grid = useContext(MuiGridCtx)
  return <Grid {...props} item xs={12} display='flex' justifyContent='flex-end' />
}

function ReminderEditorFormLocationWeather (props: Props): JSX.Element {
  const ReminderListItemWeather = useContext(ReminderListItemWeatherCtx)
  return <ReminderListItemWeather
    {...props}
    Container={Container}
    testId='reminder-editor-weather'
  />
}

export const ReminderEditorFormLocationWeatherCtx = createContext(ReminderEditorFormLocationWeather)
