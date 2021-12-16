import { getCalendarState } from './util/get/calendarState'
import { renderCalendar } from './util/render/'

describe('calendar view (initial rendering)', () => {
  test('initial render snapshot', () => {
    const calendar = renderCalendar()
    expect(getCalendarState()).toMatchSnapshot('calendar-grid-cell-order')
    expect(calendar.asFragment()).toMatchSnapshot('calendar-view')
  })
})
