import { jsonResponse } from '/src/util/jsonResponse'
import { WeatherLocation, WeatherLocationDay } from '/src/weather/api/location/model'
import Pretender from 'pretender'
import { createContext } from 'react'

const woeid = ''
const maxTemp = 30
const minTemp = 15

const weatherStateAbbr =
  ['lc', 'c', 'hr', 'sn', 'sl', 'h', 't', 'lr', 's', 'hc', 'lc']

const randomIntInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min)

// Can be substituted with:
// const url = 'https://www.metaweather.com/api'
// await fetch(`${url}/location/...`)

const newWeatherServer = (): Pretender => {
  return new Pretender(function () {
    this.get('/api/weather/location/day', () => {
      const stateAbbrIndex = randomIntInRange(0, weatherStateAbbr.length - 1)
      const state = weatherStateAbbr[stateAbbrIndex]
      const day: WeatherLocationDay = {
        weather_state_abbr: state,
        min_temp: randomIntInRange(minTemp, maxTemp),
        max_temp: randomIntInRange(minTemp, maxTemp),
      }
      return jsonResponse([day])
    })
    this.get('/api/weather/location/search', (req) => {
      const title = req.queryParams.query ?? ''
      const location: WeatherLocation = { title, woeid }
      return jsonResponse([location])
    })
  })
}

export const WeatherServerCtx = createContext(newWeatherServer)
