import { BehaviorSubject } from 'rxjs'
import { ElevatorRecord } from '../model'

export type ElevatorUnit$ = BehaviorSubject<ElevatorRecord>
