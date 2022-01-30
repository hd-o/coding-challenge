import { singleton } from 'tsyringe'

type Key = any
export type Process = (() => void) | (() => true)

@singleton()
export class ProcessLoop {
  private readonly _processMap = new Map<Key, Process[]>()

  private _loopIsRunning = false

  private _cancelLoop (): void {
    this._loopIsRunning = false
  }

  private _runLoop (): void {
    if (this._loopIsRunning) return
    const runLoop = (): void => {
      const entries = [...this._processMap.entries()]
      if (entries.length === 0) return this._cancelLoop()
      this._runProcesses(entries)
      requestAnimationFrame(runLoop)
    }
    if (typeof requestAnimationFrame === 'undefined') {
      return console.warn('undefined requestAnimationFrame')
    }
    requestAnimationFrame(runLoop)
    this._loopIsRunning = true
  }

  private _runProcesses (entries: Array<[Key, Process[]]>): void {
    for (const [key, processes] of entries) {
      const nextProcess = processes[0]
      if (processes.length === 0) this._processMap.delete(key)
      else if (nextProcess() === true) processes.shift()
    }
  }

  add (key: Key, processes: Process[]): void {
    const _callbacks = this._processMap.get(key) ?? []
    this._processMap.set(key, _callbacks.concat(processes))
    this._runLoop()
  }

  clear (key: Key): void {
    this._processMap.delete(key)
  }

  reset (key: Key, processes: Process[]): void {
    this.clear(key)
    this.add(key, processes)
  }
}
