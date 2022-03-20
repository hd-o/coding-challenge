import { Use } from '/src/util/function-context/context'
import { tap } from 'rxjs'

export const useRxTap: Use<typeof tap> = () => tap
