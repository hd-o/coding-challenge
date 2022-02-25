# ⏭️ SkipIterator

Iterator implementing skipping through `.skip()`

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)][live_demo]

```typescript
const myIter = new SkipIterator([1,3,4,3,5])
myIter.next() // 1
myIter.skip(3)
myIter.skip(3)
myIter.next() // 4
myIter.next() // 5
```

[live_demo]: https://codesandbox.io/s/github/hd-o/coding-challenge/tree/main/packages/skip-iterator?file=/README.md&previewwindow=tests
