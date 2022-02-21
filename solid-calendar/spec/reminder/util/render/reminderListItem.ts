import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export async function renderReminderListItem (index = 0): Promise<void> {
  userEvent.click(screen.getAllByTestId('reminder-list-item')[index])
}
