import { ReactQueryUseQueryCtx } from '/src/pkg/react-query/useQuery'
import { FetchJSONCtx } from '/src/util/fetchJSON'
import { WeatherApiLocationDayCtx } from '/src/weather/api/location/day'
import { WeatherLocation, WeatherLocationDay } from '/src/weather/api/location/model'
import { createContext, useContext } from 'react'

export interface WeatherLocationDatePair {
  date: Date
  location: WeatherLocation
}

interface Props extends WeatherLocationDatePair {}

function useWeatherLocationDay (props: Props): WeatherLocationDay | undefined {
  const useQuery = useContext(ReactQueryUseQueryCtx)
  const weatherLocationDay = useContext(WeatherApiLocationDayCtx)()
  const fetchJson = useContext(FetchJSONCtx)()

  const query = useQuery(
    ['reminder-location-weather', props.date, props.location],
    () => fetchJson<WeatherLocationDay[]>(weatherLocationDay(props)),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    })

  return query.data?.[0]
}

export const WeatherLocationDayCtx = createContext(useWeatherLocationDay)
