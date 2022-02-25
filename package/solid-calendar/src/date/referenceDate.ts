import { NativeDateCtx } from '/src/pkg/native/date'
import { CacheCtx } from '/src/util/cache'
import { createContext, useContext } from 'react'

/**
 * Used by date utils, like date-fns parse
 * @see {@link https://date-fns.org/docs/parse#syntax|date-fns/parse}
 */
function useReferenceDate (): Date {
  const Date = useContext(NativeDateCtx)
  return useContext(CacheCtx)('referenceDate', [Date], () => new Date())
}

export const ReferenceDateCtx = createContext(useReferenceDate)
