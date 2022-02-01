import { container } from 'tsyringe'
import { ElevatorCtrl } from '~/elevator/controller'
import { IElevatorDoor } from '~/elevator/door/model'
import { ElevatorDoor$Map$, IElevatorDoor$ } from '~/elevator/door/stream'
import { IElevatorRecord } from '~/elevator/model'
import { ElevatorPosition$Map$, IElevatorPosition$Map } from '~/elevator/position/stream'
import { IElevatorQueue } from '~/elevator/queue/model'
import { IElevatorQueueState } from '~/elevator/queue/model/moveState'
import { ElevatorQueue$Map$, IElevatorQueue$ } from '~/elevator/queue/stream'
import { Elevator$Map$, IElevator$, IElevator$Map } from '~/elevator/stream'
import { FloorCtrl } from '~/floor/controller'
import { IFloorRecord } from '~/floor/model'
import { FloorList$ } from '~/floor/stream'
import { ISettings } from '~/settings/model'
import { Settings$ } from '~/settings/stream'

/* eslint-disable-next-line @typescript-eslint/no-namespace */
export namespace get {
  export const floorCtrl = (): FloorCtrl => container.resolve(FloorCtrl)
  export const floorList$ = (): FloorList$ => container.resolve(FloorList$)

  export const elevatorCtrl = (): ElevatorCtrl => container.resolve(ElevatorCtrl)
  export const elevator$Map$ = (): Elevator$Map$ => container.resolve(Elevator$Map$)
  export const elevatorQueue$Map$ = (): ElevatorQueue$Map$ => container.resolve(ElevatorQueue$Map$)
  export const elevatorPosition$Map$ = (): ElevatorPosition$Map$ => container.resolve(ElevatorPosition$Map$)
  export const elevatorDoor$Map$ = (): ElevatorDoor$Map$ => container.resolve(ElevatorDoor$Map$)
  export const settings$ = (): Settings$ => container.resolve(Settings$)

  export const elevator$Map = (): IElevator$Map => elevator$Map$().value
  export const elevator$ = (): IElevator$ => elevator$Map().first()
  export const elevator = (): IElevatorRecord => elevator$().value

  export const elevatorDoor$ = (): IElevatorDoor$ => elevatorDoor$Map$().value.get(elevator().id) as IElevatorDoor$
  export const elevatorDoor = (): IElevatorDoor => elevatorDoor$().value

  export const elevatorPosition$Map = (): IElevatorPosition$Map => elevatorPosition$Map$().value

  export const elevatorQueue$ = (elevator: IElevatorRecord): IElevatorQueue$ => elevatorQueue$Map$().value.get(elevator.id) as IElevatorQueue$
  export const elevatorQueue = (elevator: IElevatorRecord): IElevatorQueue => elevatorQueue$(elevator).value
  export const elevatorQueueState = (): IElevatorQueueState => elevatorQueue(get.elevator()).state

  export const floors = (): IFloorRecord[] => [...floorList$().value]

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
