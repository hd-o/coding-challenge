/**
 * Promisified setTimeout
 * @example
 * await timer(2000)
 */
export const timer = (msDuration: number) => {
  return new Promise((resolve) => setTimeout(resolve, msDuration))
}
