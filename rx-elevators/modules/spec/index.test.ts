import '@testing-library/jest-dom'
import { equals, map as rmap, prop } from 'ramda'
import { filter, firstValueFrom, of, Subscription } from 'rxjs'
import { useElevatorCount$ } from '../elevator/count/stream'
import { elevatorDoorMovementTypes } from '../elevator/door/movement/types'
import { elevatorDoorPositions } from '../elevator/door/position'
import { ElevatorId } from '../elevator/id'
import { useElevatorId$ } from '../elevator/id/stream'
import { useNewElevatorPair$ } from '../elevator/pair/stream'
import { useElevatorPositionPair$ } from '../elevator/position/pair/stream'
import { useElevatorPosition$Map$ } from '../elevator/position/stream/map/stream'
import { useElevatorQueueDoorOpenEvent$ } from '../elevator/queue/door/open/event'
import { useElevatorQueueItemOfCategoryFloor } from '../elevator/queue/floor/item/of/category/floor'
import { elevatorQueueItemCategories } from '../elevator/queue/item/category'
import { useNewElevatorQueueItem$ } from '../elevator/queue/item/stream'
import { useNewElevator$Map$ } from '../elevator/stream/map/stream'
import { useFloorCount$ } from '../floor/count'
import { floorHeight } from '../floor/height'
import { useFloorNumber$ } from '../floor/number/stream'
import { useNewFloorRequested$ } from '../floor/requested/stream'
import { fnContainer } from '../function/container'
import { useRxAnimationFrames } from '../pkg/rxjs/animationFrames'
import { useStartup } from '../startup'
import { useDoorAtMovementState } from './util/model/doorAtMovementState'
import { useElevatorDoorPair$ } from './util/model/elevatorDoorPair$'
import { useEmitFloorRequest } from './util/model/emitFloorRequest'
import { useFnResolve } from './util/model/fnResolve'
import { useGetElevatorDoorState$ } from './util/model/getElevatorDoorState$'
import { useGetElevatorPosition$ } from './util/model/getElevatorPosition$'
import { useGetFloorArrivals } from './util/model/getFloorArrivals$'
import { useGetFloorPositions } from './util/model/getFloorPositions'
import { useMockInterval$ } from './util/model/interval$'
import { useNthValueFrom } from './util/model/nthValueFrom'
import { useRequestFloors } from './util/model/requestFloors'
import { useTickMockInterval$ } from './util/model/tickMockInterval$'

let doorAtMovementState: ReturnType<typeof useDoorAtMovementState>
let elevatorId$: ReturnType<typeof useElevatorId$>
let elevatorPosition$Map$: ReturnType<typeof useElevatorPosition$Map$>
let elevatorPositionPair$: ReturnType<typeof useElevatorPositionPair$>
let elevatorQueueDoorOpenEvent$: ReturnType<typeof useElevatorQueueDoorOpenEvent$>
let elevatorQueueItemOfCategoryFloor: ReturnType<typeof useElevatorQueueItemOfCategoryFloor>
let emitFloorRequest: ReturnType<typeof useEmitFloorRequest>
let floorNumber$: ReturnType<typeof useFloorNumber$>
let getElevatorDoorState$: ReturnType<typeof useGetElevatorDoorState$>
let getElevatorPosition$: ReturnType<typeof useGetElevatorPosition$>
let getFloorArrivals: ReturnType<typeof useGetFloorArrivals>
let getFloorPositions: ReturnType<typeof useGetFloorPositions>
let mockInterval$: ReturnType<typeof useMockInterval$>
let newElevator$Map$: ReturnType<typeof useNewElevator$Map$>
let newElevatorPair$: ReturnType<typeof useNewElevatorPair$>
let newElevatorQueueItem$: ReturnType<typeof useNewElevatorQueueItem$>
let newFloorRequested$: ReturnType<typeof useNewFloorRequested$>
let nthValueFrom: ReturnType<typeof useNthValueFrom>
let requestFloors: ReturnType<typeof useRequestFloors>
let startupSubscription: Subscription
let tickMockInterval$: ReturnType<typeof useTickMockInterval$>

const elevatorCount = 4
const floorCount = 6
const mockKey = 'mockKey'
const mockValue = Symbol('mockValue')
const mockValue$ = of(mockValue)
const container = fnContainer.childContainer()
const resolve = container.resolve(useFnResolve)

