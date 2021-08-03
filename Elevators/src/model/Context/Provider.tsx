import { FC } from 'react'
import { UiContext, defaultValue } from './react'

interface AppContextProps {
  value?: typeof defaultValue
}

/**
 * Dependency injection through React tree
 */
export const ContextProvider: FC<AppContextProps> = (props) => (
  <UiContext.Provider value={props.value ?? defaultValue}>
    {props.children}
  </UiContext.Provider>
)
