import { useContext } from 'react'
import { ContainerCtx } from '../container'
import { resolve, Use } from './resolve'

/**
 * Should only be used by React Components.
 * Other functions should use `resolve` directly.
 * so its container argument is used for resolution,
 * while Components should use ContainerCtx's value
 */
export const useResolve = <Fn extends Use<any>> (useFn: Fn): ReturnType<Fn> => {
  const container = useContext(ContainerCtx)
  return resolve(container)(useFn)
}
