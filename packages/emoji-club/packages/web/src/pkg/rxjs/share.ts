import { Use } from '/src/util/function-context/context'
import { share } from 'rxjs'

export const useRxShare: Use<typeof share> = () => share
