import { Use } from '/src/util/function-context/context'
import { combineLatest } from 'rxjs'

export const useRxCombineLatest: Use<typeof combineLatest> = () => combineLatest
