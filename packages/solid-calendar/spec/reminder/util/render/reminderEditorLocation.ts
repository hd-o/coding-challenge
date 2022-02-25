import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export async function renderReminderEditorLocation (location = 'Barcelona'): Promise<void> {
  const locationInput: HTMLInputElement = screen.getByTestId('reminder-editor-location')
  userEvent.type(locationInput, 'lon')
  await waitFor(() => screen.getByText(location))
  userEvent.click(screen.getByText(location))
  await waitFor(() => screen.getByTestId('reminder-editor-weather'))
}
