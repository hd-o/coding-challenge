import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderCalendar } from '../calendar/util/render'
import { renderAddReminderReminderEditor } from '../calendar/util/render/addReminderReminderEditor'
import { renderAddedReminder } from './util/render/addedReminder'
import { renderReminderList } from './util/render/reminderList'
import { renderReminderListAddReminder } from './util/render/reminderListAddReminder'

jest.setTimeout(10000)

test('reminder list "delete reminder" button', async () => {
  // Add two reminders
  renderCalendar()
  await renderAddReminderReminderEditor()
  await renderAddedReminder()
  await renderReminderList()
  await renderReminderListAddReminder()
  await renderAddedReminder()
  // Snapshot reminder list with 2 items
  expect(screen.getAllByTestId('reminder-list-item')).toMatchSnapshot('list-before-delete')
  // Snapshot counter (with "2" count)
  expect(screen.getAllByTestId('calendar-cell-reminder-count')[0]).toMatchSnapshot('counter-before-delete')
  // Delete one reminder
  userEvent.click(screen.getAllByTitle('Delete Reminder')[0])
  // Snapshot reminder list with 1 item
  expect(screen.getAllByTestId('reminder-list-item')).toMatchSnapshot('list-after-delete')
  // Snapshot counter (with "1" count)
  expect(screen.getAllByTestId('calendar-cell-reminder-count')[0]).toMatchSnapshot('counter-after-delete')
})
