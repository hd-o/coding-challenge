# 🔏 TS Immutable Record

Immutable Record in plain TypeScript

`#functional` `#oop` `#typescript`

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)][stackblitz]

[stackblitz]: https://stackblitz.com/edit/ts-immutable-record?file=index.ts

```ts
class A extends ImmutableRecord({ age: 0 }) {}

const a = new A()
const a20 = a.set('age', 20)
const a30 = a.with({ age: 30 })
```
