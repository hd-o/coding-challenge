import { Subject } from 'rxjs'
import { FnCtor } from '../../../modules/function/container'
import { useRxSubject } from '../../../modules/pkg/rxjs/Subject'

export type MockInterval$ = Subject<any>

export const useMockInterval$: FnCtor<MockInterval$> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<any>()
}
