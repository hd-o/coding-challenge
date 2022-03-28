/** @see /spec/function-context/index.test.ts */

import { Use } from '/src/util/function-context/context'
import { newResolve } from '/src/util/function-context/new-resolve'
import { newContext } from '../../src/util/function-context/new-context'

type SumX = (x: number) => number

type Sum = (x: number) => (y: number) => number

export const useSum: Use<Sum> = () => {
  return (x: number) => (y: number) => x + y
}

export const useSum10: Use<SumX> = (resolve) => {
  return resolve(useSum)(10)
}

export const useSumAlways200: Use<Sum> = () => {
  return () => () => 200
}

export const useCustomInjection: Use<SumX> = (_, ctx) => {
  const childCtx = newContext(ctx)
  childCtx.set(useSum, () => () => 50)
  return newResolve(childCtx)(useSum10)
}
