import { inject, singleton } from 'tsyringe'
import { NoElevatorServicesFloor } from './NoElevatorServicesFloor'

@singleton()
export class Message {
  constructor (
    @inject(NoElevatorServicesFloor)
    public readonly noElevatorServicesFloor: NoElevatorServicesFloor
  ) {}
}
