import { NextApiHandler } from 'next'
import { WeatherLocationDay } from '~/weather/api/location/model'

export const url = 'https://www.metaweather.com/api'

const weatherLocationDay: NextApiHandler<WeatherLocationDay[]> = async (req, res) => {
  const { woeid, year, month, day } = req.query as Record<string, string>
  const response = await fetch(`${url}/location/${woeid}/${year}/${month}/${day}/`)
  return res.send(await response.json())
}

export default weatherLocationDay
