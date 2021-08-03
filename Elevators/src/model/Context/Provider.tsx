import { FC } from 'react'
import { ReactContext, defaultValue } from './React'

interface AppContextProps {
  value?: typeof defaultValue
}

/**
 * Dependency injection through React tree
 */
export const ContextProvider: FC<AppContextProps> = (props) => (
  <ReactContext.Provider value={props.value ?? defaultValue}>
    {props.children}
  </ReactContext.Provider>
)
