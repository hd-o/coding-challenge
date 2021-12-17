/**
 * Promisified setTimeout
 * @example
 * await timer(2000)
 */
export function timer (msDuration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, msDuration))
}
