# ⏭️ SkipIterator

`#iterator` `#skip` `#typescript`

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)][demo]

[demo]: https://stackblitz.com/github/hd-o/coding-challenge?configPath=packages/skip-iterator&file=packages/skip-iterator/index.html&startScript=run:skip-iterator

Iterator class, implementing value skipping

---

```typescript
const myIter = new SkipIterator([1,3,4,3,5])
myIter.next() // 1
myIter.skip(3)
myIter.skip(3)
myIter.next() // 4
myIter.next() // 5
```
