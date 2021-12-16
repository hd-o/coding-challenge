import { WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'
import { JotaiAtomCtx } from '~/pkg/jotai/atom'

type WeatherUnit = '°C' | '°F'

let weatherUnitAtom: WritableAtom<WeatherUnit, WeatherUnit>

function useWeatherUnitAtom (): typeof weatherUnitAtom {
  const atom = useContext(JotaiAtomCtx)
  return weatherUnitAtom ?? (weatherUnitAtom = atom<WeatherUnit>('°C'))
}

export const WeatherUnitAtomCtx = createContext(useWeatherUnitAtom)
