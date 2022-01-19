import { IFloor } from '~/floor/model'
import { get } from '@/tests/util/getters'
import { ElevatorCtrl } from './controller'
import { elevatorQueueState } from './queue/model/moveState'

function requestElevator (floorIndex: number = 0): IFloor {
  const floor = get.floors()[floorIndex]
  get.elevatorCtrl().requestElevatorTo(floor)
  return floor
}

describe(`${get.typeAndMethodName(ElevatorCtrl, 'requestElevatorTo')}`, () => {
  test('Open door when elevator idle at floor', () => {
    const floor = requestElevator()
    expect(get.floorCtrl().hasRequestedElevator(floor)).toBe(false)
    expect(get.elevatorDoor().open).toBe(true)
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
      get.elevatorPositionUnit$Map().forEach(positionUnit$ => positionUnit$.next(floorHeight))
      // Request elevator to ground floor
      requestElevator(0)
      expect(get.elevatorQueueState()).toBe(elevatorQueueState.MovingDown)
    })
  })
})
