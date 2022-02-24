import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export async function renderAddReminderReminderEditor (): Promise<void> {
  const [addReminderBtn] = screen.getAllByTestId('calendar-add-reminder-button')
  userEvent.click(addReminderBtn)
  await waitFor(() => screen.getByTestId('reminder-editor'))
}
