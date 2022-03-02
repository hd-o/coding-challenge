import { Observable, ObservedValueOf } from 'rxjs'
import { Use } from './resolve'
import { useResolve } from './useResolve'
import { useStream } from './useStream'

export const useStreamFn =
  <Fn extends Use<Observable<any>>>
  (fn: Fn): ObservedValueOf<ReturnType<Fn>> => {
    return useStream(useResolve(fn))
  }
