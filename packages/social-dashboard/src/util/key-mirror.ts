type KeyMirror = <V extends {}> (v: V) => {[key in keyof V]: key}

/**
 * @returns New object with keys as values
 * @example
 * keymirror({ a: '', b: 2 })
 * // { a: 'a', b: 'b' }
 */
export const keymirror: KeyMirror = (v) => {
  const mirrored: any = {}
  for (const key in v) mirrored[key] = key
  return mirrored
}
