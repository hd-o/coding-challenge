import { singleton } from 'tsyringe'
import { Process } from '../loop'

@singleton()
export class ProcessUtils {
  createWaitProcess (waitMs: number): Process {
    let startTime: number
    let process: Process = () => {
      startTime = Date.now()
      process = () => (Date.now() - startTime) > waitMs
    }
    return () => process()
  }
}
