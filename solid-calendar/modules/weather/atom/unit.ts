import { WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'
import { JotaiAtomCtx } from '~/pkg/jotai/atom'
import { CacheCtx } from '~/util/cache'

type WeatherUnit = '°C' | '°F'

function useWeatherUnitAtom (): WritableAtom<WeatherUnit, WeatherUnit> {
  const atom = useContext(JotaiAtomCtx)
  return useContext(CacheCtx)(
    'weatherUnitAtom', [atom], () => atom<WeatherUnit>('°C'))
}

export const WeatherUnitAtomCtx = createContext(useWeatherUnitAtom)
