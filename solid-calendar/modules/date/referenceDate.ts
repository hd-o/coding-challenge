import { createContext, useContext } from 'react'
import { NativeDateCtx } from '~/pkg/native/date'

let referenceDate: Date

/**
 * Used by date utils, like date-fns parse
 * @see {@link https://date-fns.org/docs/parse#syntax|date-fns/parse}
 */
function useReferenceDate (): Date {
  const Date = useContext(NativeDateCtx)
  return referenceDate ?? (referenceDate = new Date())
}

export const ReferenceDateCtx = createContext(useReferenceDate)
