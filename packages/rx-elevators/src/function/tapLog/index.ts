import { useDebugState } from '/src/debug/state'
import { Use } from '/src/util/resolve'
import { useLog } from '../log'
import { ToParsedJson, useToParsedJson } from '../toParsedJson'

type TapLog = (label: string, serialize?: ToParsedJson) => <V> (v: V) => void

export const useFunctionTapLog: Use<TapLog> = (resolve) => {
  const debugState = resolve(useDebugState)
  const log = resolve(useLog)
  const toParsedJson = resolve(useToParsedJson)

  const tapLog: TapLog = (label, serialize = toParsedJson) => (v) => {
    if (debugState.toggles.tapLog) log(label, serialize(v))
  }

  return tapLog
}
