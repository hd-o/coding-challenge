import { singleton } from 'tsyringe'

@singleton()
export class Settings {
  readonly elevatorCount = 3
  readonly floorHeight = 100
  readonly floorCount = 6
}
