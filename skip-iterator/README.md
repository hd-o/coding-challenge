# SkipIterator

Iterator implementing skipping through `.skip()`

🖥️ [Live Demo @ Deno Playground][denoplayground]

```typescript
const myIter = new SkipIterator([1,3,4,3,5])
myIter.next() // 1
myIter.skip(3)
myIter.skip(3)
myIter.next() // 4
myIter.next() // 5
```

This implementation accepts an array of integers, but could accept any type through generics:

```typescript
class SkipIterator<Value> {
  constructor(values: Value[])
}
```

## Development

1. Install [Deno]
2. Run test file: `deno run SkipIterator.test.ts`

[denoplayground]: https://deno-playground.mahardi.me/?id=OTY5MGZiMTJ

[Deno]: https://deno.land/#installation
