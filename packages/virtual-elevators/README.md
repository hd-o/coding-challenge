# 🛗 Virtual Elevators

`#elevators` `#react` `#solid`

[![Open in CodeSandbox](https://img.shields.io/badge/Open-＠CodeSandbox-blue?style=flat-square&logo=codesandbox)][live_demo]
[![Develop on localhost](https://img.shields.io/badge/Develop-＠localhost-DDD?style=flat-square&logo=gnubash&logoColor=EEE)][develop]

Virtual elevators, powered by controller classes, and React components.

This project is a follow-up to [solid-calendar][solid_calendar], and [reactive-todos][reactive_todos], with the goal of achieving a SOLID architecture with React, while isolating logic functions from view components, being able to run these functions with other view frameworks, or even with physical devices. This project is a sibling to [rx-elevators][rx_elevators], which aims at the same goals while using function composition, without classes.

[MobX][mobx] was my preferred option for managing state in front-end applications, but this time I decided to experiment with [RxJS][rxjs] for handling data observability, a decision I believe was one of the best in my career, learning the capabilities of Rx, which I later deep-dived into while developing [rx-elevators][rx_elevators]

---

<table>
  <tr>
    <td>
      <img
        alt="elevators screenshot"
        src="./.assets/screenshot.png"
      />
    </td>
    <td>
      <img
        alt="elevator movement screenshot"
        src="./.assets/screenshot-movement.png"
      />
    </td>
  </tr>
</table>

[develop]: ../../.shared/node/README.md#development

[live_demo]: https://codesandbox.io/s/github/hd-o/coding-challenge/tree/main/packages/virtual-elevators

[mobx]: https://github.com/mobxjs/mobx

[reactive_todos]: ../reactive-todos/

[rx_elevators]: ../rx-elevators/

[rxjs]: https://github.com/ReactiveX/rxjs

[solid_calendar]: ../solid-calendar/
