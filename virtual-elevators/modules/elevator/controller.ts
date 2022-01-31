import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { ElevatorDoorCtrl } from '~/elevator/door/controller'
import { ElevatorQueueCtrl } from '~/elevator/queue/controller'
import { Elevator$ } from '~/elevator/stream'
import { FloorCtrl } from '~/floor/controller'
import { IFloor } from '~/floor/model'
import { Lodash } from '~/pkg/lodash'
import { Process, ProcessLoop } from '~/process/loop'
import { ElevatorRecord, IElevator } from './model'
import { ElevatorMoveState } from './moveState'
import { ElevatorPositionCtrl } from './position/controller'
import { elevatorDirectionType, ElevatorDirectionType } from './queue/model/directionType'
import { elevatorQueueState } from './queue/model/moveState'
import { ElevatorQueue$ } from './queue/stream'
import { IElevatorQueueUnit$ } from './queue/stream/unit'
import { ElevatorUnit$ } from './stream/unit'

@singleton()
export class ElevatorCtrl {
  /** @returns Nearest elevator, or undefined if no elevator services floor */
  private _requestNearestElevator (floor: IFloor): ElevatorRecord | undefined {
    const elevatorUnit$s = this._elevator$.value.toArray()
    // Show alert if no elevator available
    if (elevatorUnit$s.length === 0) return
    // Start with first elevator
    let nearestElevator = elevatorUnit$s[0].value
    // Open doors if idle at floor
    if (this._isIdleAtFloor(nearestElevator, floor)) {
      this._doorCtrl.open(nearestElevator)
      return nearestElevator
    }
    // Cache current nearestDistance
    let nearestDistance = this._queueCtrl.getDistance(nearestElevator, floor)
    // Loop from second elevator onward
    for (const elevatorUnit$ of elevatorUnit$s.slice(1)) {
      const elevator = elevatorUnit$.value
      // Early exit if elevator is Idle at floor
      if (this._isIdleAtFloor(elevator, floor)) {
        this._doorCtrl.open(elevator)
        return elevator
      }
      const distance = this._queueCtrl.getDistance(elevator, floor)
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
    this._queueCtrl.insert(nearestElevator, floor)
    return nearestElevator
  }

  private _isIdleAtFloor (elevator: ElevatorRecord, floor: IFloor): boolean {
    return (
      elevator.moveState === ElevatorMoveState.Idle &&
      this._positionCtrl.isAtFloor(elevator, floor)
    )
  }

  constructor (
    @inject(Elevator$) private readonly _elevator$: Elevator$,
    @inject(ElevatorQueueCtrl) private readonly _queueCtrl: ElevatorQueueCtrl,
    @inject(FloorCtrl) private readonly _floorCtrl: FloorCtrl,
    @inject(ElevatorDoorCtrl) private readonly _doorCtrl: ElevatorDoorCtrl,
    @inject(ElevatorPositionCtrl) private readonly _positionCtrl: ElevatorPositionCtrl,
    @inject(ElevatorQueue$) readonly queue$: ElevatorQueue$,
    @inject(ProcessLoop) readonly processLoop: ProcessLoop,
    @inject(Lodash) readonly lodash: Lodash
  ) {
    queue$.subscribe((queueUnit$Map) => {
      for (const [elevatorId, queueUnit$] of queueUnit$Map.entries()) {
        const process = this.createMovementProcess(elevatorId, queueUnit$)
        processLoop.reset(this.getMovementProcessId(elevatorId), [
          lodash.throttle(process, 10)
        ])
      }
    })
  }

  createMovementProcess (elevatorId: IElevator['id'], queueUnit$: IElevatorQueueUnit$): Process {
    // TODO: Make ProcessLoop into a $, then subscribe for elevator/door movement
    return () => {
      let elevator = this.getElevatorUnit$(elevatorId).value
      if (!this._doorCtrl.isDoorClosed(elevator)) return undefined
      if (this._queueCtrl.isQueueEmpty(elevator)) return undefined
      if (queueUnit$.value.state === elevatorQueueState.Idle) return undefined
      const currentDirection = queueUnit$.value.state as ElevatorDirectionType
      const nextFloor = queueUnit$.value[currentDirection].first as IFloor
      if (this._positionCtrl.isAtFloor(elevator, nextFloor)) {
        elevator = this.setElevatorMoveState(elevator, ElevatorMoveState.Idle)
        this._queueCtrl.remove(elevator, currentDirection, nextFloor)
        this._floorCtrl.setHasRequestedElevator(nextFloor, false)
        this._doorCtrl.open(elevator)
      } else {
        if (elevator.moveState !== ElevatorMoveState.Moving) {
          elevator = this.setElevatorMoveState(elevator, ElevatorMoveState.Moving)
        }
        const position = this._positionCtrl.getPosition(elevator)
        const increment = currentDirection === elevatorDirectionType.MovingUp ? 1 : -1
        this._positionCtrl.setPosition(elevator, position + increment)
      }
    }
  }

  getElevatorUnit$ (elevatorId: IElevator['id']): ElevatorUnit$ {
    return this._elevator$.value.find(elevatorUnit$ => elevatorUnit$.value.id === elevatorId) as ElevatorUnit$
  }

  getMovementProcessId (elevatorId: IElevator['id']): string {
    return `MovementCtrl.${String(elevatorId)}`
  }

  requestElevator (floor: IFloor): ElevatorRecord | undefined {
    if (this._floorCtrl.hasRequestedElevator(floor)) return
    return this._requestNearestElevator(floor)
  }

  setElevatorMoveState (elevator: ElevatorRecord, moveState: ElevatorMoveState): ElevatorRecord {
    const elevatorUnit$ = this.getElevatorUnit$(elevator.id)
    const elevatorUpdate = elevator.set('moveState', moveState)
    elevatorUnit$.next(elevatorUpdate)
    return elevatorUpdate
  }
}

export const ElevatorCtrlCtx = createContext(container.resolve(ElevatorCtrl))
