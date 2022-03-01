/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { click } from './util/click'
import { find } from './util/find'
import { findAll } from './util/findAll'
import { query } from './util/query'

describe('elevator queue', () => {
  describe('requesting floor from floor panel', () => {
    test('floor request', async () => {
      await click('floor-1-caller')
      await find('floor-1-caller-requested')
    })
    test('floor is added to only one queue at a time', async () => {
      await click('floor-1-caller')
      await click('floor-1-caller-requested')
      const requested = await findAll(/elevator-\d-button-floor-1-requested/)
      expect(requested).toHaveLength(1)
    })
    test('floor not requested if elevator is at floor', async () => {
      await click('floor-0-caller')
      expect(query('floor-0-caller-requested')).toBeNull()
    })
  })
  describe('requesting floor from elevator panel', () => {
    test('floor is only inserted once in queue', async () => {
      await click('elevator-0-button-floor-1')
      await click('elevator-0-button-floor-2')
      await click('elevator-0-button-floor-1-requested')
      await find('floor-1-caller-requested')
      await find('floor-2-caller-requested')
      await click('test-interval-start')
      await find('elevator-0-moving')
      await find('elevator-0-door-open')
      await find('elevator-0-door-closed')
      await find('floor-1-caller')
      await find('elevator-0-moving')
      await find('elevator-0-door-open')
      await find('elevator-0-door-closed')
      await find('floor-2-caller')
    })
    test('floor not requested if elevator is at floor', async () => {
      await click('elevator-0-button-floor-0')
      expect(query('floor-0-caller-requested')).toBeNull()
    })
  })
  /**
   * On floor request, which elevator will be requested
   */
  describe('elevator pick algorithm', () => {
    /**
     * In this implementation, the smallest queue is chosen,
     * but this decision can be custom to each implementation
     * (preferably as an injected dependency)
     */
    test('floor is added to smallest queue', async () => {
      await click('floor-1-caller')
      await find('elevator-0-button-floor-1-requested')
      await click('floor-2-caller')
      await find('elevator-1-button-floor-2-requested')
    })
  })
})

describe('elevator movement', () => {
  test('only elevator with non empty queue is moving', async () => {
    // Should call elevator 0
    await click('floor-2-caller')
    await click('elevator-0-button-floor-3')
    await click('test-interval-start')
    const movingElevators = await findAll(/elevator-\d-moving/)
    expect(movingElevators).toHaveLength(1)
  })
  test('elevator moves to requested floor', async () => {
    await click('elevator-0-button-floor-2')
    await find('floor-2-caller-requested')
    await click('test-interval-start')
    await find('elevator-0-door-open')
    await find('floor-0-caller')
  })
  test('elevator moves in correct queue order', async () => {
    await click('elevator-0-button-floor-3')
    await click('elevator-0-button-floor-2')
    await click('elevator-0-button-floor-4')
    await click('test-interval-start')
    await find('floor-2-caller')
    await find('floor-3-caller')
    await find('floor-4-caller')
  })
  test('multiple elevators move concurrently', async () => {
    await click('floor-4-caller')
    await click('elevator-0-button-floor-2')
    await click('elevator-1-button-floor-2')
    await click('test-interval-start')
    const movingElevators = await findAll(/elevator-\d-moving/)
    expect(movingElevators).toHaveLength(2)
  })
  test('elevator does not move if door is open', async () => {
    await click('elevator-0-button-floor-2')
    await click('test-interval-start')
    await find('elevator-0-door-open')
    await click('elevator-0-button-floor-3')
    await find('elevator-0-door-closing')
    expect(query('elevator-0-moving')).toBeNull()
    await find('elevator-0-door-closed')
    await find('elevator-0-moving')
  })
  /**
   * Asserts elevator not opening door if, through the elevator's panel,
   * a floor is requested when there is any elevator already at the floor
   * Bug example:
   * - Elevator 0 at floor 0, elevator 1 at floor 1
   * - Floor 0 requested by elevator 1's panel
   * - Elevator 0 door opens
   */
  test('floor always requested through elevator panel when elevator is not at floor', async () => {
    await click('elevator-1-button-floor-1')
    await click('test-interval-start')
    await find('elevator-1-door-open')
    await find('elevator-1-door-closed')
    await click('elevator-1-button-floor-0')
    await click('elevator-1-moving')
    expect(query(/elevator-\d-door-opening/)).toBeNull()
  })
})

describe('elevator door movement', () => {
  test('door opens when elevator arrives at floor', async () => {
    await click('elevator-1-button-floor-1')
    await click('test-interval-start')
    await find('elevator-1-door-open')
    await find('elevator-1-door-closed')
  })
  test('door opens on floor request if elevator is at floor', async () => {
    await click('elevator-1-button-floor-0')
    await click('test-interval-start')
    await find('elevator-1-door-open')
  })
  test('door closes after opening', async () => {
    await click('elevator-1-button-floor-0')
    await click('test-interval-start')
    await find('elevator-1-door-open')
    await find('elevator-1-door-closed')
  })
  test('door opens, during close, on request of its current floor', async () => {
    await click('elevator-1-button-floor-0')
    await click('test-interval-start')
    await find('elevator-1-door-open')
    await find('elevator-1-door-closing')
    await click('elevator-1-button-floor-0')
    await find('elevator-1-door-opening')
  })
})
