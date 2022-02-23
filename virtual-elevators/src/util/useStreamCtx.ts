import { Context, ContextType, useContext } from 'react'
import { Observable, ObservedValueOf } from 'rxjs'
import { useStream } from './useStream'

type UseStreamCtx =
  <B extends Observable<any>>
  (ctx: Context<() => B>) =>
  ObservedValueOf<ReturnType<ContextType<typeof ctx>>>

export const useStreamCtx: UseStreamCtx = (ctx) => {
  return useStream(useContext(ctx)())
}
