import { assert } from 'chai'
import { SkipIterator } from './SkipIterator'

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
  assert.equal(currentResults.join(), results.join())
}

console.log('✅ SkipIterator Test Passed')
