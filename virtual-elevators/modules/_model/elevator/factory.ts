import { singleton } from 'tsyringe'
import { Floor } from '~/_model/floor'
import { Settings } from '~/_model/settings'
import { Immutable } from '../../view/pkg/immutable'
import { MobX } from '../pkg/mobx'
import { PromiseFactory } from '../pkg/native/promise'
import { ProcessorFactory } from '../processor/factory'
import { ResolvableFactory } from '../resolvable/factory'
import { TimerFactory } from '../timer/factory'
import { Elevator } from '.'

@singleton()
export class ElevatorFactory {
  constructor (
    private readonly _ctx: Settings,
    private readonly _mobx: MobX,
    private readonly _immutable: Immutable,
    private readonly _processorFactory: ProcessorFactory,
    private readonly _resolvableFactory: ResolvableFactory,
    private readonly _timerFactory: TimerFactory,
    private readonly _promiseFactory: PromiseFactory
  ) {}

  create (floors: Floor[]): Elevator {
    const elevator = new Elevator(
      floors,
      this._ctx,
      this._immutable,
      this._processorFactory,
      this._resolvableFactory,
      this._timerFactory,
      this._promiseFactory
    )
    return this._mobx.makeAutoObservable(elevator)
  }
}
