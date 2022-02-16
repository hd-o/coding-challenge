import { FloorNumber } from '/src/floor/number'
import { FnCtor } from '/src/function/container'
import { useTestingLibraryReactWaitFor } from '/src/pkg/@testing-library/react/waitFor'
import { useGetFloorCaller } from './getFloorCaller'

type FloorWasRequested = (f: FloorNumber, elevatorTestId?: string) => Promise<true>

export const useFloorWasRequested: FnCtor<FloorWasRequested> = (container) => {
  const getFloorCaller = container.resolve(useGetFloorCaller)
  const waitFor = container.resolve(useTestingLibraryReactWaitFor)

  const floorWasRequested: FloorWasRequested = async (floor, elevatorTestId) => {
    await waitFor(() => {
      getFloorCaller('floor-panel', floor, true)
      getFloorCaller(`${elevatorTestId ?? 'elevator-\\d-panel'}`, floor, true)
    })
    return true
  }

  return floorWasRequested
}
