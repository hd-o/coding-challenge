import { BehaviorSubject } from 'rxjs'
import { IElevatorRecord } from '../model'

export type IElevatorUnit$ = BehaviorSubject<IElevatorRecord>
