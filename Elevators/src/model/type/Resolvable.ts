/**
 * Manually resolve a Promise
 * @example
 * const requests = {}
 * const onRequest = (event: 'a'|'b') =>
 *   requests[event] ?? requests[event] = new Resolvable()
 * const request = (event) =>
 *   requests[event]?.resolve() && delete requests[event]
 */
export class Resolvable extends Promise<void> {
  private _resolver = () => {}
  constructor() {
    super((resolve) => {
      this._resolver = resolve
    })
  }
  public resolve() {
    this._resolver()
    return true
  }
}
