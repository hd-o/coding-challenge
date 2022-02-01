import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { ElevatorDoorCtrl } from '~/elevator/door/controller'
import { ElevatorQueueCtrl } from '~/elevator/queue/controller'
import { Elevator$ } from '~/elevator/stream'
import { FloorCtrl } from '~/floor/controller'
import { IFloorRecord } from '~/floor/model'
import { Message } from '~/message'
import { NoElevatorServicesFloor } from '~/message/NoElevatorServicesFloor'
import { Lodash } from '~/pkg/lodash'
import { IProcess, IProcessId, ProcessLoop } from '~/process/loop'
import { IElevator, IElevatorRecord } from './model'
import { ElevatorMoveState } from './moveState'
import { ElevatorPositionCtrl } from './position/controller'
import { elevatorDirectionType, IElevatorDirectionType } from './queue/model/directionType'
import { elevatorQueueState } from './queue/model/moveState'
import { ElevatorQueue$ } from './queue/stream'
import { IElevatorQueueUnit$ } from './queue/stream/unit'
import { IElevatorUnit$ } from './stream/unit'

@singleton()
export class ElevatorCtrl {
  constructor (
    @inject(Elevator$) private readonly _elevator$: Elevator$,
    @inject(ElevatorQueueCtrl) private readonly _queueCtrl: ElevatorQueueCtrl,
    @inject(FloorCtrl) private readonly _floorCtrl: FloorCtrl,
    @inject(ElevatorDoorCtrl) private readonly _doorCtrl: ElevatorDoorCtrl,
    @inject(ElevatorPositionCtrl) private readonly _positionCtrl: ElevatorPositionCtrl,
    @inject(ElevatorQueue$) private readonly _queue$: ElevatorQueue$,
    @inject(ProcessLoop) private readonly _processLoop: ProcessLoop,
    @inject(Lodash) private readonly _lodash: Lodash,
    @inject(Message) private readonly _msg: Message
  ) {}

  readonly queue$Sub = this._queue$.subscribe((queueUnit$Map) => {
    for (const [elevatorId, queueUnit$] of queueUnit$Map.entries()) {
      const process = this.createMovementProcess(elevatorId, queueUnit$)
      this._processLoop.reset(this.getMovementProcessId(elevatorId), [
        this._lodash.throttle(process, 10)
      ])
    }
  })

  canElevatorMove (elevator: IElevatorRecord, queueUnit$: IElevatorQueueUnit$): boolean {
    return (
      this._doorCtrl.isDoorClosed(elevator) &&
      !this._queueCtrl.isQueueEmpty(elevator) &&
      queueUnit$.value.state !== elevatorQueueState.Idle
    )
  }

  // TODO: Make ProcessLoop into a $, then subscribe for elevator/door movement
  createMovementProcess (elevatorId: IElevator['id'], queueUnit$: IElevatorQueueUnit$): IProcess {
    return () => {
      let elevator = this.getElevatorUnit$(elevatorId).value
      if (!this.canElevatorMove(elevator, queueUnit$)) return

      const currentDirection = queueUnit$.value.state as IElevatorDirectionType
      const nextFloor = queueUnit$.value[currentDirection].first as IFloorRecord

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

  getElevatorUnit$ (elevatorId: IElevator['id']): IElevatorUnit$ {
    return this._elevator$.value.get(elevatorId) as IElevatorUnit$
  }

  getMovementProcessId (elevatorId: IElevator['id']): IProcessId {
    return `MovementCtrl.${String(elevatorId)}`
  }

  isIdleAtFloor (elevator: IElevatorRecord, floor: IFloorRecord): boolean {
    return (
      elevator.moveState === ElevatorMoveState.Idle &&
      this._positionCtrl.isAtFloor(elevator, floor)
    )
  }

  requestElevator (floor: IFloorRecord): IElevatorRecord | NoElevatorServicesFloor {
    if (this._floorCtrl.hasRequestedElevator(floor)) return this._msg.noElevatorServicesFloor
    return this.requestNearestElevator(floor)
  }

  requestNearestElevator (floor: IFloorRecord): IElevatorRecord | NoElevatorServicesFloor {
    const elevatorUnit$s = this._elevator$.value.valueSeq().toArray()
    // Show alert if no elevator available
    if (elevatorUnit$s.length === 0) return this._msg.noElevatorServicesFloor
    // Start with first elevator
    let nearestElevator = elevatorUnit$s[0].value
    // Open doors if idle at floor
    if (this.isIdleAtFloor(nearestElevator, floor)) {
      this._doorCtrl.open(nearestElevator)
      return nearestElevator
    }
    // Cache current nearestDistance
    let nearestDistance = this._queueCtrl.getDistance(nearestElevator, floor)
    // Loop from second elevator onward
    for (const elevatorUnit$ of elevatorUnit$s.slice(1)) {
      const elevator = elevatorUnit$.value
      // Early exit if elevator is Idle at floor
      if (this.isIdleAtFloor(elevator, floor)) {
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
    if (nearestDistance === false) return this._msg.noElevatorServicesFloor
    // Else request nearest elevator
    this._queueCtrl.insert(nearestElevator, floor)
    return nearestElevator
  }

  setElevatorMoveState (elevator: IElevatorRecord, moveState: ElevatorMoveState): IElevatorRecord {
    const elevatorUnit$ = this.getElevatorUnit$(elevator.id)
    const elevatorUpdate = elevator.set('moveState', moveState)
    elevatorUnit$.next(elevatorUpdate)
    return elevatorUpdate
  }
}

export const ElevatorCtrlCtx = createContext(container.resolve(ElevatorCtrl))
