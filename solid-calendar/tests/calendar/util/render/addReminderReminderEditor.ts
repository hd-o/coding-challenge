import { fireEvent, screen, waitFor } from '@testing-library/react'

export async function renderAddReminderReminderEditor (): Promise<void> {
  const [addReminderBtn] = screen.getAllByTestId('calendar-add-reminder-button')
  fireEvent.click(addReminderBtn)
  await waitFor(() => screen.getByTestId('reminder-editor'))
}
