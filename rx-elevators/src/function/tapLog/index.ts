import { useDebugState } from '/src/debug/state'
import { FnCtor } from '../container'
import { useLog } from '../log'
import { ToParsedJson, useToParsedJson } from '../toParsedJson'

type TapLog = (label: string, serialize?: ToParsedJson) => <V> (v: V) => void

export const useFunctionTapLog: FnCtor<TapLog> = (container) => {
  const debugState = container.resolve(useDebugState)
  const log = container.resolve(useLog)
  const toParsedJson = container.resolve(useToParsedJson)

  const tapLog: TapLog = (label, serialize = toParsedJson) => (v) => {
    if (debugState.toggles.tapLog) log(label, serialize(v))
  }

  return tapLog
}
