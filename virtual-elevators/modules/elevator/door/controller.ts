import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { Lodash } from '~/pkg/lodash'
import { IProcess, ProcessLoop } from '~/process/loop'
import { ProcessUtils } from '~/process/utils'
import { IElevatorRecord } from '../model'
import { ElevatorMoveState } from '../moveState'
import { IElevatorDoor } from './model'
import { elevatorDoorPosition } from './model/position'
import { elevatorDoorStatus, IElevatorDoorStatus } from './model/status'
import { ElevatorDoor$, IElevatorDoorUnit$ } from './stream'

@singleton()
export class ElevatorDoorCtrl {
  private _createDoorMovementProcess (doorUnit$: IElevatorDoorUnit$, doorStatus: IElevatorDoorStatus): IProcess {
    const isOpening = doorStatus === elevatorDoorStatus.Opening
    const incrementValue = isOpening ? -1 : 1
    const targetPosition = isOpening ? elevatorDoorPosition.Opened : elevatorDoorPosition.Closed
    let process: IProcess = () => {
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

  private _setDoorPosition (doorUnit$: IElevatorDoorUnit$, position: number): void {
    if (position < elevatorDoorPosition.Opened || position > elevatorDoorPosition.Closed) return
    doorUnit$.next(doorUnit$.value.set('position', position as IElevatorDoor['position']))
  }

  private _setDoorStatus (doorUnit$: IElevatorDoorUnit$, status: IElevatorDoorStatus): void {
    doorUnit$.next(doorUnit$.value.set('status', status))
  }

  constructor (
    @inject(ElevatorDoor$) private readonly _elevatorDoors$: ElevatorDoor$,
    @inject(ProcessLoop) private readonly _processLoop: ProcessLoop,
    @inject(ProcessUtils) private readonly _processUtils: ProcessUtils,
    @inject(Lodash) private readonly _lodash: Lodash
  ) {}

  getDoorUnit$ (elevator: IElevatorRecord): IElevatorDoorUnit$ {
    return this._elevatorDoors$.value.get(elevator.id) as IElevatorDoorUnit$
  }

  isDoorClosed (elevator: IElevatorRecord): boolean {
    return this.getDoorUnit$(elevator).value.status === elevatorDoorStatus.Closed
  }

  open (elevator: IElevatorRecord): void {
    if (elevator.moveState !== ElevatorMoveState.Idle) return
    const doorUnit$ = this.getDoorUnit$(elevator)
    // #door-status: Assure status is set before process loop.
    // Prevents other process reading that door is still closed
    // if that process runs before this doorUnit$ process
    this._setDoorStatus(doorUnit$, elevatorDoorStatus.Opening)
    this._processLoop.reset(doorUnit$, [
      this._createDoorMovementProcess(doorUnit$, elevatorDoorStatus.Opening),
      this._processUtils.createWaitProcess(1000),
      this._createDoorMovementProcess(doorUnit$, elevatorDoorStatus.Closing)
    ])
  }

  close (elevator: IElevatorRecord): void {
    const doorUnit$ = this.getDoorUnit$(elevator)
    /** @see ElevatorDoorCtrl.open #door-status  */
    this._setDoorStatus(doorUnit$, elevatorDoorStatus.Closing)
    this._processLoop.reset(doorUnit$, [
      this._createDoorMovementProcess(doorUnit$, elevatorDoorStatus.Closing)
    ])
  }
}

export const ElevatorDoorCtrlCtx = createContext(container.resolve(ElevatorDoorCtrl))
