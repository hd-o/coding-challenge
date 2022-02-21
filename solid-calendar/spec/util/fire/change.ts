import { format } from 'date-fns'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

type PickerChange = (testid: string, date: Date) => Promise<void>

type DatePickerChange = (p: string, d: string) => PickerChange

const datePickerChange: DatePickerChange =
  (placeholder, dateFormat) => async (testid, date) => {
    const pickerInput: HTMLInputElement = screen.getByTestId(testid)
    userEvent.click(pickerInput)
    const textInputViewButton = screen.queryByTestId('PenIcon')
    if (textInputViewButton !== null) userEvent.click(textInputViewButton)
    const input = screen.getByPlaceholderText(placeholder)
    userEvent.clear(input)
    const dateString = format(date, dateFormat)
    userEvent.type(input, dateString)
    userEvent.click(screen.getByText('OK'))
    await waitForElementToBeRemoved(input)
    expect(pickerInput.value).toBe(dateString)
  }

export const dateTimePickerChange =
  datePickerChange('mm/dd/yyyy hh:mm (a|p)m', 'MM/dd/y hh:mm aaa')

export const yearMonthPikerChange =
  datePickerChange('llll yyyy', 'MMMM yyyy')
