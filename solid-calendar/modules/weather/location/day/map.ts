import { createContext, useContext } from 'react'
import { NativeMapCtx } from '~/pkg/native/map'
import { CacheCtx } from '~/util/cache'
import { WeatherLocation, WeatherLocationDay } from '~/weather/api/location/model'

export interface WeatherLocationDatePair {
  date: Date
  location: WeatherLocation
}

interface CustomMap {
  get: (props: WeatherLocationDatePair) => WeatherLocationDay | undefined
  set: (props: WeatherLocationDatePair, locationDay: WeatherLocationDay) => void
}

function id (props: WeatherLocationDatePair): string {
  return `${props.date.getUTCDate()}${props.location.woeid}`
}

function useWeatherLocationDayMap (): CustomMap {
  const Map = useContext(NativeMapCtx)
  return useContext(CacheCtx)(
    'weatherLocationDayMap',
    [Map],
    (): CustomMap => {
      const map = new Map<string, WeatherLocationDay>()
      return {
        get: (props) => map.get(id(props)),
        set: (props, locationDay) => map.set(id(props), locationDay)
      }
    })
}

export const WeatherLocationDayMapCtx = createContext(useWeatherLocationDayMap)
