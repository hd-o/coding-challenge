import { memoize } from 'lodash'
import { createContext } from 'react'

export const LodashMemoizeCtx = createContext(memoize)
