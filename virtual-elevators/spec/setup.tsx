/**
 * @jest-environment jsdom
 */
import './util/matchMediaMock'
import { App } from '/src/app'
import { Lodash } from '/src/pkg/lodash'
import { Rx } from '/src/pkg/rxjs'
import { ProcessUtils } from '/src/process/utils'
import { FC, useEffect, useState } from 'react'
import { container } from 'tsyringe'
import { render } from '@testing-library/react'

beforeEach(async () => {
  container.clearInstances()

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

  container.registerInstance(Lodash, { ...lodash, rangeMap, throttle })
  container.registerInstance(ProcessUtils, { ...processUtils, createWaitProcess })
  container.registerInstance(Rx, { ...rx, animationFrames })

  // Render elements required by elevator spec tests
  const TestCtrl: FC = () => {
    const [intervalId, setIntervalId] = useState(-1)

    useEffect(() => () => clearInterval(intervalId))

    const handleTestIntervalStart = (): void => {
      if (intervalId !== -1) return
      setIntervalId(window.setInterval(() => interval$.next(), 0))
    }

    return <>
      <div
        data-testid='test-interval-start'
        onClick={handleTestIntervalStart}
      />
    </>
  }

  render(<App TestCtrl={TestCtrl} />)
})
