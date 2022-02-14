import KeyMirror from 'keymirror'

type Mirror = <V extends {}> (v: V) => Readonly<{[K in keyof V]: K}>

export const mirror: Mirror = (v) => KeyMirror(v)
