import { Use } from '/src/util/function-context/context'
import { Subject } from 'rxjs'

export const useRxSubject: Use<typeof Subject> = () => Subject
