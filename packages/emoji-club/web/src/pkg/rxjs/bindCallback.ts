import { Use } from '/src/util/function-context/context'
import { bindCallback } from 'rxjs'

export const useRxBindCallback: Use<typeof bindCallback> = () => bindCallback
