import { createContext, useContext } from 'react'
import { Resolve } from './function-context/context'
import { newContext } from './function-context/new-context'
import { newResolve } from './function-context/new-resolve'

export const ResolveCtx = createContext(newResolve(newContext()))

export const useResolve: Resolve = (fn) => useContext(ResolveCtx)(fn)
