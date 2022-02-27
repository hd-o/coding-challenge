/**
 * @jest-environment jsdom
 */
import './elevator/util/matchMediaMock'
import { App } from '/src/app'
import { Lodash } from '/src/pkg/lodash'
import { Rx } from '/src/pkg/rxjs'
import { ProcessUtils } from '/src/process/utils'
import { Settings$ } from '/src/settings/stream'
import { FC, useEffect, useState } from 'react'
import { container } from 'tsyringe'
import { render } from '@testing-library/react'

const lodash = container.resolve(Lodash)
const rangeMap = lodash.rangeMap
const processUtils = container.resolve(ProcessUtils)
const rx = container.resolve(Rx)

// Remove throttle wait time
const _throttle = (fn: CallableFunction) => (...args: any[]) => fn(...args)
const throttle = _throttle as typeof lodash.throttle

// Remove process wait time
const _createWaitProcess = () => () => true
const createWaitProcess = _createWaitProcess as typeof processUtils.createWaitProcess

// Manually control intervals
const interval$ = new rx.Subject<void>()
const animationFrames: typeof rx.animationFrames = () =>
  interval$.pipe(rx.map(() => ({ timestamp: 0, elapsed: 0 })))

// Elements required by elevator spec tests
const TestCtrl: FC = () => {
  const [intervalId, setIntervalId] = useState(-1)

  // Clear interval timeout on unmount
  useEffect(() => () => clearInterval(intervalId))

  // Start interval timeout
  const handleTestIntervalStart = (): void => {
    if (intervalId !== -1) return
    setIntervalId(window.setInterval(() => interval$.next(), 0))
  }

  // Render elements for spec test to click on
  return <>
    <div
      data-testid='test-interval-start'
      onClick={handleTestIntervalStart}
    />
  </>
}

beforeEach(() => {
  container.clearInstances()
  // Faster movement to prevent timeouts
  const settings$ = container.resolve(Settings$)
  settings$.next(settings$.value
    .set('elevatorMovementStep', 10)
    .set('elevatorDoorMovementStep', 2))
  container.registerInstance(Lodash, { ...lodash, rangeMap, throttle })
  container.registerInstance(ProcessUtils, { ...processUtils, createWaitProcess })
  container.registerInstance(Rx, { ...rx, animationFrames })
  render(<App TestCtrl={TestCtrl} />)
})
