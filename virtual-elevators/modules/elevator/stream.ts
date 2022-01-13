import { RecordOf } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { IElevator } from './model'

export type Elevator$ = BehaviorSubject<RecordOf<IElevator>>
