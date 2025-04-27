# ➡️ Function Resolve

`#container` `#dependency` `#functional`

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)][demo]

[demo]: https://stackblitz.com/github/hd-o/coding-challenge?configPath=packages/function-resolve&file=packages/function-resolve/index.html&startScript=run:function-resolve

IoC container resolver for functional programming

This algorithm was designed while working on [rx-elevators][rx_elevators]. It wraps a dependency container, in this case [inversify][inversify] but could be others like [tsyringe][tsyringe], and exposes [resolve][resolve] to enable a functional dependency resolution syntax. In summary, it enables functional inversion of control, or IoC without classes, similar to React's Context. See [Context vs Containers][c_vs_c] for background.

In more capable functional programming languages inversion of control is achieved by using implicit parameters, or reader monads, but TypeScript does not provide such feature practically. IoC can be easily achieved with JavaScript, but many methods require dynamic resolution ("stringly typed", and/or proxies) making it harder to correctly statically type code. In JavaScript it is common to find solutions like [inversify][inversify] for class based IoC, and [React Context][react_ctx] for function based IoC. Kotlin provides a practical solution with [context receivers](https://www.youtube.com/watch?v=TVdFAftHzPE), and Python with [context-local variables](https://peps.python.org/pep-0555/). NodeJS provides [AsyncLocalStorage](https://nodejs.org/api/async_context.html) that achieves similar results

---

```ts
import { resolve, Use } from '/src'
import { Container } from 'inversify'

const container = new Container()

type Sum = (x: number) => (y: number) => number

type SumX = (x: number) => number

const useSum: Use<Sum> = () => {
  return (x) => (y) => x + y
}

const useSum10: Use<SumX> = (resolve) => {
  const sum = resolve(useSum)
  return sum(10)
}

test('resolving dependencies', () => {
  const sum10 = resolve(container)(useSum10)
  expect(sum10(20)).toBe(30)
})
```

<!--  -->

[c_vs_c]: ../solid-calendar/README.md#context-vs-containers

[haskell]: https://www.haskell.org/

[haskell_imp]: https://www.haskell.org/hugs/pages/users_guide/implicit-parameters.html

[inversify]: https://github.com/inversify/InversifyJS

[react_ctx]: https://reactjs.org/docs/context.html

[resolve]: ./src/index.ts

[rx_elevators]: ../rx-elevators

[tsyringe]: https://github.com/Microsoft/tsyringe

[scala]: https://scala-lang.org/

[scala_imp]: https://docs.scala-lang.org/tour/implicit-parameters.html
