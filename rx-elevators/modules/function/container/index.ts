import { createContext } from 'react'
import { container as globalContainer, DependencyContainer as DC } from 'tsyringe'

type FunctionContainerValueConstructor <V = any> = (c: FunctionContainer) => V

export type FnCtor <V = any> = FunctionContainerValueConstructor<V>

type RegisterTuple <UseFn extends FnCtor> = [UseFn] | [UseFn, UseFn]

class FunctionContainer {
  private readonly _container: DC

  private _register <C extends FnCtor> (tuple: RegisterTuple<C>): void {
    const token = tuple[0] as any
    const value: C = tuple[1] ?? token
    this._container.register(token, { useValue: value(this) })
  }

  constructor (container?: DC) {
    this._container = container ?? globalContainer.createChildContainer()
    if (container === undefined) this._container.reset()
  }

  register <C extends FnCtor> (...pairs: Array<RegisterTuple<C>>): FunctionContainer {
    const container = this._container.createChildContainer()
    const childFnContainer = new FunctionContainer(container)
    for (const pair of pairs) childFnContainer._register(pair)
    return childFnContainer
  }

  resolve <T extends FnCtor> (token: T): ReturnType<T> {
    if (!this._container.isRegistered(token as any)) this._register([token])
    return this._container.resolve<T>(token as any) as ReturnType<T>
  }
}

export type FnC = FunctionContainer

export const FnContainerCtx = createContext(new FunctionContainer())
