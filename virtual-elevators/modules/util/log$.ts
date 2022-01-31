import { map, Observable, tap } from 'rxjs'

export function log$ (label = ''): ($: Observable<any>) => void {
  return ($) => $
    .pipe(
      map(queue => JSON.parse(JSON.stringify(queue))),
      tap(json => console.log(label, json)))
    .subscribe()
}
