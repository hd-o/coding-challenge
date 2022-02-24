import { render } from '/spec/util/render'
import { CalendarCtx } from '/src/calendar'
import { CalendarMonthAtomCtx } from '/src/calendar/month/atom'
import { JotaiAtomCtx } from '/src/pkg/jotai/atom'
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
