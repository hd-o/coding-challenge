# 🚃 Functional Predicates

Composable functional array predicates

`#data` `#functional`

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)][demo]
[![Open in Codeanywhere](https://codeanywhere.com/img/open-in-codeanywhere-btn.svg)][codeanywhere-demo]

[codeanywhere-demo]: https://app.codeanywhere.com/#https://github.com/hd-o/coding-challenge/blob/918c9a0a63586e4b17fd5c65188962d3115e8a2e/packages/function-resolve/README.md

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
