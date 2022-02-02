import { get } from '@/tests/util/getters'
import { ElevatorDoorCtrl } from './controller'

describe(`${ElevatorDoorCtrl.name}`, () => {
  // let doorCtrl = container.resolve(ElevatorDoorCtrl)
  beforeEach(() => {
    // doorCtrl = container.resolve(ElevatorDoorCtrl)
  })
  test(`${get.describe(ElevatorDoorCtrl).open}`, () => {
    expect(0).toBe(1)
  })
})
