import { ElevatorPosition } from '../../../elevator/position'
import { floorHeight } from '../../../floor/height'
import { FloorNumber } from '../../../floor/number'
import { FnCtor } from '../../../function/container'
import { useRamdaMemoizeWith } from '../../../pkg/ramda/memoizeWith'

type GetFloorPositions = (floors: FloorNumber[]) => ElevatorPosition[]

export const useGetFloorPositions: FnCtor<GetFloorPositions> = (container) => {
  const memoizeWith = container.resolve(useRamdaMemoizeWith)

  const getFloorPositions: GetFloorPositions = (floors) =>
    floors.map(floor => floor * floorHeight)

  return memoizeWith(String, getFloorPositions)
}
