import { Context, ContextType, useContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { useStream } from './useStream'

export function useStreamCtx <B extends BehaviorSubject<any>> (ctx: Context<B>): ContextType<typeof ctx>['value'] {
  return useStream(useContext(ctx))
}
