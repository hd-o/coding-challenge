import { set } from 'date-fns'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { yearMonthPikerChange } from '../util/fire/change'
import { date } from './util/date'
import { getCalendarState } from './util/get/calendarState'
import { renderCalendar } from './util/render'

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
  const octoberDate = set(date, {
    month: 9,
    year: 2021,
  })
  await yearMonthPikerChange('calendar-month-selector-date', octoberDate)
  expect(getCalendarState()).toMatchSnapshot('date-input')
})
