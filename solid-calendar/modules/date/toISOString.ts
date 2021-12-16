import { createContext, useContext } from 'react'
import { DateFnsFormatISO9075Ctx } from '~/pkg/date-fns/formatISO9075'

export function useDateToISOString (): (date: Date) => string {
  const formatISO9075 = useContext(DateFnsFormatISO9075Ctx)
  return (date) => formatISO9075(date).replace(' ', 'T')
}

export const DateToISOStringCtx = createContext(useDateToISOString)
