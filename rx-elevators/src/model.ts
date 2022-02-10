import { Map as iMap, OrderedSet, Record as iRecord, RecordOf } from 'immutable'
import KeyMirror from 'keymirror'
import { memoize, round, uniqueId } from 'lodash'
import { identity, map as rmap, not, pipe, times } from 'ramda'
import {
  animationFrames, BehaviorSubject, combineLatest, filter, map, merge, Observable, of, scan, share,
  skipWhile, startWith, Subject, Subscription, switchMap, tap, withLatestFrom
} from 'rxjs'
import * as u from './util'

// --------------------------------------------------------------------------------
// #region Types

type ActionId = string
export type Position = number
export type FloorNumber = number
export type ElevatorId = string

type DoorPosition = 0| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export const doorPosition: Record<'closed'|'open', DoorPosition> = {
  closed: 10,
  open: 0,
}

export type DoorMovementState = keyof typeof doorMovementState
export const doorMovementState = KeyMirror({
  Closing: '',
  Closed: '',
  Open: '',
  Opening: '',
})

type DoorState = RecordOf<{
  currentActionId: ActionId | null
  movementState: DoorMovementState
  position: DoorPosition
  waitCount: number
}>

export type ElevatorDoorState$ = Observable<DoorState>
export type ElevatorPosition$ = Observable<Position>

type ElevatorPosition$Tuple = [ElevatorId, ElevatorPosition$]
type ElevatorDoorState$Tuple = [ElevatorId, ElevatorDoorState$]

type DoorActionType = keyof typeof doorActionType
const doorActionType = KeyMirror({
  Closed: '',
  Open: ''
})

export const queueItemCategory = KeyMirror({
  Door: '',
  Floor: ''
})

type QueueDoorItem = RecordOf<{
  actionId: ActionId
  category: typeof queueItemCategory.Door
  type: DoorActionType
  elevator: ElevatorId
}>

export type QueueFloorItem = RecordOf<{
  category: typeof queueItemCategory.Floor
  floor: FloorNumber
}>

type ElevatorFloorPair = RecordOf<{
  elevator: ElevatorId
  floor: FloorNumber
}>

type ElevatorQueuePair = RecordOf<{
  elevator: ElevatorId
  queue: ElevatorQueue
}>

type ElevatorPositionPair = RecordOf<{
  elevator: ElevatorId
  position: Position
}>

type ElevatorDoorStatePair = RecordOf<{
  elevator: ElevatorId
  door: DoorState
}>

export type ElevatorQueueItem = QueueFloorItem | QueueDoorItem
type ElevatorQueue = OrderedSet<ElevatorQueueItem>
type ElevatorQueue$ = Observable<ElevatorQueue>
type ElevatorQueue$Tuple = [ElevatorId, ElevatorQueue$]

// #endregion
// --------------------------------------------------------------------------------
// #region Constants

export const floorHeight = 100

// #endregion
// --------------------------------------------------------------------------------
// #region Create Model

