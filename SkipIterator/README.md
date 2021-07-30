# SkipIterator

An interator which allows skipping values. This implementation accepts an array/list of integers, but could be implemented to accept any type (generic implementation).

🖥️ [Live Demo @ CodeSandbox][codesandbox]

```typescript
  const myIter = new SkipIterator([1,3,4,3,5])
  myIter.next() // 1
  myIter.skip(3)
  myIter.skip(3)
  myIter.next() // 4
  myIter.next() // 5
```

## Development

1. Install [Node]
2. Clone and open this repo
2. Install dependencies: `npm i`
3. Run dev server: `npm start`

[codesandbox]: https://codesandbox.io/s/github/hd-o/coding-challenge/SkipIterator?file=/src/SkipIterator.ts

[Node]: https://nodejs.org/en/
