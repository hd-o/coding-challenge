import { singleton } from 'tsyringe'
import { Resolvable } from './'

@singleton()
export class ResolvableFactory {
  create (): Resolvable {
    return new Resolvable()
  }
}
