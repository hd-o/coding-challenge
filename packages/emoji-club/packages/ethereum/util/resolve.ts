import { Container } from 'inversify'

// eslint-disable-next-line no-use-before-define
export type Use <V> = (r: ReturnType<Resolve>, c: Container) => V

export type Resolve = (c: Container) => <F extends Use<any>> (f: F) => ReturnType<F>

export const resolve: Resolve = (container) => (fn) => {
  if (container.isBound(fn)) return container.get(fn)
  container.bind(fn).toConstantValue(fn(resolve(container), container))
  return container.get(fn)
}
