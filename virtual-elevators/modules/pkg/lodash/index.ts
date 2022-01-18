import { memoize, range, uniqueId } from 'lodash'
import { singleton } from 'tsyringe'

@singleton()
export class Lodash {
  memoize = memoize
  range = range
  uniqueId = uniqueId

  rangeMap <M extends () => any> (end: number, mapper: M): Array<ReturnType<M>> {
    return this.range(end).map(mapper)
  }
}
