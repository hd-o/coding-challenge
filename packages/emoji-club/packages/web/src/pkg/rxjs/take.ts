import { Use } from '/src/util/function-context/context'
import { take } from 'rxjs'

export const useRxTake: Use<typeof take> = () => take
