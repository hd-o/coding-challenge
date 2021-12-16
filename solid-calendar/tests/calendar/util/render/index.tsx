import { CalendarCtx } from '~/calendar'
import { CalendarMonthAtomCtx } from '~/calendar/month/atom'
import { JotaiAtomCtx } from '~/pkg/jotai/atom'
import { render } from '@/tests/util/render'
import { date } from '../date'

export function renderCalendar (): ReturnType<typeof render> {
  return render(() =>
    <JotaiAtomCtx.Consumer>
      {atom => {
        const monthAtom = atom(date)
        return (
          <CalendarMonthAtomCtx.Provider value={() => monthAtom}>
            <CalendarCtx.Consumer>
              {Calendar => <Calendar />}
            </CalendarCtx.Consumer>
          </CalendarMonthAtomCtx.Provider>
        )
      }}
    </JotaiAtomCtx.Consumer>
  )
}
