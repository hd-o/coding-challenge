import { Use } from '/src/util/function-context/context'
import { shareReplay } from 'rxjs'

export const useRxShareReplay: Use<typeof shareReplay> = () => shareReplay
