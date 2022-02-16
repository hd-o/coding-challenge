import { Observable, ObservedValueOf } from 'rxjs'

export type $ValuePromise<$ extends Observable<any>> = Promise<ObservedValueOf<$>>
