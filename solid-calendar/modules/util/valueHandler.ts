import { createContext } from 'react'

type Handler = (value: string) => unknown
type EventHandler = React.ChangeEventHandler<HTMLInputElement>

function useValueHandler (handler: Handler): EventHandler {
  return (event) => {
    handler(event.target.value)
  }
}

export const ValueHandlerCtx = createContext(useValueHandler)
