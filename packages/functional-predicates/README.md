# 🚃 Functional Predicates

Composable functional array predicates

`#data` `#functional`

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)][demo]

[demo]: https://stackblitz.com/github/hd-o/coding-challenge?configPath=packages/functional-predicates&file=packages/functional-predicates/index.ts&startScript=run:functional-predicates

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
