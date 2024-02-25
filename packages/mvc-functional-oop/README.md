# 🧩 MVC + Functional OOP

`#functional` `#mvc` `#oop`

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)][stackblitz]

MVC architecture with functional OOP design.

Following-up on [function-resolve][function-resolve], I've been thinking about how to combine the simplicity of functional programming and the power of object-oriented design to better organize an application's architecture through [domain-driven design][domain-driven-design], having inversion of control without the overhead currently necessary with JavaScript for the functional design proposed in [function-resolve][function-resolve]. Best case scenario would be JavaScript having [context receivers][context-receivers]. See full example [here in StackBlitz][stackblitz]. This architecture is being used in [cot-perspective](https://github.com/hd-o/cot-perspective). This design only manages inversion of control, state should be handled by an independent solution like [TanStack Query](https://tanstack.com/query/latest) or [Redux](https://redux.js.org/).

[function-resolve]: https://github.com/hd-o/coding-challenge/tree/main/packages/function-resolve

[domain-driven-design]: https://en.wikipedia.org/wiki/Domain-driven_design

[context-receivers]: https://www.youtube.com/watch?v=TVdFAftHzPE

[stackblitz]: https://stackblitz.com/edit/mvc-functional-oop?file=src%2Fcontroller%2Fclass-based.tsx&file=src%2Fcontroller%2Ffunction-based.tsx

```tsx
import { Record } from 'immutable'
import memoize from 'lodash/memoize'
import { Named, User } from '../model'

class FormatController {
  getFullName (item: Named) {
    return `${item.firstName} ${item.lastName}`
  }
}

class UserRecord extends Record(new User()) {
  constructor (state: Partial<User>, private ctrl: Controller) {
    super(state)
  }

  get fullName () {
    return this.ctrl.format.getFullName(this)
  }
}

class ModelController {
  protected types = { UserRecord }

  constructor (private ctrl: Controller) {}

  getUser (state: Partial<User> = {}): UserRecord {
    return new this.types.UserRecord(state, this.ctrl)
  }

  getCustomController = memoize(() => {
    return new Controller({
      ...this.ctrl.dependencies,
      FormatController: class CustomFormatter extends FormatController {
        getFullName (item: Named) {
          return `${super.getFullName(item)} Bravo`
        }
      }
    })
  })

  getCustomUser (state: Partial<User> = {}): UserRecord {
    return new this.types.UserRecord(state, this.getCustomController())
  }
}

const defaultDependencies = Object.freeze({
  FormatController,
  ModelController,
})

class Controller {
  constructor (public dependencies = defaultDependencies) {
    this.format = new dependencies.FormatController()
    this.model = new dependencies.ModelController(this)
  }

  format: FormatController
  model: ModelController
}

export const classController = new Controller()

export const customClassController = new Controller({
  ...defaultDependencies,
  FormatController: class CustomFormatter extends FormatController {
    getFullName (item: Named) {
      return `${item.lastName}, ${item.firstName}`
    }
  }
})
```
