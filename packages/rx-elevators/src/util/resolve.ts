import { Container } from 'inversify'

export type Use <V> = (c: Container) => V

type Resolve = (c: Container) => <F extends Use<any>> (f: F) => ReturnType<F>

export const resolve: Resolve = (container) => (fn) => {
  if (container.isBound(fn)) return container.get(fn)
  container.bind(fn).toConstantValue(fn(container))
  return container.get(fn)
}
