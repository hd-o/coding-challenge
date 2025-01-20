# 👻 Jotai Writer Atom

`#atom` `#jotai` `#react`

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)][demo]
[![Open in Codeanywhere](https://codeanywhere.com/img/open-in-codeanywhere-btn.svg)][codeanywhere-demo]

[codeanywhere-demo]: https://app.codeanywhere.com/#https://github.com/hd-o/coding-challenge/blob/918c9a0a63586e4b17fd5c65188962d3115e8a2e/packages/jotai-writer-atom/README.md

[demo]: https://stackblitz.com/github/hd-o/coding-challenge?configPath=packages/jotai-writer-atom&file=packages/jotai-writer-atom/index.html&startScript=run:jotai-writer-atom

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

[handleSave]: ../solid-calendar/src/reminder/editor/handleSave.ts

[solid_calendar]: ../solid-calendar/
