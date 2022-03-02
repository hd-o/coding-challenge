import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Use } from '/src/util/resolve'
import { Subject } from 'rxjs'

export type MockInterval$ = Subject<any>

export const useMockInterval$: Use<MockInterval$> = (resolve) => {
  const Subject = resolve(useRxSubject)
  return new Subject<any>()
}
