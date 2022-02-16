import { FnCtor } from '../../../modules/function/container'

type FnResolve = <F extends FnCtor> (fn: F) => ReturnType<F>

export const useFnResolve: FnCtor<FnResolve> = (container) => {
  return (fn) => container.resolve(fn)
}
