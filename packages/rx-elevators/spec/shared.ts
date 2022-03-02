import { resolve } from '/src/util/resolve'
import { container } from '../src/container'

export const elevatorCount = 4
export const floorCount = 6
export const specContainer = container.createChild()
export const specResolve = resolve(specContainer)
