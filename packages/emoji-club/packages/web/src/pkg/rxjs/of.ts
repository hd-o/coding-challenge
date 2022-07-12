import { Use } from '/src/util/function-context/context'
import { of } from 'rxjs'

export const useRxOf: Use<typeof of> = () => of
