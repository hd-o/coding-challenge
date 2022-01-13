import { Context, useContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { useStream } from './useStream'

export function useStreamCtx <V> (ctx: Context<BehaviorSubject<V>>): V {
  return useStream(useContext(ctx))
}
