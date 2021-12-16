import { createContext, useContext } from 'react'
import { DateFnsGetDateCtx } from '~/pkg/date-fns/getDate'
import { DateFnsGetMonthCtx } from '~/pkg/date-fns/getMonth'
import { DateFnsGetYearCtx } from '~/pkg/date-fns/getYear'
import { WeatherApiUrlCtx } from '../'
import { WeatherLocation } from './model'

interface Props {
  location: WeatherLocation
  date: Date
}

function useWeatherApiLocationDay (): (props: Props) => string {
  const getDate = useContext(DateFnsGetDateCtx)
  const getMonth = useContext(DateFnsGetMonthCtx)
  const getYear = useContext(DateFnsGetYearCtx)
  const url = useContext(WeatherApiUrlCtx)

  return (props) => {
    const woeid = props.location.woeid
    const year = getYear(props.date)
    const month = getMonth(props.date)
    const day = getDate(props.date)
    return `${url}/location/day?woeid=${woeid}&year=${year}&month=${month}&day=${day}`
  }
}

export const WeatherApiLocationDayCtx = createContext(useWeatherApiLocationDay)
