# 🐑 Typed Use Cases

Functional IoC using JS function context

`#functional` `#solid`

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)][stackblitz]

Following-up on [function-resolve][function-resolve] and [mvc-functional-oop][mvc-functional-oop], I've embraced the [this][this] keyword and JavaScript's built in context management to acchieve typed functional IoC with less boilerplate and no dependencies

[function-resolve]: https://github.com/hd-o/coding-challenge/tree/main/packages/function-resolve

[mvc-functional-oop]: https://github.com/hd-o/coding-challenge/tree/main/packages/mvc-functional-oop

[this]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

[stackblitz]: https://stackblitz.com/edit/typed-use-cases?file=index.ts&view=editor

```tsx
const helloWorld = usecase(
  { greet, hello },
  function () {
    this.hello('World')
    this.greet('Earth')
  }
)
```
