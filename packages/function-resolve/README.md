# ➡️ Function Resolve

`#container` `#dependency` `#functional`

[![Open in CodeSandbox](https://img.shields.io/badge/Open-＠CodeSandbox-blue?style=flat-square&logo=codesandbox)][live_demo]
[![Develop on localhost](https://img.shields.io/badge/Develop-＠localhost-DDD?style=flat-square&logo=gnubash&logoColor=EEE)][develop]

IoC container resolver for functional programming

This algorithm was designed while working on [rx-elevators][rx_elevators]. It wraps a dependency container, in this case [inversify][inversify] but could be others like [tsyringe][tsyringe], and exposes [resolve][resolve] to enable a functional dependency resolution syntax. In summary, it enables functional inversion of control, or IoC without classes, similar to React's Context. See [Context vs Containers][c_vs_c] for background.

In more capable functional programming languages inversion of control is achieved by using implicit parameters, or reader monads, but TypeScript does not provide such feature practically. IoC can be easily achieved with JavaScript, but many methods require dynamic resolution ("stringly typed", and/or proxies) making it harder to correctly statically type code. In JavaScript it is common to find solutions like [inversify][inversify] for class based IoC, and [React Context][react_ctx] for function based IoC. Kotlin provides a practical solution with [context receivers](https://www.youtube.com/watch?v=TVdFAftHzPE).

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

[develop]: ../../.shared/node/README.md#development

[haskell]: https://www.haskell.org/

[haskell_imp]: https://www.haskell.org/hugs/pages/users_guide/implicit-parameters.html

[inversify]: https://github.com/inversify/InversifyJS

[live_demo]: https://codesandbox.io/s/github/hd-o/coding-challenge/tree/main/packages/function-resolve?file=/spec/index.test.ts&previewwindow=tests

[react_ctx]: https://reactjs.org/docs/context.html

[resolve]: ./src/index.ts

[rx_elevators]: ../rx-elevators

[tsyringe]: https://github.com/Microsoft/tsyringe

[scala]: https://scala-lang.org/

[scala_imp]: https://docs.scala-lang.org/tour/implicit-parameters.html
