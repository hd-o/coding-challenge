import { Floor } from '~/model/floor'
import { Immutable } from '~/model/pkg/immutable'
import { Elevator } from '../'

type FloorRequest = Promise<void>

/**
 * Features:
 * - Decides on nearest elevator to call on request
 * - Manages "callback queue" when elevator is requested
 * @example
 * // Instantiate controller with given Elevators
 * const controller = new ElevatorController({ elevators })
 * // Request an elevator for given floor
 * await controller.requestElevator(floor)
 * console.log(`Elevator arrived at floor ${flor.id}`)
 */
export class ElevatorHub {
  /**
   * Floors awaiting an elevator
   */
  private _requests = this._immutable.Map<Floor['id'], FloorRequest>()

  /**
   * Decide which elevator is nearest to the floor.
   * Either the elevator that's Idle at the floor,
   * or the elevator with lowest distanceTo(floor)
   */
  private _callNearestElevator (floor: Floor): false | Promise<void> {
    // Start with first elevator
    let nearestElevator = this.elevators[0]
    if (nearestElevator.isIdleAt(floor)) {
      return nearestElevator.open()
    }
    // Cache current nearestDistance
    let nearestDistance = nearestElevator.distanceTo(floor)
    // Loop from second elevator onward
    for (const elevator of this.elevators.slice(1)) {
      // Early exit if elevator is Idle at floor
      if (elevator.isIdleAt(floor)) return elevator.open()
      const distance = elevator.distanceTo(floor)
      if (distance < nearestDistance) {
        nearestElevator = elevator
        nearestDistance = distance
      }
    }
    return nearestDistance === false
      // If no elevator services the given floor
      ? false
      // Otherwise call nearest elevator
      : nearestElevator.goTo(floor)
  }

  /**
   * @param elevators Elevators controlled by this controller
   */
  constructor (
    public elevators: Elevator[],
    private readonly _immutable: Immutable
  ) {}

  get requests (): ElevatorHub['_requests'] {
    return this._requests
  }

  requestElevator (floor: Floor): boolean {
    const currentRequest = this._requests.get(floor.id)
    if (currentRequest !== undefined) return true
    // Request elevator, and store promise
    const request = this._callNearestElevator(floor)
    if (request === false) return false
    this._requests = this._requests.set(floor.id,
      request.then(() => {
        // Remove floor from queue when elevator arrives
        this._requests = this._requests.delete(floor.id)
      }))
    // Return promise for caller to await
    return true
  }
}
