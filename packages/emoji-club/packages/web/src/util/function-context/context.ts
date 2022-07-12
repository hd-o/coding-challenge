export type Use<V> = (resolve: Resolve, context: Context) => V

export type Resolve = <U extends Use<any>> (useFunction: U) => ReturnType<U>

export type Context = WeakMap<Use<any>, any>
