import 'intro.js/introjs.css'
import { IntroJSCtx } from '/src/pkg/intro-js'
import { createContext, useContext } from 'react'

const key = 'app-intro-seen'

function useIntroStart (): () => void {
  const introjs = useContext(IntroJSCtx)
  return () => {
    if (typeof localStorage === 'undefined' || localStorage.getItem(key) === 'true') return
    introjs()
      .setOptions({
        exitOnEsc: false,
        exitOnOverlayClick: false,
        steps: [
          {
            element: document.querySelector('.js-calendar-month-selector'),
            intro: 'Use the arrow buttons, and date selector, to change the calendar month',
            title: '📆 Month Selector'
          },
          {
            element: document.querySelector('.js-calendar-grid')?.parentNode,
            intro: 'Click on a date cell to add a Reminder',
            title: '☑️ Add Reminder'
          }
        ]
      })
      .onbeforeexit(() => localStorage.setItem(key, 'true'))
      .start()
  }
}

export const IntroStartCtx = createContext(useIntroStart)
