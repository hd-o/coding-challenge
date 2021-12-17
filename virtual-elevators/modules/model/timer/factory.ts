import { injectable } from 'inversify'

@injectable()
export class TimerFactory {
  create (msDuration: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, msDuration))
  }
}
