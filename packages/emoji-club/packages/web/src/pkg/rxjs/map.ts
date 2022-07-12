import { Use } from '/src/util/function-context/context'
import { map } from 'rxjs'

export const useRxMap: Use<typeof map> = () => map
