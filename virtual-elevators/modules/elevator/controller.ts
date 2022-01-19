import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { ElevatorDoorCtrl } from '~/elevator/door/controller'
import { ElevatorQueueCtrl } from '~/elevator/queue/controller'
import { Elevator$ } from '~/elevator/stream'
import { FloorCtrl } from '~/floor/controller'
import { IFloor } from '~/floor/model'
import { IElevator } from './model'
import { ElevatorMoveState } from './moveState'
import { ElevatorPositionCtrl } from './position/controller'

@singleton()
export class ElevatorCtrl {
  private _requestNearestElevator (floor: IFloor): void {
    const elevatorUnit$s = this._elevator$.value.toArray()
    // Show alert if no elevator available
    if (elevatorUnit$s.length === 0) return
    // Start with first elevator
    let nearestElevator = elevatorUnit$s[0].value
    // Open doors if idle at floor
    if (this._isIdleAtFloor(nearestElevator, floor)) {
      return this._elevatorDoorCtrl.open(nearestElevator)
    }
    // Cache current nearestDistance
    let nearestDistance = this._elevatorQueueCtrl.getDistance(nearestElevator, floor)
    // Loop from second elevator onward
    for (const elevatorUnit$ of elevatorUnit$s.slice(1)) {
      const elevator = elevatorUnit$.value
      // Early exit if elevator is Idle at floor
      if (this._isIdleAtFloor(elevator, floor)) {
        return this._elevatorDoorCtrl.open(elevator)
      }
      const distance = this._elevatorQueueCtrl.getDistance(elevator, floor)
      if (
        nearestDistance === false ||
        ((distance !== false) && distance < nearestDistance)
      ) {
        nearestElevator = elevator
        nearestDistance = distance
      }
    }
    // If no elevator services floor
    if (nearestDistance === false) return
    // Else request nearest elevator
    this._elevatorQueueCtrl.insert(nearestElevator, floor)
  }

  private _isIdleAtFloor (elevator: IElevator, floor: IFloor): boolean {
    return (
      elevator.moveState === ElevatorMoveState.Idle &&
      this._elevatorPositionCtrl.isAtFloor(elevator, floor)
    )
  }

  constructor (
    @inject(Elevator$) private readonly _elevator$: Elevator$,
    @inject(ElevatorQueueCtrl) private readonly _elevatorQueueCtrl: ElevatorQueueCtrl,
    @inject(FloorCtrl) private readonly _floorCtrl: FloorCtrl,
    @inject(ElevatorDoorCtrl) private readonly _elevatorDoorCtrl: ElevatorDoorCtrl,
    @inject(ElevatorPositionCtrl) private readonly _elevatorPositionCtrl: ElevatorPositionCtrl
  ) {}

  requestElevatorTo (floor: IFloor): void {
    if (this._floorCtrl.hasRequestedElevator(floor)) return
    this._requestNearestElevator(floor)
  }
}

export const ElevatorCtrlCtx = createContext(container.resolve(ElevatorCtrl))
