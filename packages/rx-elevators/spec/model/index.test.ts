/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { ElevatorId } from '/src/elevator/id'
import { useElevatorId$ } from '/src/elevator/id/stream'
import { useNewElevatorPair$ } from '/src/elevator/pair/stream'
import { useNewElevator$Map$ } from '/src/elevator/stream/map/stream'
import { useFloorNumber$ } from '/src/floor/number/stream'
import { equals } from 'ramda'
import { firstValueFrom, of } from 'rxjs'
import { elevatorCount, floorCount, resolve } from '../shared'

let elevatorId$: ReturnType<typeof useElevatorId$>
let floorNumber$: ReturnType<typeof useFloorNumber$>
let newElevator$Map$: ReturnType<typeof useNewElevator$Map$>
let newElevatorPair$: ReturnType<typeof useNewElevatorPair$>

const mockKey = 'mockKey'
const mockValue = Symbol('mockValue')
const mockValue$ = of(mockValue)

beforeEach(() => {
  elevatorId$ = resolve(useElevatorId$)
  floorNumber$ = resolve(useFloorNumber$)
  newElevator$Map$ = resolve(useNewElevator$Map$)
  newElevatorPair$ = resolve(useNewElevatorPair$)
})

describe('model startup', () => {
  test(`${useElevatorId$.name}`, async () => {
    const elevators = await firstValueFrom(elevatorId$)
    expect(elevators).toHaveLength(elevatorCount)
  })
  test(`${useFloorNumber$.name}`, async () => {
    const floors = await firstValueFrom(floorNumber$)
    expect(floors).toHaveLength(floorCount)
  })
})

describe('elevator utils', () => {
  test(`${useNewElevator$Map$.name}`, async () => {
    const elevator$Map$ = newElevator$Map$(() => mockValue$)
    const elevator$Map = await firstValueFrom(elevator$Map$)
    expect(elevator$Map.size).toBe(elevatorCount)
    const values = elevator$Map.valueSeq().filter(equals(mockValue$))
    expect(values.toArray()).toHaveLength(elevatorCount)
  })
  test(`${useNewElevatorPair$.name}`, async () => {
    interface MockElevatorPair {
      elevator: ElevatorId
      [mockKey]: typeof mockValue$
    }
    const elevator$Map$ = newElevator$Map$(() => mockValue$)
    const elevatorPair$ = newElevatorPair$<MockElevatorPair>(elevator$Map$, mockKey)
    const elevatorPairs = await firstValueFrom(elevatorPair$)
    expect(elevatorPairs).toHaveLength(elevatorCount)
    expect(elevatorPairs[0].mockKey).toEqual(mockValue)
  })
})
