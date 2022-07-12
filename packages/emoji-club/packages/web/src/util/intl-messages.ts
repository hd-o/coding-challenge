import en from '/lang/en-US.json'
import keymirror from 'keymirror'

export type IntlId = keyof typeof en

export const intlIds = keymirror(en)
