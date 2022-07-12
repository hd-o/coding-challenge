import { Context } from './context'

export const parentToken = (): void => { }

export type NewContext = (parent?: Context, context?: Context) => Context

export const newContext: NewContext = (parent, context = new WeakMap()) =>
  parent !== undefined ? context.set(parentToken, parent) : context
