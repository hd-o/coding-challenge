import { getDaysInMonth } from 'date-fns'
import { createContext } from 'react'

export const DateFnsGetDaysInMonthCtx = createContext(getDaysInMonth)
