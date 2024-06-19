# 🐑 Typed Use Cases

Functional IoC using JS function context

`#functional` `#solid`

Following-up on [function-resolve][function-resolve] and [mvc-functional-oop][mvc-functional-oop], I've embraced the [this][this] keyword and JavaScript's built in context management to achieve typed functional dependency injection with less boilerplate and dependencies

[function-resolve]: https://github.com/hd-o/coding-challenge/tree/main/packages/function-resolve

[mvc-functional-oop]: https://github.com/hd-o/coding-challenge/tree/main/packages/mvc-functional-oop

[this]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

## V1 Utils

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)][stackblitz]

[stackblitz]: https://stackblitz.com/edit/typed-use-cases?file=index.ts&view=editor

```ts
const helloWorld = usecase(
  { greet, hello },
  function () {
    this.hello('World')
    this.greet('Earth')
  }
)
```

## V2 Classes

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)][v2-stackblitz]

[v2-stackblitz]: https://stackblitz.com/edit/vitejs-vite-vcg89y?file=src%2Fmain.ts&terminal=dev

```tsx
class CalculateWithMultiply extends DependencyClass({
  ...Calculate.dependencies,
  ...Multiply.dependencies,
  run: async () => (await import('./multiply')).multiply,
}) {}
```
