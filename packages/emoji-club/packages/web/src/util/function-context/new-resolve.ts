import { Context, Resolve } from './context'
import { resolveValue } from './resolve-value'

export type NewResolve = (context: Context) => Resolve

export const newResolve: NewResolve = (context) => (useFunction) =>
  resolveValue(context, useFunction) ??
  context
    .set(useFunction, useFunction(newResolve(context), context))
    .get(useFunction)
