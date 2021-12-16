import { assertEquals } from 'https://deno.land/std@0.103.0/testing/asserts.ts'
import { SkipIterator } from './SkipIterator.ts'

const testValues = [
  {
    toSkip: 5,
    values: [2, 3, 5, 6, 5, 7, 5, -1, 5, 10],
    // Empty strings are where .skip() is called (returns void)
    results: [true, 2, '', 3, 6, 5, '', '', 7, -1, 10, false, ''],
  },
]

for (const { values, results, toSkip } of testValues) {
  const iterator = new SkipIterator(values)
  const currentResults = [
    iterator.hasNext,
    iterator.next(),
    iterator.skip(toSkip),
    iterator.next(),
    iterator.next(),
    iterator.next(),
    iterator.skip(toSkip),
    iterator.skip(toSkip),
    iterator.next(),
    iterator.next(),
    iterator.next(),
    iterator.hasNext,
    iterator.next(),
  ]
  assertEquals(currentResults.join(), results.join())
}

console.log('✅ SkipIterator Test Passed')
