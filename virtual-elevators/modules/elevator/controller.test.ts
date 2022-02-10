import { firstValueFrom, skip } from 'rxjs'
import { IFloorRecord } from '~/floor/model'
import { get } from '@/tests/util/getters'
import { ElevatorCtrl } from './controller'
import { elevatorDoorStatus } from './door/model/status'
import { elevatorQueueState } from './queue/model/moveState'

function requestElevator (floorIndex: number = 0): IFloorRecord {
  const floor = get.floors()[floorIndex]
  get.elevatorCtrl().requestElevator(floor)
  return floor
}

describe(`${get.describe(ElevatorCtrl).requestElevator}`, () => {
  test('Open door when elevator idle', async () => {
    const floor = requestElevator()
    expect(get.floorCtrl().hasRequestedElevator(floor)).toBe(false)
    const door = await firstValueFrom(get.elevatorDoor$().pipe(skip(1)))
    expect(door.status).toBe(elevatorDoorStatus.Opening)
  })
  test('Set floor request when elevator is available', () => {
    const floor = requestElevator(1)
    expect(get.floorCtrl().hasRequestedElevator(floor)).toBe(true)
  })
  describe('Insert elevator into correct floor queue', () => {
    test('More than one floor available', () => {
      expect(get.floors().length).toBeGreaterThan(1)
    })
    test(`${elevatorQueueState.Idle}`, () => {
      requestElevator()
      expect(get.elevatorQueueState()).toBe(elevatorQueueState.Idle)
    })
    test(`${elevatorQueueState.MovingUp}`, () => {
      requestElevator(1)
      expect(get.elevatorQueueState()).toBe(elevatorQueueState.MovingUp)
    })
    test(`${elevatorQueueState.MovingDown}`, () => {
      // Place all elevators at first floor
      const { floorHeight } = get.settings()
      get.elevatorPosition$Map().forEach(position$ => position$.next(floorHeight))
      // Request elevator to ground floor
      requestElevator(0)
      expect(get.elevatorQueueState()).toBe(elevatorQueueState.MovingDown)
    })
  })
})
