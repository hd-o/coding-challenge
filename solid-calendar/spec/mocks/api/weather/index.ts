import { jsonResponse } from '/src/util/jsonResponse'
import {
  WeatherLocation, WeatherLocationDayMap, WeatherLocationSearch
} from '/src/weather/api/location/model'
import Pretender from 'pretender'

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
  lon: [london, barcelona]
}

const weatherLocationDay: WeatherLocationDayMap =  {
  [barcelona.woeid]: [{
    weather_state_abbr: 's',
    min_temp: 15.469,
    max_temp: 22.755
  }],
  [london.woeid]: [{
    weather_state_abbr: 'hc',
    min_temp: 6.405,
    max_temp: 12.99
  }]
}

export const newWeatherServer = (): Pretender => {
  return new Pretender(function () {
    this.get('/api/weather/location/day', (req) => {
      const woeid = req.queryParams.woeid ?? ''
      return jsonResponse(weatherLocationDay[woeid] ?? [])
    }),
    this.get('/api/weather/location/search', (req) => {
      const query = req.queryParams.query ?? ''
      return jsonResponse(weatherLocationSearch[query] ?? [])
    })  
  })  
}
