import { container } from 'tsyringe'
import { ElevatorCtrl } from '~/elevator/controller'
import { IElevatorDoor } from '~/elevator/door/model'
import { ElevatorDoor$, ElevatorDoorUnit$ } from '~/elevator/door/stream'
import { IElevator } from '~/elevator/model'
import { ElevatorPosition$, ElevatorPositionUnit$Map } from '~/elevator/position/stream'
import { IElevatorQueue } from '~/elevator/queue/model'
import { ElevatorQueueState } from '~/elevator/queue/model/moveState'
import { ElevatorQueue$ } from '~/elevator/queue/stream'
import { IElevatorQueueUnit$ } from '~/elevator/queue/stream/unit'
import { Elevator$, ElevatorUnit$List } from '~/elevator/stream'
import { ElevatorUnit$ } from '~/elevator/stream/unit'
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

  export const elevatorUnit$List = (): ElevatorUnit$List => elevator$().value
  export const elevatorUnit$ = (): ElevatorUnit$ => elevatorUnit$List().first()
  export const elevator = (): IElevator => elevatorUnit$().value as IElevator

  export const elevatorDoorUnit$ = (): ElevatorDoorUnit$ => elevatorDoor$().value.get(elevator()) as ElevatorDoorUnit$
  export const elevatorDoor = (): IElevatorDoor => elevatorDoorUnit$().value

  export const elevatorPositionUnit$Map = (): ElevatorPositionUnit$Map => elevatorPosition$().value

  export const elevatorQueueUnit$ = (elevator: IElevator): IElevatorQueueUnit$ => elevatorQueue$().value.get(elevator) as IElevatorQueueUnit$
  export const elevatorQueue = (elevator: IElevator): IElevatorQueue => elevatorQueueUnit$(elevator).value
  export const elevatorQueueState = (): ElevatorQueueState => elevatorQueue(get.elevator()).state

  export const floors = (): IFloor[] => [...floor$().value]

  export const settings = (): ISettings => settings$().value

  export const describe_ = <C extends NewableFunction> (c: C, k: keyof C['prototype']): string => `${c.prototype.constructor.name as string}.${String(k)}`

  type PropMap <C extends NewableFunction> = {[K in keyof C['prototype']]: string}
  type Describe = <C extends NewableFunction> (c: C) => PropMap<typeof c>

  /**
   * Get string with type and method name for test titles (arg for jest describe())
   * @example
   * get.describe(MyClass).myMethod // => 'MyClass.method'
   */
  export const describe: Describe = (c) => new Proxy({}, { get: (t, p) => `${c.name}.${String(p)}` }) as PropMap<typeof c>
}
