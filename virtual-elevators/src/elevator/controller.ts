import { ElevatorDoorCtrl } from '/src/elevator/door/controller'
import { ElevatorQueueCtrl } from '/src/elevator/queue/controller'
import { Elevator$Map$, IElevator$ } from '/src/elevator/stream'
import { FloorCtrl } from '/src/floor/controller'
import { IFloorRecord } from '/src/floor/model'
import { Lodash } from '/src/pkg/lodash'
import { IProcess, IProcessId, ProcessLoop } from '/src/process/loop'
import { Symbol } from '/src/symbol'
import { NoElevatorServicesFloor } from '/src/symbol/NoElevatorServicesFloor'
import { createContext } from 'react'
import { skip, takeUntil } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { IElevator, IElevatorRecord } from './model'
import { ElevatorMoveState } from './moveState'
import { ElevatorPositionCtrl } from './position/controller'
import { elevatorDirectionType, IElevatorDirectionType } from './queue/model/directionType'
import { elevatorQueueState } from './queue/model/moveState'
import { ElevatorQueue$Map$, IElevatorQueue$ } from './queue/stream'

@singleton()
export class ElevatorCtrl {
  constructor (
    @inject(Elevator$Map$) private readonly _elevator$: Elevator$Map$,
    @inject(ElevatorQueueCtrl) private readonly _queueCtrl: ElevatorQueueCtrl,
    @inject(FloorCtrl) private readonly _floorCtrl: FloorCtrl,
    @inject(ElevatorDoorCtrl) private readonly _doorCtrl: ElevatorDoorCtrl,
    @inject(ElevatorPositionCtrl) private readonly _positionCtrl: ElevatorPositionCtrl,
    @inject(ElevatorQueue$Map$) private readonly _queue$Map$: ElevatorQueue$Map$,
    @inject(ProcessLoop) private readonly _processLoop: ProcessLoop,
    @inject(Lodash) private readonly _lodash: Lodash,
    @inject(Symbol) private readonly _sym: Symbol
  ) {}

  readonly queue$Sub = this._queue$Map$.subscribe((queue$Map) => {
    for (const [elevatorId, queue$] of queue$Map.entries()) {
      queue$
        .pipe(takeUntil(this._queue$Map$.pipe(skip(1))))
        .subscribe(() => {
          const process = this.createMovementProcess(elevatorId, queue$)
          this._processLoop.reset(this.getMovementProcessId(elevatorId), [
            this._lodash.throttle(process, 10),
          ])
        })
    }
  })

  canElevatorMove (elevator: IElevatorRecord, queue$: IElevatorQueue$): boolean {
    return (
      this._doorCtrl.isDoorClosed(elevator) &&
      !this._queueCtrl.isQueueEmpty(elevator) &&
      queue$.value.state !== elevatorQueueState.Idle
    )
  }

  createMovementProcess (elevatorId: IElevator['id'], queue$: IElevatorQueue$): IProcess {
    return () => {
      let elevator = this.getElevator$(elevatorId).value

      if (this._queueCtrl.isQueueEmpty(elevator)) return true
      if (!this.canElevatorMove(elevator, queue$)) return undefined

      const currentDirection = queue$.value.state as IElevatorDirectionType
      const nextFloor = queue$.value[currentDirection].first as IFloorRecord

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

  getElevator$ (elevatorId: IElevator['id']): IElevator$ {
    return this._elevator$.value.get(elevatorId) as IElevator$
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
    if (this._floorCtrl.hasRequestedElevator(floor)) return this._sym.noElevatorServicesFloor
    return this.requestNearestElevator(floor)
  }

  requestNearestElevator (floor: IFloorRecord): IElevatorRecord | NoElevatorServicesFloor {
    const elevator$Array = this._elevator$.value.valueSeq().toArray()
    // Show alert if no elevator available
    if (elevator$Array.length === 0) return this._sym.noElevatorServicesFloor
    // Start with first elevator
    let nearestElevator = elevator$Array[0].value
    // Open doors if idle at floor
    if (this.isIdleAtFloor(nearestElevator, floor)) {
      this._doorCtrl.open(nearestElevator)
      return nearestElevator
    }
    let nearestElevatorQueueSize = this._queueCtrl.getTotalQueueSize(nearestElevator)
    if (nearestElevatorQueueSize === 0) {
      this._queueCtrl.insert(nearestElevator, floor)
      return nearestElevator
    }
    // Loop from second elevator onward
    for (const elevator$ of elevator$Array.slice(1)) {
      const elevator = elevator$.value
      // Early exit if elevator is Idle at floor
      if (this.isIdleAtFloor(elevator, floor)) {
        this._doorCtrl.open(elevator)
        return elevator
      }
      const queueSize = this._queueCtrl.getTotalQueueSize(elevator)
      if (queueSize === 0) {
        this._queueCtrl.insert(elevator, floor)
        return elevator
      }
      if (
        queueSize < nearestElevatorQueueSize
      ) {
        nearestElevator = elevator
        nearestElevatorQueueSize = queueSize
      }
    }
    this._queueCtrl.insert(nearestElevator, floor)
    return nearestElevator
  }

  setElevatorMoveState (elevator: IElevatorRecord, moveState: ElevatorMoveState): IElevatorRecord {
    const elevator$ = this.getElevator$(elevator.id)
    const elevatorUpdate = elevator.set('moveState', moveState)
    elevator$.next(elevatorUpdate)
    return elevatorUpdate
  }
}

export const ElevatorCtrlCtx = createContext(() => container.resolve(ElevatorCtrl))
