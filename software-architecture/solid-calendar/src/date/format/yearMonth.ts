import { createContext } from 'react'

export const yearMonthFormat = 'yyyy-MM'
export type YearMonth = typeof yearMonthFormat

export const YearMonthFormatCtx = createContext(yearMonthFormat)
