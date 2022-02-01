import { BehaviorSubject } from 'rxjs'
import { singleton } from 'tsyringe'

@singleton()
export class Rxjs {
  BehaviorSubject = BehaviorSubject
}
