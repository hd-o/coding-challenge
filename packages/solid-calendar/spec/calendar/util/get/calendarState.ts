import { getCalendarGridKeys } from './calendarGridKeys'
import { getCalendarMonth } from './calendarMonth'

interface CalendarState {
  gridKeys: Awaited<ReturnType<typeof getCalendarGridKeys>>
  month: Awaited<ReturnType<typeof getCalendarMonth>>
}

export function getCalendarState (): CalendarState {
  return {
    gridKeys: getCalendarGridKeys(),
    month: getCalendarMonth(),
  }
}
