import { JotaiAtomCtx } from '/src/pkg/jotai/atom'
import { CacheCtx } from '/src/util/cache'
import { WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'

type WeatherUnit = '°C' | '°F'

function useWeatherUnitAtom (): WritableAtom<WeatherUnit, WeatherUnit> {
  const atom = useContext(JotaiAtomCtx)
  return useContext(CacheCtx)(
    'weatherUnitAtom', [atom], () => atom<WeatherUnit>('°C'))
}

export const WeatherUnitAtomCtx = createContext(useWeatherUnitAtom)
