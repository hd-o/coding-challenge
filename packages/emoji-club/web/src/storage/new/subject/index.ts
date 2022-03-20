import { Use } from '/src/util/function-context/context'
import { BehaviorSubject } from 'rxjs'
import { useStorage } from '../..'
import { useRxBehaviorSubject } from '../../../pkg/rxjs/BehaviorSubject'
import { useRxTap } from '../../../pkg/rxjs/tap'

type StorageSubject<V extends string> = BehaviorSubject<V>

type IsValidValue<V> = (v: any) => v is V

/**
 * @param key
 * Key to be used for `storage.get`, and `storage.set`
 * @param isValidValue
 * Validates `storage.get(key)` before it is used to initialize the returned
 * BehaviorSubject, otherwise, if it returns false, `defaultValue` is used
 * @param defaultValue
 * Value used to initialize returned BehaviorSubject,
 * if `isValidValue(storage.get(key))` returns false
 *
*/
type NewStorageSubject = <V extends string>
  (key: string, isValidValue: IsValidValue<V>, defaultValue: V) => StorageSubject<V>

export const useNewStorageSubject: Use<NewStorageSubject> = (resolve) => {
  const BehaviorSubject = resolve(useRxBehaviorSubject)
  const storage = resolve(useStorage)
  const tap = resolve(useRxTap)

  const newStorageSubject: NewStorageSubject = (key, isValidValue, defaultValue) => {
    type Value = typeof defaultValue
    const storedThemeType = storage.get(key)
    const value = isValidValue(storedThemeType) ? storedThemeType : defaultValue
    const tapToStorage = tap(storage.set(key))
    const subject = new BehaviorSubject<Value>(value).pipe(tapToStorage)
    // `tap` does not modify piped `BehaviorSubject`
    return subject as BehaviorSubject<Value>
  }

  return newStorageSubject
}
