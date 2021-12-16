export interface WeatherLocation {
  title: string
  location_type: string
  woeid: number
  latt_long: string
}

export interface WeatherLocationDay {
  weather_state_abbr: string
  min_temp: number
  max_temp: number
}
