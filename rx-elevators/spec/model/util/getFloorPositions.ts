import { ElevatorPosition } from '/src/elevator/position'
import { floorHeight } from '/src/floor/height'
import { FloorNumber } from '/src/floor/number'
import { FnCtor } from '/src/function/container'
import { useRamdaMemoizeWith } from '/src/pkg/ramda/memoizeWith'

type GetFloorPositions = (floors: FloorNumber[]) => ElevatorPosition[]

export const useGetFloorPositions: FnCtor<GetFloorPositions> = (container) => {
  const memoizeWith = container.resolve(useRamdaMemoizeWith)

  const getFloorPositions: GetFloorPositions = (floors) =>
    floors.map(floor => floor * floorHeight)

  return memoizeWith(String, getFloorPositions)
}
