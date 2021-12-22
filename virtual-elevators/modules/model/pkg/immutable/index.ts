import { List, Map } from 'immutable'
import { singleton } from 'tsyringe'

@singleton()
export class Immutable {
  Map = Map
  List = List
}
