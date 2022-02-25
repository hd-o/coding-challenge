import { getCalendarGridKeys } from './calendarGridKeys'
import { getCalendarMonth } from './calendarMonth'

interface CalendarState {
  month: Awaited<ReturnType<typeof getCalendarMonth>>
  gridKeys: Awaited<ReturnType<typeof getCalendarGridKeys>>
}

export function getCalendarState (): CalendarState {
  return {
    month: getCalendarMonth(),
    gridKeys: getCalendarGridKeys(),
  }
}
