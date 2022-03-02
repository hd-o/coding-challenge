/**
 * @jest-environment jsdom
 */
import { App } from '/src/app'
import { useElevatorCount$ } from '/src/elevator/count/stream'
import { useFloorCount$ } from '/src/floor/count'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { useRxAnimationFrames } from '/src/pkg/rxjs/animationFrames'
import { useRxOf } from '/src/pkg/rxjs/of'
import { Settings, SettingsModel, useSettings$ } from '/src/settings/stream'
import { useStartup } from '/src/startup'
import { FC, useEffect, useState } from 'react'
import { Subscription } from 'rxjs'
import { render } from '@testing-library/react'
import { ContainerCtx } from '../src/container'
import { useElevatorDoorPair$ } from './model/util/elevatorDoorPair$'
import { useMockInterval$ } from './model/util/interval$'
import { elevatorCount, floorCount, specContainer, specResolve } from './shared'

let mockInterval$: ReturnType<typeof useMockInterval$>
let startupSubscription: Subscription

const of = specResolve(useRxOf)
const Record = specResolve(useImmutableRecord)
const settings: Settings = Record<SettingsModel>({
  // Increase movement speed to prevent timeouts
  elevatorDoorMovementStep: 1,
  elevatorMovementStep: 10,
})()

beforeEach(async () => {
  specContainer.unload()

  specContainer.bind(useSettings$).toConstantValue(of(settings))
  specContainer.bind(useRxAnimationFrames).toConstantValue(() => mockInterval$)
  mockInterval$ = specResolve(useMockInterval$)

  startupSubscription = specResolve(useStartup)()
  // Start door pair stream for elevator movement tests
  startupSubscription.add(specResolve(useElevatorDoorPair$).subscribe(() => {}))

  specResolve(useElevatorCount$).next(elevatorCount)
  specResolve(useFloorCount$).next(floorCount)

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
    <ContainerCtx.Provider value={specContainer}>
      <App
        TestCtrl={TestCtrl}
        subscription={startupSubscription}
      />
    </ContainerCtx.Provider>
  )
})

afterEach(async () => {
  startupSubscription.unsubscribe()
})
