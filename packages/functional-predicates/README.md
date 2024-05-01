# 🚃 Functional Predicates

Composable functional array predicates

`#data` `#functional`

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)][stackblitz]

[stackblitz]: https://stackblitz.com/edit/functional-predicates?file=index.ts

```tsx
const containsOnlyFloridaOrTexas = contains(
  or(
    only(['Miami', 'Orlando']),
    only(['Austin', 'Dallas'])
  )
)
true === containsOnlyFloridaOrTexas(['Miami'])
false === containsOnlyFloridaOrTexas(['Miami', 'LA'])
```
