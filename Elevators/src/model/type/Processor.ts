/**
 * @file Tip: Start at {@link Processor}
 */
import { boundMethod } from 'autobind-decorator'
import { cloneDeep } from 'lodash'
import { Resolvable } from './Resolvable'

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
interface Config<State> extends LifecycleHooks<State> {
  /** Initial state value for new process runs */
  initialState?: State
}

/**
 * Process execution states
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
 * @example
 * const moveProcess = new Processor<{ timer: -1 }>({
 *   before: () => this.text = 'Train is leaving',
 *   process: async (state) => new Promise(resolve => {
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
  private promise?: Resolvable
  /**
   * Passed to lifecycle hooks
   */
  private lifecycleState?: LifecycleState
  /**
   * Current process lifecycle hook
   */
  private currentHook: Hook<LifecycleState> = 'before'
  /**
   * Current process execution state
   */
  private state = ProcessState.Idle
  /**
   * Reset internal state, prepare for run
   */
  private clear() {
    this.promise = undefined
    this.lifecycleState = cloneDeep(this.config.initialState)
  }
  /**
   * Run if given hook was set in this.config,
   * otherwise return a resolved promised
   */
  private async runHook(hook: keyof LifecycleHooks<LifecycleState>) {
    switch (hook) {
      case 'onPause':
      case 'after':
        await this.runHook('always')
    }
    const fn = this.config[hook]
    // this.clear sets this.lifecycleState
    const lifecycleState = this.lifecycleState as LifecycleState
    const result = fn ? fn(lifecycleState) : undefined
    // Always return a promise so caller can await
    return result instanceof Promise
      ? result
      : Promise.resolve(result)
  }
  /** 
   * Run, or resume, lifecycle hooks
   */
  private async runLifecycleHooks() {
    // Clear internals before new run
    if (this.state === ProcessState.Idle) this.clear()
    // Otherwise, resume process if paused
    if (this.isPaused) this.state = ProcessState.Running
    // Process can be paused, so check state on loop
    while (this.state === ProcessState.Running) {
      switch (this.currentHook) {
        case 'before':
          await this.runHook('before')
          this.currentHook = 'process'
          continue
        case 'process':
          await this.runHook('process')
          this.state = ProcessState.Idle
          await this.runHook('after')
      }
    }
  }
  /**
   * @param config State, and lifecycle hook configuration
   */
  constructor(private config: Config<LifecycleState>) {}
  /**
   * Await process end
   */
  public get end(): Promise<void> {
    return this.promise ?? Promise.resolve()
  }
  /**
   * Process is processing, or paused
   */
  public get isRunning() {
    return this.state !== ProcessState.Idle
  }
  /**
   * Process has started, but is not processing
   */
  public get isPaused() {
    return this.state === ProcessState.Paused
  }
  /**
   * Pause a process, but maintain its state.
   * If set, return onPause hook promise
   */
  @boundMethod
  public pause() {
    if (this.state !== ProcessState.Paused) {
      this.state = ProcessState.Paused
    }
    return this.runHook('onPause')
  }
  /**
   * Run, or resume process
   */
  @boundMethod
  public run() {
    if (this.isRunning) return this.promise
    this.runLifecycleHooks()
    return this.promise || (this.promise = new Resolvable())
  }
  /**
   * Clear state, and restart process
   */
  @boundMethod
  public reset() {
    this.clear()
    return this.run()
  }
}
