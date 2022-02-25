import Pretender from 'pretender'
import { newWeatherServer } from './mocks/api/weather'

let weatherServer: Pretender

beforeAll(() => {
  weatherServer = newWeatherServer()
})

afterAll(() => {
  weatherServer.shutdown()
})
