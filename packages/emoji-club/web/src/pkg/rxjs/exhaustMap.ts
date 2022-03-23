import { Use } from '/src/util/function-context/context'
import { exhaustMap } from 'rxjs'

export const useRxExhaustMap: Use<typeof exhaustMap> = () => exhaustMap
