import { useDebugState } from '/src/debug/state'
import { resolve, Use } from '/src/util/resolve'
import { useLog } from '../log'
import { ToParsedJson, useToParsedJson } from '../toParsedJson'

type TapLog = (label: string, serialize?: ToParsedJson) => <V> (v: V) => void

export const useFunctionTapLog: Use<TapLog> = (container) => {
  const debugState = resolve(container)(useDebugState)
  const log = resolve(container)(useLog)
  const toParsedJson = resolve(container)(useToParsedJson)

  const tapLog: TapLog = (label, serialize = toParsedJson) => (v) => {
    if (debugState.toggles.tapLog) log(label, serialize(v))
  }

  return tapLog
}
