# 👻 Jotai Writer Atom

A context-friendly write-only atom, allowing dependency injection for atom setters

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)][live_demo]

```ts
import { atom } from 'jotai'

type Writer <Get, Set> = (get: Get, set: Set) => void

const writerAtom = atom(
  null,
  (get, set, write: Writer<typeof get, typeof set>) => {
    write(get, set)
  },
)
```

[live_demo]: https://codesandbox.io/s/github/hd-o/coding-challenge/tree/main/packages/jotai-writer-atom?file=/src/app/index.tsx
