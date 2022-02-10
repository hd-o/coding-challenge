import { Map as iMap } from 'immutable'
import { defer } from 'lodash'
import { equals, map as rmap, prop } from 'ramda'
import { filter, firstValueFrom, of, Subject, Subscription } from 'rxjs'
import * as m from '../src/model'
import * as u from './util'

const elevatorCount = 4
const floorCount = 6

const mockKey = 'mockKey'
const mockValue = Symbol('mockValue')
const mockValue$ = of(mockValue)

interface TestElevatorPair {
  elevator: m.ElevatorId
  [mockKey]: typeof mockValue$
}

let model = m.createModel()
let modelSub: Subscription

const modelKeys = u.describe(model)
const interval$ = new Subject<void>()
const tapInterval$ = u.tapInterval$(interval$)

let requestFloors: ReturnType<typeof u.requestFloors>
let emitFloorRequest: ReturnType<typeof u.emitFloorRequest>
let getElevatorPosition$: ReturnType<typeof u.getElevatorPosition$>
let getFloorArrivals: ReturnType<typeof u.getFloorArrivals>
let getElevatorDoorState$: ReturnType<typeof u.getElevatorDoorState$>
let doorAtMovementState: ReturnType<typeof u.doorAtMovementState>

beforeEach(async () => {
  model = m.createModel()
  modelSub = model.startup()
  model.interval$.next(interval$)
  model.elevatorCount$.next(elevatorCount)
  model.floorCount$.next(floorCount)
  requestFloors = u.requestFloors(interval$, model)
  emitFloorRequest = u.emitFloorRequest(interval$, model)
  getElevatorPosition$ = u.getElevatorPosition$(model)
  getFloorArrivals = u.getFloorArrivals(interval$, model)
  getElevatorDoorState$ = u.getElevatorDoorState$(model)
  doorAtMovementState = u.doorAtMovementState(interval$, model)
  await new Promise(defer)
})

afterEach(async () => {
  modelSub.unsubscribe()
  await new Promise(defer)
})

jest.setTimeout(10_000)

describe('model startup', () => {
  test(`${modelKeys.elevatorId$}`, async () => {
    const elevators = await firstValueFrom(model.elevatorId$)
    expect(elevators).toHaveLength(elevatorCount)
  })
  test(`${modelKeys.floorNumber$}`, async () => {
    const floors = await firstValueFrom(model.floorNumber$)
    expect(floors).toHaveLength(floorCount)
  })
})

describe('elevator utils', () => {
  test(`${modelKeys.newElevator$Map$}`, async () => {
    const elevator$Map$ = model.newElevator$Map$(() => mockValue$)
    const elevator$Map = await firstValueFrom(elevator$Map$)
    expect(elevator$Map.size).toBe(elevatorCount)
    const values = elevator$Map.valueSeq().filter(equals(mockValue$))
    expect(values.toArray()).toHaveLength(elevatorCount)
  })
  test(`${modelKeys.getMapEntries$}`, async () => {
    const mockEntries: Array<[string, number]> = [['a', 1], ['b', 2]]
    const map$ = of(iMap(mockEntries))
    const mapEntries = await firstValueFrom(model.getMapEntries$(map$))
    expect(mapEntries).toEqual(mockEntries)
  })
  test(`${modelKeys.newElevatorPair$}`, async () => {
    const elevator$Map$ = model.newElevator$Map$(() => mockValue$)
    const entries$ = model.getMapEntries$(elevator$Map$)
    const elevatorPair$ = model.newElevatorPair$<TestElevatorPair>(entries$, mockKey)
    const elevatorPairs = await firstValueFrom(elevatorPair$)
    expect(elevatorPairs).toHaveLength(elevatorCount)
    expect(elevatorPairs[0].mockKey).toEqual(mockValue)
  })
})

