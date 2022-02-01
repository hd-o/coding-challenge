import { singleton } from 'tsyringe'
import { IProcess } from '../loop'

@singleton()
export class ProcessUtils {
  createWaitProcess (waitMs: number): IProcess {
    let startTime: number
    let process: IProcess = () => {
      startTime = Date.now()
      process = () => (Date.now() - startTime) > waitMs
    }
    return () => process()
  }
}
