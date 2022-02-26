# 📝 Reactive To-Dos

`#mvc` `#react` `#rxjs`

[![Open in CodeSandbox](https://img.shields.io/badge/Open-＠CodeSandbox-blue?style=flat-square&logo=codesandbox)][live_demo]
[![Develop on localhost](https://img.shields.io/badge/Develop-＠localhost-DDD?style=flat-square&logo=gnubash&logoColor=EEE)][develop]

MVC React architecture with injected state observables, and isolated controller classes

---

<p align="center">
  <img
    src="./.assets/screenshot.png?v=2"
  />
</p>

---

This experiment was done in preparation for [virtual-elevators][virtual_elevators]. The goal was to use [tsyringe][tsyringe]'s dependency container together with React's context, having state management handled by controller classes, and view rendering by React components, while maintaining isolation, and dependency injection for all modules (classes, and components).

[develop]: ../../.shared/node/README.md#development

[live_demo]: https://codesandbox.io/s/github/hd-o/coding-challenge/tree/main/packages/reactive-todos

[tsyringe]: https://github.com/Microsoft/tsyringe

[virtual_elevators]: ../virtual-elevators/README.md
