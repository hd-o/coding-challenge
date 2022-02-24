import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export async function renderReminderList (): Promise<void> {
  const [reminderCount] = screen.getAllByTestId('calendar-cell-reminder-count')
  userEvent.click(reminderCount)
  await waitFor(() => screen.getByTestId('reminder-list-add-reminder'))
}
