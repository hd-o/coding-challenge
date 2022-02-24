import { Lodash } from '/src/pkg/lodash'
import { IProcess, ProcessLoop } from '/src/process/loop'
import { ProcessUtils } from '/src/process/utils'
import { Settings$ } from '/src/settings/stream'
import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { IElevatorRecord } from '../model'
import { ElevatorMoveState } from '../moveState'
import { IElevatorDoor } from './model'
import { elevatorDoorPosition } from './model/position'
import { elevatorDoorStatus, IElevatorDoorStatus } from './model/status'
import { ElevatorDoor$Map$, IElevatorDoor$ } from './stream'

@singleton()
export class ElevatorDoorCtrl {
  private _createDoorMovementProcess (door$: IElevatorDoor$, doorStatus: IElevatorDoorStatus): IProcess {
    const isOpening = doorStatus === elevatorDoorStatus.Opening
    const movementStep = this._settings$.value.elevatorDoorMovementStep
    const incrementValue = isOpening ? -movementStep : movementStep
    const targetPosition = isOpening ? elevatorDoorPosition.Opened : elevatorDoorPosition.Closed
    let process: IProcess = () => {
      this._setDoorStatus(door$, doorStatus)
      process = () => {
        const { position } = door$.value
        if (position !== targetPosition) return this._setDoorPosition(door$, position + incrementValue)
        this._setDoorStatus(door$, isOpening ? elevatorDoorStatus.Open : elevatorDoorStatus.Closed)
        return true
      }
    }
    return this._lodash.throttle(() => process(), 150)
  }

  private _setDoorPosition (door$: IElevatorDoor$, position: number): void {
    if (position < elevatorDoorPosition.Opened || position > elevatorDoorPosition.Closed) return
    door$.next(door$.value.set('position', position as IElevatorDoor['position']))
  }

  private _setDoorStatus (door$: IElevatorDoor$, status: IElevatorDoorStatus): void {
    door$.next(door$.value.set('status', status))
  }

  constructor (
    @inject(ElevatorDoor$Map$) private readonly _elevatorDoors$: ElevatorDoor$Map$,
    @inject(ProcessLoop) private readonly _processLoop: ProcessLoop,
    @inject(ProcessUtils) private readonly _processUtils: ProcessUtils,
    @inject(Lodash) private readonly _lodash: Lodash,
    @inject(Settings$) private readonly _settings$: Settings$,
  ) {}

  getDoor$ (elevator: IElevatorRecord): IElevatorDoor$ {
    return this._elevatorDoors$.value.get(elevator.id) as IElevatorDoor$
  }

  isDoorClosed (elevator: IElevatorRecord): boolean {
    return this.getDoor$(elevator).value.status === elevatorDoorStatus.Closed
  }

  open (elevator: IElevatorRecord): void {
    if (elevator.moveState !== ElevatorMoveState.Idle) return
    const door$ = this.getDoor$(elevator)
    // #door-status: Assure status is set before process loop.
    // Prevents other process reading that door is still closed
    // if that process runs before this door$ process
    this._setDoorStatus(door$, elevatorDoorStatus.Opening)
    this._processLoop.reset(door$, [
      this._createDoorMovementProcess(door$, elevatorDoorStatus.Opening),
      this._processUtils.createWaitProcess(2000),
      this._createDoorMovementProcess(door$, elevatorDoorStatus.Closing),
    ])
  }

  close (elevator: IElevatorRecord): void {
    const door$ = this.getDoor$(elevator)
    /** @see ElevatorDoorCtrl.open #door-status  */
    this._setDoorStatus(door$, elevatorDoorStatus.Closing)
    this._processLoop.reset(door$, [
      this._createDoorMovementProcess(door$, elevatorDoorStatus.Closing),
    ])
  }
}

export const ElevatorDoorCtrlCtx = createContext(() => container.resolve(ElevatorDoorCtrl))
