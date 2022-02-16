import { FnCtor } from '/src/function/container'
import { useRxFirstValueFrom } from '/src/pkg/rxjs/firstValueFrom'
import { useRxSkip } from '/src/pkg/rxjs/skip'
import { Observable } from 'rxjs'
import { $ValuePromise } from './$ValuePromise'

type NthValueFrom = <O extends Observable<any>> (nth: number, $: O) => $ValuePromise<typeof $>

export const useNthValueFrom: FnCtor<NthValueFrom> = (container) => {
  const firstValueFrom = container.resolve(useRxFirstValueFrom)
  const skip = container.resolve(useRxSkip)

  const nthValueFrom: NthValueFrom = (nth, $) => firstValueFrom($.pipe(skip(nth - 1)))

  return nthValueFrom
}
