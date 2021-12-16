import { createContext } from 'react'

export const WeatherEmojiCtx = createContext(new Map([
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
