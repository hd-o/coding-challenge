# SkipIterator

Iterator implementing skipping through `.skip()`

🖥️ [Live Demo @ CodeSandbox][codesandbox]

```typescript
const myIter = new SkipIterator([1,3,4,3,5])
myIter.next() // 1
myIter.skip(3)
myIter.skip(3)
myIter.next() // 4
myIter.next() // 5
```

This implementation accepts an array of integers, but could accept any type through generics:

```typescript
class SkipIterator<Value> {
  constructor(values: Value[])
}
```

## Development

1. Install [Node]
2. Clone and open this repo
2. Install dependencies: `npm i`
3. Run dev server: `npm start`

[codesandbox]: https://codesandbox.io/s/github/hd-o/coding-challenge/SkipIterator?file=/src/SkipIterator.ts

[Node]: https://nodejs.org/en/
