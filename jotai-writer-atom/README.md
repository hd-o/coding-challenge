# 👻 Jotai Writer Atom

A context-friendly write-only atom, allowing dependency injection for atom setters

[🖥️ Live Demo @ CodeSandbox][live_demo]

```ts
const writerAtom = atom(
  null,
  (
    _get,
    _set,
    write: (get: typeof _get, set: typeof _set) => void,
  ) => {
    write(_get, _set)
  },
)
```

[live_demo]: https://codesandbox.io/s/github/hd-o/coding-challenge/tree/main/jotai-writer-atom
