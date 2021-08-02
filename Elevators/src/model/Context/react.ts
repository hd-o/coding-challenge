/**
 * @file
 * @see {@link ./ContextProvider.tsx}
 * Context used by React UI tree
 */
import { range } from 'lodash'
import { createContext } from 'react'
import { Elevator } from '../type/Elevator'
import { ElevatorController } from '../type/Elevator/Controller'
import { Floor } from '../type/Floor'
import { ModelContext } from './model'

const ctx = new ModelContext()
/** 6 Floors from 0 to 5 */
const floors = range(6).map<Floor>((number) => new Floor(number, ctx))
/** Context with 3 Elevators */
export const defaultValue = {
  elevatorService: new ElevatorController(
    range(3).map(() => new Elevator(floors, ctx)),
  ),
}

export const UiContext = createContext(defaultValue)
