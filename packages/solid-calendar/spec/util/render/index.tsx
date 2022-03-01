import { useWeatherServer } from '/spec/mocks/api/weather'
import { AppProvidersCtx } from '/src/app/providers'
import intl from '/src/lang/en.json'
import { NativeDateCtx } from '/src/pkg/native/date'
import { FetchJSONCtx } from '/src/util/fetchJSON'
import { FC } from 'react'
import { render as testRender } from '@testing-library/react'

// Freeze time for snapshots
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class CustomDate {
  constructor (...args: Parameters<typeof Date>) {
    const date = new Date(...args)
    date.setHours(1)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
  }
}

export function render (Component: FC): ReturnType<typeof testRender> {
  return testRender(
    <FetchJSONCtx.Provider value={useWeatherServer}>
      <NativeDateCtx.Provider value={CustomDate as DateConstructor}>
        <AppProvidersCtx.Consumer>
          {AppProviders => (
            <AppProviders intl={intl}>
              <Component />
            </AppProviders>
          )}
        </AppProvidersCtx.Consumer>
      </NativeDateCtx.Provider>
    </FetchJSONCtx.Provider>
  )
}

export type Rendered = ReturnType<typeof render>
