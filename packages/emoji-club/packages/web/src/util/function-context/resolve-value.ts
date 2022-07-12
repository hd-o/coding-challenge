import { Context } from './context'
import { parentToken } from './new-context'

export type ResolveValue = <V> (context: Context, token: any) => V | undefined

export const resolveValue: ResolveValue = (context, token) =>
  (context.has(token) && context.get(token)) ||
  (context.has(parentToken) ? resolveValue(context.get(parentToken), token) : undefined)