describe('elevator queue', () => {
  describe('requesting floor from floor panel', () => {
    test('floor is added in smallest queue', async () => {
      const floors = [1, 2]
      const [elevator1, elevator2] = await firstValueFrom(model.elevatorId$)
      const elevator1QueueItems = u.secondValueFrom(model.getElevatorQueueItems$(elevator1))
      const elevator2QueueItems = u.secondValueFrom(model.getElevatorQueueItems$(elevator2))
      const floor1Requested = u.secondValueFrom(model.floorRequested$(floors[0]))
      const floor2Requested = u.secondValueFrom(model.floorRequested$(floors[1]))
      emitFloorRequest(floors)
      expect(await floor1Requested).toBe(true)
      expect(await floor2Requested).toBe(true)
      expect(await elevator1QueueItems).toHaveLength(1)
      expect(await elevator2QueueItems).toHaveLength(1)
    })
    test('floor is added to only one queue at a time', async () => {
      const floors = [1]
      const [elevator1, elevator2] = await firstValueFrom(model.elevatorId$)
      const elevator1QueueItems = firstValueFrom(model.getElevatorQueueItems$(elevator1))
      const elevator2QueueItems = firstValueFrom(model.getElevatorQueueItems$(elevator2))
      const floor1Requested = firstValueFrom(model.floorRequested$(floors[0]))
      emitFloorRequest(floors)
      expect(await floor1Requested).toBe(true)
      expect(await elevator1QueueItems).toHaveLength(1)
      expect(await elevator2QueueItems).toHaveLength(0)
    })
  })
  describe('requesting floor from elevator panel', () => {
    test('floor is only inserted once in queue', async () => {
      const floors = [1]
      const [elevator] = await firstValueFrom(model.elevatorId$)
      const elevatorQueueItems = u.secondValueFrom(model.getElevatorQueueItems$(elevator))
      requestFloors(elevator, floors)
      requestFloors(elevator, floors)
      expect(await elevatorQueueItems).toHaveLength(1)
    })
  })
  test('floor is added in queue with expected order', async () => {
    const floors = [2, 1]
    const [elevator1] = await firstValueFrom(model.elevatorId$)
    const elevator1QueueItems = u.nthValueFrom(floors.length, model.getElevatorQueueItems$(elevator1))
    requestFloors(elevator1, floors)
    const floorItems = await elevator1QueueItems
      .then(items => items.filter(model.queueItemIsCategoryFloor))
      .then(rmap(prop('floor')))
    expect(floorItems).toEqual(floors)
  })
  test('floor removal updates queue with expected order', async () => {
    const floors = [2, 1, 4, 3]
    const [elevator] = await firstValueFrom(model.elevatorId$)
    const elevatorQueueItems = u.nthValueFrom(floors.length, model.getElevatorQueueItems$(elevator))
    requestFloors(elevator, floors)
    const floorItems = await elevatorQueueItems
      .then(items => items.filter(model.queueItemIsCategoryFloor))
      .then(rmap(prop('floor')))
    expect(floorItems).toEqual(floors)
  })
})

describe('elevator movement', () => {
  test('only elevator with non empty queue is moving', async () => {
    const floors = [1]
    const [elevator] = await firstValueFrom(model.elevatorId$)
    const elevatorPositionPairs = firstValueFrom(model.elevatorPositionPair$)
    requestFloors(elevator, floors)
    for (const pair of await elevatorPositionPairs) {
      const positionCheck = pair.elevator === elevator
        ? pair.position > 0
        : pair.position === 0
      expect(positionCheck).toBe(true)
    }
  })
  test('elevator moves to requested floor', async () => {
    const floors = [1]
    const floorPosition = floors[0] * m.floorHeight
    const [elevator] = await firstValueFrom(model.elevatorId$)
    const elevatorPosition$Map = await firstValueFrom(model.elevatorPosition$Map$)
    const elevatorPosition$ = elevatorPosition$Map.get(elevator)
    if (elevatorPosition$ === undefined) throw new Error()
    const elevatorArrival$ = elevatorPosition$.pipe(
      tapInterval$(),
      filter(p => p === floorPosition))
    const elevatorArrival = firstValueFrom(elevatorArrival$)
    emitFloorRequest(floors)
    expect(await elevatorArrival).toBeDefined()
  })
  test('elevator moves in correct queue order', async () => {
    const floors = [2, 3, 1]
    const floorPositions = u.getFloorPositions(floors)
    const [elevator] = await firstValueFrom(model.elevatorId$)
    const floorArrivals = getFloorArrivals(elevator, floors)
    requestFloors(elevator, floors)
    const floorPositionsVisited = await floorArrivals
    expect(floorPositionsVisited).toStrictEqual(floorPositions)
  })
  test('multiple elevators move concurrently', async () => {
    // request two floors from elevator panel
    const floors = [3, 1]
    const elevatorPositionPairs = u.nthValueFrom(floors.length + 1, model.elevatorPositionPair$)
    emitFloorRequest([floors[0]])
    emitFloorRequest([floors[1]])
    const positions = await elevatorPositionPairs.then(rmap(prop('position')))
    expect([positions[0], positions[1]]).toStrictEqual([2, 1])
  })
  test('elevator does not move if door is open', async () => {
    const floors = [1]
    const [elevator] = await firstValueFrom(model.elevatorId$)
    const position = firstValueFrom(getElevatorPosition$(elevator))
    requestFloors(elevator, floors)
    expect(await position).toBe(1)
    const nextPosition = firstValueFrom(getElevatorPosition$(elevator))
    model.elevatorQueueDoorOpenEvent$.next(elevator)
    interval$.next()
    expect(await nextPosition).toBe(1)
  })
  /**
   * Asserts elevator not opening door if, through the elevator's panel,
   * a floor is requested when there is any elevator already at the floor
   * Bug example:
   * - Elevator 1 at floor 0, elevator 2 at floor 1
   * - Floor 0 requested by elevator 2's panel
   * - Elevator 1 door opens
   */
  test('floor always requested through elevator panel when elevator is not at floor', async () => {
    const [,elevator] = await firstValueFrom(model.elevatorId$)
    requestFloors(elevator, [1])
    const queueItems = firstValueFrom(model.getElevatorQueueItems$(elevator))
    requestFloors(elevator, [0])
    const [,item] = await queueItems
    expect(item).toHaveProperty('floor', 0)
  })
})

