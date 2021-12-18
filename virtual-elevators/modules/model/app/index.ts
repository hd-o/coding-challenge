import { ElevatorHub } from '~/model/elevator/hub'
import { Floor } from '../floor'
import { Settings } from '../settings'

export class App {
  constructor (
    public readonly elevatorHub: ElevatorHub,
    public readonly floors: Floor[],
    public readonly settings: Settings
  ) {}
}
