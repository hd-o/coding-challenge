import { createContext } from 'react'

function matchYearMonthDate (a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  )
}

export const DateMatchYearMonthDate = createContext(matchYearMonthDate)
