import { singleton } from 'tsyringe'

@singleton()
export class TimerFactory {
  create (msDuration: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, msDuration))
  }
}
