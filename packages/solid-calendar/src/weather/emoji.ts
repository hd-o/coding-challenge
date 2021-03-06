import { NativeMapCtx } from '/src/pkg/native/map'
import { CacheCtx } from '/src/util/cache'
import { createContext, useContext } from 'react'

function useWeatherEmoji (): Map<string, string> {
  const Map = useContext(NativeMapCtx)
  return useContext(CacheCtx)(
    'weatherEmoji',
    [Map],
    () => new Map([
      ['lc', 'â'],
      ['c', 'âī¸'],
      ['hr', 'đ§ī¸'],
      ['sn', 'đ¨ī¸'],
      ['sl', 'đ¨ī¸'],
      ['h', 'đ§ī¸'],
      ['t', 'đŠī¸'],
      ['lr', 'đ§ī¸'],
      ['s', 'đĻī¸'],
      ['hc', 'âī¸'],
      ['lc', 'đ¤ī¸'],
    ]))
}

export const WeatherEmojiCtx = createContext(useWeatherEmoji)
