export interface WeatherLocation {
  title: string
  woeid: string
}

export interface WeatherLocationDay {
  weather_state_abbr: string
  min_temp: number
  max_temp: number
}

type WOEId = WeatherLocation['woeid']

type LocationSearchQuery = string

export type WeatherLocationSearch = Record<LocationSearchQuery, WeatherLocation[]>

export type WeatherLocationDayMap = Record<WOEId, WeatherLocationDay[]> 
