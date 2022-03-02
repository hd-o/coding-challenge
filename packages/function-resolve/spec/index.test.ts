import { resolve, Use } from '/src'
import { Container } from 'inversify'

let container = new Container()

type Sum = (x: number) => (y: number) => number
type SumX = (x: number) => number

const useSum: Use<Sum> = () => {
  return (x) => (y) => x + y
}

const useSum10: Use<SumX> = (resolve) => {
  const sum = resolve(useSum)
  return sum(10)
}

const useSum100: Use<SumX> = (resolve) => {
  const sum = resolve(useSum)
  return sum(100)
}

const useSum200: Use<SumX> = (_, container) => {
  const childContainer = container.createChild()
  const sum200: Sum = () => (y) => y + 200
  childContainer.bind(useSum).toConstantValue(sum200)
  return resolve(childContainer)(useSum100)
}

beforeEach(() => {
  container = new Container()
})

describe('resolve', () => {
  test('resolving dependencies', () => {
    const sum10 = resolve(container)(useSum10)
    expect(sum10(20)).toBe(30)
  })
  test('injecting dependencies', () => {
    const sum10 = resolve(container)(useSum10)
    const sum100 = resolve(container)(useSum100)

    const childContainer = container.createChild()
    childContainer.bind(useSum10).toConstantValue(sum100)
    const childSum10 = resolve(childContainer)(useSum10)

    expect(sum10(20)).toBe(30)
    expect(childSum10(20)).toBe(120)
  })
  test('injecting dependencies in functions', () => {
    const sum200 = resolve(container)(useSum200)
    expect(sum200(20)).toBe(220)
  })
})
