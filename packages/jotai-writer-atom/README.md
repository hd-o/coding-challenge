# 👻 Jotai Writer Atom

[![Open in CodeSandbox](https://img.shields.io/badge/Open-＠CodeSandbox-blue?style=flat-square&logo=codesandbox)][live_demo]
[![Develop Locally](https://img.shields.io/badge/Develop-＠localhost-DDD?style=flat-square&logo=gnubash&logoColor=EEE)][develop]

A context-friendly write-only atom, allowing dependency injection for atom setters

---

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

---

While working on [solid-calendar][solid_calendar], I encountered the need to inject an atom value, but only resolve it on a handler function call, lazily, not eagerly on component render. A `writerAtom` solves this by exposing Jotai's get/set functions lazily, only when the write function is called. This method allows components to render without having to eagerly resolve/get the value of atoms needed by handler functions. See [handleSave.ts][handleSave] for usage example.

[develop]: ../../.shared/node/README.md#development

[handleSave]: ../solid-calendar/src/reminder/editor/handleSave.ts

[live_demo]: https://codesandbox.io/s/github/hd-o/coding-challenge/tree/main/packages/jotai-writer-atom?file=/src/app/index.tsx

[solid_calendar]: ../solid-calendar/README.md