beforeEach(async () => {
  container.reset()
  container.register(useRxAnimationFrames, () => () => mockInterval$)

  resolve(useElevatorCount$).next(elevatorCount)
  resolve(useFloorCount$).next(floorCount)

  startupSubscription = container.resolve(useStartup)()
  // Start door pair stream for elevator movement tests
  startupSubscription.add(resolve(useElevatorDoorPair$).subscribe(() => {}))

  doorAtMovementState = resolve(useDoorAtMovementState)
  elevatorId$ = resolve(useElevatorId$)
  elevatorPosition$Map$ = resolve(useElevatorPosition$Map$)
  elevatorPositionPair$ = resolve(useElevatorPositionPair$)
  elevatorQueueDoorOpenEvent$ = resolve(useElevatorQueueDoorOpenEvent$)
  elevatorQueueItemOfCategoryFloor = resolve(useElevatorQueueItemOfCategoryFloor)
  emitFloorRequest = resolve(useEmitFloorRequest)
  floorNumber$ = resolve(useFloorNumber$)
  getElevatorDoorState$ = resolve(useGetElevatorDoorState$)
  getElevatorPosition$ = resolve(useGetElevatorPosition$)
  getFloorArrivals = resolve(useGetFloorArrivals)
  getFloorPositions = resolve(useGetFloorPositions)
  mockInterval$ = resolve(useMockInterval$)
  newElevator$Map$ = resolve(useNewElevator$Map$)
  newElevatorPair$ = resolve(useNewElevatorPair$)
  newElevatorQueueItem$ = resolve(useNewElevatorQueueItem$)
  newFloorRequested$ = resolve(useNewFloorRequested$)
  nthValueFrom = resolve(useNthValueFrom)
  requestFloors = resolve(useRequestFloors)
  tickMockInterval$ = resolve(useTickMockInterval$)
})

