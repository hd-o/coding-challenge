/**
 * @file Tip: Start at {@link Processor}
 */
import { boundMethod } from 'autobind-decorator'
import { cloneDeep } from 'lodash'
import { PromiseFactory } from '../pkg/native/promise'
import { Resolvable } from '../resolvable'
import { ResolvableFactory } from '../resolvable/factory'

 /**
  * @see {@link LifecycleHooks}
  */
 type HookFunction<State> = (s: State) => HookFunctionReturn

 /**
  * @see {@link HookFunction}
  */
 type HookFunctionReturn = Promise<unknown> | unknown

/**
  * Functions running during process execution.
  * @see {@link Processor.runLifecycleHooks}
  */
interface LifecycleHooks<State> {
  /**
    * After process hook run.
    * Runs once, and not on pause
    */
  after?: HookFunction<State>
  /**
    * Runs before onPause, and before `after`
    */
  always?: HookFunction<State>
  /**
    * Before process hook run.
    * Runs once, and not on pause resume
    */
  before?: HookFunction<State>
  /**
    * Pause process, and maintain state
    */
  onPause?: HookFunction<State>
  /**
    * Main process hook
    */
  process: HookFunction<State>
}

 /**
  * Helper type for individual hook keys/names
  */
 type Hook<State> = keyof LifecycleHooks<State>

/**
  * @see Processor.constructor
  */
export interface Config<State> extends LifecycleHooks<State> {
  /** Initial state value for new process runs */
  initialState?: State
}

/**
  * Process execution states
  * TODO: Research using bluebird for internals
  */
enum ProcessState {
  /**
    * Process has ended, or not started
    */
  Idle,
  /**
    * State is saved for resume. When paused, on
    * process hook end, the after hook does not run,
    * but waits for resume by calling processor.run().
    * On resume, the process hook will run again,
    * receiving the previously saved state
    */
  Paused,
  /**
    * Process started, and not paused or ended
    */
  Running,
}

/**
  * Pausable process manager
  * TODO: Replace examples with unit tests
  * @example
  * const moveProcess = new Processor<{ timer: -1 }>({
  *   before: () => this.text = 'Train is leaving',
  *   process: async (state) => this._promiseFactory.create(resolve => {
  *     this.text = 'Train is moving'
  *     state.timer = setInterval(this.move(resolve), 1)
  *   }),
  *   always: (state) => clearInterval(state.timer),
  *   onPause: () => this.text = 'Train has paused',
  *   after: () => this.text = 'Train has arrived'
  * })
  * moveProcess.run()
  * setTimeout(() => moveProcess.pause())
  */
export class Processor<LifecycleState> {
  /**
    * Tracks current process execution
    */
  private _promise?: Resolvable
  /**
    * Passed to lifecycle hooks
    */
  private _lifecycleState?: LifecycleState
  /**
    * Current process lifecycle hook
    */
  private _currentHook: Hook<LifecycleState> = 'before'
  /**
    * Current process execution state
    */
  private _state = ProcessState.Idle
  /**
    * Reset internal state, prepare for run
    */
  private _clear (): void {
    this._promise = undefined
    this._lifecycleState = cloneDeep(this._config.initialState)
  }

  /**
    * Run if given hook was set in this.config,
    * otherwise return a resolved promised
    */
  private async _runHook (hook: keyof LifecycleHooks<LifecycleState>): Promise<unknown> {
    switch (hook) {
      case 'onPause':
      case 'after':
        await this._runHook('always')
    }
    const fn = this._config[hook]
    // this.clear sets this.lifecycleState
    const lifecycleState = this._lifecycleState as LifecycleState
    const result = (fn != null) ? fn(lifecycleState) : undefined
    // Always return a promise so caller can await
    return result instanceof this._promiseFactory.type
      ? await result
      : await this._promiseFactory.resolve(result)
  }

  /**
    * Run, or resume, lifecycle hooks
    */
  private async _runLifecycleHooks (): Promise<void> {
    // Clear internals before new run
    if (this._state === ProcessState.Idle) this._clear()
    // Otherwise, resume process if paused
    if (this.isPaused) this._state = ProcessState.Running
    // Process can be paused, so check state on loop
    while (this._state === ProcessState.Running) {
      switch (this._currentHook) {
        case 'before':
          await this._runHook('before')
          this._currentHook = 'process'
          continue
        case 'process':
          await this._runHook('process')
          this._state = ProcessState.Idle
          await this._runHook('after')
      }
    }
  }

  /**
    * @param _config State, and lifecycle hook configuration
    */
  constructor (
    private readonly _config: Config<LifecycleState>,
    private readonly _promiseFactory: PromiseFactory,
    private readonly _resolvableFactory: ResolvableFactory
  ) {}

  /**
    * Await process end
    */
  get end (): Promise<void> {
    return this._promise ?? Promise.resolve()
  }

  /**
    * Process is processing, or paused
    */
  get isRunning (): boolean {
    return this._state !== ProcessState.Idle
  }

  /**
    * Process has started, but is not processing
    */
  get isPaused (): boolean {
    return this._state === ProcessState.Paused
  }

  /**
    * Pause a process, but maintain its state.
    * If set, return onPause hook promise
    */
  @boundMethod
  async pause (): Promise<unknown> {
    if (this._state !== ProcessState.Paused) {
      this._state = ProcessState.Paused
    }
    return await this._runHook('onPause')
  }

  /**
    * Run, or resume process
    */
  @boundMethod
  run (): Resolvable {
    const promise = this._promise ?? (this._promise = this._resolvableFactory.create())
    if (this.isRunning) return promise
    void (this._runLifecycleHooks())
    return promise
  }

  /**
    * Clear state, and restart process
    */
  @boundMethod
  reset (): Resolvable {
    this._clear()
    return this.run()
  }
}
