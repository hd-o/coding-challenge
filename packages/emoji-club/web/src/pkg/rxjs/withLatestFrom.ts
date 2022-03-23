import { Use } from '/src/util/function-context/context'
import { withLatestFrom } from 'rxjs'

export const useRxWithLatestFrom: Use<typeof withLatestFrom> = () => withLatestFrom
