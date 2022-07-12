import { Use } from '/src/util/function-context/context'
import { merge } from 'rxjs'

export const useRxMerge: Use<typeof merge> = () => merge
