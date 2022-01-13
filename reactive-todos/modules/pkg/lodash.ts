import uniqueId from 'lodash/uniqueId'
import { singleton } from 'tsyringe'

@singleton()
export class Lodash {
  uniqueId = uniqueId
}
