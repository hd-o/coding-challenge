import { RecordOf } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { IElevatorQueue } from '../model'

export type IElevatorQueueUnitRecord = RecordOf<IElevatorQueue>

export type IElevatorQueueUnit$ = BehaviorSubject<IElevatorQueueUnitRecord>
