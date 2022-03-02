import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { resolve, Use } from '/src/util/resolve'
import { Subject } from 'rxjs'

export type MockInterval$ = Subject<any>

export const useMockInterval$: Use<MockInterval$> = (container) => {
  const Subject = resolve(container)(useRxSubject)
  return new Subject<any>()
}
