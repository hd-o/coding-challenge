import { getCalendarState } from './util/get/calendarState'
import { renderCalendar } from './util/render/'

test('initial calendar render snapshot', () => {
  const calendar = renderCalendar()
  expect(getCalendarState()).toMatchSnapshot('calendar-grid-cell-order')
  expect(calendar.asFragment()).toMatchSnapshot('calendar-view')
})