describe('elevator door movement', () => {
  test('door opens when elevator arrives at floor', async () => {
    const floors = [1]
    const [elevator] = await firstValueFrom(model.elevatorId$)
    const floorArrivals = getFloorArrivals(elevator, floors)
    requestFloors(elevator, floors)
    await firstValueFrom(model.getElevatorQueueItems$(elevator))
    const doorState = firstValueFrom(getElevatorDoorState$(elevator))
    await floorArrivals
    interval$.next()
    expect((await doorState).position).toBeLessThan(m.doorPosition.closed)
  })
  test('door opens on floor request if elevator is at floor', async () => {
    const floors = [0]
    const [elevator] = await firstValueFrom(model.elevatorId$)
    const doorState = firstValueFrom(getElevatorDoorState$(elevator))
    const elevatorQueueItems = firstValueFrom(model.getElevatorQueueItems$(elevator))
    requestFloors(elevator, floors)
    await elevatorQueueItems
    expect((await doorState).position).toBeLessThan(m.doorPosition.closed)
  })
  test('floor not requested if elevator is at floor', async () => {
    const floors = [1]
    const [elevator] = await firstValueFrom(model.elevatorId$)
    const floorArrivals = getFloorArrivals(elevator, floors)
    requestFloors(elevator, floors)
    const elevatorQueueItems = u.secondValueFrom(model.getElevatorQueueItems$(elevator))
    await floorArrivals
    const queueItems = await elevatorQueueItems
    expect(queueItems).toHaveLength(1)
    expect(queueItems[0].category).toBe(m.queueItemCategory.Door)
    const nextElevatorQueueItems = firstValueFrom(model.getElevatorQueueItems$(elevator))
    requestFloors(elevator, floors)
    const nextQueueItems = await nextElevatorQueueItems
    expect(nextQueueItems).toHaveLength(1)
    expect(nextQueueItems[0].category).toBe(m.queueItemCategory.Door)
  })
  test('door closes after opening', async () => {
    const floors = [0]
    const [elevator] = await firstValueFrom(model.elevatorId$)
    const doorState$ = getElevatorDoorState$(elevator)
    const doorState = firstValueFrom(doorState$)
    const doorClosed = doorAtMovementState(elevator, m.doorMovementState.Closed)
    const elevatorQueueItems = firstValueFrom(model.getElevatorQueueItems$(elevator))
    requestFloors(elevator, floors)
    await elevatorQueueItems
    expect((await doorState).position).toBeLessThan(m.doorPosition.closed)
    expect((await doorClosed).position).toBe(m.doorPosition.closed)
  })
  test('door opens during close on request of its current floor', async () => {
    const floors = [0]
    const [elevator] = await firstValueFrom(model.elevatorId$)
    const doorClosing = doorAtMovementState(elevator, m.doorMovementState.Closing)
    const elevatorQueueItems = firstValueFrom(model.getElevatorQueueItems$(elevator))
    requestFloors(elevator, floors)
    await elevatorQueueItems
    await doorClosing
    interval$.next()
    const doorOpening = doorAtMovementState(elevator, m.doorMovementState.Opening)
    model.elevatorQueueDoorOpenEvent$.next(elevator)
    expect((await doorOpening).movementState).toBe(m.doorMovementState.Opening)
  })
})
