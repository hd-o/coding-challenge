import { Map as iMap, Record as iRecord } from 'immutable'
import { forEach, get } from 'lodash'
import { useObservableEagerState } from 'observable-hooks'
import { Observable, ObservedValueOf } from 'rxjs'

// --------------------------------------------------------------------------------
// #region Types

export type RecordType<R extends iRecord<any>> = ReturnType<R['toObject']>

// #endregion
// --------------------------------------------------------------------------------
// #region Hooks

export const useStream =
  <O extends Observable<any>>
  ($: O): ObservedValueOf<typeof $> => useObservableEagerState($)

// #endregion
// --------------------------------------------------------------------------------
// #region Constructors

export const newImmutableMap =
  <Key extends string, Value extends any, KVPair extends [Key, Value]>
  (kvp: KVPair[]): iMap<typeof kvp[0][0], typeof kvp[0][1]> => iMap(kvp)

// #endregion
// --------------------------------------------------------------------------------
// #region Loggers

interface $Object {
  [k: string]: Observable<any>
}

export const log = console.log.bind(console)

export const log$ =
  (obj: $Object, logFn = log): $Object =>
    forEach(obj, ($, k) => $.subscribe(v => [logFn(k), logFn(v)]))

export const log$json =
  (obj: $Object): $Object =>
    log$(obj, v => log(JSON.stringify(v, null, 2)))

export const logjson =
  (v: any): void =>
    log(JSON.parse(JSON.stringify(v, null, 2)))

export const tapLog =
  (label: string, logFn = logjson) => <V> (v: V): void => {
    if (get(globalThis, 'ev.tapLogOn') !== true) return
    log(label)
    logFn(v)
  }

// #endregion
// --------------------------------------------------------------------------------
