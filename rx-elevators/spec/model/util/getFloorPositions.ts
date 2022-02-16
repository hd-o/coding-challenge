import { ElevatorPosition } from '../../../modules/elevator/position'
import { floorHeight } from '../../../modules/floor/height'
import { FloorNumber } from '../../../modules/floor/number'
import { FnCtor } from '../../../modules/function/container'
import { useRamdaMemoizeWith } from '../../../modules/pkg/ramda/memoizeWith'

type GetFloorPositions = (floors: FloorNumber[]) => ElevatorPosition[]

export const useGetFloorPositions: FnCtor<GetFloorPositions> = (container) => {
  const memoizeWith = container.resolve(useRamdaMemoizeWith)

  const getFloorPositions: GetFloorPositions = (floors) =>
    floors.map(floor => floor * floorHeight)

  return memoizeWith(String, getFloorPositions)
}
