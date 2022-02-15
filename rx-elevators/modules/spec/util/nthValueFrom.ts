import { Observable } from 'rxjs'
import { FnCtor } from '../../function/container'
import { useRxFirstValueFrom } from '../../pkg/rxjs/firstValueFrom'
import { useRxSkip } from '../../pkg/rxjs/skip'
import { $Promise } from './$Promise'

type NthValueFrom = <O extends Observable<any>> (nth: number, $: O) => $Promise<typeof $>

export const useNthValueFrom: FnCtor<NthValueFrom> = (container) => {
  const firstValueFrom = container.resolve(useRxFirstValueFrom)
  const skip = container.resolve(useRxSkip)

  const nthValueFrom: NthValueFrom = (nth, $) => firstValueFrom($.pipe(skip(nth - 1)))

  return nthValueFrom
}
