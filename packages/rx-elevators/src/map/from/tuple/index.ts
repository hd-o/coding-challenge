import { FnCtor } from '/src/function/container'
import { useImmutableMap } from '/src/pkg/immutable/Map'
import { Map } from 'immutable'

type NewMapFromTuple =
  <Key extends string, Value extends any, KVTuple extends ([Key, Value] | readonly [Key, Value])>
  (tuple: KVTuple[]) => Map<typeof tuple[0][0], typeof tuple[0][1]>

export const useNewMapFromTuple: FnCtor<NewMapFromTuple> = (container) => {
  const Map = container.resolve(useImmutableMap)

  const newMapFromTuple: NewMapFromTuple = (tuple) =>
    Map(tuple as Array<[typeof tuple[0][0], typeof tuple[0][1]]>)

  return newMapFromTuple
}