export type Model = ReturnType<typeof createModel>
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createModel = () => {
  // --------------------------------------------------------------------------------
  // #region Subjects

  const elevatorCount$ = new BehaviorSubject(3)
  const floorCount$ = new BehaviorSubject(5)

  /**
   * Used to dynamically set the interval stream.
   * Used in tests for manual interval control
   * @see animationFrame$
   */
  const interval$ = new BehaviorSubject<Observable<any>>(animationFrames())

  const floorRequestEvent$ = new Subject<FloorNumber>()
  const elevatorQueueInsertEvent$ = new Subject<ElevatorFloorPair>()
  const elevatorQueueRemoveEvent$ = new Subject<ElevatorFloorPair>()
  const elevatorQueuePair$Proxy = new Subject<ElevatorQueuePair[]>()
  const elevatorQueueDoorOpenEvent$ = new Subject<ElevatorId>()
  const elevatorQueueDoorClosedEvent$ = new Subject<ElevatorId>()
  const elevatorPositionPair$Proxy = new Subject<ElevatorPositionPair[]>()

  // #endregion
  // --------------------------------------------------------------------------------
  // #region Ids

  const newElevatorId = (): ElevatorId => uniqueId()

  const newFloorNumberArray = memoize(times(identity))
  const newElevatorIdArray = memoize(times(newElevatorId))

  const elevatorId$ = elevatorCount$.pipe(map(newElevatorIdArray))
  const floorNumber$ = floorCount$.pipe(map(newFloorNumberArray))

  // #endregion
  // --------------------------------------------------------------------------------
  // #region Model Utils

  type Map$ <A, B> = Observable<iMap<A, B>>

  /**
   * @param newValue$ Function that, given an ElevatorId, creates a stream of values (Value$)
   * @returns Stream subscribed to elevatorId$, that maps to a Map<ElevatorId, Value$>
   */
  const newElevator$Map$ =
    <
      Value,
      Value$ = Observable<Value>
    >
    (
      newValue$: (e: ElevatorId) => Value$
    ): Map$<ElevatorId, Value$> => {
      return elevatorId$.pipe(
        map(rmap((e): [ElevatorId, Value$] => [e, newValue$(e)])),
        map(u.newImmutableMap))
    }

  /**
   * @returns Stream of entries from Map emitted by map$
   */
  const newMapEntries$ =
    <
      TupleType extends [any, any],
      Key = TupleType[0],
      Value = TupleType[1]
    >
    (
      map$: Map$<Key, Value>
    ): Observable<Array<[Key, Value]>> => {
      return map$.pipe(map(map => map.entrySeq().toArray()))
    }

  /**
   * @param entries$ Stream of map entries
   * @param recordKey Key to be used in emitted records
   * @returns Stream of records containing the ElevatorId as "elevator",
   * and the emitted value from the entry's value stream as [recordKey]
   */
  const newElevatorPair$ =
    <
      PairType extends { elevator: ElevatorId },
      Elevator$Tuple extends [any, any] = [ElevatorId, Observable<any>]
    >
    (
      entries$: Observable<Elevator$Tuple[]>,
      recordKey: Exclude<keyof PairType, 'elevator'>
    ): Observable<PairType[]> => {
      const newElevatorValuePair = (elevator: ElevatorId, value: any): RecordOf<PairType> => {
        return iRecord({ elevator, [recordKey]: value })() as RecordOf<PairType>
      }

      const toElevatorValuePair$s = (tuples: Elevator$Tuple[]): Array<Observable<PairType>> =>
        tuples.map(([elevator, $]) =>
          $.pipe(map(value => newElevatorValuePair(elevator, value))))

      return entries$.pipe(
        switchMap((entries) => combineLatest(toElevatorValuePair$s(entries))),
        share())
    }

  const queueItemIsCategoryFloor = (item: ElevatorQueueItem): item is QueueFloorItem =>
    item.category === queueItemCategory.Floor

  // #endregion
  // --------------------------------------------------------------------------------
  // #region Elevator Queue

  type FloorActionType = keyof typeof floorActionType
  const floorActionType = KeyMirror({
    Add: '',
    Remove: ''
  })

  type QueueFloorAction = RecordOf<u.RecordType<QueueFloorItem> & {
    type: FloorActionType
    elevator: ElevatorId
  }>

  type QueueAction = QueueFloorAction | QueueDoorItem

  const queueItemIsOfFloor = (floor: FloorNumber) =>
    (item: ElevatorQueueItem): boolean =>
      queueItemIsCategoryFloor(item) && item.floor === floor

  const queueIncludesFloor = (queue: ElevatorQueue, floor: FloorNumber): boolean =>
    undefined !== queue.find(queueItemIsOfFloor(floor))

  const newElevatorFloorPair = (elevator: ElevatorId, floor: FloorNumber): ElevatorFloorPair => iRecord({ elevator, floor })()

  type FloorRequestTriple = [FloorNumber, ElevatorQueuePair[], ElevatorPositionPair[]]
  type FloorRequestMapper = (floorQueuePair: FloorRequestTriple) => Observable<ElevatorFloorPair>
  /**
   * Logic for selecting an elevator on floor request.
   * Takes a floorNumber, and current state of all elevator queues.
   * @returns If elevator available, return Add action for elevatorQueueEvent$
   */
  const floorRequestMapper: FloorRequestMapper = (requestTriple) => {
    const [floor, elevatorQueuePairs, elevatorPositionPairs] = requestTriple
    const pairAtFloor = elevatorPositionPairs.find(({ position }) => position === floor * floorHeight)
    // Open door if elevator already at floor
    if (pairAtFloor !== undefined) {
      elevatorQueueDoorOpenEvent$.next(pairAtFloor.elevator)
      return of()
    }
    // Sort floors, and call elevator with least queued floors
    const sortedQueuesWithoutFloor = elevatorQueuePairs
      .filter(({ queue }) => !queueIncludesFloor(queue, floor))
      .sort((a, b) => a.queue.size - b.queue.size)
    // Floor has been called if lengths are different
    if (sortedQueuesWithoutFloor.length !== elevatorQueuePairs.length) return of()
    const [availablePair] = sortedQueuesWithoutFloor
    return availablePair === undefined ? of() : of(newElevatorFloorPair(availablePair.elevator, floor))
  }

  const floorRequestInsert$ = floorRequestEvent$.pipe(
    withLatestFrom(elevatorQueuePair$Proxy, elevatorPositionPair$Proxy),
    skipWhile(([, queuePairs]) => queuePairs.length === 0),
    switchMap(floorRequestMapper))

  const elevatorQueueInsert$ = elevatorQueueInsertEvent$.pipe(
    withLatestFrom(elevatorPositionPair$Proxy),
    switchMap(([insertPair, elevatorPositionPairs]): Observable<ElevatorFloorPair> => {
      const elevatorPositionPair = elevatorPositionPairs.find(({ elevator }) => elevator === insertPair.elevator)
      if (elevatorPositionPair?.position === insertPair.floor * floorHeight) {
        elevatorQueueDoorOpenEvent$.next(insertPair.elevator)
        return of()
      }
      return of(insertPair)
    }))

  type NewQueueFloorItem = (f: FloorNumber) => QueueFloorItem
  const newQueueFloorItem: NewQueueFloorItem = (floor) => iRecord({
    category: queueItemCategory.Floor,
    floor
  })()

  type NewQueueFloorAction = (t: FloorActionType, pair: ElevatorFloorPair) => QueueFloorAction
  const newQueueFloorAction: NewQueueFloorAction = (type, pair) => iRecord({
    ...newQueueFloorItem(pair.floor).toObject(),
    elevator: pair.elevator,
    type
  })()

  type MapFloorAction = (t: FloorActionType) => (p: ElevatorFloorPair) => QueueFloorAction
  const mapFloorAction: MapFloorAction = (type) => (pair) => newQueueFloorAction(type, pair)

  type NewQueueDoorItem = (t: DoorActionType, e: ElevatorId) => QueueDoorItem
  const newQueueDoorItem: NewQueueDoorItem = (type, elevator) => iRecord({
    actionId: uniqueId(),
    category: queueItemCategory.Door,
    type,
    elevator
  })()

  type MapQueueDoorItem = (t: DoorActionType) => (e: ElevatorId) => QueueDoorItem
  const mapQueueDoorItem: MapQueueDoorItem = (type) => (elevator) => newQueueDoorItem(type, elevator)

  const elevatorQueueAction$: Observable<QueueAction> = merge(
    elevatorQueueDoorClosedEvent$.pipe(map(mapQueueDoorItem(doorActionType.Closed))),
    elevatorQueueDoorOpenEvent$.pipe(map(mapQueueDoorItem(doorActionType.Open))),
    floorRequestInsert$.pipe(map(mapFloorAction(floorActionType.Add))),
    elevatorQueueInsert$.pipe(map(mapFloorAction(floorActionType.Add))),
    elevatorQueueRemoveEvent$.pipe(map(mapFloorAction(floorActionType.Remove))),
  ).pipe(
    tap(u.tapLog('elevatorQueueAction$')),
    share(),
  )

  type NewElevatorQueue$ = (e: ElevatorId, initQ?: ElevatorQueue) => ElevatorQueue$
  const newElevatorQueue$: NewElevatorQueue$ = memoize((elevator, initQ = OrderedSet()) =>
    elevatorQueueAction$.pipe(
      filter((action) => action.elevator === elevator),
      scan(elevatorQueueScan, initQ),
      share(),
      startWith(initQ),
      tap(u.tapLog('elevatorQueue$'))))

  type ElevatorQueueScan = (q: ElevatorQueue, a: QueueAction) => ElevatorQueue
  const elevatorQueueScan: ElevatorQueueScan = (queue, action) => {
    if (action.category === queueItemCategory.Door) return elevatorQueueDoorScan(action, queue)
    if (action.category === queueItemCategory.Floor) return elevatorQueueFloorScan(action, queue)
    return queue
  }

  type ElevatorQueueDoorScan = (i: QueueDoorItem, q: ElevatorQueue) => ElevatorQueue
  const elevatorQueueDoorScan: ElevatorQueueDoorScan = (item, queue) => {
    if (item.type === doorActionType.Open) {
      // Replace first queued item if it's a QueueDoorItem
      const sliceCount = queue.first()?.category === queueItemCategory.Door ? 1 : 0
      return OrderedSet([item]).concat(queue.slice(sliceCount))
    }
    if (item.type === doorActionType.Closed) {
      // Door has closed, remove door item from queue
      return queue.slice(1)
    }
    return queue
  }

  type ElevatorQueueFloorScan = (a: QueueFloorAction, q: ElevatorQueue) => ElevatorQueue
  const elevatorQueueFloorScan: ElevatorQueueFloorScan = (action, queue) => {
    const floorInQueue = queueIncludesFloor(queue, action.floor)
    if (action.type === floorActionType.Add && !floorInQueue) {
      return queue.add(newQueueFloorItem(action.floor))
    }
    if (action.type === floorActionType.Remove && floorInQueue) {
      return queue.filter(pipe(queueItemIsOfFloor(action.floor), not))
    }
    return queue
  }

  const elevatorQueue$Map$ = newElevator$Map$(newElevatorQueue$)
  const elevatorQueue$MapEntries$ = newMapEntries$<ElevatorQueue$Tuple>(elevatorQueue$Map$)
  const elevatorQueuePair$ = newElevatorPair$<ElevatorQueuePair>(elevatorQueue$MapEntries$, 'queue')

  type FloorRequested$ = (f: FloorNumber) => Observable<boolean>
  const floorRequested$: FloorRequested$ = (floor) =>
    elevatorQueuePair$.pipe(
      map(pairs => pairs.find(pair =>
        pair.queue.find(item => 'floor' in item && item.floor === floor))),
      map(pair => pair !== undefined))

  type GetElevatorQueueItems$ = (e: ElevatorId) => Observable<ElevatorQueueItem[]>
  const getElevatorQueueItems$: GetElevatorQueueItems$ = (elevator) =>
    elevatorQueuePair$.pipe(
      map(pairs => pairs.find(pair => pair.elevator === elevator)),
      map((pair) => pair?.queue.toArray() ?? []))

  // #endregion
  // --------------------------------------------------------------------------------
  // #region Elevator Position

  const animationFrame$ = interval$.pipe(switchMap(identity))

  type GetElevatorQueue$ = (e: ElevatorId) => Observable<ElevatorQueue>
  const getElevatorQueue$Interval: GetElevatorQueue$ = memoize((elevator) =>
    elevatorQueue$MapEntries$.pipe(
      map(entries => entries.find(([elevatorId]) => elevatorId === elevator) ?? []),
      switchMap(([, queue$]) => queue$ ?? of()),
      // If queue is not empty: subscribe to interval$ for processing queued items
      switchMap(queue => queue.isEmpty() ? of(queue) : animationFrame$.pipe(map(() => queue))),
      share()))

  type ElevatorPositionScan = (e: ElevatorId) => (p: Position, q: ElevatorQueue) => Position
  const elevatorPositionScan: ElevatorPositionScan = (elevator) => (position, queue) => {
    const item = queue.first()
    if (item === undefined) return position
    if (item.category === queueItemCategory.Floor) {
      const { floor } = item
      const nextPosition = floor * floorHeight
      if (position < nextPosition) return position + 1
      if (position > nextPosition) return position - 1
      // Else: elevator arrived at floor
      elevatorQueueRemoveEvent$.next(newElevatorFloorPair(elevator, floor))
      elevatorQueueDoorOpenEvent$.next(elevator)
    }
    return position
  }

  type NewElevatorPosition$ = (e: ElevatorId) => ElevatorPosition$
  const newElevatorPosition$: NewElevatorPosition$ = memoize((elevator) =>
    getElevatorQueue$Interval(elevator).pipe(
      scan(elevatorPositionScan(elevator), 0),
      share(),
      startWith(0)))

  const elevatorPosition$Map$ = newElevator$Map$(newElevatorPosition$)
  const elevatorPosition$MapEntries$ = newMapEntries$<ElevatorPosition$Tuple>(elevatorPosition$Map$)
  const elevatorPositionPair$ = newElevatorPair$<ElevatorPositionPair>(elevatorPosition$MapEntries$, 'position')

  // #endregion
  // --------------------------------------------------------------------------------
  // #region Elevator Door State

  type NewDoorState = () => DoorState
  const newDoorState: NewDoorState = () => iRecord<u.RecordType<DoorState>>({
    currentActionId: null,
    movementState: doorMovementState.Closed,
    position: doorPosition.closed,
    waitCount: 0
  })()

  const doorMovementSpeed = 0.1

  type HandleDoorOpenScan = (e: ElevatorId, s: DoorState) => DoorState
  const handleDoorOpenScan: HandleDoorOpenScan = (elevator, state) => {
    if (state.movementState === doorMovementState.Closed) {
      elevatorQueueDoorClosedEvent$.next(elevator)
    }
    if (state.movementState === doorMovementState.Opening) {
      if (state.position === doorPosition.open) return state.set('movementState', doorMovementState.Open)
      return state.set('position', round(state.position - doorMovementSpeed, 2) as DoorPosition)
    }
    if (state.movementState === doorMovementState.Open) {
      if (state.waitCount < 200) return state.set('waitCount', state.waitCount + 1)
      return state.set('waitCount', 0).set('movementState', doorMovementState.Closing)
    }
    if (state.movementState === doorMovementState.Closing) {
      if (state.position === doorPosition.closed) {
        elevatorQueueDoorClosedEvent$.next(elevator)
        return state.set('movementState', doorMovementState.Closed)
      }
      return state.set('position', round(state.position + doorMovementSpeed, 2) as DoorPosition)
    }
    return state
  }

  type DoorPositionScan = (e: ElevatorId) => (s: DoorState, q: ElevatorQueue) => DoorState
  const doorPositionScan: DoorPositionScan = (elevator) => (state, queue) => {
    const nextItem = queue.first()
    if (nextItem === undefined) return state
    if (nextItem.category !== queueItemCategory.Door) return state
    if (nextItem.actionId !== state.currentActionId) {
      state = state
        .set('currentActionId', nextItem.actionId)
        .set('movementState', nextItem.type === doorActionType.Open
          ? doorMovementState.Opening
          : doorMovementState.Closing)
    }
    return handleDoorOpenScan(elevator, state)
  }

  type NewElevatorDoorState$ = (e: ElevatorId, s?: DoorState) => ElevatorDoorState$
  const newElevatorDoorState$: NewElevatorDoorState$ = memoize(
    (elevator, initialState = newDoorState()) => getElevatorQueue$Interval(elevator).pipe(
      scan(doorPositionScan(elevator), initialState),
      share(),
      startWith(initialState)))

  type NewElevatorDoorState$Tuple = (e: ElevatorId) => ElevatorDoorState$Tuple
  const newElevatorDoorState$Tuple: NewElevatorDoorState$Tuple =
    (elevator) => [elevator, newElevatorDoorState$(elevator)]

  const elevatorDoorState$Map$ = elevatorId$.pipe(
    map(rmap(newElevatorDoorState$Tuple)),
    map(u.newImmutableMap))

  const elevatorDoor$MapEntries$ = newMapEntries$<ElevatorDoorState$Tuple>(elevatorDoorState$Map$)
  const elevatorDoorPair$ = newElevatorPair$<ElevatorDoorStatePair>(elevatorDoor$MapEntries$, 'door')

  // #endregion
  // --------------------------------------------------------------------------------
  // #region Startup & Export

  const startup = (): Subscription => {
    const modelSub = new Subscription()
    modelSub.add(elevatorQueuePair$.subscribe(elevatorQueuePair$Proxy))
    modelSub.add(elevatorPositionPair$.subscribe(elevatorPositionPair$Proxy))
    // Start door streams (e.g for testing elevator movement)
    modelSub.add(elevatorDoorPair$.subscribe(() => {}))
    return modelSub
  }

  return {
    elevatorCount$,
    elevatorDoorState$Map$,
    elevatorDoorPair$,
    elevatorQueueDoorOpenEvent$,
    elevatorId$,
    elevatorPosition$Map$,
    elevatorPositionPair$,
    elevatorQueueInsertEvent$,
    floorCount$,
    floorNumber$,
    floorRequested$,
    floorRequestEvent$,
    getElevatorQueueItems$,
    getMapEntries$: newMapEntries$,
    interval$,
    newElevator$Map$,
    newElevatorFloorPair,
    newElevatorPair$,
    queueItemIsCategoryFloor,
    startup
  }

  // #endregion
  // --------------------------------------------------------------------------------
}

// #endregion
// --------------------------------------------------------------------------------
// #region Debugging

const global: any = globalThis

global.ev = {
  tapLogOn: false
}

// #endregion
// --------------------------------------------------------------------------------
