import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { Lodash } from '~/pkg/lodash'
import { Process, ProcessLoop } from '~/process/loop'
import { ProcessUtils } from '~/process/utils'
import { IElevator } from '../model'
import { ElevatorMoveState } from '../moveState'
import { IElevatorDoor } from './model'
import { elevatorDoorPosition } from './model/position'
import { ElevatorDoorStatus, elevatorDoorStatus } from './model/status'
import { ElevatorDoor$, ElevatorDoorUnit$ } from './stream'

@singleton()
export class ElevatorDoorCtrl {
  private _createDoorMovementProcess (doorUnit$: ElevatorDoorUnit$, doorStatus: ElevatorDoorStatus): Process {
    const isOpening = doorStatus === elevatorDoorStatus.Opening
    const incrementValue = isOpening ? -1 : 1
    const targetPosition = isOpening ? elevatorDoorPosition.Opened : elevatorDoorPosition.Closed
    let process: Process = () => {
      this._setDoorStatus(doorUnit$, doorStatus)
      process = () => {
        const { position } = doorUnit$.value
        if (position !== targetPosition) return this._setDoorPosition(doorUnit$, position + incrementValue)
        this._setDoorStatus(doorUnit$, isOpening ? elevatorDoorStatus.Open : elevatorDoorStatus.Closed)
        return true
      }
    }
    return this._lodash.throttle(() => process(), 250)
  }

  private _setDoorPosition (doorUnit$: ElevatorDoorUnit$, position: number): void {
    if (position < elevatorDoorPosition.Opened || position > elevatorDoorPosition.Closed) return
    doorUnit$.next(doorUnit$.value.set('position', position as IElevatorDoor['position']))
  }

  private _setDoorStatus (doorUnit$: ElevatorDoorUnit$, status: ElevatorDoorStatus): void {
    doorUnit$.next(doorUnit$.value.set('status', status))
  }

  constructor (
    @inject(ElevatorDoor$) private readonly _elevatorDoors$: ElevatorDoor$,
    @inject(ProcessLoop) private readonly _processLoop: ProcessLoop,
    @inject(ProcessUtils) private readonly _processUtils: ProcessUtils,
    @inject(Lodash) private readonly _lodash: Lodash
  ) {}

  getDoorUnit$ (elevator: IElevator): ElevatorDoorUnit$ {
    return this._elevatorDoors$.value.get(elevator) as ElevatorDoorUnit$
  }

  open (elevator: IElevator): void {
    if (elevator.moveState !== ElevatorMoveState.Idle) return
    const doorUnit$ = this.getDoorUnit$(elevator)
    this._processLoop.reset(doorUnit$, [
      this._createDoorMovementProcess(doorUnit$, elevatorDoorStatus.Opening),
      this._processUtils.createWaitProcess(),
      this._createDoorMovementProcess(doorUnit$, elevatorDoorStatus.Closing)
    ])
  }

  close (elevator: IElevator): void {
    const doorUnit$ = this.getDoorUnit$(elevator)
    this._processLoop.reset(doorUnit$, [
      this._createDoorMovementProcess(doorUnit$, elevatorDoorStatus.Closing)
    ])
  }
}

export const ElevatorDoorCtrlCtx = createContext(container.resolve(ElevatorDoorCtrl))
