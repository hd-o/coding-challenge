import { useImmutableMap } from '/src/pkg/immutable/Map'
import { Use } from '/src/util/resolve'
import { Map } from 'immutable'

type NewMapFromTuple =
  <Key extends string, Value extends any, KVTuple extends ([Key, Value] | readonly [Key, Value])>
  (tuple: KVTuple[]) => Map<typeof tuple[0][0], typeof tuple[0][1]>

export const useNewMapFromTuple: Use<NewMapFromTuple> = (resolve) => {
  const Map = resolve(useImmutableMap)

  const newMapFromTuple: NewMapFromTuple = (tuple) =>
    Map(tuple as Array<[typeof tuple[0][0], typeof tuple[0][1]]>)

  return newMapFromTuple
}
