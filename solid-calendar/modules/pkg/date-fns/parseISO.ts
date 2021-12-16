import { parseISO } from 'date-fns'
import { createContext } from 'react'

export const DateFnsParseISOCtx = createContext(parseISO)
