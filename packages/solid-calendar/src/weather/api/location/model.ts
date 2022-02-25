export interface WeatherLocation {
  title: string
  woeid: string
}

export interface WeatherLocationDay {
  max_temp: number
  min_temp: number
  weather_state_abbr: string
}

type WOEId = WeatherLocation['woeid']

type LocationSearchQuery = string

export type WeatherLocationSearch = Record<LocationSearchQuery, WeatherLocation[]>

export type WeatherLocationDayMap = Record<WOEId, WeatherLocationDay[]>
