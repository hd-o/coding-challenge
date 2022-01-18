import { OrderedSet } from 'immutable'

export type ComparatorResult = 0 | 1 | -1

export class SortedSet<V> implements Iterable<V> {
  constructor (
    readonly values: Iterable<V> = [],
    readonly comparator = (a: V, b: V): ComparatorResult => {
      if (a === b) return 0
      if (a < b) return -1
      return 1
    },
    private readonly _orderedSet = OrderedSet(values).sort(comparator)
  ) {}

  * [Symbol.iterator] (): Generator<V> {
    for (const i of this._orderedSet) {
      yield (i)
    }
  }

  get entries (): IterableIterator<[V, V]> {
    return this._orderedSet.entries()
  }

  get first (): V | undefined {
    return this._orderedSet.first()
  }

  get size (): number {
    return this._orderedSet.size
  }

  add (value: V): SortedSet<V> {
    return new SortedSet(this._orderedSet.add(value))
  }

  concat (values: Iterable<V>): SortedSet<V> {
    return new SortedSet(this._orderedSet.concat(values))
  }

  get = this._orderedSet.get.bind(this._orderedSet)

  toArray = this._orderedSet.toArray.bind(this._orderedSet)
}
