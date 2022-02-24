import { FnCtor } from '/src/function/container'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Subject } from 'rxjs'

export type MockInterval$ = Subject<any>

export const useMockInterval$: FnCtor<MockInterval$> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<any>()
}
