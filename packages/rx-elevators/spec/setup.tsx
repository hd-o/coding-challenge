/**
 * @jest-environment jsdom
 */
import { App } from '/src/app'
import { useElevatorCount$ } from '/src/elevator/count/stream'
import { useFloorCount$ } from '/src/floor/count'
import { FnContainerCtx } from '/src/function/container'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { useRxAnimationFrames } from '/src/pkg/rxjs/animationFrames'
import { useRxOf } from '/src/pkg/rxjs/of'
import { Settings, SettingsModel, useSettings$ } from '/src/settings/stream'
import { useStartup } from '/src/startup'
import { FC, useEffect, useState } from 'react'
import { Subscription } from 'rxjs'
import { render } from '@testing-library/react'
import { useElevatorDoorPair$ } from './model/util/elevatorDoorPair$'
import { useMockInterval$ } from './model/util/interval$'
import { container, elevatorCount, floorCount, resolve } from './shared'

let mockInterval$: ReturnType<typeof useMockInterval$>
let startupSubscription: Subscription

const of = container.resolve(useRxOf)
const Record = container.resolve(useImmutableRecord)
const settings: Settings = Record<SettingsModel>({
  // Increase movement speed to prevent timeouts
  elevatorDoorMovementStep: 1,
  elevatorMovementStep: 10,
})()

beforeEach(async () => {
  container.reset()

  container.register(useSettings$, () => of(settings))
  container.register(useRxAnimationFrames, () => () => mockInterval$)
  mockInterval$ = resolve(useMockInterval$)

  startupSubscription = resolve(useStartup)()
  // Start door pair stream for elevator movement tests
  startupSubscription.add(resolve(useElevatorDoorPair$).subscribe(() => {}))

  resolve(useElevatorCount$).next(elevatorCount)
  resolve(useFloorCount$).next(floorCount)

  // Elements required by elevator spec tests
  const TestCtrl: FC = () => {
    const [intervalId, setIntervalId] = useState(-1)

    // Clear interval timeout on unmount
    useEffect(() => () => clearInterval(intervalId))

    // Start interval timeout
    const handleTestIntervalStart = (): void => {
      if (intervalId !== -1) return
      setIntervalId(window.setInterval(() => mockInterval$.next({}), 0))
    }

    // Render elements for spec test to click on
    return <>
      <div
        data-testid='test-interval-start'
        onClick={handleTestIntervalStart}
      />
    </>
  }

  // Render App for UI snapshots, and elevator tests
  render(
    <FnContainerCtx.Provider value={container}>
      <App
        TestCtrl={TestCtrl}
        subscription={startupSubscription}
      />
    </FnContainerCtx.Provider>
  )
})

afterEach(async () => {
  startupSubscription.unsubscribe()
})
