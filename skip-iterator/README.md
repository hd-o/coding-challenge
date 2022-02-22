# ⏭️ SkipIterator

Iterator implementing skipping through `.skip()`

```typescript
const myIter = new SkipIterator([1,3,4,3,5])
myIter.next() // 1
myIter.skip(3)
myIter.skip(3)
myIter.next() // 4
myIter.next() // 5
```

## Development

Dependencies

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

Commands

- [package.json](./package.json)
- e.g: `yarn start`
