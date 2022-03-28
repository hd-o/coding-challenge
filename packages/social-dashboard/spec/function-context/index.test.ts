import { Context, Resolve } from '/src/util/function-context/context'
import { newContext } from '/src/util/function-context/new-context'
import { newResolve } from '/src/util/function-context/new-resolve'
import { resolveValue } from '/src/util/function-context/resolve-value'
import { useCustomInjection, useSum10 } from './functions'

let context: Context
let resolve: Resolve

beforeEach(() => {
  context = newContext()
  resolve = newResolve(context)
})

describe('function-context', () => {
  test('resolve', () => {
    const resolved = resolve(useSum10)
    expect(resolved(10)).toBe(20)
  })
  test('resolve value', () => {
    const token = (): void => { }
    const value = 'value'
    context.set(token, value)
    expect(resolveValue(context, token)).toBe(value)
  })
  test('in-function register, and resolve', () => {
    const customInjection = resolve(useCustomInjection)
    expect(customInjection(10)).toBe(50)
  })
})
