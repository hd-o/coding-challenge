import { OrderedSet } from 'immutable'

/**
 * @example
 * const comparator: Comparator<number> (a, b) {
 *   if (a === b) return 0
 *   if (a < b) return -1
 *   return 1
 * }
 */
export type IComparator<V> = (a: V, b: V) => 0 | 1 | -1

export class SortedSet<V> implements Iterable<V> {
  constructor (
    readonly values: Iterable<V> = [],
    private readonly _comparator: IComparator<V>,
    private readonly _orderedSet = OrderedSet(values).sort(_comparator)
  ) {}

  get = this._orderedSet.get.bind(this._orderedSet)

  has = this._orderedSet.has.bind(this._orderedSet)

  toArray = this._orderedSet.toArray.bind(this._orderedSet)

  public * [Symbol.iterator] (): Generator<V> {
    for (const i of this._orderedSet) yield (i)
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
    return this.create(this._orderedSet.add(value))
  }

  concat (values: Iterable<V>): SortedSet<V> {
    return this.create(this._orderedSet.concat(values))
  }

  create (orderedSet: OrderedSet<V>): SortedSet<V> {
    return new SortedSet(orderedSet, this._comparator)
  }

  delete (value: V): SortedSet<V> {
    return this.create(this._orderedSet.delete(value))
  }
}
