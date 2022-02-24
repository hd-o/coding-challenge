import { ElevatorId } from '/src/elevator/id'
import { FloorNumber } from '/src/floor/number'
import { FnCtor } from '/src/function/container'
import { useRxOf } from '/src/pkg/rxjs/of'
import { useRxSwitchScan } from '/src/pkg/rxjs/switchScan'
import { useGetElevatorPosition$ } from './getElevatorPosition$'
import { useGetFloorPositions } from './getFloorPositions'
import { useNthValueFrom } from './nthValueFrom'
import { useTickMockInterval$ } from './tickMockInterval$'

type GetFloorArrivals = (e: ElevatorId, fs: FloorNumber[]) => Promise<FloorNumber[]>

export const useGetFloorArrivals: FnCtor<GetFloorArrivals> = (container) => {
  const getElevatorPosition$ = container.resolve(useGetElevatorPosition$)
  const getFloorPositions = container.resolve(useGetFloorPositions)
  const nthValueFrom = container.resolve(useNthValueFrom)
  const of = container.resolve(useRxOf)
  const switchScan = container.resolve(useRxSwitchScan)
  const tickInterval$ = container.resolve(useTickMockInterval$)

  const getFloorArrivals: GetFloorArrivals = (elevator, floors) => {
    const visitedFloors$ = getElevatorPosition$(elevator)
      .pipe(
        tickInterval$(),
        switchScan(
          (a, b) => b === getFloorPositions(floors)[a.length] ? of(a.concat(b)) : of(),
          [] as FloorNumber[],
        ),
      )
    return nthValueFrom(floors.length, visitedFloors$)
  }

  return getFloorArrivals
}