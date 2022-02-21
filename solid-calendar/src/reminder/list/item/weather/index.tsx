import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { ReactIntlUseIntlCtx } from '/src/pkg/react-intl/useIntl'
import { WeatherEmojiCtx } from '/src/weather/emoji'
import { WeatherFormatTemperaturesCtx } from '/src/weather/formatTemperatures'
import { WeatherLocationDatePair, WeatherLocationDayCtx } from '/src/weather/location/day'
import { WeatherToggleUnitCtx } from '/src/weather/toggleUnit'
import { createContext, FC, useContext } from 'react'

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
  const weatherEmoji = useContext(WeatherEmojiCtx)()

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
