import { uniqueId } from 'lodash'
import { createContext } from 'react'

export const LodashUniqueIdCtx = createContext(uniqueId)