afterEach(async () => {
  startupSubscription.unsubscribe()
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

describe('elevator queue', () => {
  describe('requesting floor from floor panel', () => {
    test('floor is added in smallest queue', async () => {
      const floors = [1, 2]
      const [elevator1, elevator2] = await firstValueFrom(elevatorId$)
      const elevator1QueueItems = nthValueFrom(3, newElevatorQueueItem$(elevator1))
      const elevator2QueueItems = nthValueFrom(3, newElevatorQueueItem$(elevator2))
      const floor1Requested = nthValueFrom(3, newFloorRequested$(floors[0]))
      const floor2Requested = nthValueFrom(3, newFloorRequested$(floors[1]))
      emitFloorRequest(floors)
      expect(await floor1Requested).toBe(true)
      expect(await floor2Requested).toBe(true)
      expect(await elevator1QueueItems).toHaveLength(1)
      expect(await elevator2QueueItems).toHaveLength(1)
    })
    test('floor is added to only one queue at a time', async () => {
      const floors = [1]
      const [elevator1, elevator2] = await firstValueFrom(elevatorId$)
      const elevator1QueueItems = nthValueFrom(2, newElevatorQueueItem$(elevator1))
      const elevator2QueueItems = nthValueFrom(2, newElevatorQueueItem$(elevator2))
      const floor1Requested = nthValueFrom(2, newFloorRequested$(floors[0]))
      emitFloorRequest(floors)
      expect(await floor1Requested).toBe(true)
      expect(await elevator1QueueItems).toHaveLength(1)
      expect(await elevator2QueueItems).toHaveLength(0)
    })
  })
  describe('requesting floor from elevator panel', () => {
    test('floor is only inserted once in queue', async () => {
      const floors = [1]
      const [elevator] = await firstValueFrom(elevatorId$)
      const elevatorQueueItems = nthValueFrom(2, newElevatorQueueItem$(elevator))
      requestFloors(elevator, floors)
      requestFloors(elevator, floors)
      expect(await elevatorQueueItems).toHaveLength(1)
    })
  })
  test('floor is added in queue with expected order', async () => {
    const floors = [2, 1]
    const [elevator] = await firstValueFrom(elevatorId$)
    const elevatorQueueItems = nthValueFrom(floors.length + 1, newElevatorQueueItem$(elevator))
    requestFloors(elevator, floors)
    const floorNumbers = await elevatorQueueItems
      .then(items => items.filter(elevatorQueueItemOfCategoryFloor))
      .then(rmap(prop('floor')))
    expect(floorNumbers).toEqual(floors)
  })
  test('floor removal updates queue with expected order', async () => {
    const floors = [2, 1, 4, 3]
    const [elevator] = await firstValueFrom(elevatorId$)
    const elevatorQueueItems = nthValueFrom(floors.length + 1, newElevatorQueueItem$(elevator))
    requestFloors(elevator, floors)
    const floorItems = await elevatorQueueItems
      .then(items => items.filter(elevatorQueueItemOfCategoryFloor))
      .then(rmap(prop('floor')))
    expect(floorItems).toEqual(floors)
  })
})

describe('elevator movement', () => {
  test('only elevator with non empty queue is moving', async () => {
    const floors = [1]
    const [elevator] = await firstValueFrom(elevatorId$)
    const elevatorPositionPairs = firstValueFrom(elevatorPositionPair$)
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
    const floorPosition = floors[0] * floorHeight
    const [elevator] = await firstValueFrom(elevatorId$)
    const elevatorPosition$Map = await firstValueFrom(elevatorPosition$Map$)
    const elevatorPosition$ = elevatorPosition$Map.get(elevator)
    if (elevatorPosition$ === undefined) throw new Error()
    const elevatorArrival$ = elevatorPosition$.pipe(
      tickMockInterval$(),
      filter(p => p === floorPosition))
    const elevatorArrival = firstValueFrom(elevatorArrival$)
    emitFloorRequest(floors)
    expect(await elevatorArrival).toBeDefined()
  })
  test('elevator moves in correct queue order', async () => {
    const floors = [2, 3, 1]
    const floorPositions = getFloorPositions(floors)
    const [elevator] = await firstValueFrom(elevatorId$)
    const floorArrivals = getFloorArrivals(elevator, floors)
    requestFloors(elevator, floors)
    const floorPositionsVisited = await floorArrivals
    expect(floorPositionsVisited).toStrictEqual(floorPositions)
  })
  test('multiple elevators move concurrently', async () => {
    // request two floors from elevator panel
    const floors = [3, 1]
    const elevatorPositionPairs = nthValueFrom(floors.length + 1, elevatorPositionPair$)
    emitFloorRequest([floors[0]])
    emitFloorRequest([floors[1]])
    const positions = await elevatorPositionPairs.then(rmap(prop('position')))
    expect([positions[0], positions[1]]).toStrictEqual([2, 1])
  })
  test('elevator does not move if door is open', async () => {
    const floors = [1]
    const [elevator] = await firstValueFrom(elevatorId$)
    const position = firstValueFrom(getElevatorPosition$(elevator))
    requestFloors(elevator, floors)
    expect(await position).toBe(1)
    const nextPosition = firstValueFrom(getElevatorPosition$(elevator))
    elevatorQueueDoorOpenEvent$.next(elevator)
    mockInterval$.next({})
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
    const [,elevator] = await firstValueFrom(elevatorId$)
    requestFloors(elevator, [1])
    const queueItems = nthValueFrom(2, newElevatorQueueItem$(elevator))
    requestFloors(elevator, [0])
    const [,item] = await queueItems
    expect(item).toHaveProperty('floor', 0)
  })
})

describe('elevator door movement', () => {
  test('door opens when elevator arrives at floor', async () => {
    const floors = [1]
    const [elevator] = await firstValueFrom(elevatorId$)
    const floorArrivals = getFloorArrivals(elevator, floors)
    requestFloors(elevator, floors)
    await nthValueFrom(2, newElevatorQueueItem$(elevator))
    const doorState = firstValueFrom(getElevatorDoorState$(elevator))
    await floorArrivals
    mockInterval$.next({})
    expect((await doorState).position).toBeLessThan(elevatorDoorPositions.closed)
  })
  test('door opens on floor request if elevator is at floor', async () => {
    const floors = [0]
    const [elevator] = await firstValueFrom(elevatorId$)
    const doorState = firstValueFrom(getElevatorDoorState$(elevator))
    const elevatorQueueItems = firstValueFrom(newElevatorQueueItem$(elevator))
    requestFloors(elevator, floors)
    await elevatorQueueItems
    expect((await doorState).position).toBeLessThan(elevatorDoorPositions.closed)
  })
  test('floor not requested if elevator is at floor', async () => {
    const floors = [1]
    const [elevator] = await firstValueFrom(elevatorId$)
    const floorArrivals = getFloorArrivals(elevator, floors)
    requestFloors(elevator, floors)
    const elevatorQueueItems = nthValueFrom(3, newElevatorQueueItem$(elevator))
    await floorArrivals
    const queueItems = await elevatorQueueItems
    expect(queueItems).toHaveLength(1)
    expect(queueItems[0].category).toBe(elevatorQueueItemCategories.Door)
    const nextElevatorQueueItems = nthValueFrom(2, newElevatorQueueItem$(elevator))
    requestFloors(elevator, floors)
    const nextQueueItems = await nextElevatorQueueItems
    expect(nextQueueItems).toHaveLength(1)
    expect(nextQueueItems[0].category).toBe(elevatorQueueItemCategories.Door)
  })
  test('door closes after opening', async () => {
    const floors = [0]
    const [elevator] = await firstValueFrom(elevatorId$)
    const doorState$ = getElevatorDoorState$(elevator)
    const doorState = firstValueFrom(doorState$)
    const doorClosed = doorAtMovementState(elevator, elevatorDoorMovementTypes.Closed)
    const elevatorQueueItems = firstValueFrom(newElevatorQueueItem$(elevator))
    requestFloors(elevator, floors)
    await elevatorQueueItems
    expect((await doorState).position).toBeLessThan(elevatorDoorPositions.closed)
    expect((await doorClosed).position).toBe(elevatorDoorPositions.closed)
  })
  test('door opens during close on request of its current floor', async () => {
    const floors = [0]
    const [elevator] = await firstValueFrom(elevatorId$)
    const doorClosing = doorAtMovementState(elevator, elevatorDoorMovementTypes.Closing)
    const elevatorQueueItems = firstValueFrom(newElevatorQueueItem$(elevator))
    requestFloors(elevator, floors)
    await elevatorQueueItems
    await doorClosing
    mockInterval$.next({})
    const doorOpening = doorAtMovementState(elevator, elevatorDoorMovementTypes.Opening)
    elevatorQueueDoorOpenEvent$.next(elevator)
    expect((await doorOpening).movementState).toBe(elevatorDoorMovementTypes.Opening)
  })
})
