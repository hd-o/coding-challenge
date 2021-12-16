import { addDays } from 'date-fns'
import { DateToISOStringCtx } from '~/date/toISOString'
import { cleanup, screen } from '@testing-library/react'
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
import { renderReminderListItem } from './util/render/reminderListItem'
import { renderSavedReminder } from './util/render/savedReminder'

jest.setTimeout(10000)

beforeAll(async () => {
  // Add two reminders
  renderCalendar()
  await renderAddReminderReminderEditor()
  await renderAddedReminder()
  await renderReminderList()
  await renderReminderListAddReminder()
  await renderAddedReminder()
  cleanup()
})

beforeEach(() => {
  renderCalendar()
})

test('reminder list item click opens filled reminder editor', async () => {
  await renderReminderListItem()
  expect(await getReminderEditorState()).toMatchSnapshot('list-item-open')
})

test('updating reminder location', async () => {
  await renderReminderListItem()
  await renderReminderEditorLocation('London')
  await renderSavedReminder()
  expect(screen.getAllByTestId('reminder-list-item')).toMatchSnapshot('list-after-location-edit')
})

test('changing reminder date to other day', async () => {
  await renderReminderListItem()
  // Increment reminder date by one day
  const toISOString = getContext(DateToISOStringCtx)
  fireChange(screen.getByTestId('reminder-editor-date'), toISOString(addDays(date, 1)))
  await renderSavedReminder()
  // Snapshot reminder list with 1 item
  expect(screen.getAllByTestId('reminder-list-item')).toMatchSnapshot('list-after-date-edit')
  // Snapshot counter (with "1" count)
  expect(screen.getAllByTestId('calendar-cell-reminder-count')[0].textContent).toMatchSnapshot('counter-after-date-edit')
})
