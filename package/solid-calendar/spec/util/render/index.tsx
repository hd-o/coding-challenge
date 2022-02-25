import { AppProvidersCtx } from '/src/app/providers'
import intl from '/src/lang/en.json'
import { NativeDateCtx } from '/src/pkg/native/date'
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
    <NativeDateCtx.Provider value={CustomDate as DateConstructor}>
      <AppProvidersCtx.Consumer>
        {AppProviders => (
          <AppProviders intl={intl}>
            <Component />
          </AppProviders>
        )}
      </AppProvidersCtx.Consumer>
    </NativeDateCtx.Provider>
  )
}

export type Rendered = ReturnType<typeof render>
