import 'isomorphic-fetch'
import { weatherServer } from './mocks/api/weather'

const _fetch = fetch

globalThis.fetch = async function (input): Promise<any> {
  const path = typeof input === 'string' ? input : ''
  return await _fetch(`https://mock${path}`)
}

beforeAll(() => {
  weatherServer.listen()
})

afterAll(() => {
  weatherServer.close()
})
