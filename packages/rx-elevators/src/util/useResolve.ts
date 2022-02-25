import { useContext } from 'react'
import { FnContainerCtx, FnCtor } from '../function/container'

export const useResolve = <Fn extends FnCtor<any>> (useFn: Fn): ReturnType<Fn> => {
  const container = useContext(FnContainerCtx)
  return container.resolve(useFn)
}
