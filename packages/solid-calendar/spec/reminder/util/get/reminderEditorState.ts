import { screen, waitFor } from '@testing-library/react'

interface ReminderEditorState {
  date: string
  location: string
  title: string
  weather: string
}

export async function getReminderEditorState (): Promise<ReminderEditorState> {
  await waitFor(() => screen.getByTestId('reminder-editor'))
  const date: HTMLInputElement = screen.getByTestId('reminder-editor-date')
  const location: HTMLInputElement = screen.getByTestId('reminder-editor-location')
  const title: HTMLInputElement = screen.getByTestId('reminder-editor-title')
  const weather = screen.queryByTestId('reminder-editor-weather')
  return {
    date: date.value?.split('T')[0] ?? '',
    location: location.value ?? '',
    title: title.value ?? '',
    weather: weather?.textContent ?? '',
  }
}
