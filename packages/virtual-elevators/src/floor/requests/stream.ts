import { Immutable } from '/src/pkg/immutable'
import { Map } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { IFloorRecord } from '../model'
import { FloorList$ } from '../stream'

type IFloorRequested = true | false

export type IFloorRequest$ = BehaviorSubject<IFloorRequested>

type IFloorRequestMap = Map<IFloorRecord, IFloorRequest$>

@singleton()
export class FloorRequest$ extends BehaviorSubject<IFloorRequestMap> {
  constructor (
    @inject(Immutable) readonly immutable: Immutable,
    @inject(FloorList$) readonly floor$: FloorList$
  ) {
    super(createFloorRequestMap())
    floor$.subscribe(() => this.next(createFloorRequestMap()))
    function createFloorRequestMap (): IFloorRequestMap {
      return immutable.Map(floor$.value.map((floor) =>
        [floor, new BehaviorSubject(false)] as [IFloorRecord, IFloorRequest$]
      ))
    }
  }
}

export const useFloorRequest$ = (): FloorRequest$ => container.resolve(FloorRequest$)
