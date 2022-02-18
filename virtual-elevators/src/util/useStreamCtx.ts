import { Context, ContextType, useContext } from 'react'
import { Observable, ObservedValueOf } from 'rxjs'
import { useStream } from './useStream'

export function useStreamCtx <B extends Observable<any>> (ctx: Context<B>): ObservedValueOf<ContextType<typeof ctx>> {
  return useStream(useContext(ctx))
}
