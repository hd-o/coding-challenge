import { Use } from '/src/util/function-context/context'
import { filter } from 'rxjs'

export const useRxFilter: Use<typeof filter> = () => filter
