import { createContext } from 'react'
import { container as globalContainer, DependencyContainer as DC } from 'tsyringe'

type FunctionContainerValueConstructor <V = any> = (c: FunctionContainer) => V

export type FnCtor <V = any> = FunctionContainerValueConstructor<V>

class FunctionContainer {
  private readonly _container: DC

  private _register <F extends FnCtor> (token: F, value?: F): void {
    const newValue = value ?? token
    this._container.register(token as any, { useValue: newValue(this) })
  }

  constructor (container?: DC) {
    this._container = container ?? globalContainer.createChildContainer()
    if (container === undefined) this._container.reset()
  }

  childContainer (): FunctionContainer {
    const container = this._container.createChildContainer()
    return new FunctionContainer(container)
  }

  register <F extends FnCtor> (token: F, value: F): void {
    this._register(token, value)
  }

  reset (): void {
    this._container.reset()
  }

  resolve <T extends FnCtor> (token: T): ReturnType<T> {
    if (!this._container.isRegistered(token as any)) this._register(token)
    return this._container.resolve<T>(token as any) as ReturnType<T>
  }
}

export type FnC = FunctionContainer

export const fnContainer = new FunctionContainer()
export const FnContainerCtx = createContext(fnContainer)
