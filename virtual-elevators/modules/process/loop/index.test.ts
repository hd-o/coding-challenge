import { range } from 'lodash'
import { Subject } from 'rxjs'
import { container } from 'tsyringe'
import { get } from '@/tests/util/getters'
import { ProcessLoop } from './'

describe(`${ProcessLoop.name}`, () => {
  const keyA = 'A'
  const keyB = 'B'
  const interval$ = new Subject<void>()
  const processLoop = container.resolve(ProcessLoop)

  function tickInterval (times: number): void {
    range(times).map(() => interval$.next())
  }
  beforeAll(() => {
    processLoop.setInterval$(interval$)
  })
  beforeEach(() => {
    processLoop.resetAll()
  })
  test(`${get.describe(ProcessLoop).add}`, () => {
    let counter = 0
    const processA = jest.fn(() => counter++ === 1)
    const processB = jest.fn(() => true)
    const processC = jest.fn(() => true)
    processLoop.add(keyA, [processA, processB])
    processLoop.add(keyB, [processC])
    tickInterval(3)
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
    tickInterval(2)
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
    tickInterval(1)
    expect(processA.mock.calls.length).toBe(0)
    expect(processB.mock.calls.length).toBe(0)
    expect(processC.mock.calls.length).toBe(1)
  })
})
