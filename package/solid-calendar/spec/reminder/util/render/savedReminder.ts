import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export async function renderSavedReminder (): Promise<void> {
  userEvent.click(screen.getByText('Save Reminder'))
  await waitForElementToBeRemoved(() => document.getElementsByClassName('MuiTouchRipple-ripple')).catch(() => {})
}
