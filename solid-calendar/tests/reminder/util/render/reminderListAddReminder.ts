import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export async function renderReminderListAddReminder (): Promise<void> {
  userEvent.click(screen.getByTestId('reminder-list-add-reminder'))
  await waitFor(() => screen.getByTestId('reminder-editor'))
}
