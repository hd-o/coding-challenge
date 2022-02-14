import { Map } from 'immutable'
import { Observable } from 'rxjs'

export type Map$ <A, B> = Observable<Map<A, B>>
