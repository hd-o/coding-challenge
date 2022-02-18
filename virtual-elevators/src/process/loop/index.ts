import { animationFrameScheduler, BehaviorSubject, Observable } from 'rxjs'
import { inject, singleton } from 'tsyringe'
import { Rx } from '/src/pkg/rxjs'
import { runningInServer } from '/src/util/runningInServer'

export type IProcessId = string | {}

export type IProcess = (() => void) | (() => true)

type ProcessMap = Map<IProcessId, IProcess[]>

@singleton()
export class ProcessLoop {
  private _interval$: Observable<any>

  private readonly _processMap: ProcessMap = new Map()

  private readonly _processMap$: BehaviorSubject<ProcessMap>

  private _add (id: IProcessId, processes: IProcess[]): void {
    const _callbacks = this._processMap.get(id) ?? []
    this._processMap.set(id, _callbacks.concat(processes))
  }

  private _clear (id: IProcessId): void {
    this._processMap.delete(id)
  }

  private _next (processMap = this._processMap): void {
    this._processMap$.next(processMap)
  }

  private _runProcessMap (processMap: ProcessMap): void {
    let modified = false
    for (const [id, processArray] of processMap.entries()) {
      const nextProcess = processArray[0]
      if (nextProcess() === true) {
        processArray.shift()
        processMap.set(id, processArray)
        modified = true
      }
      if (processArray.length === 0) {
        processMap.delete(id)
        modified = true
      }
    }
    if (modified) this._processMap$.next(processMap)
  }

  constructor (
    @inject(Rx) readonly rx: Rx
  ) {
    this._interval$ = rx.interval(0, animationFrameScheduler)
    this._processMap$ = new rx.BehaviorSubject<ProcessMap>(this._processMap)
    if (!runningInServer) {
      this._processMap$
        .pipe(
          rx.switchMap((processMap) =>
            rx.iif(() => processMap.size === 0,
              rx.of(),
              this._interval$.pipe(
                rx.share(),
                rx.tap(() => this._runProcessMap(processMap)))
            )))
        .subscribe()
    }
  }

  add (id: IProcessId, processes: IProcess[]): void {
    this._add(id, processes)
    this._next()
  }

  clear (id: IProcessId): void {
    this._clear(id)
    this._next()
  }

  reset (id: IProcessId, processes: IProcess[]): void {
    this._clear(id)
    this._add(id, processes)
    this._next()
  }

  resetAll (): void {
    this._next(new Map())
  }

  setInterval$ ($: Observable<any>): void {
    this._interval$ = $
  }
}
