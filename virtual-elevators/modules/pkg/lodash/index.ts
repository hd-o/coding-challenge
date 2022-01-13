import { memoize, range, uniqueId } from 'lodash'
import { singleton } from 'tsyringe'

@singleton()
export class Lodash {
  memoize = memoize
  range = range
  uniqueId = uniqueId
}
