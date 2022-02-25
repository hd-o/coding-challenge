import { useContext } from 'react'
import { Observable, ObservedValueOf } from 'rxjs'
import { FnContainerCtx, FnCtor } from '../function/container'
import { useStream } from './useStream'

export const useStreamFn =
  <Fn extends FnCtor<Observable<any>>>
  (fn: Fn): ObservedValueOf<ReturnType<Fn>> => {
    const container = useContext(FnContainerCtx)
    return useStream(container.resolve(fn))
  }
