import { Use } from '/src/util/function-context/context'
import { switchMap } from 'rxjs'

export const useRxSwitchMap: Use<typeof switchMap> = () => switchMap
