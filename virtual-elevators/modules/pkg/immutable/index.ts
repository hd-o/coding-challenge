import { List, Map, Record } from 'immutable'
import { singleton } from 'tsyringe'

@singleton()
export class Immutable {
  List = List
  Map = Map
  Record = Record
}
