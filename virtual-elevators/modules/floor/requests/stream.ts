import { Map } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IFloor } from '../model'

type HasFloorRequested = boolean
type FloorRequests = Map<IFloor['number'], HasFloorRequested>

@singleton()
export class FloorRequests$ extends BehaviorSubject<FloorRequests> {
  constructor (
    @inject(Immutable) readonly immutable: Immutable
  ) {
    super(immutable.Map())
  }

  hasRequest (number: IFloor['number']): boolean {
    return this.value.get(number) === true
  }
}
