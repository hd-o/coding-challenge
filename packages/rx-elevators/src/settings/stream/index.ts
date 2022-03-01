import { FnCtor } from '/src/function/container'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { useRxOf } from '/src/pkg/rxjs/of'
import { RecordOf } from 'immutable'
import { Observable } from 'rxjs'

export interface SettingsModel {
  elevatorDoorMovementStep: number
  elevatorMovementStep: number
}

export type Settings = RecordOf<SettingsModel>

type Settings$ = Observable<Settings>

export const useSettings$: FnCtor<Settings$> = (container) => {
  const of = container.resolve(useRxOf)
  const Record = container.resolve(useImmutableRecord)

  return of<Settings>(Record({
    elevatorDoorMovementStep: 0.1,
    elevatorMovementStep: 1,
  })())
}
