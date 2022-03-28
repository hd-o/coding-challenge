import { createContext, useContext } from 'react'
import { Context, Use } from './function-context/context'
import { newContext } from './function-context/new-context'
import { newResolve } from './function-context/new-resolve'

const context: Context = newContext()

const ResolveCtx = createContext(newResolve(context))

type UseResolved = <U extends Use<any>> (useFn: U) => ReturnType<U>

export const useResolved: UseResolved = (useFn) => useContext(ResolveCtx)(useFn)
