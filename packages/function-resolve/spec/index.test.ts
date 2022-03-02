import { resolve, Use } from '/src'
import { Container } from 'inversify'

const container = new Container()

type Sum = (x: number) => (y: number) => number
type SumX = ReturnType<Sum>

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
})
