import { get } from '/src/../tests/util/getters'
import { ElevatorQueueCtrl } from './controller'

describe(`${ElevatorQueueCtrl.name}`, () => {
  // let doorCtrl = container.resolve(ElevatorQueueCtrl)
  beforeEach(() => {
    // doorCtrl = container.resolve(ElevatorQueueCtrl)
  })
  test(`${get.describe(ElevatorQueueCtrl).insert}`, () => {
    expect(0).toBe(1)
  })
})
