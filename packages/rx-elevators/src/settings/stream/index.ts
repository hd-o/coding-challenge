import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { useRxOf } from '/src/pkg/rxjs/of'
import { resolve, Use } from '/src/util/resolve'
import { RecordOf } from 'immutable'
import { Observable } from 'rxjs'

export interface SettingsModel {
  elevatorDoorMovementStep: number
  elevatorMovementStep: number
}

export type Settings = RecordOf<SettingsModel>

type Settings$ = Observable<Settings>

export const useSettings$: Use<Settings$> = (container) => {
  const of = resolve(container)(useRxOf)
  const Record = resolve(container)(useImmutableRecord)

  return of<Settings>(Record({
    elevatorDoorMovementStep: 0.1,
    elevatorMovementStep: 1,
  })())
}
