import { Observable, ObservedValueOf } from 'rxjs'

export type $Promise<$ extends Observable<any>> = Promise<ObservedValueOf<$>>
