import { DateToISOStringCtx } from '/src/date/toISOString'
import { subMonths } from 'date-fns'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { date } from '../calendar/util/date'
import { renderCalendar } from '../calendar/util/render'
import { renderAddReminderReminderEditor } from '../calendar/util/render/addReminderReminderEditor'
import { fireChange } from '../util/fire/change'
import { getContext } from '../util/get/context'
import { getReminderEditorState } from './util/get/reminderEditorState'
import { renderAddedReminder } from './util/render/addedReminder'
import { renderReminderEditorLocation } from './util/render/reminderEditorLocation'
import { renderReminderList } from './util/render/reminderList'
import { renderReminderListAddReminder } from './util/render/reminderListAddReminder'

beforeEach(() => {
  renderCalendar()
})

describe('calendar date "add reminder" button', () => {
  test('opens reminder editor when clicked', async () => {
    await renderAddReminderReminderEditor()
    expect(screen.getByTestId('reminder-editor')).toBeTruthy()
  })
})

describe('reminder editor', () => {
  beforeEach(async () => {
    await renderAddReminderReminderEditor()
  })
  test('reminder editor is correctly filled when opened', async () => {
    expect(await getReminderEditorState()).toMatchSnapshot('editor-open-data')
  })
  test('location search, and weather', async () => {
    await renderReminderEditorLocation()
    expect(await getReminderEditorState()).toMatchSnapshot('editor-location')
    // Shows location weather info
    const weather = screen.getByTestId('reminder-editor-weather')
    expect(weather.textContent).toMatchSnapshot('editor-location-weather')
    // Hides weather info on location clear
    userEvent.click(screen.getByTitle('Clear'))
    expect(screen.queryByTestId('reminder-editor-weather')).toBeNull()
  })
  test('toggles location weather unit', async () => {
    await renderReminderEditorLocation()
    const weather = screen.getByTestId('reminder-editor-weather')
    expect(weather.textContent).toMatchSnapshot('editor-location-weather-unit')
    userEvent.click(weather)
    expect(weather.textContent).toMatchSnapshot('editor-location-weather-unit-change')
  })
  test('prevents save when title not filled', async () => {
    const saveBtn = screen.getByText('Save Reminder')
    expect(saveBtn.getAttribute('disabled')).not.toBeNull()
  })
  test('closes, and clears data on cancel', async () => {
    userEvent.type(screen.getByTestId('reminder-editor-title'), 'Test')
    expect(await getReminderEditorState()).toMatchSnapshot('editor-cancel-title-input')
    userEvent.click(screen.getByText('Cancel'))
    expect(screen.queryByTestId('reminder-editor')).toBeNull()
    await renderAddReminderReminderEditor()
    expect(await getReminderEditorState()).toMatchSnapshot('editor-cancel-reopen')
  })
  test('adds reminder on save', async () => {
    await renderAddedReminder()
    userEvent.click(screen.getByTestId('calendar-cell-reminder-count'))
    expect(screen.getByTestId('reminder-list-item').textContent).toMatchSnapshot('editor-reminder-saved')
  })
})

describe('reminder list "add reminder" button', () => {
  beforeEach(async () => {
    await renderAddReminderReminderEditor()
    await renderAddedReminder()
    await renderReminderList()
  })
  test('added reminder is shown on list', async () => {
    expect(screen.getByTestId('reminder-list-item').textContent).toMatchSnapshot('list-add')
  })
  test('added reminder with other date is not shown on list', async () => {
    await renderReminderListAddReminder()
    // Insert date of previous month
    const toISOString = getContext(DateToISOStringCtx)
    const dateInput: HTMLInputElement = screen.getByTestId('reminder-editor-date')
    fireChange(dateInput, toISOString(subMonths(date, 1)))
    // Save reminder, and compare snapshot
    await renderAddedReminder()
    expect(screen.getByTestId('reminder-list-item').textContent).toMatchSnapshot('list-add-other-date')
  })
})
