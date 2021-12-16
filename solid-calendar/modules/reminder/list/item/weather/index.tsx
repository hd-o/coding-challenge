import { createContext, FC, useContext } from 'react'
import { MuiBoxCtx } from '~/pkg/mui/Box'
import { MuiTypographyCtx } from '~/pkg/mui/Typography'
import { ReactIntlUseIntlCtx } from '~/pkg/react-intl/useIntl'
import { WeatherEmojiCtx } from '~/weather/emoji'
import { WeatherFormatTemperaturesCtx } from '~/weather/formatTemperatures'
import { WeatherLocationDayCtx } from '~/weather/location/day'
import { WeatherLocationDatePair } from '~/weather/location/day/map'
import { WeatherToggleUnitCtx } from '~/weather/toggleUnit'

interface Props extends WeatherLocationDatePair {
  /**
   * Used to only render Container
   * when weather data is available
  */
  Container?: FC
  testId?: string
}

function ReminderListItemWeather (props: Props): JSX.Element {
  const Box = useContext(MuiBoxCtx)
  const Typography = useContext(MuiTypographyCtx)

  const intl = useContext(ReactIntlUseIntlCtx)()
  const weather = useContext(WeatherLocationDayCtx)(props)
  const toggleUnit = useContext(WeatherToggleUnitCtx)()
  const formatTemperatures = useContext(WeatherFormatTemperaturesCtx)()
  const weatherEmoji = useContext(WeatherEmojiCtx)

  if (weather === undefined) return <></>

  const { min, max } = formatTemperatures(weather)
  const { Container = Box } = props

  return (
    <Container data-testid={props.testId ?? 'reminder-list-item-weather'}>
      <Typography
        color="text.secondary"
        onClick={
          toggleUnit
        }
        sx={{
          cursor: 'pointer'
        }}
        title={
          intl.formatMessage(
            { id: 'weather-max-min-title' },
            { max, min })
        }
      >
        {props.location.title}
        &nbsp;•&nbsp;
        {
          weatherEmoji.has(weather.weather_state_abbr)
            ? <>{weatherEmoji.get(weather.weather_state_abbr)}&nbsp;</>
            : ''
        }
        {
          intl.formatMessage(
            { id: `weather-${weather.weather_state_abbr}` })
        }
        &nbsp;
        {max} / {min}
      </Typography>
    </Container>
  )
}

export const ReminderListItemWeatherCtx = createContext(ReminderListItemWeather)
