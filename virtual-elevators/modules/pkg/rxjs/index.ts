import {
  animationFrameScheduler, BehaviorSubject, iif, interval, of, share, Subject, switchMap, tap
} from 'rxjs'
import { singleton } from 'tsyringe'

@singleton()
export class Rx {
  BehaviorSubject = BehaviorSubject
  Subject = Subject

  animationFrameScheduler = animationFrameScheduler
  iif = iif
  interval = interval
  of = of
  share = share
  switchMap = switchMap
  tap = tap
}
