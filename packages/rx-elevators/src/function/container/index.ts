import { createContext } from 'react'

type FunctionContainerValueConstructor <V = any> = (c: FunctionContainer) => V

export type FnCtor <V = any> = FunctionContainerValueConstructor<V>

class FunctionContainer {
  constructor (private readonly _parent?: FnC) {}

  private _map = new WeakMap()

  private _resolve <F extends FnCtor> (fn: F): ReturnType<typeof fn> | undefined {
    if (this._map.has(fn)) return this._map.get(fn)
    if (this._parent === undefined) return undefined
    return this._parent._resolve(fn)
  }

  childContainer (): FnC {
    return new FunctionContainer(this)
  }

  register <F extends FnCtor> (fn: F, value: FnCtor<ReturnType<typeof fn>>): void {
    this._map.set(fn, value(this))
  }

  reset (): void {
    this._map = new WeakMap()
  }

  resolve <F extends FnCtor> (fn: F): ReturnType<typeof fn> {
    const resolved = this._resolve(fn)
    if (resolved !== undefined) return resolved
    const value = fn(this)
    this._map.set(fn, value)
    return value
  }
}

export type FnC = FunctionContainer
export const fnContainer = new FunctionContainer()
export const FnContainerCtx = createContext(fnContainer)
