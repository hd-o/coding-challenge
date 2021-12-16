import { getElementKeys } from '@/tests/util/get/elementKeys'
import { screen } from '@testing-library/react'

type Keys = ReturnType<typeof getElementKeys>

export function getCalendarGridKeys (): Keys {
  return getElementKeys(screen.getAllByTestId('calendar-grid-cell'))
}
