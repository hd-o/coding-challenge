import l from 'lodash'
import * as x from 'rxjs'
import * as m from '../src/model'

// --------------------------------------------------------------------------------
// #region Object

type PropMap <C extends {}> = {[K in keyof C]: string}
/**
 * Used for test titles (describe/test), so
 * test titles update on property name change
 * @returns Method name
 * @example
 * describe(myObject).myMethod
 * //> 'myMethod'
 */
export const describe =
  <O extends {}> (obj: O): PropMap<typeof obj> =>
    new Proxy({}, { get: (_, p) => String(p) }) as PropMap<O>

// #endregion
// --------------------------------------------------------------------------------
// #region Stream

type $Promise<$ extends x.Observable<any>> = Promise<x.ObservedValueOf<$>>

type Interval$ = x.Subject<void>

export const nthValueFrom =
  <O extends x.Observable<any>>
  (nth: number, $: O): $Promise<typeof $> => x.firstValueFrom($.pipe(x.skip(nth - 1)))

export const secondValueFrom =
  <O extends x.Observable<any>>
  ($: O): $Promise<typeof $> => nthValueFrom(2, $)

export const emitFloorRequest =
  (interval$: Interval$, model: m.Model) => (floors: m.FloorNumber[]) => {
    floors.forEach(floor => model.floorRequestEvent$.next(floor))
    interval$.next()
  }

export const requestFloors =
  (interval$: Interval$, model: m.Model) => (elevator: m.ElevatorId, floors: m.FloorNumber[]) => {
    floors.forEach(floor => model.elevatorQueueInsertEvent$.next(model.newElevatorFloorPair(elevator, floor)))
    interval$.next()
  }

export const tapInterval$ =
  (interval$: Interval$): typeof x.tap =>
    () => x.tap(() => l.defer(() => interval$.next()))

export const getElevatorPosition$ =
  (model: m.Model) => (elevator: m.ElevatorId) =>
    model.elevatorPositionPair$.pipe(
      x.map(pairs => pairs.filter(p => p.elevator === elevator)[0].position))

export const getFloorArrivals =
  (interval$: Interval$, model: m.Model) => (elevator: m.ElevatorId, floors: m.FloorNumber[]) =>
    nthValueFrom(floors.length, getElevatorPosition$(model)(elevator).pipe(
      tapInterval$(interval$)(),
      x.switchScan(
        (a, b) => b === getFloorPositions(floors)[a.length] ? x.of(a.concat(b)) : x.of(),
        [] as m.FloorNumber[])))

export const getElevatorDoorState$ =
  (model: m.Model) => (elevator: m.ElevatorId) =>
    model.elevatorDoorPair$.pipe(
      x.map(pairs => pairs.filter(p => p.elevator === elevator)[0].door))

export const doorAtMovementState =
  (interval$: Interval$, model: m.Model) =>
    (elevator: m.ElevatorId, movementState: m.DoorMovementState) =>
      x.firstValueFrom(getElevatorDoorState$(model)(elevator).pipe(
        tapInterval$(interval$)(),
        x.filter(state => state.movementState === movementState)))

export const defer = async (): Promise<void> =>
  await new Promise(resolve => { setTimeout(resolve, 0) })

// #endregion
// --------------------------------------------------------------------------------
// #region Data

export const getFloorPositions =
  l.memoize((floors: m.FloorNumber[]): m.Position[] =>
    floors.map(floor => floor * m.floorHeight))

// #endregion
// --------------------------------------------------------------------------------
