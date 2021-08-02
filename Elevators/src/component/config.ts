import { range } from 'lodash'

/** UI base border style */
const border = '1px solid #ccc'
/** Height, in pixels, of each floor */
const floorHeight = 100
/**
 * Quantity of "Building floors"
 * the elevators will service
 */
const floorCount = 6
/** Range for UI loops (0-indexed) */
const floors = range(floorCount - 1, -1)

// TODO: Insert through context
export const Cfg = <const>{
  border,
  floorHeight,
  floorCount,
  floors,
}
