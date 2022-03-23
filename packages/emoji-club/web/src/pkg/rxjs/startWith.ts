import { Use } from '/src/util/function-context/context'
import { startWith } from 'rxjs'

export const useRxStartWith: Use<typeof startWith> = () => startWith
