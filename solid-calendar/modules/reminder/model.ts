import { WeatherLocation } from '~/weather/api/location/model'

export interface Reminder {
  date: Date
  id: string
  location?: WeatherLocation
  title: string
}
