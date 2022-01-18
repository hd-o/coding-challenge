import { RecordOf } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { IElevator } from '../model'

export type ElevatorUnit$ = BehaviorSubject<RecordOf<IElevator>>
