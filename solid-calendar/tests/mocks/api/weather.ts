import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { WeatherLocation, WeatherLocationDay } from '~/weather/api/location/model'

const london: WeatherLocation = {
  title: 'London',
  location_type: 'City',
  woeid: 44418,
  latt_long: '51.506321,-0.12714'
}

const barcelona: WeatherLocation = {
  title: 'Barcelona',
  location_type: 'City',
  woeid: 753692,
  latt_long: '41.385578,2.168740'
}

/** Record<locationSearchQuery, WeatherLocation[]> */
const weatherLocationSearch: Record<string, WeatherLocation[]> = {
  barcelona: [barcelona],
  london: [london],
  lon: [london, barcelona]
}

/** Record<locationWOEID, WeatherLocationDay[]> */
const weatherLocationDay: Record<string, WeatherLocationDay[]> = {
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

export const weatherServer = setupServer(
  rest.get('https://mock/api/weather/location/day', (req, res, ctx) => {
    const woeid = req.url.searchParams.get('woeid') ?? ''
    return res(ctx.json(weatherLocationDay[woeid] ?? []))
  }),
  rest.get('https://mock/api/weather/location/search', (req, res, ctx) => {
    const query = req.url.searchParams.get('query') ?? ''
    return res(ctx.json(weatherLocationSearch[query] ?? []))
  })
)
