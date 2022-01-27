import { container } from 'tsyringe'
import { get } from '@/tests/util/getters'
import { createRequestAnimationFrameMock } from '@/tests/util/mock/requestAnimationFrame'
import { ProcessLoop } from './'

describe(`${ProcessLoop.name}`, () => {
  const keyA = 'A'
  const keyB = 'B'
  const requestAnimationFrameMock = createRequestAnimationFrameMock()
  let processLoop = container.resolve(ProcessLoop)
  afterAll(() => {
    requestAnimationFrameMock.afterAll()
  })
  beforeAll(() => {
    requestAnimationFrameMock.beforeAll()
  })
  beforeEach(() => {
    requestAnimationFrameMock.reset()
    processLoop = container.resolve(ProcessLoop)
  })
  test(`${get.describe(ProcessLoop).add}`, () => {
    let counter = 0
    const processA = jest.fn(() => counter++ === 1)
    const processB = jest.fn(() => true)
    const processC = jest.fn(() => true)
    processLoop.add(keyA, [processA, processB])
    processLoop.add(keyB, [processC])
    requestAnimationFrameMock.tick()
    requestAnimationFrameMock.tick()
    requestAnimationFrameMock.tick()
    expect(processA.mock.calls.length).toBe(2)
    expect(processB.mock.calls.length).toBe(1)
    expect(processC.mock.calls.length).toBe(1)
  })
  test(`${get.describe(ProcessLoop).clear}`, () => {
    const processA = jest.fn(() => {})
    const processB = jest.fn(() => true)
    const processC = jest.fn(() => true)
    processLoop.add(keyA, [processA, processB])
    processLoop.add(keyB, [processC])
    processLoop.clear(keyA)
    processLoop.add(keyA, [processB])
    requestAnimationFrameMock.tick()
    requestAnimationFrameMock.tick()
    expect(processA.mock.calls.length).toBe(0)
    expect(processB.mock.calls.length).toBe(1)
    expect(processC.mock.calls.length).toBe(1)
  })
  test(`${get.describe(ProcessLoop).reset}`, () => {
    const processA = jest.fn(() => true)
    const processB = jest.fn(() => true)
    const processC = jest.fn(() => true)
    processLoop.add(keyA, [processA, processB])
    processLoop.reset(keyA, [processC])
    requestAnimationFrameMock.tick()
    expect(processA.mock.calls.length).toBe(0)
    expect(processB.mock.calls.length).toBe(0)
    expect(processC.mock.calls.length).toBe(1)
  })
})
