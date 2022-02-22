import { NativeMapCtx } from '/src/pkg/native/map'
import { CacheCtx } from '/src/util/cache'
import { createContext, useContext } from 'react'

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
      ['lc', '🌤️'],
    ]))
}

export const WeatherEmojiCtx = createContext(useWeatherEmoji)
