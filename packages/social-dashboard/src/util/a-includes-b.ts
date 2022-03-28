/** Assert that all values in `b` exist in `a` */
export const aIncludesB = (a: any[], b: any[]): boolean => {
  for (const v of b) if (!a.includes(v)) return false
  return true
}
