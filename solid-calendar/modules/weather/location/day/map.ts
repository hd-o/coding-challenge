import { createContext } from 'react'
import { WeatherLocation, WeatherLocationDay } from '~/weather/api/location/model'

export interface WeatherLocationDatePair {
  date: Date
  location: WeatherLocation
}

const map = new Map<string, WeatherLocationDay>()

function id (props: WeatherLocationDatePair): string {
  return `${props.date.getUTCDate()}${props.location.woeid}`
}

export const WeatherLocationDayMapCtx = createContext({
  get (props: WeatherLocationDatePair) {
    return map.get(id(props))
  },
  set (props: WeatherLocationDatePair, locationDay: WeatherLocationDay) {
    map.set(id(props), locationDay)
  }
})
