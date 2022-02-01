import { inject, singleton } from 'tsyringe'
import { NoElevatorServicesFloor } from './NoElevatorServicesFloor'

@singleton()
export class Symbol {
  constructor (
    @inject(NoElevatorServicesFloor)
    public readonly noElevatorServicesFloor: NoElevatorServicesFloor
  ) {}
}
