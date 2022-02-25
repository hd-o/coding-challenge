import {
  animationFrames, BehaviorSubject, iif, map, of, share, Subject, switchMap, tap
} from 'rxjs'
import { singleton } from 'tsyringe'

@singleton()
export class Rx {
  BehaviorSubject = BehaviorSubject
  Subject = Subject
  animationFrames = animationFrames
  iif = iif
  map = map
  of = of
  share = share
  switchMap = switchMap
  tap = tap
}
