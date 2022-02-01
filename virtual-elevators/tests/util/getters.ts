import { container } from 'tsyringe'
import { ElevatorCtrl } from '~/elevator/controller'
import { IElevatorDoor } from '~/elevator/door/model'
import { ElevatorDoor$, IElevatorDoorUnit$ } from '~/elevator/door/stream'
import { IElevatorRecord } from '~/elevator/model'
import { ElevatorPosition$, IElevatorPositionUnit$Map } from '~/elevator/position/stream'
import { IElevatorQueue } from '~/elevator/queue/model'
import { IElevatorQueueState } from '~/elevator/queue/model/moveState'
import { ElevatorQueue$ } from '~/elevator/queue/stream'
import { IElevatorQueueUnit$ } from '~/elevator/queue/stream/unit'
import { Elevator$, IElevatorUnit$List } from '~/elevator/stream'
import { IElevatorUnit$ } from '~/elevator/stream/unit'
import { FloorCtrl } from '~/floor/controller'
import { IFloor } from '~/floor/model'
import { Floor$ } from '~/floor/stream'
import { ISettings } from '~/settings/model'
import { Settings$ } from '~/settings/stream'

/* eslint-disable-next-line @typescript-eslint/no-namespace */
export namespace get {
  export const floorCtrl = (): FloorCtrl => container.resolve(FloorCtrl)
  export const floor$ = (): Floor$ => container.resolve(Floor$)
  export const elevatorCtrl = (): ElevatorCtrl => container.resolve(ElevatorCtrl)
  export const elevator$ = (): Elevator$ => container.resolve(Elevator$)
  export const elevatorQueue$ = (): ElevatorQueue$ => container.resolve(ElevatorQueue$)
  export const elevatorPosition$ = (): ElevatorPosition$ => container.resolve(ElevatorPosition$)
  export const elevatorDoor$ = (): ElevatorDoor$ => container.resolve(ElevatorDoor$)
  export const settings$ = (): Settings$ => container.resolve(Settings$)

  export const elevatorUnit$List = (): IElevatorUnit$List => elevator$().value
  export const elevatorUnit$ = (): IElevatorUnit$ => elevatorUnit$List().first()
  export const elevator = (): IElevatorRecord => elevatorUnit$().value

  export const elevatorDoorUnit$ = (): IElevatorDoorUnit$ => elevatorDoor$().value.get(elevator().id) as IElevatorDoorUnit$
  export const elevatorDoor = (): IElevatorDoor => elevatorDoorUnit$().value

  export const elevatorPositionUnit$Map = (): IElevatorPositionUnit$Map => elevatorPosition$().value

  export const elevatorQueueUnit$ = (elevator: IElevatorRecord): IElevatorQueueUnit$ => elevatorQueue$().value.get(elevator.id) as IElevatorQueueUnit$
  export const elevatorQueue = (elevator: IElevatorRecord): IElevatorQueue => elevatorQueueUnit$(elevator).value
  export const elevatorQueueState = (): IElevatorQueueState => elevatorQueue(get.elevator()).state

  export const floors = (): IFloor[] => [...floor$().value]

  export const settings = (): ISettings => settings$().value

  export const describe_ = <C extends NewableFunction> (c: C, k: keyof C['prototype']): string => `${c.prototype.constructor.name as string}.${String(k)}`

  type IPropMap <C extends NewableFunction> = {[K in keyof C['prototype']]: string}
  type IDescribe = <C extends NewableFunction> (c: C) => IPropMap<typeof c>

  /**
   * Get string with type and method name for test titles (arg for jest describe())
   * @example
   * get.describe(MyClass).myMethod // => 'MyClass.method'
   */
  export const describe: IDescribe = (c) => new Proxy({}, { get: (t, p) => `${c.name}.${String(p)}` }) as IPropMap<typeof c>
}
