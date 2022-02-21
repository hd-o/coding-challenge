import { createContext, useContext } from 'react'
import { WeatherApiUrlCtx } from '../'

function useWeatherApiLocationSearch (): (query: string) => string {
  const url = useContext(WeatherApiUrlCtx)
  return (query) => `${url}/location/search?query=${query}`
}

export const WeatherApiLocationSearchCtx = createContext(useWeatherApiLocationSearch)
