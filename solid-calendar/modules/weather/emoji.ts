import { createContext, useContext } from 'react'
import { NativeMapCtx } from '~/pkg/native/map'
import { CacheCtx } from '~/util/cache'

function useWeatherEmoji (): Map<string, string> {
  const Map = useContext(NativeMapCtx)
  return useContext(CacheCtx)(
    'weatherEmoji',
    [Map],
    () => new Map([
      ['lc', '⛅'],
      ['c', '☀️'],
      ['hr', '🌧️'],
      ['sn', '🌨️'],
      ['sl', '🌨️'],
      ['h', '🌧️'],
      ['t', '🌩️'],
      ['lr', '🌧️'],
      ['s', '🌦️'],
      ['hc', '☁️'],
      ['lc', '🌤️']
    ]))
}

export const WeatherEmojiCtx = createContext(useWeatherEmoji)
