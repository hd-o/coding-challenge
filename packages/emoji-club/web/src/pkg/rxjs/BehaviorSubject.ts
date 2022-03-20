import { Use } from '/src/util/function-context/context'
import { BehaviorSubject } from 'rxjs'

export const useRxBehaviorSubject: Use<typeof BehaviorSubject> = () => BehaviorSubject
