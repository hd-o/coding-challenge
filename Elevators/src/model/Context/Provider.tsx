import { PropsWithChildren } from 'react'
import { ReactContext, defaultValue } from './React'

type AppContextProps = PropsWithChildren<{
  value?: typeof defaultValue
}>

/**
 * Dependency injection through React tree
 */
export function ContextProvider (props: AppContextProps) {
  return (
    <ReactContext.Provider value={props.value ?? defaultValue}>
      {props.children}
    </ReactContext.Provider>
  )
}
