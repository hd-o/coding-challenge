import { range } from 'lodash'
import { singleton } from 'tsyringe'

@singleton()
export class Lodash {
  range = range
}
