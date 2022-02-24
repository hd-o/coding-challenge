import { FloorNumber } from '/src/floor/number'
import { FnCtor } from '/src/function/container'
import { useTestingLibraryReactScreen } from '/src/pkg/@testing-library/react/screen'

type GetFloorCaller = (panel: string, f: FloorNumber, requested?: true) => HTMLElement

export const useGetFloorCaller: FnCtor<GetFloorCaller> = (container) => {
  const screen = container.resolve(useTestingLibraryReactScreen)

  const getFloorCaller: GetFloorCaller = (panel, floor, requested) => {
    const element = `__floor-caller-${floor}`
    const modifier = requested === true ? '--requested' : ''
    return screen.getByTestId(new RegExp(`${panel}${element}${modifier}`))
  }

  return getFloorCaller
}
