# 👻 Jotai Writer Atom

`#atom` `#jotai` `#react`

[![Open in CodeSandbox](https://img.shields.io/badge/Open-＠CodeSandbox-blue?style=flat-square&logo=codesandbox)][live_demo]
[![Develop on localhost](https://img.shields.io/badge/Develop-＠localhost-DDD?style=flat-square&logo=gnubash&logoColor=EEE)][develop]

A context-friendly write-only atom, allowing dependency injection for atom setters.

While working on [solid-calendar][solid_calendar], I encountered the need to inject an atom value only when a handler function was called, lazily, not eagerly during component render. A `writerAtom` solves this by exposing Jotai's get/set functions lazily, only when the write function is called. This method allows component rendering without eagerly resolving/getting atoms needed by handler functions. See [handleSave.ts][handleSave] for example

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

[develop]: ../../.shared/node/README.md#development

[handleSave]: ../solid-calendar/src/reminder/editor/handleSave.ts

[live_demo]: https://codesandbox.io/s/github/hd-o/coding-challenge/tree/main/packages/jotai-writer-atom?file=/src/app/index.tsx

[solid_calendar]: ../solid-calendar/
