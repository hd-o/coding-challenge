import {
  WeatherLocation, WeatherLocationDayMap, WeatherLocationSearch
} from '/src/weather/api/location/model'
import qs from 'qs'

const london: WeatherLocation = {
  title: 'London',
  woeid: '44418',
}

const barcelona: WeatherLocation = {
  title: 'Barcelona',
  woeid: '753692',
}

const weatherLocationSearch: WeatherLocationSearch = {
  barcelona: [barcelona],
  london: [london],
  lon: [london, barcelona],
}

const weatherLocationDay: WeatherLocationDayMap = {
  [barcelona.woeid]: [{
    weather_state_abbr: 's',
    min_temp: 15.469,
    max_temp: 22.755,
  }],
  [london.woeid]: [{
    weather_state_abbr: 'hc',
    min_temp: 6.405,
    max_temp: 12.99,
  }],
}

type WeatherFetchJson = <V> (req: string) => Promise<V>

export const useWeatherServer = (): WeatherFetchJson => {
  return <V> (req: string): Promise<V> => new Promise((resolve) => {
    const params = qs.parse(req.split('?')[1] ?? '') as Record<string, string>
    let result = {}
    if (req.startsWith('/api/weather/location/day')) {
      const woeid = params.woeid ?? ''
      result = weatherLocationDay[woeid] ?? []
    }
    if (req.startsWith('/api/weather/location/search')) {
      const query = params.query ?? ''
      result = weatherLocationSearch[query] ?? []
    }
    return resolve(result as unknown as V)
  })
}
