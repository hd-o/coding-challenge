import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderReminderEditorLocation } from './reminderEditorLocation'
import { renderSavedReminder } from './savedReminder'

export async function renderAddedReminder (): Promise<void> {
  userEvent.type(screen.getByTestId('reminder-editor-title'), 'Test')
  await renderReminderEditorLocation()
  await renderSavedReminder()
}
