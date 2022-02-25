import { JotaiUseAtomCtx } from '/src/pkg/jotai/useAtom'
import { createContext, useContext } from 'react'
import { WeatherUnitAtomCtx } from './atom/unit'

function useWeatherToggleUnit (): () => void {
  const useAtom = useContext(JotaiUseAtomCtx)
  const [unit, setUnit] = useAtom(useContext(WeatherUnitAtomCtx)())

  return () => setUnit(unit === '°C' ? '°F' : '°C')
}

export const WeatherToggleUnitCtx = createContext(useWeatherToggleUnit)
