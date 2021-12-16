import { NextApiHandler } from 'next'
import { WeatherLocation } from '~/weather/api/location/model'

const weatherLocationSearch: NextApiHandler<WeatherLocation[]> = async (req, res) => {
  const { query = '' } = req.query as Record<string, string>
  const response = await fetch(`https://www.metaweather.com/api/location/search/?query=${query}`)
  return res.send(await response.json())
}

export default weatherLocationSearch
