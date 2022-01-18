import { List, Map, OrderedSet, Record } from 'immutable'
import { singleton } from 'tsyringe'
import { SortedSet } from './SortedSet'

@singleton()
export class Immutable {
  List = List
  Map = Map
  OrderedSet = OrderedSet
  Record = Record
  SortedSet = SortedSet
}
