/**
 * Iterator implementing skipping through .skip()
 * @example
 * const myIter = new SkipIterator([1,3,4,3,5])
 * myIter.next() // 1
 * myIter.skip(3)
 * myIter.skip(3)
 * myIter.next() // 4
 * myIter.next() // 5
 */
export class SkipIterator {
  /**
   * Track current value for next() call
   */
  private currentIndex = 0
  /**
   * Values to be skipped.
   * First in, first out
   */
  private skipQueue: number[] = []
  /**
   * @param iterator Values to be looped by next()
   */
  constructor(private iterator: number[]) {}
  /**
   * Returns next value to be skipped, or false
   */
  get nextToSkip(): number | false {
    // If there's no value to skip
    if (!this.skipQueue.length) return false
    // else return the value to skip
    return this.skipQueue[0]
  }
  /**
   * There are values to be looped by next ()
   */
  get hasNext(): boolean {
    return this.iterator[this.currentIndex] !== undefined
  }
  /**
   * Returns next not skipped value, or undefined
   */
  next(): number | undefined {
    const currentValue = this.iterator[this.currentIndex]
    // Increment for upcoming next() calls
    this.currentIndex++
    // Check if there's a value to be skipped
    const nextToSkip = this.nextToSkip
    // Return current value if it should not be skipped
    if (currentValue !== nextToSkip) return currentValue
    // If current value should be skipped,
    // remove it from the queue, and
    // run the following next() call
    this.skipQueue.shift()
    // Call to get the next iterator value
    return this.next()
  }
  /**
   * Adds value to the end of the skip queue
   */
  skip(value: number) {
    this.skipQueue.push(value)
  }
}
