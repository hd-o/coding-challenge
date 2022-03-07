# 🛗 Rx Elevators

`#elevators` `#react` `#rx`

[![Open in CodeSandbox](https://img.shields.io/badge/Open-＠CodeSandbox-blue?style=flat-square&logo=codesandbox)][live_demo]
[![Develop on localhost](https://img.shields.io/badge/Develop-＠localhost-DDD?style=flat-square&logo=gnubash&logoColor=EEE)][develop]

Virtual elevators, powered by Rx streams, and React components.

This project is a follow-up to [solid-calendar][solid_calendar], with the goal of achieving a [SOLID][solid] architecture with [React][react], while isolating logic functions from view components, being able to run these functions with other view frameworks, or even with physical devices. This project is a sibling to [virtual-elevators][virtual_elevators], which aims at the same goals while using controller classes, not only function composition.

[MobX][mobx] was my preferred option for managing state in front-end applications, but while working on [virtual-elevators][virtual_elevators] I decided to experiment with [RxJS][rxjs] for handling data observability, a decision I greatly appreciate. In this project I deep dive into RxJS, coding the logic to virtual elevators entirely with observable streams, and function composition

---

<table>
  <tr>
    <td>
      <img
        alt="elevators screenshot"
        src="./.assets/screenshot.png?v=1"
      />
    </td>
    <td>
      <img
        alt="elevator movement screenshot"
        src="./.assets/screenshot-movement.png?v=2"
      />
    </td>
  </tr>
</table>

[develop]: ../../.shared/node/README.md#development

[live_demo]: https://codesandbox.io/s/github/hd-o/coding-challenge/tree/main/packages/rx-elevators

[mobx]: https://github.com/mobxjs/mobx

[react]: https://reactjs.org/

[rxjs]: https://github.com/ReactiveX/rxjs

[solid]: https://simple.wikipedia.org/wiki/SOLID_(object-oriented_design)

[solid_calendar]: ../solid-calendar/

[virtual_elevators]: ../virtual-elevators/
