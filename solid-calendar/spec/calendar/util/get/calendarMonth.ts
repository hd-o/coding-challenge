import { YearMonth } from '/src/date/format/yearMonth'
import { screen } from '@testing-library/react'

export function getCalendarMonth (): YearMonth {
  const dateInput: HTMLInputElement = screen.getByTestId('calendar-month-selector-date')
  return dateInput.value as YearMonth
}
