import { BehaviorSubject } from 'rxjs'
import { Use } from '../../util/function-context/context'

export const useRxBehaviorSubject: Use<typeof BehaviorSubject> = () => BehaviorSubject
