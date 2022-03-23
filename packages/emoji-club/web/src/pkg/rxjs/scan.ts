import { Use } from '/src/util/function-context/context'
import { scan } from 'rxjs'

export const useRxScan: Use<typeof scan> = () => scan
