import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { fireChange } from '../util/fire/change'
import { getCalendarState } from './util/get/calendarState'
import { renderCalendar } from './util/render/'

beforeEach(() => {
  renderCalendar()
})

test('snapshot before interaction', async () => {
  expect(getCalendarState()).toMatchSnapshot('before-interaction')
})

test('next month button', async () => {
  userEvent.click(screen.getByTestId('calendar-month-selector-next'))
  expect(getCalendarState()).toMatchSnapshot('next-month')
})

test('previous month button', async () => {
  userEvent.click(screen.getByTestId('calendar-month-selector-previous'))
  expect(getCalendarState()).toMatchSnapshot('previous-month')
})

test('month date input', async () => {
  const dateInput: HTMLInputElement = screen.getByTestId('calendar-month-selector-date')
  fireChange(dateInput, '2021-10')
  expect(getCalendarState()).toMatchSnapshot('date-input')
})
