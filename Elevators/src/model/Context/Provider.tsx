/**
 * @file
 * Dependency injection through React tree.
 * Used in production, and in tests
 */
import { FC } from 'react'
import { UiContext, defaultValue } from './react'

interface AppContextProps {
  value?: typeof defaultValue
}

export const ContextProvider: FC<AppContextProps> = (props) => (
  <UiContext.Provider value={props.value ?? defaultValue}>
    {props.children}
  </UiContext.Provider>
)
