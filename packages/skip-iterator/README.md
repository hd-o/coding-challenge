# ⏭️ SkipIterator

`#iterator` `#skip` `#typescript`

[![Open in CodeSandbox](https://img.shields.io/badge/Open-＠CodeSandbox-blue?style=flat-square&logo=codesandbox)][live_demo]
[![Develop on localhost](https://img.shields.io/badge/Develop-＠localhost-DDD?style=flat-square&logo=gnubash&logoColor=EEE)][develop]

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

[develop]: ../../.shared/node/README.md#development

[live_demo]: https://codesandbox.io/s/github/hd-o/coding-challenge/tree/main/packages/skip-iterator?file=/README.md&previewwindow=tests
