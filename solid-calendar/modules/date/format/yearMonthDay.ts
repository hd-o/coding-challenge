import { createContext } from 'react'

const yearMonthDayFormat = 'yyyy-MM-dd'
export type YearMonthDay = typeof yearMonthDayFormat

export const YearMonthDayFormatCtx = createContext(yearMonthDayFormat)
