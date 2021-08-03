import { boundMethod } from 'autobind-decorator'
import { Elevator } from '../Elevator'
import { Floor } from '../Floor'

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
export class ElevatorController {
  /**
   * Track if floor is awaiting an elevator
   * @example
   * // On floor elevator request
   * this.requests(floor.id, requestPromise)
   * // After elevator has arrived at floor
   * requestPromise.then(() =>
   *   this.requests.delete(floor.id))
   */
  private requests = new Map<string, Promise<void>>()
  /**
   * Decide which elevator is nearest to the floor.
   * Either the elevator that's Idle at the floor,
   * or the elevator with lowest distanceTo(floor)
   */
  private callNearestElevator(floor: Floor) {
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
    return nearestElevator.goTo(floor)
  }
  /**
   * @param elevators Elevators controlled by this controller
   */
  constructor(
    /**
     * Elevators available for this controller
     */
    public elevators: Elevator[],
  ) {}
  /**
   * Requests nearest Elevator to given floor
   */
  @boundMethod
  public async requestElevator(floor: Floor) {
    // #RustMacros
    const currentRequest = this.requests.get(floor.id)
    if (currentRequest) return currentRequest
    // Request elevator, and store promise
    const request = this.callNearestElevator(floor)
    this.requests.set(floor.id, request)
    // Remove floor from queue when elevator arrives
    request.then(() => this.requests.delete(floor.id))
    // Return promise for caller to await
    return request
  }
}
