import { Observable, Subject } from 'rxjs'
import { FnC } from '../../../function/container'
import { useRxMergeWith } from '../../../pkg/rxjs/mergeWith'
import { useRxOf } from '../../../pkg/rxjs/of'
import { useRxShareReplay } from '../../../pkg/rxjs/shareReplay'
import { useRxSubject } from '../../../pkg/rxjs/Subject'

export interface RefSubject<V> {
  next: Subject<V>['next']
  pipe: Observable<V>['pipe']
  subscribe: Observable<V>['subscribe']
}

type RefSubjectClass = new <V> (v: V) => RefSubject<V>

export const useRefSubject = (container: FnC): RefSubjectClass => {
  const Subject = container.resolve(useRxSubject)
  const of = container.resolve(useRxOf)
  const mergeWith = container.resolve(useRxMergeWith)
  const shareReplay = container.resolve(useRxShareReplay)

  return class RefSubjectClass<V> implements RefSubject<V> {
    constructor (private readonly _initialValue: V) {}

    private readonly _subject = new Subject<V>()

    private readonly _$ = of(this._initialValue).pipe(
      mergeWith(this._subject),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      }),
    )

    readonly next = this._subject.next.bind(this._subject)

    readonly pipe = this._$.pipe.bind(this._$)

    readonly subscribe = this._$.subscribe.bind(this._$)
  }
}

// TODO write test
/* eslint-disable */
const TypeTest = () => {
  let RefSubjectClass: ReturnType<typeof useRefSubject>
  () => new RefSubjectClass(10).subscribe((x: number) => {})
}
