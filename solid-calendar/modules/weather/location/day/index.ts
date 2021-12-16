import { createContext, useContext } from 'react'
import { ReactQueryUseQueryCtx } from '~/pkg/react-query/useQuery'
import { FetchJSONCtx } from '~/util/fetchJSON'
import { WeatherApiLocationDayCtx } from '~/weather/api/location/day'
import { WeatherLocationDay } from '~/weather/api/location/model'
import { WeatherLocationDatePair, WeatherLocationDayMapCtx } from './map'

interface Props extends WeatherLocationDatePair {}

function useWeatherLocationDay (props: Props): WeatherLocationDay | undefined {
  const useQuery = useContext(ReactQueryUseQueryCtx)
  const weatherLocationDay = useContext(WeatherApiLocationDayCtx)()
  const fetchJson = useContext(FetchJSONCtx)()
  const weatherResults = useContext(WeatherLocationDayMapCtx)
  const weather = weatherResults.get(props)

  useQuery(
    ['reminder-location-weather', props.date, props.location],
    async (): Promise<WeatherLocationDay[]> => await fetchJson(weatherLocationDay(props)),
    {
      enabled: weather === undefined,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess (data: WeatherLocationDay[]) {
        weatherResults.set(props, data[0])
      }
    }
  )

  return weather
}

export const WeatherLocationDayCtx = createContext(useWeatherLocationDay)
