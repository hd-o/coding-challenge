import { JotaiUseAtomCtx } from '/src/pkg/jotai/useAtom'
import { LodashIdentityCtx } from '/src/pkg/lodash/identity'
import { createContext, useContext } from 'react'
import { WeatherLocationDay } from './api/location/model'
import { WeatherUnitAtomCtx } from './atom/unit'

type WeatherFormatTemperature = (weather: WeatherLocationDay) => {
  max: string
  min: string
}

function useWeatherFormatTemperatures (): WeatherFormatTemperature {
  const identity = useContext(LodashIdentityCtx)
  const useAtom = useContext(JotaiUseAtomCtx)
  const unit = useAtom(useContext(WeatherUnitAtomCtx)())[0]

  return (weather) => {
    const multiplier: (c: number) => number =
      unit === '°C' ? identity : c => c * 1.8 + 32
    return {
      max: `${multiplier(weather.max_temp).toFixed()}${unit}`,
      min: `${multiplier(weather.max_temp).toFixed()}${unit}`
    }
  }
}

export const WeatherFormatTemperaturesCtx = createContext(useWeatherFormatTemperatures)
