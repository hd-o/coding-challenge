import { fnContainer } from '/src/function/container'
import { useFnResolve } from './model/util/fnResolve'

export const elevatorCount = 4
export const floorCount = 6
export const container = fnContainer.childContainer()
export const resolve = container.resolve(useFnResolve)
