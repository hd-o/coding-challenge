/**
 * Manually resolve a Promise
 */
export interface Resolvable extends Promise<void> {
  resolve: () => true
}
